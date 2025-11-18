import { ilog } from './ilog.mjs'

import lang_vi from '#storage/lang/vi.mjs'
import CONST_LANG from '#storage/lang/const.mjs'

const langPre = {
  vi: lang_vi
}

var devMode = 0

export function config(isDevMode) {
  devMode = isDevMode
}

function debugLog(...params) {
  if (devMode) {
    ilog('modun_lang', 'error', ...params)
  }
  return false
}

export default {
  /* các text_code mặc định */
  ...CONST_LANG,
  config,

  /* hàm trả về giá trị */
  get(text_code, lang = 'vi') {
    if (typeof text_code === 'object') {
      if (text_code.text_code) {
        if (langPre[lang][text_code.text_code]) {
          if (typeof langPre[lang][text_code.text_code] === 'function') {
            if (text_code.params && text_code.params.length > 0) {
              /* Trả dữ liệu cho hàm xử lý function */
              return langPre[lang][text_code.text_code](...text_code.params)
            } else {
              return debugLog('Dữ liệu vào không hợp lệ', text_code)
            }
          } else {
            /* Trả dữ liệu cho hàm xử lý text_code */
            return langPre[lang][text_code.text_code]
          }
        } else {
          return debugLog('Hàm chưa hỗ trợ xử lý ngôn ngữ', lang, text_code)
        }
      } else {
        return debugLog('Dữ liệu vào không hợp lệ', text_code)
      }
    } else if (typeof text_code === 'string') {
      if (langPre[lang][text_code]) {
        if (typeof langPre[lang][text_code] === 'function') {
          return debugLog('Hàm cần dữ liệu vào là object để xử lý', text_code)
        } else {
          /* Trả dữ liệu cho hàm xử lý text_code */
          return langPre[lang][text_code]
        }
      } else {
        return debugLog('Hàm chưa hỗ trợ xử lý ngôn ngữ', lang, text_code)
      }
    } else {
      return debugLog('Dữ liệu vào không hợp lệ', text_code)
    }
  },

  setup(text_code, ...params) {
    return {
      text_code,
      params
    }
  },
}