export default class {
  list_task = []
  num_task_in_process = 0

  constructor(max_task_process = 1) {
    this.max_task_process = max_task_process ?? 1
  }

  run(cb) {
    if (cb && typeof cb === 'function') {
      this.list_task.push(cb)
      this.active()
    }
  }

  active() {
    while(this.list_task.length > 0 && this.max_task_process > this.num_task_in_process) {
      let cb = this.list_task.shift()
      this.num_task_in_process++
      cb(() => {
        this.num_task_in_process--
        this.active()
      })
    }
  }
}