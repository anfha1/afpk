import { writeFileSync } from 'fs';
import afCommonMin from 'af-common-min'
// Handle case where afCommonMin might be undefined or not have DateTime
const { DateTime } = afCommonMin || {}

var logs = []
var isRun = 0
var change = 0
var pathFolderSave = ''
var fileName = `log_${DateTime.now().toFormat('yyyy_MM_dd HH_mm_ss')}.json`;

function saveLog() {
  change = 0

  // tiến hành ghi file
  if (pathFolderSave) {
    writeFileSync(`${pathFolderSave}/${fileName}`, JSON.stringify(logs))
  }

  if (change) {
    setTimeout(saveLog, 1000)
  } else {
    isRun = 0
  }
}

export function config(pathFolderSaveParam) {
  if (pathFolderSaveParam) {
    pathFolderSave = pathFolderSaveParam
  }
}

export function ilog_read(date_time, project, type, ...log) {
  // hiện log ra console
  console[type](`[${DateTime.fromISO(date_time).toFormat('dd/MM/yyyy HH:mm:ss')}][${project}][${type}]:`, ...log)
}

export function ilog(project, type, ...log) {
  let now = DateTime.now()

  // hiện log ra console
  console[type](`[${now.toFormat('HH:mm:ss')}][${project}][${type}]:`, ...log)

  // thêm log vào biến để lưu trữ vào file
  if (pathFolderSave) {
    logs.push([now.toISO(), project, type, ...log])

    // kiểm tra yêu cầu lưu
    change = 1
    if (!isRun) {
      isRun = 1
      setTimeout(saveLog, 1000)
    }
  }
}