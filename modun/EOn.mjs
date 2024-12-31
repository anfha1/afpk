export default class {
  e_on = {}

  constructor() {}

  add(name, cb) {
    if (cb && typeof cb === 'function') {
      if (!this.e_on[name]) {
        this.e_on[name] = []
      }
      this.e_on[name].push(cb)
    }
  }

  run(name, param) {
    if (this.e_on[name] && this.e_on[name].length > 0) {
      this.e_on[name].map(cb => {
        cb(...param)
      })
    }
  }

  delete(name) {
    if (this.e_on[name]) {
      delete this.e_on[name]
    }
  }
}