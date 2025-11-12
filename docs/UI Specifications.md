# **Phân tích Chi tiết Giao diện Người dùng - Hệ thống Quản lý Bệnh viện**

---

## **1. Module Chung & Đăng nhập**

Module này xử lý việc xác thực và cung cấp giao diện tổng quan cho người dùng sau khi đăng nhập.

### **1.1. Màn hình Đăng nhập (Login Screen)**

- **Form Đăng nhập:**
  - Input Field: Tên đăng nhập (hoặc Email/Mã nhân viên).
  - Input Field: Mật khẩu (có chức năng ẩn/hiện mật khẩu).
  - Checkbox: "Ghi nhớ đăng nhập".
  - Link: "Quên mật khẩu?".
  - Button: "Đăng nhập".

### **1.2. Màn hình Quên mật khẩu (Password Recovery)**

- **Form Khôi phục mật khẩu:**
  - Input Field: Email/Mã nhân viên.
  - Button: "Gửi mã xác nhận".
- **Màn hình nhập mã OTP:**
  - Input Field: Mã OTP (6 số).
  - Button: "Xác nhận".
  - Link: "Gửi lại mã".
- **Form Đặt mật khẩu mới:**
  - Input Field: Mật khẩu mới.
  - Input Field: Xác nhận mật khẩu.
  - Button: "Cập nhật mật khẩu".

### **1.3. Màn hình Đổi mật khẩu lần đầu (First Login)**

- **Form Đổi mật khẩu bắt buộc:**
  - Text (Read-only): Thông báo "Bạn cần đổi mật khẩu lần đầu đăng nhập".
  - Input Field: Mật khẩu cũ (mặc định).
  - Input Field: Mật khẩu mới.
  - Input Field: Xác nhận mật khẩu mới.
  - Password Strength Indicator: Thanh hiển thị độ mạnh mật khẩu.
  - Button: "Xác nhận".

### **1.4. Màn hình Quản lý Phiên đăng nhập (Session Management)**

- **Bảng dữ liệu (Data Table):**
  - _Cột:_ Thiết bị, Trình duyệt, IP Address, Thời gian đăng nhập, Trạng thái (Đang hoạt động/Đã đăng xuất).
  - _Hành động:_ Nút "Đăng xuất từ xa" cho từng phiên.
- **Nút:** "Đăng xuất khỏi tất cả thiết bị".

### **1.5. Cài đặt Xác thực 2 yếu tố (2FA Setup)**

- **Toggle Switch:** Bật/Tắt 2FA.
- **QR Code Display:** Hiển thị mã QR để quét bằng app Authenticator.
- **Input Field:** Nhập mã xác thực để kích hoạt.
- **Backup Codes:** Hiển thị danh sách mã dự phòng (cho phép download).

### **1.6. Màn hình Dashboard (Bảng điều khiển chính)**

Màn hình thay đổi nội dung dựa trên vai trò người dùng.

- **Thành phần chung (cho mọi vai trò):**

  - **Thanh điều hướng chính (Main Navigation):** Một Sidebar (thanh bên trái) chứa link (Menu Items) đến các module chính (Quản lý Bệnh nhân, Lịch hẹn, Khám bệnh,...) dựa theo phân quyền.
  - **Header (Đầu trang):**
    - Avatar và tên người dùng.
    - Badge: Thông báo chưa đọc (Notification Icon với số).
    - Dropdown Menu: Hồ sơ cá nhân, Đổi mật khẩu, Đăng xuất.
  - **Trung tâm Thông báo (Notification Center):** Dropdown hiển thị danh sách thông báo gần nhất.

- **Dashboard cho Lễ tân (Receptionist):**

  - **KPI Cards (Thẻ thông tin nhanh):** Các thẻ số liệu thống kê nhanh:
    - "Số lịch hẹn hôm nay"
    - "Số bệnh nhân đang chờ"
    - "Số bệnh nhân đã check-in"
  - **Danh sách (List View):** "Các lịch hẹn sắp tới" (hiển thị 5-10 lịch hẹn gần nhất).
  - **Bảng (Simple Table):** "Tình trạng Bác sĩ" (Tên bác sĩ, Chuyên khoa, Trạng thái: "Đang khám", "Trống").
  - **Các nút hành động nhanh (Quick Action Buttons):**
    - "Đăng ký Bệnh nhân mới"
    - "Tìm kiếm Bệnh nhân"
    - "Check-in Bệnh nhân"

- **Dashboard cho Bác sĩ (Doctor):**

  - **KPI Cards (Thẻ thông tin nhanh):**
    - "Số bệnh nhân đang chờ khám"
    - "Số bệnh nhân đã khám (hôm nay)"
  - **Bảng/Hàng đợi (Data Table / Queue):** "Danh sách Bệnh nhân chờ khám" (Đây là thành phần quan trọng nhất).
    - _Cột:_ STT, Tên bệnh nhân, Giờ hẹn, Trạng thái (VD: "Đang chờ", "Đang khám", "Chờ kết quả XN").
    - _Hành động:_ Nút "Bắt đầu khám".
  - **Lịch (Mini-Calendar):** Hiển thị lịch làm việc cá nhân của bác sĩ trong ngày/tuần.

- **Dashboard cho Quản trị viên (Admin):**
  - **KPI Cards (Thẻ thông tin nhanh):**
    - "Tổng doanh thu (hôm nay/tháng)"
    - "Tổng số bệnh nhân mới"
    - "Tỷ lệ sử dụng giường bệnh"
  - **Biểu đồ (Charts):**
    - Line Chart: Biểu đồ đường về "Doanh thu trong 7 ngày qua".
    - Bar Chart: Biểu đồ cột về "Số lượng bệnh nhân theo Chuyên khoa".

---

## **2. Module Quản lý Bệnh nhân & Lịch hẹn (Workflow Lễ tân)**

### **2.1. Màn hình Quản lý Bệnh nhân (Tiếp nhận & Tra cứu)**

- **Thanh tìm kiếm (Search Bar):** Tìm kiếm bệnh nhân theo (Mã BN, SĐT, Tên, CMND/CCCD).
- **Bảng CRUD Bệnh nhân (CRUD Table):** Bảng hiển thị danh sách bệnh nhân.
  - _Cột:_ Mã BN, Họ tên, Ngày sinh, Giới tính, SĐT, Địa chỉ, Trạng thái BHYT.
  - _Chức năng:_ Phân trang (Pagination), Sắp xếp (Sorting), Lọc (Filtering).
  - _Hành động (cho mỗi hàng):_
    - Nút "Xem chi tiết" (dẫn đến Hồ sơ Bệnh án).
    - Nút "Sửa thông tin".
    - Nút "Tạo lịch hẹn" (shortcut).
    - Nút "Check-in" (nếu có lịch hẹn hôm nay).
- **Nút (Button):** "Đăng ký Bệnh nhân mới" (sẽ mở ra Form/Modal đăng ký).

### **2.2. Form Đăng ký Bệnh nhân (Modal hoặc Trang riêng)**

- **Form (Form Layout):** Chia thành các nhóm thông tin:
  - _Thông tin Hành chính:_ Họ tên, Ngày sinh, Giới tính, SĐT, Địa chỉ, Email, CMND/CCCD.
  - _Thông tin BHYT:_
    - Input Field: Mã thẻ BHYT.
    - Button: "Kiểm tra thẻ" (tự động kết nối cổng BHYT).
    - Text Display: Kết quả kiểm tra (Còn hiệu lực/Hết hạn, Tỷ lệ chi trả, Nơi đăng ký).
  - _Thông tin Người thân:_ Họ tên người thân, Quan hệ, SĐT liên hệ.
  - _Cảnh báo Y tế:_
    - Text Area: Dị ứng thuốc/thực phẩm.
    - Text Area: Tiền sử bệnh quan trọng.
- **Các nút (Buttons):** "Lưu", "Lưu & Tạo Lịch hẹn", "Hủy".

### **2.3. Màn hình Hồ sơ Bệnh án Chi tiết (Patient Medical Record)**

- **Vùng thông tin chung (Header Section):**

  - Ảnh đại diện bệnh nhân (nếu có).
  - Thông tin cơ bản: Mã BN, Họ tên, Tuổi, Giới tính, SĐT.
  - Badge: Trạng thái BHYT (Có/Không).
  - Alert Box (màu đỏ): **Cảnh báo Dị ứng** (nếu có).
  - Nút "Chỉnh sửa thông tin".

- **Giao diện Tab (Tab Layout):**

  - **Tab 1: Thông tin cá nhân**

    - Form hiển thị tất cả thông tin hành chính.
    - Nút "Chỉnh sửa" (chuyển sang chế độ Edit).

  - **Tab 2: Lịch sử Khám bệnh**

    - Timeline View: Hiển thị các lần khám theo trình tự thời gian (mới nhất ở trên).
    - Mỗi item trong timeline bao gồm:
      - Ngày khám, Bác sĩ, Chuyên khoa.
      - Chẩn đoán.
      - Nút "Xem chi tiết" (mở modal hiển thị đầy đủ hồ sơ khám).

  - **Tab 3: Đơn thuốc đã kê**

    - Bảng liệt kê tất cả đơn thuốc.
    - _Cột:_ Ngày kê, Bác sĩ kê, Trạng thái (Đã mua/Chưa mua).
    - _Hành động:_ Nút "Xem chi tiết", Nút "In đơn".

  - **Tab 4: Kết quả XN/CĐHA**

    - Bảng liệt kê các lần làm xét nghiệm/chẩn đoán hình ảnh.
    - _Cột:_ Ngày, Loại dịch vụ, Trạng thái (Đã có kết quả/Đang chờ).
    - _Hành động:_ Nút "Xem kết quả", Nút "Tải file" (PDF/Image).

  - **Tab 5: Dị ứng & Cảnh báo**

    - Form nhập/hiển thị danh sách dị ứng.
    - Nút "Thêm dị ứng mới".
    - Alert Box: Hiển thị nổi bật các cảnh báo quan trọng.

  - **Tab 6: Lịch hẹn**
    - Bảng hiển thị lịch hẹn sắp tới và đã hoàn thành.
    - Nút "Đặt lịch hẹn mới".

- **Nút (Buttons):** "In Hồ sơ tóm tắt", "Quay lại".

### **2.4. Màn hình Check-in Bệnh nhân**

- **Thanh tìm kiếm nhanh (Quick Search):**
  - Input Field: Nhập Mã BN hoặc SĐT.
- **Thông tin Bệnh nhân (Info Display):**
  - Hiển thị: Tên, Giờ hẹn, Bác sĩ, Phòng khám.
  - Nút "Xác nhận Check-in".
- **Danh sách đã Check-in hôm nay (List View):**
  - Hiển thị danh sách BN đã check-in.
  - _Cột:_ Tên BN, Giờ check-in, Bác sĩ, Trạng thái (Đang chờ/Đang khám).

### **2.5. Màn hình Quản lý Lịch hẹn (Appointment Scheduler)**

- **Bộ lọc (Filters):**
  - Dropdown: Chọn Chuyên khoa.
  - Dropdown/Searchable Select: Chọn Bác sĩ (danh sách bác sĩ thay đổi theo chuyên khoa).
  - Date Picker: Chọn ngày cụ thể.
- **Lịch (Calendar View):** Đây là thành phần chính, sử dụng thư viện (vd: FullCalendar).
  - _Chế độ xem:_ Ngày (Day), Tuần (Week), Tháng (Month).
  - Hiển thị các "slot" thời gian trống và các lịch hẹn đã được đặt (với tên bệnh nhân).
  - Color Coding: Màu sắc khác nhau cho trạng thái (Đã đặt, Đã check-in, Hoàn thành, Đã hủy).
- **Form/Modal Đặt lịch hẹn:** (Mở ra khi click vào một slot trống trên lịch).
  - Input (Searchable): Tìm kiếm/Chọn Bệnh nhân.
  - Input (Read-only): Bác sĩ, Ngày giờ (tự điền từ lịch).
  - Text Area: Lý do khám / Ghi chú.
  - Checkbox: "Gửi SMS/Email nhắc nhở".
  - Buttons: "Xác nhận", "Hủy".
- **Form/Modal Sửa/Hủy lịch hẹn:** (Mở ra khi click vào lịch hẹn đã tồn tại).
  - Hiển thị thông tin lịch hẹn hiện tại.
  - Date/Time Picker: Thay đổi ngày giờ.
  - Text Area: Lý do thay đổi/hủy.
  - Buttons: "Cập nhật", "Hủy lịch hẹn", "Đóng".

---

## **3. Module Quản lý Khám bệnh (Workflow Bác sĩ & Y tá)**

### **3.1. Màn hình Quản lý Hàng đợi (Queue Management - Cho Y tá/Phòng khám)**

- **Bộ lọc (Filters):**
  - Dropdown: Chọn Phòng khám/Chuyên khoa.
  - Dropdown: Chọn Bác sĩ.
- **Bảng dữ liệu (Data Table):** Hiển thị hàng đợi theo từng phòng.
  - _Cột:_ STT, Tên bệnh nhân, Giờ hẹn, Trạng thái (Đang chờ, Đang khám, Hoàn thành).
  - _Hành động:_
    - Nút "Gọi bệnh nhân" (tích hợp với hệ thống loa/màn hình TV).
    - Nút "Chuyển phòng" (nếu cần).
- **Display Panel:** Hiển thị số thứ tự bệnh nhân đang được gọi (lớn, rõ ràng).

### **3.2. Màn hình Danh sách chờ Khám (Doctor's Worklist)**

- **Bảng dữ liệu (Data Table):** Tương tự bảng trên Dashboard Bác sĩ nhưng có thể chi tiết hơn.
  - _Cột:_ STT, Tên bệnh nhân, Tuổi, Giới tính, Giờ hẹn, Lý do khám, Trạng thái (Chờ, Đang khám, Chờ kết quả XN, Hoàn thành).
  - _Hành động:_ Nút "Bắt đầu khám" / "Tiếp tục khám".
- **Badge/Alert:** Hiển thị cảnh báo nếu BN có dị ứng hoặc tiền sử quan trọng.

### **3.3. Màn hình Khám bệnh (Clinical Examination Screen)**

Đây là màn hình phức hợp, thường dùng giao diện Tab để quản lý thông tin.

- **Vùng thông tin chung (Header Section):** Hiển thị cố định thông tin bệnh nhân:

  - Tên, Tuổi, Giới tính, Mã BN.
  - Lý do khám (từ lịch hẹn).
  - **Alert Box (màu đỏ):** Cảnh báo Dị ứng (nếu có).
  - Nút "Xem Hồ sơ Bệnh án đầy đủ" (mở tab/modal mới).

- **Giao diện Tab (Tab Layout):**

  - **Tab 1: Lịch sử Khám trước**

    - Timeline View: Hiển thị 3-5 lần khám gần nhất.
    - Expandable Items: Click để xem chi tiết từng lần khám (Chẩn đoán, Đơn thuốc, Kết quả XN).

  - **Tab 2: Khám lâm sàng**

    - Text Area: Ghi nhận triệu chứng (Anamnesis).
    - Text Area: Khám lâm sàng (Physical Examination).
    - Text Area: Chẩn đoán sơ bộ (Preliminary Diagnosis).
    - Form Inputs: Nhập sinh hiệu (Vital Signs):
      - Mạch (bpm), Huyết áp (mmHg), Nhiệt độ (°C), Nhịp thở, SpO2, Cân nặng, Chiều cao.

  - **Tab 3: Chỉ định Dịch vụ**

    - **Sub-section: Xét nghiệm**
      - Searchable Checkbox Tree: Chọn các xét nghiệm (VD: Công thức máu, Sinh hóa máu, Nước tiểu,...).
      - Text Area: Ghi chú chỉ định.
    - **Sub-section: Chẩn đoán hình ảnh**
      - Searchable Checkbox Tree: Chọn các dịch vụ CĐHA (VD: X-Quang phổi, Siêu âm bụng, CT Scanner,...).
      - Text Area: Ghi chú chỉ định.
    - Button: "Gửi chỉ định" (gửi đến các phòng XN/CĐHA).

  - **Tab 4: Kết quả Dịch vụ**

    - List/Table: Danh sách các chỉ định đã yêu cầu.
      - _Cột:_ Loại dịch vụ, Thời gian chỉ định, Trạng thái (Đã có kết quả/Đang chờ).
      - _Hành động:_ Nút "Xem kết quả".
    - **Result Viewer (Modal/Panel):**
      - Cho XN: Bảng key-value hiển thị các chỉ số (với highlight nếu ngoài tầm bình thường).
      - Cho CĐHA: Image Viewer (zoom, pan) hoặc PDF viewer.
      - Text Area: Nhận xét của Kỹ thuật viên (nếu có).

  - **Tab 5: Kê đơn thuốc (e-Prescription)**

    - Search Bar: Tìm kiếm thuốc (theo tên thương mại, hoạt chất, mã thuốc).
      - Autocomplete: Gợi ý danh sách thuốc từ kho.
    - **Bảng kê đơn (Dynamic Table):** Bảng cho phép thêm/xóa các dòng thuốc.
      - _Cột:_ Tên thuốc, Hàm lượng, Đường dùng, Liều dùng, Tần suất, Số lượng, Ghi chú.
      - _Hành động:_ Nút "Xóa" cho từng dòng.
    - Button: "Thêm thuốc vào đơn".
    - **Vùng tổng kết đơn:**
      - Text Display: Tổng số loại thuốc.
      - Checkbox: "Cần ký số" (nếu bệnh viện yêu cầu).
    - Button: "Lưu đơn thuốc", "In đơn thuốc".

  - **Tab 6: Y lệnh & Tổng kết**
    - Text Area: Ghi nhận các y lệnh (Chế độ chăm sóc, Chế độ dinh dưỡng, Theo dõi đặc biệt).
    - Date Picker: Hẹn tái khám (nếu cần).
    - Text Area: Lời dặn cho bệnh nhân.
    - Dropdown: Tình trạng ra viện (Khỏi, Đỡ, Không đỡ, Chuyển viện, Xin về).
    - Button: "Lưu Toàn bộ Hồ sơ".
    - Button: "Hoàn tất Khám" (chuyển BN sang trạng thái "Chờ thanh toán").

- **Panel bên phải (Optional - Sticky):**
  - Hiển thị danh sách thuốc thường dùng (Favorites) để thêm nhanh.
  - Hiển thị Template y lệnh (Pre-defined templates).

---

## **4. Module Quản lý Viện phí (Workflow Thu ngân)**

### **4.1. Màn hình Danh sách chờ Thanh toán (Billing Queue)**

- **Bảng dữ liệu (Data Table):**
  - _Cột:_ Mã BN, Tên Bệnh nhân, Bác sĩ khám, Ngày khám, Tổng chi phí (ước tính), Trạng thái (Chờ thanh toán, Đã thanh toán, Thanh toán 1 phần, Công nợ).
  - _Hành động:_ Nút "Thanh toán".
- **Bộ lọc (Filters):**
  - Dropdown: Lọc theo trạng thái.
  - Date Range Picker: Lọc theo ngày khám.

### **4.2. Màn hình Lập Hóa đơn / Thanh toán (Payment Screen)**

- **Vùng thông tin (Info Section):**

  - Thông tin bệnh nhân: Mã BN, Tên, SĐT.
  - Mã giao dịch (Transaction ID).
  - Ngày khám, Bác sĩ.

- **Bảng chi tiết Hóa đơn (Bill Details Table):** Bảng liệt kê chi tiết các dịch vụ.

  - _Cột:_ Tên dịch vụ/Thuốc, Số lượng, Đơn giá, Thành tiền.
  - _Nhóm theo loại:_ Tiền khám, Xét nghiệm, CĐHA, Thuốc.

- **Vùng Tổng kết (Summary Section):**

  - Text: "Tổng cộng".
  - _Nếu có BHYT:_
    - Text: "BHYT chi trả (XX%)" (có icon info tooltip giải thích).
    - Text: "Bệnh nhân tự trả".
  - Text (Bold, Highlighted): "Tổng tiền thanh toán".

- **Form Thanh toán (Payment Form):**

  - Radio Buttons: Phương thức thanh toán (Tiền mặt, Thẻ tín dụng/ghi nợ, Chuyển khoản, Ví điện tử).
  - _Nếu chọn Tiền mặt:_
    - Input: "Số tiền nhận".
    - Text (auto-calculate): "Tiền thối lại".
  - _Nếu chọn Thẻ/Chuyển khoản:_
    - Input: Mã giao dịch (Reference Number).
  - Checkbox: "Thanh toán một phần" (nếu BN không đủ tiền).
    - Input: Nhập số tiền thanh toán.
    - Text: Hiển thị số tiền còn nợ.

- **Các nút (Buttons):**
  - "Xác nhận & In Hóa đơn".
  - "Chỉ lưu (không in)".
  - "Xuất file PDF".
  - "Hủy".

### **4.3. Màn hình Quản lý Công nợ (Debt Management)**

- **Bảng dữ liệu (Data Table):**
  - _Cột:_ Mã BN, Tên Bệnh nhân, Tổng nợ, Đã trả, Còn nợ, Ngày phát sinh, Số ngày nợ.
  - _Hành động:_ Nút "Thanh toán nợ", Nút "Xem chi tiết".
- **Bộ lọc (Filters):**
  - Input: Tìm kiếm theo Mã BN/Tên.
  - Dropdown: Lọc theo khoảng nợ (Dưới 1 triệu, 1-5 triệu, Trên 5 triệu).
  - Dropdown: Lọc theo số ngày nợ (Dưới 30 ngày, 30-60 ngày, Trên 60 ngày - "Nợ xấu").
- **KPI Cards:**
  - "Tổng công nợ hiện tại".
  - "Số bệnh nhân đang nợ".

### **4.4. Màn hình Hoàn tiền (Refund Screen)**

- **Form Hoàn tiền:**
  - Input (Searchable): Tìm hóa đơn cần hoàn (theo Mã GD).
  - Hiển thị thông tin hóa đơn gốc.
  - Input: Số tiền hoàn (không vượt quá số tiền đã thanh toán).
  - Text Area: Lý do hoàn tiền.
  - Upload Field: Đính kèm giấy tờ liên quan (nếu có).
  - Dropdown: Phương thức hoàn tiền (Tiền mặt, Chuyển khoản).
- **Workflow phê duyệt:**
  - Button: "Gửi yêu cầu phê duyệt" (nếu số tiền lớn).
  - Status Badge: Trạng thái (Chờ duyệt, Đã duyệt, Từ chối).
- **Các nút (Buttons):** "Xác nhận hoàn tiền", "In Phiếu thu hồi", "Hủy".

### **4.5. Màn hình Kiểm tra BHYT (Insurance Verification)**

- **Form Kiểm tra:**
  - Input Field: Mã thẻ BHYT (15 số).
  - Input Field: Họ tên (để đối chiếu).
  - Button: "Kiểm tra" (kết nối API Cổng BHYT).
- **Kết quả hiển thị (Result Panel):**
  - Status Badge: Trạng thái thẻ (Còn hiệu lực/Hết hạn/Không hợp lệ).
  - Text Display:
    - Họ tên chủ thẻ.
    - Ngày sinh.
    - Địa chỉ.
    - Nơi đăng ký KCB ban đầu.
    - Giá trị thẻ (từ ngày... đến ngày...).
    - Tỷ lệ chi trả (80%, 95%, 100%).
    - Quyền lợi đặc biệt (nếu có).
  - Alert Box: Cảnh báo nếu BN không đúng tuyến hoặc thẻ sắp hết hạn.
- **Nút:** "Lưu thông tin vào hồ sơ BN".

---

## **5. Module Quản lý Nhân sự (Workflow Quản trị/HR)**

### **5.1. Màn hình Quản lý Hồ sơ Nhân viên**

- **Bảng CRUD Nhân viên (CRUD Table):**
  - _Cột:_ Mã NV, Ảnh, Tên NV, Chuyên khoa, Vai trò (Bác sĩ, Y tá, Lễ tân,...), SĐT, Email, Trạng thái (Đang làm, Đã nghỉ, Tạm nghỉ).
  - _Chức năng:_ Tìm kiếm, Lọc (theo Khoa, theo Vai trò, theo Trạng thái).
  - _Hành động:_
    - "Thêm mới" (Nút chung ở trên bảng).
    - "Xem chi tiết", "Sửa", "Vô hiệu hóa" (cho mỗi hàng).
- **Nút Export:** "Xuất danh sách Excel".

### **5.2. Form/Modal Hồ sơ Nhân viên** (Mở ra khi Thêm/Sửa)

- **Giao diện Tab (Tab Layout):**

  - **Tab 1: Thông tin cá nhân**

    - Upload Field: Ảnh đại diện.
    - Form Inputs: Họ tên, Ngày sinh, Giới tính, CMND/CCCD, SĐT, Email, Địa chỉ.
    - Date Picker: Ngày bắt đầu làm việc.

  - **Tab 2: Thông tin công việc**

    - Dropdown: Chọn Chuyên khoa/Phòng ban.
    - Dropdown: Chọn Vai trò (Bác sĩ, Y tá, Lễ tân, Kỹ thuật viên, Dược sĩ, Quản lý, Admin).
    - Text Area: Bằng cấp/Chứng chỉ.
    - Input: Mã hành nghề (nếu là Bác sĩ).

  - **Tab 3: Tài khoản hệ thống**

    - Input: Tên đăng nhập (Username).
    - Input: Mật khẩu mặc định (tự động generate).
    - Checkbox: "Yêu cầu đổi mật khẩu lần đầu đăng nhập".
    - Multi-select: Phân quyền (chọn các module được truy cập).

  - **Tab 4: Lương & Hợp đồng**
    - Input: Lương cơ bản.
    - Input: Các khoản phụ cấp (Chuyên môn, Độc hại, Lưu động,...).
    - Upload Field: File hợp đồng lao động (PDF).

- **Các nút (Buttons):** "Lưu", "Lưu & Gửi thông tin đăng nhập qua Email", "Hủy".

### **5.3. Màn hình Phân công Lịch làm việc (Staff Scheduling)**

- **Bộ lọc (Filters):**
  - Dropdown: Chọn Chuyên khoa/Phòng ban.
  - Week Picker: Chọn tuần cần phân công.
- **Lịch (Calendar View):** Giao diện lịch tương tự module Lịch hẹn, nhưng hiển thị ca trực của nhân viên.
  - _View Mode:_ Tuần (Week), Tháng (Month).
  - Mỗi ngày chia thành các ca: Sáng, Chiều, Tối, Đêm.
  - Hiển thị tên nhân viên trong từng ca (với color coding theo vai trò).
- **Panel bên phải:** Danh sách nhân viên (có thể kéo-thả vào lịch).
  - Filter: Lọc theo vai trò.
  - Badge: Hiển thị số ca đã phân trong tuần.
- **Chức năng Drag-and-Drop:** Kéo nhân viên từ danh sách vào slot ca trực trên lịch.
- **Form/Modal Tạo/Sửa ca trực:** (Mở khi double-click vào slot)
  - Searchable Select: Chọn Nhân viên (có thể chọn nhiều NV cho 1 ca).
  - Date Picker: Ngày.
  - Dropdown: Ca (Sáng/Chiều/Tối/Đêm) hoặc Custom time.
  - Time Pickers: Giờ bắt đầu, Giờ kết thúc (nếu chọn Custom).
  - Text Area: Ghi chú.
  - Buttons: "Lưu", "Xóa ca", "Hủy".
- **Nút Export:** "Xuất lịch tuần (PDF/Excel)".

### **5.4. Màn hình Chấm công (Attendance Management)**

- **Bộ lọc (Filters):**
  - Month Picker: Chọn tháng.
  - Searchable Select: Chọn Nhân viên (hoặc xem tất cả).
- **Bảng Chấm công (Attendance Table):**
  - _Dạng Calendar Grid:_ Hiển thị 1 tháng, mỗi ngày 1 ô.
  - _Cột:_ Tên NV, Các ngày trong tháng (1, 2, 3,..., 31).
  - _Ô chấm công:_
    - Symbol/Icon: ✓ (Đi làm), X (Nghỉ không phép), P (Nghỉ phép), S (Nghỉ ốm), L (Đi trễ/Về sớm).
    - Click để sửa trạng thái.
  - _Cột tổng hợp:_ Tổng ngày công, Tổng ngày nghỉ.
- **Panel nhập nhanh:**
  - Date Picker: Chọn ngày.
  - Multi-select: Chọn nhiều nhân viên.
  - Dropdown: Trạng thái chấm công (Đi làm, Nghỉ phép,...).
  - Button: "Áp dụng".
- **Nút Export:** "Xuất Bảng công (Excel)".

### **5.5. Màn hình Tính lương (Payroll Management)**

- **Bộ lọc (Filters):**
  - Month Picker: Chọn tháng tính lương.
  - Dropdown: Chọn Phòng ban.
- **Bảng Lương (Payroll Table):**
  - _Cột:_ Mã NV, Tên NV, Lương cơ bản, Phụ cấp, Số ngày công, Thưởng, Khấu trừ (Bảo hiểm, Thuế,...), **Thực lãnh**.
  - _Hành động:_
    - Nút "Xem chi tiết" (mở modal).
    - Nút "Xuất Phiếu lương" (PDF).
- **Modal Chi tiết Lương:** (Hiển thị breakdown chi tiết)
  - Sections:
    - Lương & Phụ cấp.
    - Thưởng (nếu có).
    - Các khoản khấu trừ (Chi tiết BHXH, BHYT, Thuế TNCN).
    - Tổng thực lãnh.
  - Button: "In Phiếu lương", "Gửi Email cho NV".
- **Form nhập bổ sung:**
  - Input: Thưởng tháng (cho từng NV hoặc tất cả).
  - Input: Khấu trừ khác (Phạt, Tạm ứng,...).
- **Nút:** "Tính lương tự động", "Xuất Bảng lương (Excel)", "Gửi Email hàng loạt".

### **5.6. Màn hình Quản lý Nghỉ phép (Leave Management)**

- **Bảng Đơn xin nghỉ (Leave Requests Table):**
  - _Cột:_ Mã đơn, Tên NV, Loại nghỉ (Phép năm, Ốm, Thai sản, Không lương), Từ ngày, Đến ngày, Số ngày, Lý do, Trạng thái (Chờ duyệt, Đã duyệt, Từ chối).
  - _Hành động (cho Quản lý):_
    - Nút "Duyệt".
    - Nút "Từ chối" (yêu cầu nhập lý do).
- **Form Đơn xin nghỉ:** (Cho Nhân viên)
  - Dropdown: Loại nghỉ.
  - Date Range Picker: Từ ngày - Đến ngày.
  - Text Display: Tự động tính số ngày nghỉ.
  - Text Area: Lý do xin nghỉ.
  - Upload Field: Đính kèm giấy tờ (nếu nghỉ ốm).
  - Button: "Gửi đơn".
- **Bộ lọc (Filters):**
  - Dropdown: Lọc theo Trạng thái.
  - Dropdown: Lọc theo Loại nghỉ.
  - Date Range Picker: Lọc theo thời gian.

---

## **6. Module Báo cáo Thống kê (Workflow Quản trị)**

### **6.1. Màn hình Báo cáo (Reports Screen)**

- **Bộ lọc chung (Global Filters):**

  - Date Range Picker: Chọn khoảng thời gian (Từ ngày... Đến ngày...).
  - Quick Select: Hôm nay, 7 ngày qua, Tháng này, Tháng trước, Năm nay.
  - Dropdown: Chọn loại báo cáo (Tài chính, Hoạt động, Nhân sự, Dịch vụ).

- **Giao diện Tab (Tab Layout):**

  - **Tab 1: Báo cáo Tài chính**

    - **KPI Cards:**
      - "Tổng doanh thu".
      - "Tổng chi phí".
      - "Lợi nhuận".
      - "Doanh thu TB/ngày".
    - **Biểu đồ (Charts):**
      - Line Chart: "Doanh thu theo ngày" (trong khoảng đã chọn).
      - Pie Chart: "Cơ cấu doanh thu" (Tiền khám, Thuốc, XN, CĐHA, Khác).
      - Bar Chart: "So sánh doanh thu theo tháng" (năm hiện tại).
    - **Bảng dữ liệu (Data Table):** "Chi tiết giao dịch"
      - _Cột:_ Ngày, Mã GD, Mã BN, Tên BN, Loại dịch vụ, Số tiền, PTTT.
      - _Chức năng:_ Tìm kiếm, Phân trang, Export Excel.

  - **Tab 2: Báo cáo Hoạt động Khám chữa bệnh**

    - **KPI Cards:**
      - "Tổng số bệnh nhân".
      - "Số ca khám".
      - "Bệnh nhân mới/cũ".
      - "Hiệu suất TB (ca/bác sĩ/ngày)".
    - **Biểu đồ (Charts):**
      - Bar Chart: "Số lượng bệnh nhân theo Chuyên khoa".
      - Line Chart: "Biến động số lượng bệnh nhân theo ngày".
      - Stacked Bar Chart: "Phân loại bệnh nhân" (BHYT/Viện phí).
    - **Bảng dữ liệu (Data Table):** "Thống kê theo Bác sĩ"
      - _Cột:_ Tên Bác sĩ, Chuyên khoa, Số ca khám, Doanh thu mang lại, Thời gian TB/ca.
      - _Sắp xếp:_ Theo số ca khám (giảm dần).

  - **Tab 3: Báo cáo Dịch vụ XN/CĐHA**

    - **KPI Cards:**
      - "Tổng số chỉ định".
      - "Doanh thu từ XN/CĐHA".
    - **Biểu đồ (Charts):**
      - Bar Chart: "Top 10 dịch vụ XN/CĐHA được sử dụng nhiều nhất".
      - Pie Chart: "Tỷ lệ sử dụng XN vs CĐHA".
    - **Bảng dữ liệu:** Chi tiết các chỉ định theo loại.

  - **Tab 4: Báo cáo Kho thuốc**

    - **KPI Cards:**
      - "Tổng giá trị tồn kho".
      - "Số loại thuốc sắp hết".
      - "Số thuốc sắp hết hạn".
    - **Biểu đồ (Charts):**
      - Bar Chart: "Top 20 thuốc được kê nhiều nhất".
      - Line Chart: "Biến động tồn kho theo tháng".
    - **Bảng dữ liệu:**
      - "Cảnh báo thuốc sắp hết hạn" (trong 3 tháng tới).
      - "Cảnh báo thuốc dưới mức tồn kho tối thiểu".

  - **Tab 5: Báo cáo Hiệu suất Bác sĩ**

    - **Bảng dữ liệu chi tiết:**
      - _Cột:_ Tên Bác sĩ, Số ca khám, Thời gian TB/ca, Số đơn thuốc kê, Số chỉ định XN/CĐHA, Doanh thu, Đánh giá (nếu có).
      - _Chức năng:_ So sánh theo kỳ trước.
    - **Biểu đồ:**
      - Scatter Plot: "Tương quan giữa số ca khám và doanh thu".

  - **Tab 6: Báo cáo Nợ xấu**
    - **KPI Cards:**
      - "Tổng công nợ hiện tại".
      - "Nợ quá 60 ngày (Nợ xấu)".
    - **Bảng dữ liệu:**
      - Danh sách BN có nợ xấu với thông tin chi tiết.

- **Các nút (Buttons):**
  - "Xuất PDF".
  - "Xuất Excel".
  - "In Báo cáo".
  - "Lưu cấu hình Báo cáo" (để xem lại sau).

---

## **7. Module Quản lý Kho thuốc (Optional)**

### **7.1. Màn hình Quản lý Danh mục Thuốc**

- **Bảng CRUD Thuốc (CRUD Table):**
  - _Cột:_ Mã thuốc, Tên thuốc, Hoạt chất, Hàm lượng, Đường dùng, Đơn vị tính, Giá bán, Tồn kho, Trạng thái (Còn hàng/Hết hàng/Ngừng kinh doanh).
  - _Chức năng:_ Tìm kiếm, Lọc (theo nhóm thuốc, theo tồn kho).
  - _Hành động:_ "Thêm mới", "Sửa", "Vô hiệu hóa".
- **Nút Import:** "Nhập danh mục từ Excel" hoặc "Đồng bộ từ Database Thuốc quốc gia".

### **7.2. Màn hình Nhập kho (Stock In)**

- **Form Nhập kho:**
  - Date Picker: Ngày nhập.
  - Input: Số phiếu nhập.
  - Searchable Select: Nhà cung cấp.
  - **Bảng chi tiết (Dynamic Table):**
    - _Cột:_ Tên thuốc (Searchable), Số lô, Hạn sử dụng, Số lượng, Đơn giá, Thành tiền.
    - Nút "Thêm dòng", "Xóa dòng".
  - Text Display: Tổng tiền.
  - Upload Field: Đính kèm hóa đơn/chứng từ.
  - Button: "Lưu phiếu nhập", "In phiếu".

### **7.3. Màn hình Xuất kho (Stock Out)**

- **Tự động:** Khi Bác sĩ kê đơn → Hệ thống tự động trừ tồn kho (sau khi BN thanh toán).
- **Thủ công (nếu cần):**
  - Form Xuất kho tương tự Nhập kho.
  - Dropdown: Lý do xuất (Bán cho BN, Hủy hết hạn, Điều chuyển,...).

### **7.4. Màn hình Kiểm kê Kho**

- **Form Kiểm kê:**
  - Date Picker: Ngày kiểm kê.
  - **Bảng kiểm kê:**
    - _Cột:_ Tên thuốc, Tồn kho hệ thống, Tồn kho thực tế (Input), Chênh lệch (tự động tính), Ghi chú.
  - Button: "Cân đối kho" (cập nhật tồn kho thực tế vào hệ thống).
- **Nút:** "Xuất Biên bản kiểm kê".

---

## **8. Module Quản lý Cấu hình Hệ thống (Admin)**

### **8.1. Màn hình Cài đặt Chung (General Settings)**

- **Form Cấu hình:**
  - Upload Field: Logo bệnh viện.
  - Input: Tên bệnh viện.
  - Text Area: Địa chỉ.
  - Input: Số điện thoại, Email, Website.
  - Text Area: Giới thiệu ngắn (hiển thị trên các phiếu in).
  - Input: Tiền tố Mã BN, Mã NV (VD: BN-, NV-).
- **Nút:** "Lưu cài đặt".

### **8.2. Màn hình Quản lý Danh mục (Master Data)**

- **Giao diện Tab:**

  - **Tab 1: Danh mục Chuyên khoa**

    - Bảng CRUD: Thêm/Sửa/Xóa Chuyên khoa.
    - _Cột:_ Mã, Tên Chuyên khoa, Mô tả.

  - **Tab 2: Danh mục Dịch vụ XN**

    - Bảng CRUD: Quản lý các loại xét nghiệm.
    - _Cột:_ Mã, Tên XN, Nhóm XN, Giá, Đơn vị.

  - **Tab 3: Danh mục Dịch vụ CĐHA**

    - Bảng CRUD: Quản lý các loại chẩn đoán hình ảnh.
    - _Cột:_ Mã, Tên dịch vụ, Giá.

  - **Tab 4: Danh mục Nhà cung cấp**
    - Bảng CRUD: Quản lý thông tin NCC thuốc/vật tư.
    - _Cột:_ Mã NCC, Tên, SĐT, Email, Địa chỉ.

### **8.3. Màn hình Phân quyền (Role & Permission Management)**

- **Bảng Vai trò (Role Table):**
  - _Cột:_ Tên vai trò (Bác sĩ, Y tá, Lễ tân,...), Số người dùng.
  - _Hành động:_ "Thêm vai trò mới", "Sửa quyền".
- **Modal Cấu hình Quyền:** (Mở khi chọn 1 vai trò)
  - **Checkbox Tree:** Cây phân quyền theo module và chức năng.
    - Module Quản lý Bệnh nhân
      - ☑ Xem danh sách
      - ☑ Thêm mới
      - ☐ Sửa
      - ☐ Xóa
    - Module Lịch hẹn
      - ...
  - Button: "Lưu quyền".

### **8.4. Màn hình Nhật ký Hệ thống (Audit Log)**

- **Bảng Lịch sử (Log Table):**
  - _Cột:_ Thời gian, Người dùng, Hành động (Thêm/Sửa/Xóa/Xem), Module, Chi tiết (VD: "Sửa thông tin BN mã BN001"), IP Address.
  - _Chức năng:_ Tìm kiếm, Lọc (theo User, theo Hành động, theo Module).
  - _Phân trang:_ Hỗ trợ lượng dữ liệu lớn.
- **Bộ lọc (Filters):**
  - Date Range Picker: Lọc theo khoảng thời gian.
  - Searchable Select: Lọc theo Người dùng.
  - Dropdown: Lọc theo Loại hành động.
- **Nút Export:** "Xuất Log (Excel/CSV)".

---

## **9. Module Thông báo & Nhắc nhở**

### **9.1. Trung tâm Thông báo (Notification Center)**

- **Panel/Modal Thông báo:**
  - **Danh sách Thông báo (List View):**
    - Mỗi item bao gồm:
      - Icon (theo loại thông báo).
      - Tiêu đề ngắn gọn.
      - Thời gian.
      - Badge: "Mới" (nếu chưa đọc).
    - Click để xem chi tiết hoặc đánh dấu đã đọc.
  - **Tabs:**
    - "Tất cả".
    - "Chưa đọc".
    - "Quan trọng".
  - **Nút:** "Đánh dấu tất cả đã đọc", "Xóa tất cả".

### **9.2. Cấu hình Nhắc nhở (Reminder Settings)**

- **Form Cấu hình:**
  - **Nhắc lịch hẹn cho Bệnh nhân:**
    - Checkbox: Bật/Tắt nhắc nhở.
    - Input: Thời gian nhắc trước (VD: 1 ngày, 2 giờ).
    - Checkbox: Gửi qua SMS.
    - Checkbox: Gửi qua Email.
  - **Nhắc ca trực cho Nhân viên:**
    - Tương tự như trên.
  - **Cảnh báo thuốc sắp hết hạn:**
    - Input: Số ngày cảnh báo trước.
    - Dropdown: Người nhận (Quản lý kho, Admin).
- **Nút:** "Lưu cấu hình".

---

## **10. Các màn hình Hỗ trợ khác**

### **10.1. Màn hình Hồ sơ Cá nhân (User Profile)**

- **Thông tin cá nhân:**
  - Avatar (có thể upload).
  - Hiển thị: Tên, Email, SĐT, Vai trò.
  - Nút "Chỉnh sửa".
- **Form Đổi mật khẩu:**
  - Input: Mật khẩu hiện tại.
  - Input: Mật khẩu mới.
  - Input: Xác nhận mật khẩu mới.
  - Button: "Cập nhật".
- **Cài đặt Thông báo:**
  - Toggle: Nhận thông báo Email.
  - Toggle: Nhận thông báo Push.

### **10.2. Màn hình Trợ giúp & Hướng dẫn (Help & Documentation)**

- **Thanh tìm kiếm:** Tìm kiếm bài viết hướng dẫn.
- **Danh sách chủ đề (Accordion):**
  - "Hướng dẫn sử dụng cho Lễ tân".
  - "Hướng dẫn sử dụng cho Bác sĩ".
  - "Câu hỏi thường gặp (FAQ)".
  - ...
- **Nút:** "Liên hệ hỗ trợ kỹ thuật".

### **10.3. Màn hình Liên hệ Hỗ trợ (Support Ticket)**

- **Form Gửi yêu cầu:**
  - Dropdown: Loại vấn đề (Lỗi hệ thống, Yêu cầu tính năng, Câu hỏi,...).
  - Input: Tiêu đề.
  - Text Area: Mô tả chi tiết.
  - Upload Field: Đính kèm ảnh chụp màn hình.
  - Button: "Gửi yêu cầu".
- **Danh sách Ticket đã gửi:**
  - _Cột:_ Mã Ticket, Tiêu đề, Trạng thái (Đang xử lý/Đã giải quyết), Ngày gửi.

---

## **Phụ lục: Bảng tổng hợp Màn hình theo Module**

| **STT** | **Tên Màn hình**         | **Module**  | **Vai trò truy cập**    | **Độ ưu tiên** |
| ------- | ------------------------ | ----------- | ----------------------- | -------------- |
| 1       | Đăng nhập                | Chung       | Tất cả                  | Cao            |
| 2       | Quên mật khẩu            | Chung       | Tất cả                  | Trung          |
| 3       | Đổi mật khẩu lần đầu     | Chung       | Tất cả                  | Cao            |
| 4       | Quản lý Phiên đăng nhập  | Chung       | Tất cả                  | Thấp           |
| 5       | Dashboard                | Chung       | Tất cả (theo vai trò)   | Cao            |
| 6       | Quản lý Bệnh nhân        | Quản lý BN  | Lễ tân, Bác sĩ, Admin   | Cao            |
| 7       | Form Đăng ký Bệnh nhân   | Quản lý BN  | Lễ tân                  | Cao            |
| 8       | Hồ sơ Bệnh án Chi tiết   | Quản lý BN  | Lễ tân, Bác sĩ, Y tá    | Cao            |
| 9       | Check-in Bệnh nhân       | Quản lý BN  | Lễ tân                  | Cao            |
| 10      | Quản lý Lịch hẹn         | Lịch hẹn    | Lễ tân, Bác sĩ          | Cao            |
| 11      | Quản lý Hàng đợi         | Khám bệnh   | Y tá, Bác sĩ            | Cao            |
| 12      | Danh sách chờ Khám       | Khám bệnh   | Bác sĩ                  | Cao            |
| 13      | Màn hình Khám bệnh       | Khám bệnh   | Bác sĩ                  | Cao            |
| 14      | Danh sách chờ Thanh toán | Viện phí    | Thu ngân                | Cao            |
| 15      | Lập Hóa đơn/Thanh toán   | Viện phí    | Thu ngân                | Cao            |
| 16      | Quản lý Công nợ          | Viện phí    | Thu ngân, Kế toán       | Trung          |
| 17      | Hoàn tiền                | Viện phí    | Thu ngân, Quản lý       | Thấp           |
| 18      | Kiểm tra BHYT            | Viện phí    | Lễ tân, Thu ngân        | Trung          |
| 19      | Quản lý Hồ sơ Nhân viên  | Nhân sự     | HR, Admin               | Cao            |
| 20      | Phân công Lịch làm việc  | Nhân sự     | Quản lý, HR             | Cao            |
| 21      | Chấm công                | Nhân sự     | HR                      | Cao            |
| 22      | Tính lương               | Nhân sự     | HR, Kế toán             | Cao            |
| 23      | Quản lý Nghỉ phép        | Nhân sự     | Tất cả NV, HR, Quản lý  | Trung          |
| 24      | Báo cáo Thống kê         | Báo cáo     | Quản lý, Admin, Kế toán | Cao            |
| 25      | Quản lý Danh mục Thuốc   | Kho thuốc   | Dược sĩ, Quản lý kho    | Cao            |
| 26      | Nhập kho                 | Kho thuốc   | Dược sĩ, Quản lý kho    | Cao            |
| 27      | Xuất kho                 | Kho thuốc   | Dược sĩ                 | Trung          |
| 28      | Kiểm kê Kho              | Kho thuốc   | Dược sĩ, Quản lý kho    | Trung          |
| 29      | Cài đặt Chung            | Cấu hình HT | Admin                   | Trung          |
| 30      | Quản lý Danh mục         | Cấu hình HT | Admin                   | Trung          |
| 31      | Phân quyền               | Cấu hình HT | Admin                   | Cao            |
| 32      | Nhật ký Hệ thống         | Cấu hình HT | Admin                   | Trung          |
| 33      | Trung tâm Thông báo      | Thông báo   | Tất cả                  | Trung          |
| 34      | Hồ sơ Cá nhân            | Hỗ trợ      | Tất cả                  | Thấp           |
| 35      | Trợ giúp & Hướng dẫn     | Hỗ trợ      | Tất cả                  | Thấp           |
| 36      | Liên hệ Hỗ trợ           | Hỗ trợ      | Tất cả                  | Thấp           |

---

## **Sơ đồ Sitemap tổng quan**

```
Đăng nhập
    ├── Quên mật khẩu
    └── Đổi mật khẩu lần đầu

Dashboard (theo vai trò)
    │
    ├── Module Quản lý Bệnh nhân
    │   ├── Danh sách Bệnh nhân
    │   ├── Đăng ký Bệnh nhân mới
    │   ├── Hồ sơ Bệnh án Chi tiết
    │   └── Check-in
    │
    ├── Module Lịch hẹn
    │   ├── Xem/Quản lý Lịch
    │   ├── Đặt lịch hẹn mới
    │   └── Sửa/Hủy lịch hẹn
    │
    ├── Module Khám bệnh
    │   ├── Quản lý Hàng đợi (Y tá)
    │   ├── Danh sách chờ Khám (Bác sĩ)
    │   └── Màn hình Khám bệnh
    │       ├── Lịch sử Khám
    │       ├── Khám lâm sàng
    │       ├── Chỉ định XN/CĐHA
    │       ├── Xem Kết quả
    │       ├── Kê đơn thuốc
    │       └── Y lệnh & Tổng kết
    │
    ├── Module Viện phí
    │   ├── Danh sách chờ Thanh toán
    │   ├── Lập Hóa đơn/Thanh toán
    │   ├── Quản lý Công nợ
    │   ├── Hoàn tiền
    │   └── Kiểm tra BHYT
    │
    ├── Module Nhân sự
    │   ├── Quản lý Hồ sơ Nhân viên
    │   ├── Phân công Lịch làm việc
    │   ├── Chấm công
    │   ├── Tính lương
    │   └── Quản lý Nghỉ phép
    │
    ├── Module Báo cáo
    │   ├── Báo cáo Tài chính
    │   ├── Báo cáo Hoạt động
    │   ├── Báo cáo Dịch vụ
    │   ├── Báo cáo Kho thuốc
    │   ├── Báo cáo Hiệu suất
    │   └── Báo cáo Nợ xấu
    │
    ├── Module Kho thuốc (Nếu có)
    │   ├── Quản lý Danh mục Thuốc
    │   ├── Nhập kho
    │   ├── Xuất kho
    │   └── Kiểm kê
    │
    ├── Module Cấu hình Hệ thống (Admin)
    │   ├── Cài đặt Chung
    │   ├── Quản lý Danh mục
    │   ├── Phân quyền
    │   └── Nhật ký Hệ thống
    │
    ├── Thông báo
    │   └── Trung tâm Thông báo
    │
    └── Hỗ trợ
        ├── Hồ sơ Cá nhân
        ├── Trợ giúp & Hướng dẫn
        └── Liên hệ Hỗ trợ
```

---

## **User Flow Diagrams - Các luồng nghiệp vụ chính**

### **Flow 1: Quy trình Tiếp nhận & Khám bệnh (End-to-End)**

```
[Bệnh nhân đến]
    ↓
[Lễ tân: Kiểm tra thông tin]
    ├─→ BN cũ: Tìm kiếm trong hệ thống
    └─→ BN mới: Đăng ký Bệnh nhân mới
    ↓
[Lễ tân: Kiểm tra BHYT (nếu có)]
    ↓
[Lễ tân: Đặt lịch hẹn hoặc Check-in ngay]
    ↓
[BN chờ trong Hàng đợi]
    ↓
[Y tá: Gọi BN vào phòng khám]
    ↓
[Bác sĩ: Bắt đầu khám bệnh]
    ├─→ Khám lâm sàng
    ├─→ Chỉ định XN/CĐHA (nếu cần)
    │       ↓
    │   [BN đi làm XN/CĐHA]
    │       ↓
    │   [Kỹ thuật viên: Nhập kết quả]
    │       ↓
    │   [Bác sĩ: Xem kết quả & Chẩn đoán]
    ├─→ Kê đơn thuốc
    └─→ Ghi Y lệnh & Hoàn tất
    ↓
[BN chuyển sang trạng thái "Chờ thanh toán"]
    ↓
[Thu ngân: Lập Hóa đơn & Thu tiền]
    ↓
[In Hóa đơn & Đơn thuốc cho BN]
    ↓
[Hoàn tất]
```

### **Flow 2: Quy trình Quản lý Nhân sự**

```
[HR: Thêm Nhân viên mới]
    ↓
[Nhập thông tin cá nhân & công việc]
    ↓
[Tạo tài khoản đăng nhập & Phân quyền]
    ↓
[Gửi thông tin đăng nhập qua Email]
    ↓
[NV đăng nhập lần đầu → Đổi mật khẩu]
    ↓
[Quản lý: Phân công lịch làm việc]
    ↓
[NV làm việc theo lịch]
    ↓
[HR: Chấm công hàng tháng]
    ↓
[HR: Tính lương & Xuất Phiếu lương]
    ↓
[Gửi Phiếu lương cho NV]
```

### **Flow 3: Quy trình Quản lý Kho thuốc**

```
[Nhà cung cấp giao hàng]
    ↓
[Dược sĩ: Nhập kho]
    ├─→ Nhập thông tin thuốc (Tên, Số lô, HSD, SL)
    └─→ In Phiếu nhập kho
    ↓
[Cập nhật Tồn kho trong hệ thống]
    ↓
[Bác sĩ kê đơn thuốc]
    ↓
[BN thanh toán]
    ↓
[Hệ thống: Tự động Xuất kho]
    ↓
[Dược sĩ: Cấp thuốc cho BN]
    ↓
[Định kỳ: Kiểm kê kho]
    ├─→ Kiểm tra thuốc sắp hết hạn
    └─→ Cảnh báo thuốc dưới tồn kho tối thiểu
```

---

## **Công nghệ & Thư viện UI**

Để triển khai các màn hình trên, nhóm có thể tham khảo các công nghệ sau:

### **UI Component Libraries:**

- **Shadcn UI**: Nhiều Component thông dụng.
- **Tailwind CSS**: Framework CSS.

### **Thư viện đặc biệt:**

- **Calendar/Scheduler**:
  - FullCalendar (cho Lịch hẹn, Lịch làm việc).
  - react-big-calendar.
- **Charts**:
  - Recharts, Chart.js, Apache ECharts (cho Báo cáo).
- **Table**:
  - AG Grid, React Table (cho Bảng dữ liệu lớn).
- **Form**:
  - React Hook Form, Formik (quản lý form phức tạp).
- **Date/Time Picker**:
  - react-datepicker, dayjs.
- **Rich Text Editor**:
  - Quill, TinyMCE (cho Text Area phức tạp).
- **Image Viewer**:
  - react-image-viewer (cho CĐHA).
- **PDF Viewer**:
  - react-pdf, PDF.js.
