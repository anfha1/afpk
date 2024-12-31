import { encode, decode } from '#helper/crypt.mjs'
import regFn from '#helper/regFn.mjs'

import e_on from './EOn.mjs'

export default class {
  constructor(socket, config = {}) {
    this.socket = socket
    this.name_secret_emit = config.name_secret_emit ?? 'data_encode'
    this.name_active_function = config.name_active_function ?? 'active_function'
    let name_secret_on = config.name_secret_on ?? 'data_encode'

    // lắng nghe các sự kiện của B gửi về
    var eA_on = new e_on()
    this.onA = eA_on.add.bind(eA_on)

    // lắng nghe các sự kiện của B gửi về
    var eB_on = new e_on()
    this.onB = eB_on.add.bind(eB_on)

    // lắng nghe sự kiện active fn
    this.onA(this.name_active_function, (fn_id, param = []) => {
      regFn.run(fn_id, param)
    })
    this.onB(this.name_active_function, (fn_id, param = []) => {
      regFn.run(fn_id, param)
    })

    socket.on(name_secret_on, (data, from) => {
      let event_decode = decode(data)
      if (event_decode && event_decode.name && event_decode.param) {
        if (event_decode.fn_index && event_decode.fn_index.length > 0) {
          // xử lý param fn
          event_decode.fn_index.map(fn_index => {
            let fn_id = event_decode.param[fn_index]
            let fn_name = event_decode.fn_name ?? this.name_active_function
            event_decode.param[fn_index] = (...param) => {
              if (from === 1) {
                this.emitB(fn_name, fn_id, param)
              } else {
                this.emitA(fn_name, fn_id, param)
              }
            }
          })
        }

        if (from === 1) {
          eB_on.run(event_decode.name, event_decode.param)
        } else {
          eA_on.run(event_decode.name, event_decode.param)
        }
      }
    })
  }

  emitA(name, ...param) {
    this.emit_to(0, name, param)
  }
  emitB(name, ...param) {
    this.emit_to(1, name, param)
  }

  emit_to(to, name, param) {
    let fn_index = []
    param = param.map((elm, index) => {
      if (typeof elm === 'function') {
        let id_fn = regFn.push(elm)
        fn_index.push(index)
        return id_fn
      }
      return elm
    })

    this.socket.emit(this.name_secret_emit, encode({
      name,
      param,
      fn_index,
      fn_name: this.name_active_function,
    }), to, 2)
  }
}