import i_file from './vi/file.mjs'
import i_db from './vi/db.mjs'
import i_data from './vi/data.mjs'

export default {
  mc1: 'Dữ liệu đầu vào không hợp lệ',
  s1(port) {
    return `Máy chủ đang chạy trên cổng ${ port }`
  },

  ...i_file,
  ...i_db,
  ...i_data,
}