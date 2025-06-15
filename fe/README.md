# Vivu-Viet

# ViVu Việt – Cơ sở dữ liệu MongoDB

Đây là cấu trúc cơ sở dữ liệu cho ứng dụng **ViVu Việt** – ứng dụng React Native giới thiệu danh lam thắng cảnh Việt Nam.

## 📁 Các Collection chính

### 1. `spots`
- Chứa danh sách danh lam thắng cảnh Việt Nam.
- Trường dữ liệu:
  - `_id`: ID của danh thắng (`spot001`, `spot002`...)
  - `name`: Tên danh lam thắng cảnh
  - `province`: Tỉnh/thành nơi danh thắng tọa lạc
  - `region`: Miền (Bắc / Trung / Nam)
  - `regionCode`: Mã vùng (`north`, `central`, `south`)
  - `type`: Loại hình danh thắng (`thiên nhiên`, `lịch sử`, `văn hoá`…)
  - `description`: Mô tả ngắn
  - `imageUrl`: Link ảnh đại diện
  - `location`: { `lat`: float, `lng`: float }
  - `isFavorite`: boolean (dành cho cá nhân người dùng)

### 2. `users`
- Chứa thông tin người dùng.
- Trường dữ liệu:
  - `_id`: ID người dùng (`user001`, ...)
  - `username`: Tên tài khoản
  - `email`: Email
  - `favoriteSpots`: Mảng `spotId` đã yêu thích

### 3. `reviews`
- Người dùng đánh giá các danh thắng.
- Trường dữ liệu:
  - `_id`: ID đánh giá
  - `userId`: ID người đánh giá
  - `spotId`: ID địa danh được đánh giá
  - `rating`: Điểm số (1–5)
  - `comment`: Nhận xét
  - `createdAt`: Ngày giờ

### 4. `favorites`
- Lưu danh sách địa điểm yêu thích.
- Trường dữ liệu:
  - `_id`: ID yêu thích
  - `userId`: Người dùng
  - `spotId`: Danh thắng
  - `createdAt`: Thời gian thêm vào yêu thích

### 5. `categories`
- Danh sách loại hình danh thắng.
- Trường dữ liệu:
  - `_id`: ID loại hình (`cat01`, `cat02`…)
  - `name`: Tên loại hình (VD: Thiên nhiên, Lịch sử…)

### 6. `provinces`
- Danh sách tỉnh thành.
- Trường dữ liệu:
  - `_id`: ID tỉnh (`prov001`…)
  - `name`: Tên tỉnh
  - `region`: Miền (Bắc/Trung/Nam)
  - `regionCode`: Mã miền (`north`, `central`, `south`)

### 7. `suggestedRoutes`
- Gợi ý hành trình theo từng vùng hoặc tỉnh.
- Trường dữ liệu:
  - `_id`: ID hành trình
  - `name`: Tên tour
  - `province`: Tỉnh áp dụng
  - `spots`: Mảng các `spotId` được đề xuất trong hành trình
  - `description`: Mô tả
  - `durationHours`: Thời gian ước lượng (giờ)

---

## 🔗 Quan hệ giữa các Collection

```
users ────────┐
              │
      ┌────── reviews ───── spots
      │                     │
users └────── favorites ───┘
         ↑            ↑
     suggestedRoutes (gợi ý danh sách spotId)
```

---

## 📌 Hướng dẫn sử dụng
- Import các file JSON vào MongoDB bằng MongoDB Compass hoặc dòng lệnh.
- Tham chiếu các ID giữa các bảng (`spotId`, `userId`, `province`, `regionCode`) để hiển thị dữ liệu liên kết trong ứng dụng.
