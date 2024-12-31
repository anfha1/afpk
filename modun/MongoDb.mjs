import { MongoClient } from 'mongodb'

import flog from "#helper/flog.mjs"
import flang from '#helper/flang.mjs'

import m_wait from "./Wait.mjs"

export default class {
  constructor(uri = 'mongodb://localhost:27017', options = {}) {
    this.wait = new m_wait()
    this.client = new MongoClient(uri, { ...options })
    this.wait.on(() => {
      this.client.on('close', (error) => {
        flog.error('db', flang.DISCONNECT_DB, error.message)
      });
    })
    this.connect()
  }

  on(cb) {
    this.wait.on(cb)
  }

  connect() {
    this.client.connect().then(() => {
      flog.log('db', flang.CONNECTED_DB)
      this.wait.done()
    }).catch((error) => {
      flog.error('db', flang.ERROR_CONNECT_DB, error.message)
    })
  }

  close(cb) {
    this.client.close().then(() => {
      flog.log('db', flang.DISCONNECTED_DB)
      if (cb && typeof cb === 'function') {
        this.wait.disconnect()
        cb()
      }
    }).catch((error) => {
      flog.error('db', flang.ERROR_DISCONNECT_DB, error.message)
    })
  }
}