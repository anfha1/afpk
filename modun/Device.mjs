// import { UAParser } from 'ua-parser-js'

// import { clone as obj_clone } from '#helper/obj.mjs'
// import flog from "#helper/flog.mjs"
// import flang from '#helper/flang.mjs'

// import m_wait from "./Wait.mjs"

// export default class {
//   device = {}

//   constructor(interact, mongodb, action) {
//     const { create_tab, add_device, close_tab, create_device, check_device } = action
//     this.wait = new m_wait()

//     var socket = interact.socket

//     // Lấy thông tin trình duyệt từ headers và phân tích chuỗi User-Agent
//     const userAgentString = socket.handshake.headers['user-agent']
//     const parser = new UAParser(userAgentString)
//     this.info_device = obj_clone(parser.getResult())

//     // Thêm id_socket.io
//     this.info_device.socket_id = socket.id

//     // tạo device_token
//     interact.onB('create_device_token', () => {
//       mongodb.on(() => {
//         create_device()
//         .then(device => {
//           this.device = device
//           add_device(socket.id, device.token)

//           /* Gửi device token cho client */
//           interact.emitB('device_token_change', device.token)

//           // báo xác thực thành công
//           this.wait.done()
//         })
//         .catch(e => {
//           flog.error('af_core_device', flang.INSERT_RECORD_ERROR, e)
//         })
//       })
//     })

//     // kiểm tra device_token
//     interact.onB('check_device_token', (device_token, fn_done) => {
//       check_device(device_token)
//       .then(info_device => {
//         if (info_device === null) {
//           create_device()
//           .then(device => {
//             this.device = device
//             add_device(socket.id, device.token)

//             /* Gửi device token cho client */
//             interact.emitB('device_token_change', device.token)

//             // báo xác thực thành công
//             this.wait.done()
//           })
//           .catch(e => {
//             flog.error('af_core_device', flang.INSERT_RECORD_ERROR, e)
//           })
//         } else {
//           this.device = info_device
//           fn_done(1)

//           // báo xác thực thành công
//           this.wait.done()

//         }
//       })
//     })

//     // Lấy địa chỉ IP của client từ X-Forwarded-For hoặc socket.handshake.address
//     let clientIp = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address
//     if (clientIp.includes(',')) {
//       clientIp = clientIp.split(',')[0].trim();
//     }
//     this.info_device.ip = {
//       type: clientIp.includes(':') ? 'ipv6' : 'ipv4',
//       ip: clientIp
//     }

//     // Thêm tab kết nối đến
//     mongodb.on(() => {
//       create_tab(this.info_device)
//     })

//     socket.on('disconnect', () => {
//       mongodb.on(() => {
//         close_tab(socket.id)
//       })
//     })
//   }
// }