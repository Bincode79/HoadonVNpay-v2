# Hướng dẫn phát hành **Tạo hóa đơn thanh toán Vnpay** cho máy khác

## Tổng quan dự án
- **Tên:** Tạo hóa đơn thanh toán Vnpay
- **Công nghệ:** Electron + React + Vite + TypeScript
- **Chức năng:** Tạo mã QR thanh toán VietQR / Napas (VNPAY)

---

## Cách 1: Bản portable (khuyến nghị – gửi zip)

Dùng khi bạn muốn gửi file zip, người nhận giải nén và chạy **không cần cài đặt**.

### Bước 1: Build bản portable
Trong thư mục dự án chạy:
```bash
npm run electron:build:portable
```

### Bước 2: Lấy thư mục đã build
- Sau khi chạy xong, mở thư mục **`release/win-unpacked/`**
- Trong đó có file **`Tạo hóa đơn thanh toán Vnpay.exe`** và đầy đủ file/dll cần thiết

### Bước 3: Nén và gửi
- Nén **toàn bộ** thư mục `release/win-unpacked` thành file **.zip**
- Gửi file zip cho người dùng

### Bước 4: Hướng dẫn người nhận
- Giải nén file zip vào thư mục (ví dụ: `C:\Apps\VietQR Generator\`)
- Chạy file **`Tạo hóa đơn thanh toán Vnpay.exe`**
- Nếu Windows báo cảnh báo (SmartScreen): chọn "Thêm thông tin" → "Chạy dù vậy" (do app chưa ký số)

---

## Cách 2: Bản cài đặt (file .exe installer)

Dùng khi bạn muốn người dùng cài đặt như phần mềm thông thường.

### Build
```bash
npm run electron:build
```

### Kết quả
- File cài đặt nằm trong **`release/`**, dạng: **`Tạo hóa đơn thanh toán Vnpay 1.0.0.exe`** (hoặc tương tự)
- Gửi file .exe này; người dùng chạy và làm theo trình cài đặt

---

## Lưu ý khi phát hành
| Vấn đề | Cách xử lý |
|--------|------------|
| Thiếu VC++ Runtime | Máy chưa cài có thể báo lỗi DLL. Hướng dẫn cài [Microsoft Visual C++ Redistributable (x64)](https://aka.ms/vs/17/release/vc_redist.x64.exe). |
| Windows Defender / SmartScreen | App chưa ký số dễ bị cảnh báo. Người dùng cần chọn "Chạy dù vậy" hoặc thêm ngoại lệ. |
| Đường dẫn | Nên giải nén vào đường dẫn không dấu, không khoảng trắng (ví dụ: `C:\Apps\VietQR\`). |

---

## Yêu cầu hệ thống (người nhận)
- **Windows 10/11, 64-bit (x64)**
- Không bắt buộc cài Node.js hay công cụ lập trình
