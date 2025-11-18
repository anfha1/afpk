# 📦 AFPK - AF-Tech Package

**Package chứa các modun, helper, và validator dùng chung cho các dự án trong hệ sinh thái AF-Tech**

## 📋 Mục Lục

- [Giới Thiệu](#giới-thiệu)
- [Tính Năng](#tính-năng)
- [Cài Đặt](#cài-đặt)
- [Sử Dụng](#sử-dụng)
- [Cấu Trúc](#cấu-trúc)
- [API Documentation](#api-documentation)
- [Thông Số Kỹ Thuật](#thông-số-kỹ-thuật)

## 🎯 Giới Thiệu

AFPK là package core cung cấp các chức năng dùng chung cho cả frontend và backend:
- Helper functions (crypt, time, file, config, object, array)
- Validators
- Modules (CronJob, Device, EOn, Interact, Queue, Wait)
- Libraries (Google, Server, SQLite)

## ✨ Tính Năng

- ✅ Helper functions cho các thao tác thường dùng
- ✅ Validators cho validation dữ liệu
- ✅ Modules cho các chức năng nâng cao
- ✅ Libraries tích hợp (Google APIs, Server utilities, SQLite)
- ✅ Hỗ trợ cả frontend và backend

## 📦 Cài Đặt

### NPM Link (Development)

```bash
# Trong thư mục afpk
npm link

# Trong các dự án khác
npm link afpk
```

### Package Manager

```bash
pnpm add afpk
# hoặc
npm install afpk
```

## 🛠️ Sử Dụng

### Import Helper

```javascript
import afpk from 'afpk'
// hoặc
import { crypt, time, file, config } from 'afpk/helper'
```

### Import Validator

```javascript
import validator from 'afpk/validator'
```

### Import Modules

```javascript
import { CronJob, Device, EOn, Interact, Queue, Wait } from 'afpk/modun'
```

### Import Libraries

```javascript
import { Google, Server, SQLite } from 'afpk/lib'
```

## 📁 Cấu Trúc

```
afpk/
├── helper/           # Helper functions
│   ├── crypt.mjs     # Mã hóa/giải mã
│   ├── time.mjs      # Xử lý thời gian
│   ├── file.mjs      # Xử lý file
│   ├── config.mjs    # Cấu hình
│   ├── obj.mjs       # Object utilities
│   └── index.mjs     # Export tất cả
├── validator/        # Validators
│   └── index.mjs
├── modun/            # Modules
│   ├── CronJob.mjs   # Cron job scheduler
│   ├── Device.mjs   # Device management
│   ├── EOn.mjs       # Event handling
│   ├── Interact.mjs  # User interaction
│   ├── Queue.mjs     # Queue management
│   └── Wait.mjs      # Wait utilities
├── lib/              # Libraries
│   ├── google.mjs   # Google APIs
│   ├── server.mjs   # Server utilities
│   └── sqlite.mjs   # SQLite wrapper
└── package/          # Sub-packages
    ├── afpk-helper/  # Helper package
    ├── afpk-min/     # Minimal package
    └── afpk-validate/ # Validator package
```

## 📚 API Documentation

### Helper Functions

#### Crypt
- `encrypt(data, key)` - Mã hóa dữ liệu
- `decrypt(data, key)` - Giải mã dữ liệu

#### Time
- `format(date, format)` - Định dạng thời gian
- `parse(dateString)` - Parse chuỗi thời gian
- `now()` - Lấy thời gian hiện tại

#### File
- `read(path)` - Đọc file
- `write(path, data)` - Ghi file
- `exists(path)` - Kiểm tra file tồn tại

#### Config
- `get(key)` - Lấy giá trị config
- `set(key, value)` - Đặt giá trị config
- `load(path)` - Load config từ file

### Validators

- `validate(data, schema)` - Validate dữ liệu theo schema
- `validateEmail(email)` - Validate email
- `validateUrl(url)` - Validate URL

### Modules

#### CronJob
- `schedule(cron, callback)` - Lên lịch cron job

#### Device
- `register(deviceInfo)` - Đăng ký thiết bị
- `getDevice(id)` - Lấy thông tin thiết bị

#### Queue
- `add(task)` - Thêm task vào queue
- `process()` - Xử lý queue

## 🔧 Thông Số Kỹ Thuật

### Version
- **Current**: 2.2.7

### Dependencies

#### Core
- `express`: ^5.1.0 - Web framework
- `better-sqlite3`: ^12.4.1 - SQLite database
- `socket.io`: ^4.8.1 - WebSocket support
- `cors`: ^2.8.5 - CORS support
- `crypto-js`: ^4.2.0 - Cryptography
- `luxon`: ^3.7.2 - Date/time handling
- `zod`: ^4.1.12 - Schema validation

#### Optional
- `googleapis`: ^162.0.0 - Google APIs
- `fs-extra`: ^11.3.2 - File system utilities

### Exports

```javascript
{
  ".": "./index.js",
  "./validator": "./validator/index.mjs",
  "./helper": "./helper/index.mjs"
}
```

### Imports

```javascript
{
  "#helper/*.mjs": "./helper/*.mjs",
  "#lib/*.mjs": "./lib/*.mjs",
  "#modun/*.mjs": "./modun/*.mjs",
  "#storage/*.mjs": "./storage/*.mjs"
}
```

## 🔗 Liên Kết

- [AF-Tech Core](../af-tech-core/README.md) - Sử dụng afpk
- [AF-Tech UI](../af-tech-ui/README.md) - Sử dụng afpk helpers
- [VCTA Projects](../vcta-bible-core/README.md) - Sử dụng afpk-min

## 📝 Quy Hoạch Development

### Các Dự Án Lõi (5 bước)
1. **Dev**: Làm trên máy tính cá nhân, có thể tạo nhánh riêng theo nội dung tính năng
2. **Test**: Kiểm tra trên máy tính cá nhân sau khi dev
3. **Product test A**: Đưa lên máy chủ với dữ liệu test tự tạo - kiểm tra ứng dụng hoạt động đúng trên máy chủ
4. **Product test B**: Test trên máy chủ với dữ liệu clone từ dữ liệu thật
5. **Product**: Bản chính thức cho người dùng sử dụng

### Các Dự Án UI hoặc Package (3 bước)
1. **Dev**: Development
2. **Test**: Testing
3. **Product**: Production

## 📊 Cấu Hình Các Dự Án

### AF-Tech
- **afpk**: Package cung cấp các helper, validate dùng cho cả FE và BE
- **Platform**
  - UI: Port `7000`
  - Core: Port `10000`

### Harvard
- **LMS**
  - UI: Port `7200`
  - Core: Port `10200`

---

**Version:** 2.2.7  
**Author:** AF-Tech/@david  
**License:** AF-Tech  
**Last Updated:** 2024
