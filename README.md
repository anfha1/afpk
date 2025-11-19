# 📦 AFPK - AF-Tech Package

**Package chứa các modun, helper, và validator dùng chung**

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
- **afpk-min đã bundle af-crypt-min** - Backend chỉ cần `afpk-min`, không cần `af-crypt-min` riêng

## 📋 Usage

### Import Helper

```javascript
import { crypt, time, file, config } from 'afpk/helper'

// Crypt functions (từ af-crypt-min đã bundle trong afpk-min)
afpk.helper.crypt.encode(data, salt)
afpk.helper.crypt.decode(encodedData, salt)
```

### Import Validator

```javascript
import validator from 'afpk/validator'
```

### Import Modules

```javascript
import { CronJob, Device, Queue } from 'afpk/modun'
```

## 🔧 Thông Số Kỹ Thuật

- **Version**: 2.2.7 (afpk), 1.1.3 (afpk-min)
- **Type**: ES Modules
- **License**: AF-Tech
- **afpk-min**: Đã bundle `af-crypt-min@^1.0.0` vào trong

## 📚 Tài Liệu Chi Tiết

Xem [Tài liệu đầy đủ](../doc/projects/afpk.md) để biết:
- API documentation
- Helper functions (crypt, time, file, config, etc.)
- Validators
- Modules và Libraries
- AF Crypt Integration

**Xem thêm:**
- [AF Crypt Integration](AF_CRYPT_INTEGRATION.md) - Chi tiết tích hợp af-crypt
- [Migration Reports](../doc/MIGRATIONS.md) - Tổng hợp migrations

## 🔗 Liên Kết

- [AF-Tech Core](../af-tech-core/README.md)
- [Tài liệu hệ thống](../doc/README.md)

---

**Version:** 2.2.7  
**Author:** AF-Tech/@david  
**Last Updated:** 2024
