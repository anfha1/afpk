import { DateTime } from "luxon"

// cách lấy timestamp .toMillis()
export function now() {
  return DateTime.local({ zone: "Asia/Bangkok" })
}

export function createDateTimeFromObj(timeObj) {
  return DateTime.fromObject(timeObj, { zone: "Asia/Bangkok" })
}

export function intToTime(timestamp) {
  return DateTime.fromMillis(timestamp)
}

export function ISO(stringTime) {
  return DateTime.fromISO(stringTime)
}