export default class {
  status = 0
  list_action = []

  done() {
    this.status = 1
    this.list_action.map(cb => {
      cb()
    })
  }

  on(cb) {
    if (this.status) {
      cb()
    } else {
      this.list_action.push(cb)
    }
  }

  disconnect() {
    this.status = 0
  }
}