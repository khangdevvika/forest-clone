# 🌿 Forest Clone - Chiến lược Phát triển & Hoàn thiện

Tài liệu này chi tiết hóa các bước cần thiết để đưa **Forest Clone** từ một bản MVP lên một ứng dụng hoàn chỉnh với trải nghiệm người dùng cao cấp và hệ thống vận hành lôi cuốn.

---

## 🛠️ Giai đoạn 1: Hoàn thiện tính năng (Refinement)

Giai đoạn này tập trung vào việc đánh bóng (polishing) những gì đã có, đảm bảo tính nhất quán và hiệu ứng hình ảnh chuyên nghiệp.

### 1.1 Chuẩn hóa hệ thống màu (Design System Consistency)

- [x] **Refactor Store Page:** Thay thế toàn bộ mã hex cứng (`#F5EDD8`, `#1A2E0A`,...) bằng các biến CSS trong `globals.css` (`var(--background)`, `var(--foreground)`).
- [x] **Refactor Components:** Kiểm tra và thay thế màu trong `TreeGrid.tsx`, `TreeDetailDialog.tsx` và các Tab components.
- [x] **Dark Mode Audit:** Đảm bảo toàn bộ trang Store hiển thị hoàn hảo khi người dùng chuyển sang chế độ `.dark`.

### 1.2 Nâng cấp trải nghiệm mua sắm (Store Experience)

- [x] **Thêm Confetti Effect:**
  - [x] Import `canvas-confetti` vào `TreeDetailDialog`.
  - [x] Kích hoạt hiệu ứng pháo hoa giấy ngay khi hàm `buyTree` trả về `true`.
- [x] **Hoàn thiện dữ liệu Tab:**
  - [x] **Sound Tab:** Đổ dữ liệu các bản nhạc (Rừng mưa, Café, Sóng biển) với giá coins tương ứng.
  - [x] **Theme Tab:** Thêm các chủ đề màu sắc khác (Sunset, Midnight, Sakura).
  - [x] **Potion Tab:** Định nghĩa các vật phẩm hỗ trợ (X2 Coins, Giảm thời gian lớn,...)
- [x] **Visual Feedback:** Thêm micro-animations (framer-motion) cho các thẻ vật phẩm khi di chuột (hover) và khi nhấn mua.

### 1.3 Tinh chỉnh Dashboard & Thống kê (Analytics Polish)

- [x] **Stats Empty State:**
  - [x] Tạo component `StatsEmpty.tsx` với minh họa SVG hoặc hình ảnh cây cối trừu tượng.
  - [x] Viết logic kiểm tra: Nếu `sessions.length === 0`, hiển thị màn hình trống kèm nút "Start Focusing" dẫn về trang chủ.
- [x] **Chart Improvements:** Thêm tooltip tùy chỉnh cho Recharts để hiển trị số phút tập trung rõ ràng hơn theo phong cách Zen.

---

## 🏆 Giai đoạn 2: Hệ thống Gamification (Phát triển mới)

Mục tiêu là tạo ra sự gắn kết lâu dài của người dùng thông qua các thử thách và phần thưởng thị giác.

### 2.1 Hệ thống Thành tựu (Achievements 2.0)

- [x] **Huy hiệu (Badges):**
  - [x] Thiết kế/Tìm icon cho các nhóm: _Efficiency_ (Hiệu suất), _Consistency_ (Đều đặn), _Collection_ (Sưu tầm).
  - [x] Định nghĩa các cột mốc: "Làm vườn 10h" (Diligent Gardener), "Cây đại thụ" (Ancient Tree - Phiên > 120p).
- [x] **Thông báo mở khóa:** Logic check thành tựu đã sẵn sàng trong `use-achievements`.

### 2.2 Tiến hóa Tag (Tag Evolution Logic)

- [x] **Track thời gian theo Tag:**
  - [x] Viết utility function `getTagLevelInfo` tính tổng số phút cho mỗi loại Tag.
- [x] **Leveling System:**
  - [x] Định nghĩa ngưỡng (thresholds): Level 1-5.
  - [x] Cập nhật UI `TagSelector`: Hiển thị cấp độ hiện tại và thanh tiến trình. Tiến hóa icon khi đạt Level 3+.

### 2.3 Visual Garden (Sáng tạo khu rừng)

- [x] **Khu rừng 2D/Isometric (Visual Garden):**
  - [x] Thiết kế component `VisualGarden.tsx` với góc nhìn Isometric 3D giả lập.
  - [x] Mỗi cây được đặt trên một ô đất có chiều sâu, tạo cảm giác khu rừng thật hơn.
- [x] **Lọc theo thời gian:** Tích hợp với hệ thống lọc hiện có của Garden.

---

## 📅 Lộ trình thực hiện đề xuất

1.  **Tuần 1:** Tập trung hoàn toàn vào **Giai đoạn 1** (Refactor màu & Hoàn thiện Store). Đây là bước nền tảng để ứng dụng trông "thật" hơn.
2.  **Tuần 2:** Triển khai **Tag Levels** và **Achievements**. Đây là "động cơ" thúc đẩy người dùng sử dụng app hàng ngày.
3.  **Tuần 3:** Phát triển **Visual Garden** – tính năng "wow" nhất để người dùng muốn khoe thành quả của mình.

> [!TIP]
> **Zen Design Rule:** Luôn giữ cho các chuyển động (animations) nhẹ nhàng (spring stiffness thấp, damping cao). Tránh các hiệu ứng quá nhanh hoặc lòe loẹt làm mất đi sự tĩnh lặng của ứng dụng.
