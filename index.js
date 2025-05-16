export { default as CronJob } from './modun/CronJob.mjs'
export { default as Queue } from './modun/Queue.mjs'
export { default as Wait } from './modun/Wait.mjs'
export { default as EOn } from './modun/EOn.mjs'
export { default as Interact } from './modun/Interact.mjs'
// export { default as Device } from './modun/Device.mjs'

// import * as app from './helper/app.mjs'
// import * as crypt from './helper/crypt.mjs'
// import flang from './helper/flang.mjs'
// import flog from './helper/flog.mjs'
// import * as obj from './helper/obj.mjs'
// import * as file from './helper/file.mjs'
// import * as time from './helper/time.mjs'
// import regFn from './helper/regFn.mjs'

import helper from './helper/index.mjs'

import server from './lib/server.mjs'

export { default as createDb } from './lib/sqlite.mjs'
// export * as google from './lib/google.mjs'
import Database from 'better-sqlite3'

// export const helper = {
//   app,
//   crypt,
//   flang,
//   flog,
//   obj,
//   file,
//   time,
//   regFn,
// }

// triển khai phiên bản v2 tự động nhúng
export default function () {
  // thêm các hàm trợ giúp mặc định
  helper.bind(this)()

  // thêm thư viện sqlite3
  this.Database = Database

  // thêm thư viện cấu hình máy chủ
  server.bind(this)()
}