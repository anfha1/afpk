# Hàm hỗ trợ server

* Cú pháp

```javascript
import { server } from "afpk"
```

## Khởi tạo server cơ bản

* Cú pháp

```javascript
var { express, http, app, io } = server.create({})

const PORT = process.env.PORT || 4000
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

* Mặc định máy chủ tạo ra sẽ dùng socket.io nếu không muốn dùng socket.io thì truyền vào hàm giá trị `false`
* Nếu muốn cấu hình socket.io nâng cao thì truyền vào config của socket.io
* Đầu ra của hàm là Object
  * `express` là thư viện express
  * `app` là hàm `express()`
  * `http` là hàm `createServer` của `http`
  * `io` là hàm `new Server(server, useSocket)`