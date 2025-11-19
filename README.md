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
- **Production**: Dùng `afpk-min` để bảo mật code (đã obfuscate)
- `afpk-min` có cùng API với `afpk`, chỉ khác là code đã được obfuscate

## 📋 Usage

### Import Helper

```javascript
import { crypt, time, file, config } from 'afpk/helper'
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

- **Version**: 2.2.7
- **Type**: ES Modules
- **License**: AF-Tech

## 📚 Tài Liệu Chi Tiết

Xem [Tài liệu đầy đủ](../doc/projects/afpk.md) để biết:
- API documentation
- Helper functions
- Validators
- Modules và Libraries

## 🔗 Liên Kết

- [AF-Tech Core](../af-tech-core/README.md)
- [Tài liệu hệ thống](../doc/README.md)

---

**Version:** 2.2.7  
**Author:** AF-Tech/@david  
**Last Updated:** 2024
