/**
 * AFPK Helper Functions
 * Re-exports helpers from af-common-min and native afpk helpers
 */

import { helper } from "af-common-min"
import { createFolder } from './file.js'
import { getEnvParam } from './config.js'

/**
 * Bind context for object methods recursively
 * @param {object} obj - Object to bind
 * @param {string[]} exclude - Keys to exclude from binding
 * @param {object} root - Root context for binding
 * @returns {object} Bound object
 */
function afpkBind(obj, exclude = [
  'express', 'fs', 'path', 'DateTime', 'cors', 'cookieParser',
  'cookie', 'Server', 'afpkBind', 'msgDev', 'start', 'app', 'module',
], root = obj) {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key) || exclude.includes(key)) {
      continue
    }

    const val = obj[key]

    if (typeof val === 'function') {
      obj[key] = val.bind(root)
    } else if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      afpkBind(val, [], root)
    }
  }
  return obj
}

export default {
  ...helper,
  createFolder,
  getEnvParam,
  afpkBind,
}