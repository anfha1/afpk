import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"

export function create(useSocket = true, options = {}) {
  var serverCtrl = {
    express,
    app: express()
  }

  let paramsCross = typeof options.crossOrigin === Object ? options.crossOrigin : [options.crossOrigin] || []

  if (options.json) {
    serverCtrl.app.use(express.json())
  }
  serverCtrl.app.use(cors(...paramsCross))

  serverCtrl.http = createServer(serverCtrl.app)
  if (useSocket) {
    serverCtrl.io = new Server(serverCtrl.http, typeof useSocket === 'object' ? useSocket : undefined)
  }
  return serverCtrl
}