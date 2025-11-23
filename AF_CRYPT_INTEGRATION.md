# 🔄 AF Common Integration vào AFPK

**Ngày hoàn thành:** 2024  
**Version:** `afpk-min@1.1.3`  
**Mục đích:** Tích hợp `af-common-min` vào `afpk` và bundle vào `afpk-min`

> **Lưu ý:** Tài liệu này đã được cập nhật. `afpk` hiện sử dụng `af-common-min` (đã gộp crypt và e2e) thay vì `af-crypt-min` riêng lẻ.

> **Lưu ý:** Xem [Migration Reports](../doc/MIGRATIONS.md) để biết tổng quan tất cả migrations.

---

## ✅ Đã Hoàn Thành

### 1. AFPK Package

#### Package.json
- ✅ Thêm `af-common-min` vào dependencies (thay thế `af-crypt-min`)

#### Helper Crypt
- ✅ `afpk/helper/crypt.mjs` - Updated để re-export từ `af-common-min` thay vì implement riêng
- ✅ Giữ nguyên API: `afpk.helper.crypt.encode()` và `afpk.helper.crypt.decode()`
- ✅ `afpk/modun/index.mjs` - Re-export Queue, Wait từ `af-common-min`
- ✅ `afpk/modun/Interact.mjs` - Re-export EOn từ `af-common-min`

#### Webpack Config
- ✅ `afpk/afpk.webpack.config.cjs` - Updated để bundle `af-common-min` vào `afpk-min`
- ✅ Sử dụng `allowlist: [/^af-common-min/]` trong `nodeExternals` để không externalize

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
import afCommonMin from 'af-common-min'
const { encode, decode } = afCommonMin.helper.crypt

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
    // Không externalize af-common-min, bundle nó vào
    allowlist: [/^af-common-min/]
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

Khi build, `af-common-min` sẽ được bundle vào `afpk-min/index.js`, không cần install riêng.

### 3. Publish afpk-min

```bash
cd afpk/package/afpk-min
pnpm i
npm publish
```

**Lưu ý:** `afpk-min/package.json` không cần có `af-common-min` trong dependencies vì nó đã được bundle vào.

---

## 📊 Lợi Ích

1. **Đơn giản hóa dependencies:** Backend projects chỉ cần `afpk-min`, không cần `af-common-min` riêng
2. **Bảo mật:** `af-common-min` được bundle và obfuscate cùng với `afpk-min`
3. **Nhất quán:** Tất cả backend projects dùng cùng một cách truy cập crypt: `afpk.helper.crypt`
4. **Dễ maintain:** Chỉ cần update `afpk-min` là tất cả projects sẽ có các modules mới từ `af-common-min`
5. **Tích hợp đầy đủ:** `af-common-min` bao gồm crypt, wait, queue, e2e và các modules khác

---

## ⚠️ Lưu Ý

1. **Frontend có thể dùng `af-common-min` trực tiếp:** Frontend (`af-tech-ui`) có thể dùng `af-common-min` trực tiếp hoặc qua relative path
2. **API giữ nguyên:** `afpk.helper.crypt.encode()` và `afpk.helper.crypt.decode()` giữ nguyên API
3. **Compatibility:** Encoded data từ frontend và backend vẫn tương thích với nhau
4. **E2E đã được gộp:** Tất cả các hàm E2E (encodeE2E, decodeE2E, etc.) đã được gộp vào `af-common-min/module/crypt.js`

---

## 📝 Module Status

### ✅ Đã migrate sang af-common-min@^1.0.2:
- **Crypt**: `afpk/helper/crypt.mjs` → Re-export từ `af-common-min.helper.crypt`
- **Queue**: `afpk/modun/index.mjs` → Re-export từ `af-common-min.module.Queue`
- **Wait**: `afpk/modun/index.mjs` → Re-export từ `af-common-min.module.Wait`
- **EOn**: `afpk/modun/Interact.mjs` → Import từ `af-common-min.module.EOn`

### ⚠️ Deprecated (giữ lại để backward compatibility):
- `afpk/modun/Wait.mjs` - Đã deprecated, sử dụng từ `af-common-min` qua `afpk/modun`
- `afpk/modun/Queue.mjs` - Đã deprecated, sử dụng từ `af-common-min` qua `afpk/modun`
- `afpk/modun/EOn.mjs` - Đã deprecated, sử dụng từ `af-common-min` trực tiếp

**Lưu ý:** Các file deprecated vẫn hoạt động nhưng nên migrate sang `af-common-min@^1.0.2` với cấu trúc namespace mới để đảm bảo tính nhất quán và nhận được các cập nhật mới nhất.

## 🧪 Testing Checklist

Sau khi build `afpk-min` mới:

- [x] Test `afpk.helper.crypt.encode()` trong backend
- [x] Test `afpk.helper.crypt.decode()` trong backend
- [x] Test compatibility với frontend (encoded data có thể decode ở cả hai)
- [x] Kiểm tra `afpk-min` bundle có chứa `af-common-min` code không
- [x] Test các modules khác từ af-common-min (Wait, Queue, EOn) trong afpk

---

**Version:** 1.0.0  
**Status:** ✅ Hoàn thành

