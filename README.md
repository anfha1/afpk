# 📦 AFPK - AF-Tech Package

**Version:** 1.1.5

Package chứa các module và helper dùng chung cho backend projects.

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
- **Production**: Dùng `afpk-min@^1.1.5` để bảo mật code (đã obfuscate)
- `afpk-min` có cùng API với `afpk`, chỉ khác là code đã được obfuscate
- **afpk-min đã bundle af-common-min@^1.0.6** - Backend chỉ cần `afpk-min`, không cần `af-common-min` riêng
- ⚠️ **Breaking change v1.1.5**: Server module đã được refactor thành class-based. Sử dụng `server.config` thay vì `server.service.config`
- ⚠️ **Breaking change v1.0.5**: `encodeE2E`/`decodeE2E` đã được loại bỏ từ af-common-min, sử dụng `encodeAdvanced`/`decodeAdvanced` thay thế
- **Cấu trúc namespace:** 
  - Modules trong `module` namespace (ví dụ: `afpk.module.Server`)
  - Helper functions trong `helper` namespace (ví dụ: `afpk.helper.crypt`, `afpk.helper.createFolder`)
  - Modules từ af-common-min: `Queue`, `Wait`, `EOn`, `CronJob`, etc. (re-export trong `afpk.module`)

## 📋 Usage

### Cách Sử Dụng Cơ Bản

**Tất cả đều truy cập qua default export:**

```javascript
import afpk from 'afpk'
// hoặc
import afpk from 'afpk-min'

// Helper functions
afpk.helper.crypt.encode(data, salt)
afpk.helper.createFolder('./logs')

// Modules
const { Server, Queue, Wait } = afpk.module

// Backend libraries
const app = afpk.express()

// Libraries từ af-common-min
const now = afpk.DateTime.local({ zone: "Asia/Bangkok" })
const hash = afpk.CryptoJs.MD5("test").toString()
```

### Import Default (Recommended)

```javascript
import afpk from 'afpk'
// hoặc
import afpk from 'afpk-min'

// Tất cả exports có sẵn trong default export
const { helper, module } = afpk

// Backend libraries
const { express, cors, cookieParser, cookie, socketIo, httpProxyMiddleware, fs, path } = afpk

// Libraries từ af-common-min
const { DateTime, luxon, CryptoJs, initSqlJs } = afpk
```

### Sử Dụng Helper Functions

```javascript
import afpk from 'afpk'

// Crypt functions (từ af-common-min)
const encoded = afpk.helper.crypt.encode(data, salt)
const decoded = afpk.helper.crypt.decode(encodedData, salt)

// Time helper (từ af-common-min) - trực tiếp trong helper
const now = afpk.helper.now() // Trả về DateTime object

// Helper functions native afpk
afpk.helper.createFolder('./logs') // Tạo thư mục (recursive)
const config = afpk.helper.getEnvParam({}) // Parse env params từ command line

// afpkBind helper (native afpk)
afpk.helper.afpkBind(obj) // Bind context cho object methods
```

### Sử Dụng Modules

```javascript
import afpk from 'afpk'

// Modules từ af-common-min (re-export trong afpk.module)
const { Queue, Wait, EOn, CronJob } = afpk.module
const queue = new Queue(2) // max 2 tasks đồng thời
const wait = new Wait()

// Modules native afpk
const { Server } = afpk.module

// Server module
const server = new Server()
server.config.port = 3000
server.start()
```

### Modules Native AFPK

#### Server Module
```javascript
import afpk from 'afpk'
const { Server } = afpk.module

// Tạo server instance
const server = new Server()

// Cấu hình (có thể set trước hoặc sau khi tạo instance)
server.config = {
  port: 3000,
  socket: true, // Enable Socket.io (true = default, false = disable, object = custom config)
  express: {
    json: true, // Enable JSON parser
    cors: {}, // CORS config (empty = default)
    static: './public' // Static files folder (false = disabled)
  },
  cookie: {
    salt: 'your-secret-key', // Cookie signing salt
    enabled: true // Enable cookie parser
  },
  on: {
    start: () => console.log('Server started on port 3000')
  }
}

// Hoặc cấu hình từng phần
server.config.port = 3000
server.config.express.static = './public'
server.config.express.cookie = false // Disable cookies (backward compatible)

// Khởi động server (tự động gọi checkConfigServer và setup middleware)
server.start()

// Sử dụng Express app
server.app.get('/api', (req, res) => {
  res.json({ message: 'Hello' })
})

// Sử dụng Socket.io (nếu socket: true)
if (server.io) {
  server.io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)
  })
}

// Parse cookies từ raw cookie string
const cookies = server.cookie.parse(req.headers.cookie)
// Hỗ trợ signed cookies (format: s:value.signature)
```

## 🔧 Thông Số Kỹ Thuật

- **Version**: 1.1.5
- **Type**: ES Modules
- **License**: AF-Tech
- **afpk-min**: Externalize dependencies, chỉ bundle code afpk

## 📦 Exported Libraries

AFPK export các thư viện sau để backend projects có thể sử dụng trực tiếp:

**Từ af-common-min:**
- `DateTime` - Date/time handling (luxon)
- `luxon` - Luxon library namespace
- `CryptoJs` - Cryptography library (crypto-js)

**From npm (externalized):**
- `initSqlJs` - SQL.js initialization function (in-memory SQLite)
- `express` - Web framework
- `cors` - CORS middleware
- `cookieParser` - Cookie parser middleware
- `cookie` - Cookie utility
- `socketIo` - Socket.io library (exported as namespace)
- `httpProxyMiddleware` - HTTP proxy middleware
- `fs` - Node.js file system module
- `path` - Node.js path utilities

```javascript
import afpk from 'afpk-min'

// Sử dụng các thư viện từ af-common-min
const now = afpk.DateTime.local({ zone: "Asia/Bangkok" })
const hash = afpk.CryptoJs.MD5("test").toString()

// Sử dụng SQL.js
const SQL = await afpk.initSqlJs()
const db = new SQL.Database()

// Sử dụng backend libraries
const app = afpk.express()
app.use(afpk.cors())
app.use(afpk.cookieParser('secret'))

// Sử dụng modules
const { Server } = afpk.module
const server = new Server()
```

## 📚 Tài Liệu Chi Tiết

Xem [Tài liệu đầy đủ](../doc/projects/afpk.md) để biết:
- API documentation chi tiết
- Helper functions (crypt, time, file, config, etc.)
- Modules và Libraries
- Exported libraries từ af-common-min
- Build và Development guide

**Xem thêm:**
- [AF Common Integration](AF_CRYPT_INTEGRATION.md) - Chi tiết tích hợp af-common-min
- [Migration Reports](../doc/MIGRATIONS.md) - Tổng hợp migrations
- [AFPK Test](../afpk-test/README.md) - Test project cho afpk và afpk-min

## 🔗 Liên Kết

- [AF-Tech Core](../af-tech-core/README.md)
- [Tài liệu hệ thống](../doc/README.md)

---

**Version:** 1.1.5  
**Author:** AF-Tech/@david  
**Last Updated:** 2025-11-27
