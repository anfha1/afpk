import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import cookie from 'cookie'
import cookieParser from 'cookie-parser'
import { helper } from 'af-common-min'

/**
 * Default configuration values
 */
const DEFAULT_CONFIG = {
  socket: true,
  express: {
    json: true,
    cors: {},
    static: false,
  },
  cookie: {
    salt: 'superSecretKey',
    enabled: true,
  },
  port: false,
  on: {
    start: false,
  },
}

export default class {
  constructor() {
    this.app = express()
    this.config = { ...DEFAULT_CONFIG }
    this.refIdSs = 0

    this.cookie = {
      /**
       * Parse cookies from raw cookie string
       * Handles signed cookies (format: s:value.signature)
       * @param {string} rawCookies - Raw cookie string from request headers
       * @returns {object} Parsed cookies object
       */
      parse(rawCookies) {
        try {
          const parsed = cookie.parse(rawCookies || '')
          const signedCookies = {}

          for (const [key, value] of Object.entries(parsed)) {
            if (value?.startsWith('s:')) {
              // Signed cookie format: s:value.signature
              const parts = value.substring(2).split('.')
              if (parts.length === 2) {
                signedCookies[key] = parts[0]
              }
            } else {
              signedCookies[key] = value
            }
          }

          return signedCookies
        } catch (error) {
          return {}
        }
      }
    }
  }

  /**
   * Validate and set default configuration
   */
  checkConfigServer() {
    // Ensure config object exists
    if (!this.config) {
      this.config = {}
    }

    // Socket configuration
    // true: enable with default config, false: disable, object: custom config
    if (this.config.socket === undefined) {
      this.config.socket = DEFAULT_CONFIG.socket
    }

    // Express configuration
    if (!this.config.express || typeof this.config.express !== 'object') {
      this.config.express = {}
    }
    this.config.express.json = this.config.express.json ?? DEFAULT_CONFIG.express.json
    this.config.express.cors = this.config.express.cors ?? DEFAULT_CONFIG.express.cors
    this.config.express.static = this.config.express.static ?? DEFAULT_CONFIG.express.static

    // Cookie configuration
    // Support backward compatibility: express.cookie = false to disable
    const cookieDisabled = this.config.express?.cookie === false

    if (!this.config.cookie || typeof this.config.cookie !== 'object') {
      this.config.cookie = {}
    }
    this.config.cookie.salt = this.config.cookie.salt ?? DEFAULT_CONFIG.cookie.salt

    // Check both new and old way to disable cookies
    if (cookieDisabled) {
      this.config.cookie.enabled = false
    } else {
      this.config.cookie.enabled = this.config.cookie.enabled ?? DEFAULT_CONFIG.cookie.enabled
    }

    // Port configuration
    this.config.port = this.config.port ?? DEFAULT_CONFIG.port

    // Event handlers
    if (!this.config.on || typeof this.config.on !== 'object') {
      this.config.on = {}
    }
    this.config.on.start = this.config.on.start ?? DEFAULT_CONFIG.on.start
  }

  /**
   * Start the server
   */
  start() {
    this.checkConfigServer()

    // Configure Express middleware
    this._setupExpressMiddleware()

    // Setup cookie handling
    if (this.config.cookie.enabled) {
      this._setupCookieMiddleware()
    }

    // Create HTTP server
    this.http = createServer(this.app)

    // Setup Socket.io if enabled
    if (this.config.socket) {
      const socketConfig = typeof this.config.socket === 'object'
        ? this.config.socket
        : undefined
      this.io = new Server(this.http, socketConfig)
    }

    // Start listening if port is configured
    if (this.config.port) {
      this.http.listen(this.config.port, this.config.on.start)
    }

    return this
  }

  /**
   * Setup Express middleware
   * @private
   */
  _setupExpressMiddleware() {
    // JSON parser
    if (this.config.express.json) {
      this.app.use(express.json())
    }

    // CORS
    this.app.use(cors(this.config.express.cors))

    // Static files
    if (this.config.express.static) {
      this.app.use(express.static(this.config.express.static))
    }
  }

  /**
   * Setup cookie middleware
   * @private
   */
  _setupCookieMiddleware() {
    // Initialize cookie parser with salt
    this.app.use(cookieParser(this.config.cookie.salt))

    // Middleware to create SSID cookie if not present
    this.app.use((req, res, next) => {
      const ssid = req.signedCookies?.SSID

      if (!ssid) {
        // Generate new SSID using crypt helper from af-common-min
        const ssidValue = helper.crypt.encode(++this.refIdSs)

        res.cookie('SSID', ssidValue, {
          httpOnly: true,
          signed: true,
          secure: false, // Set to true in production with HTTPS
          sameSite: 'Strict'
        })
      }

      next()
    })
  }
}