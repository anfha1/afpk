import { generateString } from './app.mjs'
import pkg from 'crypto-js';
const { AES, enc } = pkg;

export function encode(s1, sall='') {
  if (typeof s1 === 'number') {
    s1 = 'i' + s1
  } else if (typeof s1 === 'object') {
    s1 = 'o' + JSON.stringify(s1)
  } else {
    s1 = 's' + s1
  }

  if (sall.length > 0) {
    // mã hóa với muối
    s1 = AES.encrypt(s1, sall).toString()
  } else {
    // mã hóa không muối
    sall = generateString(10)
    s1 = sall + AES.encrypt(s1, sall).toString()
  }

  return Buffer.from(s1).toString('base64')
}

export function decode(s1, sall='') {
  s1 = Buffer.from(s1, 'base64').toString()
  if (s1.length > 0) {
    if (sall.length > 0) {
      // mã hóa với muối
      s1 = AES.decrypt(s1, sall).toString(enc.Utf8)
    } else {
      // mã hóa không muối
      if (s1.length > 10) {
        s1 = AES.decrypt(s1.slice(10), s1.slice(0, 10)).toString(enc.Utf8)
      }
    }
  }

  switch (s1.slice(0, 1)) {
    case 'i': {
      s1 = Number(s1.slice(1))
      break
    }

    case 'o': {
      s1 = JSON.parse(s1.slice(1))
      break
    }

    default: {
      s1 = s1.slice(1)
      break
    }
  }
  
  return s1
}