export function now() {
  return this.DateTime.local({ zone: "Asia/Bangkok" })
}

export function createDateTimeFromObj(timeObj) {
  return this.DateTime.fromObject(timeObj, { zone: "Asia/Bangkok" })
}

export function intToTime(timestamp) {
  return this.DateTime.fromMillis(timestamp)
}

export function iso(stringTime = '') {
  return this.DateTime.fromISO(stringTime)
}

// Export default để tương thích
export default {
  now,
  createDateTimeFromObj,
  intToTime,
  iso,
}