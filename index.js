import path from "path"
import * as fs from 'fs'
import { DateTime } from "luxon"

import helper from './helper/index.mjs'
import server from './lib/server.mjs'

// triển khai phiên bản v2 tự động nhúng
export default Object.assign(
  server, // Nhúng thư viện service
  {
    // thêm các package cần thiết
    fs, path,
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