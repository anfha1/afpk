import { readFileSync } from 'fs';

import { is_obj } from './obj.mjs'
import flang from './flang.mjs'
import { ilog } from './ilog.mjs'

var lang = 'vi'

export function config(langUse) {
  if (langUse) {
    lang = langUse
  }
}

const ilog_lang = (project, type, log_lang_pre, ...log) => {
  let log_text = flang.get(log_lang_pre, lang)
  if (log_text) {
    ilog(project, type, log_text, ...log)
  } else {
    ilog(project, type, [log_lang_pre, lang], ...log)
  }
}

const f_log = {
  ...console,
  ilog,

  view(path_file) {
    let data = readFileSync(path_file, { encoding: 'utf8' })
    if (data && is_obj(data)) {
      data = JSON.parse(data)
      if (Array.isArray(data)) {
        data.map(log => {
          ilog_read(...log)
        })
      } else {
        ilog('modun_log', 'error', flang.INVALID_INPUT_DATA)
      }
    } else {
      ilog('modun_log', 'error', flang.INVALID_INPUT_DATA)
    }
  },
}

/* Cấu hình các log thông thường là ilog_lang */
f_log.log = (project, log_lang_pre, ...log) => {
  ilog_lang(project, 'log', log_lang_pre, ...log)
}

f_log.warn = (project, log_lang_pre, ...log) => {
  ilog_lang(project, 'warn', log_lang_pre, ...log)
}

f_log.error = (project, log_lang_pre, ...log) => {
  ilog_lang(project, 'error', log_lang_pre, ...log)
}

export default f_log