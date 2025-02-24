import { z } from 'zod'

// username chỉ chứa chữ cái và số -_ dấu "." không được chứa khoảng trắng chuyển tất cả về chữ thường
export const usernameValidate = (username) => {
  const schema = z.string()
    .min(5, { message: 'Tên đăng nhập phải có ít nhất 5 ký tự' })
    .max(20, { message: 'Tên đăng nhập phải có tối đa 15 ký tự' })
    .regex(/^[a-z0-9_\.\-]+$/, { message: 'Tên đăng nhập chỉ chứa chữ cái, số, dấu gạch ngang, dấu gạch dưới và dấu chấm không được chứa khoảng trắng' })

  return schema.safeParse(username.toLowerCase())
}

/*
  // cách sử dụng
  // Trường hợp hợp lệ
  const result1 = usernameValidate("John.Doe")
  if (result1.success) {
    console.log("Username hợp lệ:", result1.data)  // Output: "john.doe"
  } else {
    console.log("Lỗi:", result1.error)
  }

  // Trường hợp không hợp lệ (quá ngắn)
  const result2 = usernameValidate("jo")
  if (!result2.success) {
    console.log("Lỗi:", result2.error)  // Output: "Tên đăng nhập phải có ít nhất 5 ký tự"
  }

  // Trường hợp không hợp lệ (ký tự không hợp lệ)
  const result3 = usernameValidate("john@doe")
  if (!result3.success) {
    console.log("Lỗi:", result3.error)  // Output: Lỗi về regex
  }
*/

// password cần 8 ký tự trở lên, phân biệt hoa thường còn lại thì như username
export const passwordValidate = (password) => {
  const schema = z.string()
    .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
    .max(20, { message: 'Mật khẩu phải có tối đa 20 ký tự' })
    .regex(/^[a-zA-Z0-9_\.\-]+$/, { message: 'Mật khẩu chỉ chứa chữ cái, số, dấu gạch ngang, dấu gạch dưới và dấu chấm không được chứa khoảng trắng' })

  return schema.safeParse(password)
}