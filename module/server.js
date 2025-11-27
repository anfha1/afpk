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
    this.service = {
      config: { ...DEFAULT_CONFIG },
      refIdSs: 0,
    }

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
    if (!this.service.config) {
      this.service.config = {}
    }

    // Socket configuration
    // true: enable with default config, false: disable, object: custom config
    if (this.service.config.socket === undefined) {
      this.service.config.socket = DEFAULT_CONFIG.socket
    }

    // Express configuration
    if (!this.service.config.express || typeof this.service.config.express !== 'object') {
      this.service.config.express = {}
    }
    this.service.config.express.json = this.service.config.express.json ?? DEFAULT_CONFIG.express.json
    this.service.config.express.cors = this.service.config.express.cors ?? DEFAULT_CONFIG.express.cors
    this.service.config.express.static = this.service.config.express.static ?? DEFAULT_CONFIG.express.static

    // Cookie configuration
    // Support backward compatibility: express.cookie = false to disable
    const cookieDisabled = this.service.config.express?.cookie === false

    if (!this.service.config.cookie || typeof this.service.config.cookie !== 'object') {
      this.service.config.cookie = {}
    }
    this.service.config.cookie.salt = this.service.config.cookie.salt ?? DEFAULT_CONFIG.cookie.salt

    // Check both new and old way to disable cookies
    if (cookieDisabled) {
      this.service.config.cookie.enabled = false
    } else {
      this.service.config.cookie.enabled = this.service.config.cookie.enabled ?? DEFAULT_CONFIG.cookie.enabled
    }

    // Port configuration
    this.service.config.port = this.service.config.port ?? DEFAULT_CONFIG.port

    // Event handlers
    if (!this.service.config.on || typeof this.service.config.on !== 'object') {
      this.service.config.on = {}
    }
    this.service.config.on.start = this.service.config.on.start ?? DEFAULT_CONFIG.on.start
  }

  /**
   * Start the server
   */
  start() {
    this.checkConfigServer()

    // Configure Express middleware
    this._setupExpressMiddleware()

    // Setup cookie handling
    if (this.service.config.cookie.enabled) {
      this._setupCookieMiddleware()
    }

    // Create HTTP server
    this.http = createServer(this.app)

    // Setup Socket.io if enabled
    if (this.service.config.socket) {
      const socketConfig = typeof this.service.config.socket === 'object'
        ? this.service.config.socket
        : undefined
      this.io = new Server(this.http, socketConfig)
    }

    // Start listening if port is configured
    if (this.service.config.port) {
      this.http.listen(this.service.config.port, this.service.config.on.start)
    }

    return this
  }

  /**
   * Setup Express middleware
   * @private
   */
  _setupExpressMiddleware() {
    // JSON parser
    if (this.service.config.express.json) {
      this.app.use(express.json())
    }

    // CORS
    this.app.use(cors(this.service.config.express.cors))

    // Static files
    if (this.service.config.express.static) {
      this.app.use(express.static(this.service.config.express.static))
    }
  }

  /**
   * Setup cookie middleware
   * @private
   */
  _setupCookieMiddleware() {
    // Initialize cookie parser with salt
    this.app.use(cookieParser(this.service.config.cookie.salt))

    // Middleware to create SSID cookie if not present
    this.app.use((req, res, next) => {
      const ssid = req.signedCookies?.SSID

      if (!ssid) {
        // Generate new SSID using crypt helper from af-common-min
        const ssidValue = helper.crypt.encode(++this.service.refIdSs)

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