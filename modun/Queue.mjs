export default class {
  listTask = []
  numTaskInProcess = 0

  constructor(maxTaskProcess = 1) {
    this.maxTaskProcess = maxTaskProcess ?? 1
  }

  run(cb) {
    if (cb && typeof cb === 'function') {
      this.listTask.push(cb)
      this.active()
    }
  }

  active() {
    while (this.listTask.length > 0 && this.maxTaskProcess > this.numTaskInProcess) {
      let cb = this.listTask.shift()
      this.numTaskInProcess++
      cb(() => {
        this.numTaskInProcess--
        this.active()
      })
    }
  }
}