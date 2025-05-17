import crypt from './crypt.mjs'
import time from './time.mjs'
import file from './file.mjs'

export * as objHelper from './obj.mjs'

export const arrHelper = {
  check2Array(array1, array2) {
    return array1.some(item => array2.includes(item))
  }
}

export default {
  crypt,
  time,
  file,
}