import { encode, decode } from './crypt.mjs'
export * as objHelper from './obj.mjs'

export const arrHelper = {
  check2Array(array1, array2) {
    return array1.some(item => array2.includes(item))
  }
}

export default function helper() {
  this.helper = {
    crypt: {
      encode,
      decode,
    },
  }
}