import { z } from 'zod'

// username chỉ chứa chữ cái và số -_ dấu "." không được chứa khoảng trắng chuyển tất cả về chữ thường
export function usernameValidate(username) {
  const schema = z.string()
    .min(5, { message: 'Tên đăng nhập phải có ít nhất 5 ký tự' })
    .max(20, { message: 'Tên đăng nhập phải có tối đa 15 ký tự' })
    .regex(/^[a-z0-9_\.\-]+$/, { message: 'Tên đăng nhập chỉ chứa chữ cái, số, dấu gạch ngang, dấu gạch dưới và dấu chấm không được chứa khoảng trắng' })

  return resResult(schema, username.toLowerCase())
}

// password cần 8 ký tự trở lên, phân biệt hoa thường còn lại thì như username
export function passwordValidate(password) {
  const schema = z.string()
    .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
    .max(20, { message: 'Mật khẩu phải có tối đa 20 ký tự' })
    .regex(/^[a-zA-Z0-9_\.\-]+$/, { message: 'Mật khẩu chỉ chứa chữ cái, số, dấu gạch ngang, dấu gạch dưới và dấu chấm không được chứa khoảng trắng' })

  return resResult(schema, password)
}

// validate số điện thoại gồm 10 chữ số bắt đầu bằng số 0
export function phoneValidate(phone) {
  const schema = z.string()
    .min(10, { message: 'Số điện thoại phải có 10 ký tự' })
    .max(10, { message: 'Số điện thoại phải có 10 ký tự' })
    .regex(/^[0-9]+$/, { message: 'Số điện thoại gồm 10 số bắt đầu bằng số 0' })

  return resResult(schema, phone)
}

// validate email
export function emailValidate(email) {
  const schema = z.string().email({ message: 'Email không hợp lệ' })
  return resResult(schema, email)
}

function resResult(schema, data) {
  let result = {
    success: false,
    error: '',
    data: '',
  }
  try {
    result.data = schema.parse(data)
    result.success = true;
  } catch (e) {
    if (e instanceof z.ZodError) {
      result.error = e.errors[0]?.message || 'Đã xảy ra lỗi không xác định';
    } else {
      result.error = 'Đã xảy ra lỗi không xác định';
    }
  }
  return result
}