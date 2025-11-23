import afCommonMin from "af-common-min"
// Handle case where afCommonMin might be undefined or not have DateTime
const { DateTime } = afCommonMin || {}

export function now() {
  return DateTime.local({ zone: "Asia/Bangkok" })
}

export function createDateTimeFromObj(timeObj) {
  return DateTime.fromObject(timeObj, { zone: "Asia/Bangkok" })
}

export function intToTime(timestamp) {
  return DateTime.fromMillis(timestamp)
}

export function iso(stringTime = '') {
  return DateTime.fromISO(stringTime)
}

// Export default để tương thích
export default {
  now,
  createDateTimeFromObj,
  intToTime,
  iso,
}