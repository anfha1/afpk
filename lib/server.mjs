import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"
import cookieParser from 'cookie-parser'
import cookie from "cookie"

export default {
  express,
  app: express(),
  service: {
    config: {
      socket: true,
      express: {
        json: true,
        cors: {},
        static: false,
      },
      cookie: {
        salt: 'superSecretKey',
      },
      port: false,
      on: {
        start: false,
      },
    },
    refIdSs: 0,
    // Hàm kiểm tra cấu hình máy chủ trước khi chạy
    check() {
      this.service.config = this.service.config ?? {}
      this.service.config.socket = this.service.config.socket ?? true // mặc định là sử dụng socket nếu là false tức là không sử dụng, còn nếu là object thì là config của socket.io

      // cấu hình của express
      this.service.config.express = this.service.config.express ?? {}
      this.service.config.express.json = this.service.config.express.json ?? true // mặc định là sử dụng json
      this.service.config.express.cors = this.service.config.express.cors ?? {} // mặc định là không có cors
      this.service.config.express.static = this.service.config.express.static ?? false // mặc định là không có static file
      this.service.config.cookie = this.service.config.cookie ?? {}
      this.service.config.cookie.salt = this.service.config.cookie.salt ?? 'superSecretKey'

      // cấu hình port của server
      this.service.config.port = this.service.config.port ?? false // mặc định là không chạy server

      // sự kiện khi server chạy
      this.service.config.on = this.service.config.on ?? {}
      this.service.config.on.start = this.service.config.on.start ?? false
    },

    // Hàm khởi động máy chủ
    start() {
      this.service.check()

      // cấu hình của express
      // sử dụng json
      if (this.service.config.express.json) {
        this.app.use(express.json())
      }
      // sử dụng cors
      this.app.use(cors(this.service.config.express.cors))
      // sử dụng static file
      if (this.service.config.express.static) {
        this.app.use(express.static(this.service.config.express.static))
      }

      // kiểm tra nếu req gửi lên chưa có cookie thì tạo cookie và gửi về cho người dùng
      if (this.service.config.express.cookie !== false) {
        this.app.use(cookieParser(this.service.config.cookie.salt))
        this.app.use((req, res, next) => {
          const ssid = req.signedCookies.SSID; // Đọc cookie đã ký
          if (!ssid) {
            res.cookie("SSID", this.helper.crypt.encode(++this.service.refIdSs), {
              httpOnly: true,
              signed: true, // Ký cookie để xác thực
              secure: false, // Để test, bật `true` nếu dùng HTTPS
              sameSite: "Strict"
            });
          }
          next()
        })
      }

      // tạo server
      this.http = createServer(this.app)
      if (this.service.config.socket) {
        this.io = new Server(this.http, typeof this.service.config.socket === 'object' ? this.service.config.socket : undefined)
      }

      // trả về server
      if (this.service.config.port) {
        this.http.listen(this.service.config.port, this.service.config.on.start)
      }
    }
  },

  // tạo tool decode cookie
  cookie: {
    parse(rawCookies) {
      return cookieParser.signedCookies(cookie.parse(rawCookies), this.service.config.cookie.salt)
    }
  }
}