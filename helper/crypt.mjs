/**
 * Crypt Helper
 * 
 * Re-export từ af-common-min để sử dụng trong afpk
 * Khi build afpk-min, af-common-min sẽ được bundle vào
 */

import afCommonMin from 'af-common-min'
const { encode, decode } = afCommonMin.helper.crypt

// Re-export để giữ nguyên API cũ
export default {
  encode,
  decode,
}

// Export named để có thể import riêng
export { encode, decode }