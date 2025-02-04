# Tool cho hệ thống lõi Af-Tech

## Cấu hình các dự án
- AF-Tech
  - afpk: Package cung cấp các helper, validate dùng cho cả FE và BE
  - Platform
    - Ui: `7000`
    - Core: `10000`
- Harvard
  - Lms
    - Ui: `7200`
    - Core: `10200`

## Quy hoạch dev
- Các dự án lõi thực hiện theo 5 bước:
  - Dev: Làm trên máy tính cá nhân, có thể tạo nhánh riêng theo nội dung tính năng
  - Test: Kiểm tra trên máy tính cá nhân sau khi dev
  - Product test A: Đưa lên máy chủ với dữ liệu test tự tạo mục đích là kiểm tra xem ứng dụng có hoạt động đúng trên máy chủ hay không
  - Product test B: Cũng test trên máy chủ nhưng dữ liệu được clone từ dữ liệu thật
  - Product: Bản chính thức cho người dùng sử dụng
- Các dự án UI hoặc package thì theo chỉ cần 3 bước vì nó chỉ lưu trữ chứ không 
  - Dev
  - Test
  - Product