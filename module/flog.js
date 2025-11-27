import { writeFileSync, readFileSync } from 'fs';
import afpk from 'af-common-min'

const { ILog } = afpk.module
const { isObject } = afpk.helper

export default class {
  constructor(config = {}) {
    this.pathFolderSave = config.pathFolderSave ?? ''
    this.timeSave = config.timeSave ?? 1000
    this.ilog = new ILog()
    this.ilogRead = new ILog({
      datetimeFormat: 'dd/MM/yyyy HH:mm:ss',
      runCallback: false,
    })

    // các thuộc tính riêng
    this.logs = []
    this.isRun = 0
    this.change = 0
    this.fileName = `log_${afpk.DateTime.now().toFormat('yyyy_MM_dd HH_mm_ss')}.json`

    this.ilog.functionRegisters.push((infoLog) => {
      // thêm log vào biến để lưu trữ vào file
      if (this.pathFolderSave) {
        infoLog.dateTime = infoLog.dateTime.toISO()
        this.logs.push(infoLog)

        // kiểm tra yêu cầu lưu
        this.change = 1
        if (!this.isRun) {
          this.isRun = 1
          setTimeout(this.saveLog, this.timeSave)
        }
      }
    })
  }

  saveLog() {
    this.change = 0

    // tiến hành ghi file
    if (this.pathFolderSave) {
      writeFileSync(`${this.pathFolderSave}/${this.fileName}`, JSON.stringify(this.logs))
    }

    if (this.change) {
      setTimeout(this.saveLog, this.timeSave)
    } else {
      this.isRun = 0
    }
  }

  log(module, ...logs) {
    this.ilog.log(module, logs)
  }

  warn(module, ...logs) {
    this.ilog.warn(module, logs)
  }

  error(module, ...logs) {
    this.ilog.error(module, logs)
  }

  view(nameFile) {
    let data = readFileSync(`${this.pathFolderSave}/${nameFile}`, { encoding: 'utf8' })
    if (data && isObject(data)) {
      data = JSON.parse(data)
      if (Array.isArray(data)) {
        data.map(infoLog => {
          this.ilogRead.logRaw(infoLog.module, infoLog.logs, infoLog.type, afpk.DateTime.fromISO(infoLog.dateTime))
        })
      }
    }
  }
}