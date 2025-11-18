import { readFileSync } from 'fs';

import { isObj } from './obj.mjs'
import flang from './flang.mjs'
import { ilog } from './ilog.mjs'

var lang = 'vi'

export function config(langUse) {
  if (langUse) {
    lang = langUse
  }
}

const ilogLang = (project, type, logLangPre, ...log) => {
  let logText = flang.get(logLangPre, lang)
  if (logText) {
    ilog(project, type, logText, ...log)
  } else {
    ilog(project, type, [logLangPre, lang], ...log)
  }
}

const f_log = {
  ...console,
  ilog,
  config,

  view(path_file) {
    let data = readFileSync(path_file, { encoding: 'utf8' })
    if (data && isObj(data)) {
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

/* Cấu hình các log thông thường là ilogLang */
f_log.log = (project, logLangPre, ...log) => {
  ilogLang(project, 'log', logLangPre, ...log)
}

f_log.warn = (project, logLangPre, ...log) => {
  ilogLang(project, 'warn', logLangPre, ...log)
}

f_log.error = (project, logLangPre, ...log) => {
  ilogLang(project, 'error', logLangPre, ...log)
}

export default f_log