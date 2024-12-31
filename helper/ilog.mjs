import { writeFileSync } from 'fs';
import { DateTime } from 'luxon'

var logs = []
var is_run = 0
var change = 0
var pathFolderSave = ''
var file_name = `log_${ DateTime.now().toFormat('yyyy_MM_dd HH_mm_ss') }.json`;

function save_log() {
  change = 0

  // tiến hành ghi file
  if (pathFolderSave) {
    writeFileSync(`${ pathFolderSave }/${ file_name }`, JSON.stringify(logs))
  }

  if (change) {
    setTimeout(save_log, 1000)
  } else {
    is_run = 0
  }
}

export function config(path_folder_save) {
  if (path_folder_save) {
    pathFolderSave = path_folder_save
  }
}

export function ilog_read(date_time, project, type, ...log) {
  // hiện log ra console
  console[type](`[${ DateTime.fromISO(date_time).toFormat('dd/MM/yyyy HH:mm:ss') }][${ project }][${ type }]:`, ...log)
}

export function ilog(project, type, ...log) {
  let now = DateTime.now()

  // hiện log ra console
  console[type](`[${ now.toFormat('HH:mm:ss') }][${ project }][${ type }]:`, ...log)

  // thêm log vào biến để lưu trữ vào file
  if (pathFolderSave) {
    logs.push([ now.toISO(), project, type, ...log ])

    // kiểm tra yêu cầu lưu
    change = 1
    if (!is_run) {
      is_run = 1
      setTimeout(save_log, 1000)
    }
  }
}