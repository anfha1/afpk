export default {
  now() {
    return this.DateTime.local({ zone: "Asia/Bangkok" })
  },

  createDateTimeFromObj(timeObj) {
    return this.DateTime.fromObject(timeObj, { zone: "Asia/Bangkok" })
  },

  intToTime(timestamp) {
    return this.DateTime.fromMillis(timestamp)
  },

  iso(stringTime = '') {
    return this.DateTime.fromISO(stringTime)
  }
}