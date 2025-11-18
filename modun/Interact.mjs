import { encode, decode } from '#helper/crypt.mjs'
import regFn from '#helper/regFn.mjs'

import e_on from './EOn.mjs'

export default class {
  constructor(socket, config = {}) {
    this.socket = socket
    this.nameSecretEmit = config.name_secret_emit ?? 'data_encode'
    this.nameActiveFunction = config.name_active_function ?? 'active_function'
    let nameSecretOn = config.name_secret_on ?? 'data_encode'

    // lắng nghe các sự kiện của B gửi về
    var eA_on = new e_on()
    this.onA = eA_on.add.bind(eA_on)

    // lắng nghe các sự kiện của B gửi về
    var eB_on = new e_on()
    this.onB = eB_on.add.bind(eB_on)

    // lắng nghe sự kiện active fn
    this.onA(this.nameActiveFunction, (fnId, param = []) => {
      regFn.run(fnId, param)
    })
    this.onB(this.nameActiveFunction, (fnId, param = []) => {
      regFn.run(fnId, param)
    })

    socket.on(nameSecretOn, (data, from) => {
      let eventDecode = decode(data)
      if (eventDecode && eventDecode.name && eventDecode.param) {
        if (eventDecode.fn_index && eventDecode.fn_index.length > 0) {
          // xử lý param fn
          eventDecode.fn_index.map(fnIndex => {
            let fnId = eventDecode.param[fnIndex]
            let fnName = eventDecode.fn_name ?? this.nameActiveFunction
            eventDecode.param[fnIndex] = (...param) => {
              if (from === 1) {
                this.emitB(fnName, fnId, param)
              } else {
                this.emitA(fnName, fnId, param)
              }
            }
          })
        }

        if (from === 1) {
          eB_on.run(eventDecode.name, eventDecode.param)
        } else {
          eA_on.run(eventDecode.name, eventDecode.param)
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
    let fnIndex = []
    param = param.map((elm, index) => {
      if (typeof elm === 'function') {
        let idFn = regFn.push(elm)
        fnIndex.push(index)
        return idFn
      }
      return elm
    })

    this.socket.emit(this.nameSecretEmit, encode({
      name,
      param,
      fn_index: fnIndex,
      fn_name: this.nameActiveFunction,
    }), to, 2)
  }
}