import { ilog } from './ilog.mjs'

import lang_vi from '#storage/lang/vi.mjs'
import CONST_LANG from '#storage/lang/const.mjs'

const lang_pre = {
  vi: lang_vi
}

var dev_mode = 0

export function config(is_dev_mode) {
  dev_mode = is_dev_mode
}

function debug_log(...params) {
  if (dev_mode) {
    ilog('modun_lang', 'error', ...params)
  }
  return false
}

export default {
  /* các text_code mặc định */
  ...CONST_LANG,

  /* hàm trả về giá trị */
  get(text_code, lang = 'vi') {
    if (typeof text_code === 'object') {
      if (text_code.text_code) {
        if (lang_pre[lang][text_code.text_code]) {
          if (typeof lang_pre[lang][text_code.text_code] === 'function') {
            if (text_code.params && text_code.params.length > 0) {
              /* Trả dữ liệu cho hàm xử lý function */
              return lang_pre[lang][text_code.text_code](...text_code.params)
            } else {
              return debug_log('Dữ liệu vào không hợp lệ', text_code)
            }
          } else {
            /* Trả dữ liệu cho hàm xử lý text_code */
            return lang_pre[lang][text_code.text_code]
          }
        } else {
          return debug_log('Hàm chưa hỗ trợ xử lý ngôn ngữ', lang, text_code)
        }
      } else {
        return debug_log('Dữ liệu vào không hợp lệ', text_code)
      }
    } else if (typeof text_code === 'string') {
      if (lang_pre[lang][text_code]) {
        if (typeof lang_pre[lang][text_code] === 'function') {
          return debug_log('Hàm cần dữ liệu vào là object để xử lý', text_code)
        } else {
          /* Trả dữ liệu cho hàm xử lý text_code */
          return lang_pre[lang][text_code]
        }
      } else {
        return debug_log('Hàm chưa hỗ trợ xử lý ngôn ngữ', lang, text_code)
      }
    } else {
      return debug_log('Dữ liệu vào không hợp lệ', text_code)
    }
  },

  setup(text_code, ...params) {
    return {
      text_code,
      params
    }
  },
}