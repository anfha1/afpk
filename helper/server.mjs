import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"

export function create(useSocket = true) {
  var serverCtrl = {
    express,
    app: express()
  }

  serverCtrl.http = createServer(serverCtrl.app)
  if (useSocket) {
    serverCtrl.io = new Server(serverCtrl.server, typeof useSocket === 'object' ? useSocket : undefined)
  }
  return serverCtrl
}