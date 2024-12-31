export default {
  e: [],
  push(cb) {
    if (cb && typeof cb === 'function') {
      let id = this.e.push(cb)
      return --id
    }

    return -1
  },
  run(id, param) {
    if (this.e[id]) {
      this.e[id](...param)
    }
  }
}