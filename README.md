# 📦 AFPK - AF-Tech Package

**Package chứa các modun và helper dùng chung**

## 🚀 Quick Start

### Installation

**Development (Source Code):**
```bash
# NPM Link (để debug và phát triển)
cd afpk && npm link
cd ../[project] && npm link afpk

# Hoặc install từ npm
pnpm add afpk
```

**Production (Obfuscated - Recommended):**
```bash
# Sử dụng afpk-min (đã obfuscate để bảo mật)
pnpm add afpk-min
```

**Lưu ý:**
- **Development**: Dùng `afpk` hoặc `npm link afpk` để dễ debug
- **Production**: Dùng `afpk-min@^1.1.3` để bảo mật code (đã obfuscate)
- `afpk-min` có cùng API với `afpk`, chỉ khác là code đã được obfuscate
- **afpk-min đã bundle af-common-min@^1.0.2** - Backend chỉ cần `afpk-min`, không cần `af-common-min` riêng
- **Cấu trúc namespace:** Modules trong `module` namespace, crypt functions trong `helper.crypt` namespace

## 📋 Usage

### Import Helper

```javascript
import { crypt, time, file, config } from 'afpk/helper'

// Crypt functions (từ af-common-min đã bundle trong afpk-min)
afpk.helper.crypt.encode(data, salt)
afpk.helper.crypt.decode(encodedData, salt)
```


### Import Modules

```javascript
import { CronJob, Device, Queue, Wait } from 'afpk/modun'

// Queue và Wait được re-export từ af-common-min (đã bundle trong afpk-min)
const queue = new Queue(2) // max 2 tasks đồng thời
const wait = new Wait()
```

## 🔧 Thông Số Kỹ Thuật

- **Version**: 2.2.7 (afpk), 1.1.3 (afpk-min)
- **Type**: ES Modules
- **License**: AF-Tech
- **afpk-min**: Đã bundle `af-common-min` vào trong (bao gồm crypt, wait, queue, và các modules khác)

## 📦 Exported Libraries

AFPK export các thư viện sau để backend projects có thể sử dụng trực tiếp:

**Từ af-common-min:**
- `DateTime` - Date/time handling (luxon)
- `cryptoJs` - Cryptography library

**Backend libraries:**
- `express`, `cors`, `cookieParser`, `cookie` - Web framework & middleware
- `Server` - Socket.io Server
- `fsExtra` - File system utilities
- `createProxyMiddleware` - HTTP proxy
- `UAParser` - User agent parser
- `Database` - better-sqlite3 Database
- `sqlite3` - sqlite3 module

```javascript
import afpk from 'afpk-min'

// Sử dụng các thư viện
const now = afpk.DateTime.local({ zone: "Asia/Bangkok" })
const hash = afpk.cryptoJs.MD5("test").toString()
const db = new afpk.Database(':memory:')
const parser = new afpk.UAParser()
```

## 📚 Tài Liệu Chi Tiết

Xem [Tài liệu đầy đủ](../doc/projects/afpk.md) để biết:
- API documentation
- Helper functions (crypt, time, file, config, etc.)
- Modules và Libraries
- AF Crypt Integration

**Xem thêm:**
- [AF Common Integration](AF_CRYPT_INTEGRATION.md) - Chi tiết tích hợp af-common-min (đã cập nhật từ af-crypt)
- [Migration Reports](../doc/MIGRATIONS.md) - Tổng hợp migrations

## 🔗 Liên Kết

- [AF-Tech Core](../af-tech-core/README.md)
- [Tài liệu hệ thống](../doc/README.md)

---

**Version:** 2.2.7  
**Author:** AF-Tech/@david  
**Last Updated:** 2024
