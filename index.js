import path from "path"
import * as fs from 'fs'
import afCommonMin from "af-common-min"
import Database from 'better-sqlite3'

// Extract DateTime and cryptoJs from af-common-min default export
const { DateTime, cryptoJs } = afCommonMin

import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
import cookie from "cookie"
import { Server } from "socket.io"
import * as fsExtra from 'fs-extra'
import { createProxyMiddleware } from 'http-proxy-middleware'
// Temporarily remove UAParser to test if the issue is from UAParser
// ua-parser-js is CommonJS, externalize và load khi cần
// Externalize để tránh vấn đề với import.meta.url sau khi obfuscate
// let UAParserCache = null

// Lazy load UAParser when needed using dynamic import only
// async function loadUAParser() {
//   if (UAParserCache) return UAParserCache
//   
//   try {
//     // Use dynamic import only (works even when import.meta.url is undefined after obfuscation)
//     const UAParserModule = await import('ua-parser-js')
//     UAParserCache = UAParserModule.default || UAParserModule
//     return UAParserCache
//   } catch (err) {
//     console.warn('Failed to load UAParser:', err.message)
//     return null
//   }
// }

// Temporarily remove sqlite3 to test if the issue is from UAParser
// // Temporarily commented out sqlite3 to debug UAParser issue
// import sqlite3 from 'sqlite3'

import helper from './helper/index.mjs'
import server from './lib/server.mjs'

import modun from './modun/index.mjs'

// triển khai phiên bản v2 tự động nhúng
export default Object.assign(
  server, // Nhúng thư viện service
  {
    // thêm các package cần thiết
    fs, path,
    DateTime,
    Database,
    modun,

    // Export các thư viện từ af-common-min
    cryptoJs,

    // Export các thư viện khác
    express,
    cors,
    cookieParser,
    cookie,
    Server, // socket.io Server
    fsExtra,
    createProxyMiddleware, // http-proxy-middleware
    // Temporarily remove UAParser to test if the issue is from UAParser
    // // UAParser: lazy load getter to avoid import.meta.url issues after obfuscation
    // get UAParser() {
    //   // If already cached, return it
    //   if (UAParserCache) return UAParserCache
    //   
    //   // Start async load (non-blocking)
    //   loadUAParser().then(() => {}).catch(() => {})
    //   
    //   // Return null for now (will be available after async load)
    //   return null
    // },
    // // Also export async loader for explicit async usage
    // loadUAParser,
    // Temporarily remove sqlite3 to test if the issue is from UAParser
    // sqlite3,

    // Thêm các hàm trợ giúp
    helper,

    afpkBind(obj = this, exclude = [
      'express', 'fs', 'path', 'Database', 'DateTime', 'cors', 'cookieParser',
      'cookie', 'Server', 'fsExtra', 'createProxyMiddleware',
      // 'UAParser', // Temporarily removed
      // 'sqlite3', // Temporarily removed
      // 'cryptoJs', // Temporarily removed
      // 'DateTime', // Temporarily removed
      'afpkBind', 'msgDev', 'start', 'app', 'modun',
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