import { now, createDateTimeFromObj } from '#helper/time.mjs'

export default class CronJob {
  // Private fields
  #jobs = new Map()
  #jobIdCounter = 0
  #devMode = 0
  #checkInterval = 10000
  #nextCheckTime = {}
  #timeUnits = ['millisecond', 'second', 'minute', 'hour', 'day', 'month', 'year']

  // Calculate the next check time
  #calculateNextCheckTime() {
    this.#nextCheckTime = now().plus({
      millisecond: this.#checkInterval
    })
  }

  // Generate a new job ID
  #generateJobId() {
    return ++this.#jobIdCounter
  }

  constructor(checkInterval = 300000, devMode = 0) {
    this.#checkInterval = checkInterval
    this.#devMode = devMode
    this.#calculateNextCheckTime()
    // Set up interval to check jobs
    setInterval(() => {
      this.#calculateNextCheckTime()
      this.#jobs.forEach((jobDetails, jobId) => {
        this.#evaluateJob(jobDetails, jobId)
      })
    }, this.#checkInterval)
    if (this.#devMode) console.log(`CronJob initialized with check interval: ${this.#checkInterval} ms`)
  }

  // Set a one-time job
  scheduleJob(time, action) {
    if (typeof time !== 'object') {
      throw new Error('Time format must be a Luxon object')
    }

    if (typeof action !== 'function') {
      throw new Error('Action must be a function')
    }

    if (this.#devMode) console.log(`Scheduling job at time: ${time.toISO()}`)
    return this.#addJob({
      type: 'one-time',
      time,
      action,
    })
  }

  // Set a recurring job
  scheduleRecurringJob(timePattern, action) {
    if (typeof timePattern !== 'object') {
      throw new Error('Time pattern must be an object')
    }

    if (typeof action !== 'function') {
      throw new Error('Action must be a function')
    }

    console.log(`Scheduling recurring job with pattern: ${JSON.stringify(timePattern)}`)
    return this.#addJob({
      type: 'recurring',
      time: this.#calculateNextExecutionTime(timePattern),
      action,
      timePattern,
    })
  }

  // Set a weekly recurring job
  scheduleWeeklyJob(dayOfWeek, timeOfDay, action) {
    if (typeof dayOfWeek !== 'number' || dayOfWeek < 1 || dayOfWeek > 7) {
      throw new Error('Day of the week must be a number between 1 (Sunday) and 7 (Saturday)')
    }

    if (typeof timeOfDay !== 'object') {
      throw new Error('Time of day must be an object')
    }

    if (typeof action !== 'function') {
      throw new Error('Action must be a function')
    }

    let time = this.#calculateNextWeeklyExecutionTime(dayOfWeek, timeOfDay)

    if (this.#devMode) console.log(`Scheduling weekly job on day ${dayOfWeek} at time: ${ time.toFormat('HH:mm:ss') } to next time: ${ time.toISO() }`)
    return this.#addJob({
      type: 'weekly',
      dayOfWeek,
      timeOfDay,
      action,
      time,
    })
  }

  // Calculate the next execution time for a recurring job
  #calculateNextExecutionTime(timePattern) {
    let highestUnitIndex = 0
    let currentTime = now()
    let timeObject = currentTime.toObject()
    Object.keys(timePattern).forEach(unit => {
      if (timePattern.year) {
        delete timePattern.year
      }
      let unitIndex = this.#timeUnits.indexOf(unit)
      if (unitIndex > -1) {
        timeObject[unit] = timePattern[unit]
        if (highestUnitIndex < unitIndex) {
          highestUnitIndex = unitIndex
        }
      }
    })
    let nextTime = createDateTimeFromObj(timeObject)
    if (nextTime.diff(currentTime).toMillis() < 1) {
      let increment = {}
      increment[this.#timeUnits[highestUnitIndex + 1]] = 1
      nextTime = nextTime.plus(increment)
    }
    return nextTime
  }

  // Calculate the next execution time for a weekly recurring job
  #calculateNextWeeklyExecutionTime(dayOfWeek, timeOfDay) {
    let currentTime = now()
    dayOfWeek = dayOfWeek === 1 ? 7 : dayOfWeek - 1

    let nextTime = currentTime.set({
      weekday: dayOfWeek,
      hour: timeOfDay.hour || 0,
      minute: timeOfDay.minute || 0,
      second: timeOfDay.second || 0,
      millisecond: timeOfDay.millisecond || 0
    })

    if (nextTime.diff(currentTime).toMillis() < 1) {
      nextTime = nextTime.plus({ weeks: 1 })
    }

    return nextTime
  }

  // Delete a job by ID
  deleteJob(jobId) {
    let jobDetails = this.#jobs.get(jobId)
    if (jobDetails.timeoutId) {
      clearTimeout(jobDetails.timeoutId)
    }
    this.#jobs.delete(jobId)
    if (this.#devMode) console.log(`Deleted job with id: ${jobId}`)
  }

  // Add a job to the queue
  #addJob(jobDetails) {
    let jobId = this.#generateJobId()
    jobDetails.timeoutId = 0
    this.#jobs.set(jobId, jobDetails)
    this.#evaluateJob(jobDetails, jobId)
    if (this.#devMode) console.log(`Added job with id: ${jobId}`)
    return jobId
  }

  // Evaluate if a job should be executed
  #evaluateJob(jobDetails, jobId) {
    if (jobDetails.time.diff(this.#nextCheckTime).toMillis() < 0) {
      let executeAction = () => {
        this.#beforeActionExecution(jobDetails, jobId)
        try {
          if (this.#devMode) console.log(`Executed job with id: ${jobId}`)
          jobDetails.action()
        } catch (error) {
          console.error(`Error executing job with id: ${jobId}`, error)
        }
      }
      let timeDifference = jobDetails.time.diff(now()).toMillis()
      if (timeDifference < 0) {
        executeAction()
      } else {
        jobDetails.timeoutId = setTimeout(executeAction, timeDifference)
      }
    } else {
      jobDetails.timeoutId = 0
    }
  }

  // Handle job execution and rescheduling for recurring jobs
  #beforeActionExecution(jobDetails, jobId) {
    switch (jobDetails.type) {
      case 'one-time': {
        this.#jobs.delete(jobId)
        if (this.#devMode) console.log(`Completed one-time job with id: ${jobId}`)
        break
      }
      case 'recurring': {
        jobDetails.time = this.#calculateNextExecutionTime(jobDetails.timePattern)
        if (this.#devMode) console.log(`Rescheduled recurring job with id: ${jobId} to next time: ${jobDetails.time.toISO()}`)
        this.#evaluateJob(jobDetails, jobId)
        break
      }
      case 'weekly': {
        jobDetails.time = this.#calculateNextWeeklyExecutionTime(jobDetails.dayOfWeek, jobDetails.timeOfDay)
        if (this.#devMode) console.log(`Rescheduled weekly job with id: ${jobId} to next time: ${jobDetails.time.toISO()}`)
        this.#evaluateJob(jobDetails, jobId)
        break
      }
    }
  }
}