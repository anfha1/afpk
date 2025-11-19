# 🔄 AF Crypt Integration vào AFPK

**Ngày hoàn thành:** 2024  
**Version:** `afpk-min@1.1.3`  
**Mục đích:** Tích hợp `af-crypt-min` vào `afpk` và bundle vào `afpk-min`

> **Lưu ý:** Xem [Migration Reports](../doc/MIGRATIONS.md) để biết tổng quan tất cả migrations.

---

## ✅ Đã Hoàn Thành

### 1. AFPK Package

#### Package.json
- ✅ Thêm `af-crypt-min@^1.0.0` vào dependencies

#### Helper Crypt
- ✅ `afpk/helper/crypt.mjs` - Updated để re-export từ `af-crypt-min` thay vì implement riêng
- ✅ Giữ nguyên API: `afpk.helper.crypt.encode()` và `afpk.helper.crypt.decode()`

#### Webpack Config
- ✅ `afpk/afpk.webpack.config.cjs` - Updated để bundle `af-crypt-min` vào `afpk-min`
- ✅ Sử dụng `allowlist: [/^af-crypt-min/]` trong `nodeExternals` để không externalize

### 2. Backend Projects

#### Package.json
- ✅ Xóa `af-crypt-min` khỏi dependencies của tất cả backend projects:
  - `af-tech-core`
  - `vcta-bible-core`
  - `vcta-song-core`
  - `vcta-news-core`
  - `vcta-client-app`

#### Code Updates
- ✅ `af-tech-core/core/encode.mjs` - Updated để dùng `this.helper.crypt` từ `afpk-min` thay vì import trực tiếp từ `af-crypt-min`

---

## 📋 Thay Đổi Chi Tiết

### AFPK Helper Crypt

**Trước:**
```javascript
// afpk/helper/crypt.mjs
import { generateString } from './app.mjs'
import pkg from 'crypto-js';
const { AES, enc } = pkg;

export default {
  encode(s1, sall = '') { ... },
  decode(s1, sall = '') { ... }
}
```

**Sau:**
```javascript
// afpk/helper/crypt.mjs
import { encode, decode } from 'af-crypt-min'

export default {
  encode,
  decode,
}

export { encode, decode }
```

### Backend - encode.mjs

**Trước:**
```javascript
import { encode, decode } from 'af-crypt-min'

export default {
  deviceToken(id) {
    return encode(id, SALL_DEVICE_TOKEN)
  },
}
```

**Sau:**
```javascript
export default {
  deviceToken(id) {
    return this.helper.crypt.encode(id, SALL_DEVICE_TOKEN)
  },
}
```

### Webpack Config

**Trước:**
```javascript
externals: [nodeExternals()],
```

**Sau:**
```javascript
externals: [
  nodeExternals({
    // Không externalize af-crypt-min, bundle nó vào
    allowlist: [/^af-crypt-min/]
  })
],
```

---

## 🔄 Build Process

### 1. Install Dependencies

```bash
cd afpk
pnpm install
```

### 2. Build afpk-min

```bash
cd afpk
pnpm run build:afpk
```

Khi build, `af-crypt-min` sẽ được bundle vào `afpk-min/index.js`, không cần install riêng.

### 3. Publish afpk-min

```bash
cd afpk/package/afpk-min
pnpm i
npm publish
```

**Lưu ý:** `afpk-min/package.json` không cần có `af-crypt-min` trong dependencies vì nó đã được bundle vào.

---

## 📊 Lợi Ích

1. **Đơn giản hóa dependencies:** Backend projects chỉ cần `afpk-min`, không cần `af-crypt-min` riêng
2. **Bảo mật:** `af-crypt-min` được bundle và obfuscate cùng với `afpk-min`
3. **Nhất quán:** Tất cả backend projects dùng cùng một cách truy cập crypt: `afpk.helper.crypt`
4. **Dễ maintain:** Chỉ cần update `afpk-min` là tất cả projects sẽ có crypt mới

---

## ⚠️ Lưu Ý

1. **Frontend vẫn dùng `af-crypt-min` riêng:** Frontend (`af-tech-ui`) vẫn cần `af-crypt-min` riêng vì không dùng `afpk-min`
2. **API giữ nguyên:** `afpk.helper.crypt.encode()` và `afpk.helper.crypt.decode()` giữ nguyên API
3. **Compatibility:** Encoded data từ frontend và backend vẫn tương thích với nhau

---

## 🧪 Testing Checklist

Sau khi build `afpk-min` mới:

- [ ] Test `afpk.helper.crypt.encode()` trong backend
- [ ] Test `afpk.helper.crypt.decode()` trong backend
- [ ] Test compatibility với frontend (encoded data có thể decode ở cả hai)
- [ ] Kiểm tra `afpk-min` bundle có chứa `af-crypt-min` code không

---

**Version:** 1.0.0  
**Status:** ✅ Hoàn thành

