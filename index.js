/**
 * AFPK - AF-Tech Package
 * Main entry point for afpk package
 */

// Node.js built-in modules
import path from "path"
import * as fs from 'fs'

// Backend libraries
import express from 'express'
import cors from 'cors'
import cookie from 'cookie'
import cookieParser from 'cookie-parser'
import * as socketIo from 'socket.io'
import httpProxyMiddleware from 'http-proxy-middleware'

// Libraries from af-common-min
import { DateTime, luxon, CryptoJs } from 'af-common-min'
import initSqlJs from 'sql.js'

// Internal modules
import helper from './helper/index.js'
import module from './module/index.js'

// Named exports for direct imports
export { default as express } from 'express'
export { default as cors } from 'cors'
export { default as cookieParser } from 'cookie-parser'
export { default as cookie } from 'cookie'
export * as socketIo from 'socket.io'
export { default as httpProxyMiddleware } from 'http-proxy-middleware'

export { default as helper } from './helper/index.js'
export { default as module } from './module/index.js'

export { DateTime, luxon, CryptoJs } from 'af-common-min'
export { default as initSqlJs } from 'sql.js'

// Default export
export default {
  // Node.js built-in
  path,
  fs,

  // Backend libraries
  express,
  cors,
  cookieParser,
  cookie,
  socketIo,
  httpProxyMiddleware,

  // Libraries from af-common-min
  DateTime,
  luxon,
  CryptoJs,
  initSqlJs,

  // Internal modules
  helper,
  module,
}

// AFPK v2 implementation
export const afpkV2 = {
  dev: false,

  /**
   * Send log message if dev mode is enabled
   * @param {...any} msg - Messages to log
   */
  msgDev(...msg) {
    if (this.dev) {
      console.log(...msg)
    }
  }
}