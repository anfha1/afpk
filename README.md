# 📦 AFPK - AF-Tech Package

**Package chứa các modun, helper, và validator dùng chung**

## 🚀 Quick Start

### Installation

```bash
# Development (npm link)
cd afpk && npm link
cd ../[project] && npm link afpk

# Production
pnpm add afpk
```

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
