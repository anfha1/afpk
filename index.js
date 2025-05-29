import path from "path"
import * as fs from 'fs'
import Database from 'better-sqlite3'
import { DateTime } from "luxon"

import helper from './helper/index.mjs'
import server from './lib/server.mjs'

// export { default as CronJob } from './modun/CronJob.mjs'
// export { default as Queue } from './modun/Queue.mjs'
// export { default as Wait } from './modun/Wait.mjs'
// export { default as EOn } from './modun/EOn.mjs'
// export { default as Interact } from './modun/Interact.mjs'
// export { default as Device } from './modun/Device.mjs'

// import * as app from './helper/app.mjs'
// import flang from './helper/flang.mjs'
// import flog from './helper/flog.mjs'
// import * as obj from './helper/obj.mjs'
// import regFn from './helper/regFn.mjs'

// export { default as createDb } from './lib/sqlite.mjs'

// export const helper = {
//   app,
//   flang,
//   flog,
//   obj,
//   regFn,
// }

// triển khai phiên bản v2 tự động nhúng
export default Object.assign(
  server, // Nhúng thư viện service
  {
    // thêm các package cần thiết
    fs, path,
    Database,
    DateTime,

    // Thêm các hàm trợ giúp
    helper,

    afpkBind(obj = this, exclude = [
      'express', 'fs', 'path', 'Database', 'DateTime',
      'afpkBind', 'msgDev', 'start', 'app',
    ], root = obj) {
      for (const key in obj) {
        if (!obj.hasOwnProperty(key) || exclude.includes(key)) continue;

        const val = obj[key];

        if (typeof val === 'function') {
          obj[key] = val.bind(root);
        } else if (typeof val === 'object' && val !== null) {
          this.afpkBind(val, [], root);
        }
      }
      return obj;
    },

    dev: false, // chế độ dev dùng để kiểm tra các log khi mở chế độ dev
    // hàm gửi log nếu chế độ dev mở
    msgDev(...msg) {
      if (this.dev) {
        console.log(...msg)
      }
    }
  }
)