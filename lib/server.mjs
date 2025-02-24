import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"
import cookieParser from 'cookie-parser'
// @ts-ignore
import cookie from "cookie"

import { encode } from '#helper/crypt.mjs'

export function create(config = {}) {
  config.socket = config.socket ?? true // mặc định là sử dụng socket nếu là false tức là không sử dụng, còn nếu là object thì là config của socket.io

  // cấu hình của express
  config.express = config.express ?? {}
  config.express.json = config.express.json ?? true // mặc định là sử dụng json
  config.express.cors = config.express.cors ?? {} // mặc định là không có cors
  config.express.static = config.express.static ?? false // mặc định là không có static file
  config.express.cookie = config.express.cookie ?? "superSecretKey"

  // cấu hình port của server
  config.port = config.port ?? false // mặc định là không chạy server

  // sự kiện khi server chạy
  config.onListen = config.onListen ?? (() => {
    console.log(`Server is running on port ${config.port}`)
  })

  // tạo server
  var serverCtrl = {
    express,
    app: express(),
    cookieParser: rawCookies => cookieParser.signedCookies(cookie.parse(rawCookies), config.express.cookie),
  }

  // cấu hình của express
  // sử dụng json
  if (config.express.json) {
    serverCtrl.app.use(express.json())
  }
  // sử dụng cors
  serverCtrl.app.use(cors(config.express.cors))
  // sử dụng static file
  if (config.express.static) {
    serverCtrl.app.use(express.static(config.express.static))
  }

  // kiểm tra nếu req gửi lên chưa có cookie thì tạo cookie và gửi về cho người dùng
  if (config.express.cookie !== false) {
    let refIdSs = 0
    serverCtrl.app.use(cookieParser(config.express.cookie))
    serverCtrl.app.use((req, res, next) => {
      const ssid = req.signedCookies.SSID; // Đọc cookie đã ký
      if (!ssid) {
        res.cookie("SSID", encode(++refIdSs), {
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
  serverCtrl.http = createServer(serverCtrl.app)
  if (config.socket) {
    serverCtrl.io = new Server(serverCtrl.http, typeof config.socket === 'object' ? config.socket : undefined)
  }

  // trả về server
  if (config.port) {
    serverCtrl.http.listen(config.port, config.onListen)
  }
  return serverCtrl
}