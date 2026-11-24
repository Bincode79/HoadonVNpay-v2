# Tạo hóa đơn thanh toán VNPAY

Ứng dụng tạo mã QR thanh toán VietQR / Napas (VNPAY) và hóa đơn thanh toán trực tuyến cho các dịch vụ hàng không.

## Tính năng

- Tạo mã QR chuyển khoản ngân hàng theo chuẩn VietQR / Napas.
- Sinh hóa đơn thanh toán trực tuyến với thông tin hành khách, chuyến bay, vé.
- Hỗ trợ nhiều ngân hàng nội địa.
- In / lưu hóa đơn ra PDF (giao diện in A4 gọn 1 trang).
- Chạy được trên web (Vite dev server) và desktop (Electron).

## Công nghệ

- React + TypeScript + Vite
- Tailwind CSS
- Electron (đóng gói desktop)

## Phát triển

```bash
# Cài dependencies
npm install

# Chạy dev server (mặc định cổng 8080)
npm run dev
```

Mở trình duyệt tại `http://localhost:8080`.

### Tham số URL

- `?invoice=1` hoặc `?view=invoice`: mở thẳng màn hình hóa đơn.
- `?bank=<mã ngân hàng>`: mã ngân hàng (ví dụ `VCB`).
- `?acc=<số tài khoản>`: số tài khoản nhận.
- `?name=<tên tài khoản>`: tên chủ tài khoản.
- `?amount=<số tiền>`: số tiền (VNĐ).
- `?msg=<nội dung>`: nội dung chuyển khoản.
- `?flight=<số hiệu>`: số hiệu chuyến bay.
- `?route=<tuyến>`: tuyến bay (ví dụ `SGN-HAN`).
- `?date=<YYYY-MM-DD>`: ngày bay.
- `?time=<HH:mm>`: giờ bay.
- `?seat=<hạng vé>`: hạng vé (mặc định `Economy`).
- `?qty=<số lượng>`: số lượng vé.

## Build

```bash
# Build web
npm run build

# Build bản Electron portable (Windows x64)
npm run electron:build:portable
```

Xem `HUONG-DAN-PHAT-HANH.md` để biết cách đóng gói và phát hành.

## Cấu trúc

```
src/
  components/      # Các component giao diện (QRGenerator, QRResult, AirlineInvoice, ...)
  data/            # Dữ liệu ngân hàng
  lib/             # Hàm tiện ích
  assets/          # Logo, ảnh
  pages/           # Trang
```