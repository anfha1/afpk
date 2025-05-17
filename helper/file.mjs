export default {
  createFolder(path) {
    if (!this.fs.existsSync(path)) {
      this.fs.mkdirSync(path)
    }
  }
}
