//A. LỚP (CLASS) VÀ DATA ĐƠN HÀNG BAN ĐẦU
// ====================================

// Lớp để tổ chức cấu trúc đơn hàng
class Order {
  constructor(id, time, summary, total, note, status) {
    this.id = id;
    this.time = time;
    this.summary = summary;
    this.total = total;
    this.note = note;
    this.status = status;
  }
}

// Dữ liệu mẫu ban đầu
const initialOrders = [
  new Order(
    1,
    "2025-10-08 10:00:00",
    "--- Đơn 1 ---\n" +
    "Họ tên: Nguyễn Văn A\n" +
    "SĐT: 0912345678\n" +
    "Loại SP: Áo Đấu MU\n" +
    "Size: L",
    "280,000 VND",
    "Yêu cầu in tên Messi.",
    "Chờ Xử Lý"
  ),
  new Order(
    2,
    "2025-10-08 10:05:30",
    "--- Đơn 2 ---\n" +
    "Họ tên: Trần Thị B\n" +
    "SĐT: 0901112223\n" +
    "Loại SP: Giày Adidas Predator\n" +
    "Size: 42",
    "1,250,000 VND",
    "Cần tư vấn size giày trước khi giao.",
    "Đã Xử Lý"
  ),
  new Order(
    3,
    "2025-10-08 09:30:00",
    "--- Đơn 3 ---\n" +
    "Họ tên: Lê Thị C\n" +
    "SĐT: 0987654321\n" +
    "Loại SP: Phụ kiện\n" +
    "Size: N/A",
    "150,000 VND",
    "Chuyển phát nhanh.",
    "Đã Giao"
  )
];

// Mảng hiện tại Staff thao tác
let currentOrders = [...initialOrders];

// Biến ID tự động tăng
let nextId = currentOrders.length > 0 ? currentOrders[currentOrders.length - 1].id + 1 : 1;

// Biến trạng thái sắp xếp
let currentSortKey = 'time';
let isAscending = true;

// =========================================================
// B. HÀM HỖ TRỢ VISUAL VÀ LỌC
// =========================================================

// HÀM XÁC ĐỊNH MÀU NỀN THEO TRẠNG THÁI (VISUAL HIGHLIGHT)
function getRowColor(status) {
  switch (status) {
    case 'Đã Giao':
      return '#004D40'; // Xanh lá đậm (Hoàn thành)
    case 'Đã Xử Lý':
      return '#1A237E'; // Xanh dương đậm (Đang tiến hành)
    case 'Chờ Xử Lý':
      return '#FF6F00'; // Cam đậm (Cần hành động ngay)
    default:
      return '#2E2E2E'; // Màu mặc định
  }
}


// HÀM TÌM KIẾM VÀ LỌC NHANH (FILTER) - Đọc trực tiếp từ HTML Input
function filterOrders() {
  const filterText = document.getElementById('search-input').value.toLowerCase();
  const rows = document.getElementById('orders-list').getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    let searchableText = "";

    // Lấy tất cả giá trị từ các ô nhập liệu (Input, TextArea, Select)
    row.querySelectorAll('input, textarea, select').forEach(el => {
      searchableText += el.value + " ";
    });

    // Thêm nội dung từ cột STT (cell.innerText)
    const sttCell = row.cells[0];
    if (sttCell) searchableText += sttCell.innerText + " ";

    // Kiểm tra và hiển thị/ẩn hàng
    if (searchableText.toLowerCase().includes(filterText)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
}


// HÀM CẬP NHẬT ICON MŨI TÊN (CSS) SAU KHI SẮP XẾP
function updateSortIcons() {
  // Xóa tất cả các class sắp xếp cũ
  document.querySelectorAll('#orders-table th').forEach(th => {
    th.classList.remove('sorted-asc', 'sorted-desc');
  });

  // Thêm class cho cột đang được sắp xếp
  const headers = document.querySelectorAll('#orders-table th[onclick]');
  headers.forEach(th => {
    const onclickAttr = th.getAttribute('onclick');
    const keyMatch = onclickAttr ? onclickAttr.match(/'([^']+)'/) : null;

    if (keyMatch && keyMatch[1] === currentSortKey) {
      th.classList.add(isAscending ? 'sorted-asc' : 'sorted-desc');
    }
  });
}

// =========================================================
// C. HÀM HIỂN THỊ DỮ LIỆU (RENDER)
// =========================================================

function renderOrders() {
  const ordersList = document.getElementById('orders-list');
  const loadingDiv = document.getElementById('loading');

  loadingDiv.style.display = 'none';
  ordersList.innerHTML = '';

  if (currentOrders.length === 0) {
    ordersList.innerHTML = '<tr><td colspan="7" style="text-align: center;">Chưa có đơn hàng nào trong danh sách.</td></tr>';
    return;
  }

  // Lặp qua MẢNG đơn hàng và tạo HTML
  currentOrders.forEach((order, index) => {

    // --- LOGIC TRÍCH XUẤT VÀ HIGHLIGHTING ---
    const nameMatch = order.summary.match(/Họ tên:\s*([^\n]+)/i);
    const phoneMatch = order.summary.match(/SĐT:\s*([^\n]+)/i);
    const customerName = nameMatch ? nameMatch[1].trim() : "Chưa có Tên";
    const customerPhone = phoneMatch ? phoneMatch[1].trim() : "Chưa có SĐT";
    const rowBackgroundColor = getRowColor(order.status); // Màu nền

    // --- TẠO HÀNG (ROW) CHO BẢNG ---
    const newRow = `
            <tr id="row-${order.id}" data-order-id="${order.id}" style="background-color: ${rowBackgroundColor};">
                <td>${index + 1}</td>
                
                <td><input type="text" id="time-${order.id}" value="${order.time}" style="width:120px; background-color:inherit; color:white; border:none;"></td>
                
                <td><input type="text" id="name-${order.id}" value="${customerName}" style="width:150px; background-color:inherit; color:white;"></td>
                
                <td>
                    <input type="text" id="phone-${order.id}" value="${customerPhone}" style="width:100%; background-color:inherit; color:white;">
                    <div style="margin-top: 5px; display: flex; gap: 5px; justify-content: space-between;">
                        <a href="tel:${customerPhone.replace(/[^0-9+]/g, '')}" style="background-color: #00BCD4; color: white; padding: 3px 8px; border-radius: 4px; text-decoration: none; font-size: 12px; font-weight: bold; flex-grow: 1; text-align: center;">
                            📞 Gọi
                        </a>
                    </div>
                </td>
                
                <td><input type="text" id="total-${order.id}" value="${order.total}" style="width:100px; font-weight:bold; background-color:inherit; color:white; border:none;"></td>
                
                <td>
                    <textarea id="summary-hidden-${order.id}" style="display:none;">${order.summary}</textarea>

                    <textarea id="note-${order.id}" rows="2" style="width: 95%; background-color:#333; color:white;">${order.note}</textarea>
                    <select id="status-${order.id}" style="width: 95%; margin-top: 5px; background-color:#333; color:white;">
                        <option value="Chờ Xử Lý" ${order.status === 'Chờ Xử Lý' ? 'selected' : ''}>Chờ Xử Lý</option>
                        <option value="Đã Xử Lý" ${order.status === 'Đã Xử Lý' ? 'selected' : ''}>Đã Xử Lý</option>
                        <option value="Đã Giao" ${order.status === 'Đã Giao' ? 'selected' : ''}>Đã Giao</option>
                    </select>
                </td>

                <td>
                    <button onclick="saveOrder(${order.id})" style="background-color: #FF9800; color: white; margin-bottom: 5px; width: 100%;">
                        Lưu Sửa
                    </button>
                    <button onclick="deleteOrder(${order.id})" style="background-color: #FF4444; color: white; width: 100%;">
                        Xóa
                    </button>
                </td>
            </tr>
        `;
    ordersList.innerHTML += newRow;
  });

  // Cập nhật icon sắp xếp và áp dụng lại bộ lọc
  if (currentOrders.length > 0) {
    updateSortIcons();
    filterOrders();
  }
}

// =========================================================
// D. HÀM QUẢN LÝ DỮ LIỆU (CRUD & SORT)
// =========================================================

// HÀM THÊM ĐƠN HÀNG MỚI (ADD)
function addNewOrder() {
  const newOrder = new Order(
    nextId,
    new Date().toLocaleString('vi-VN'),
    "--- Đơn Hàng Mới (Cần Điền) ---\n" +
    "Họ tên: Tên Khách Mới\n" +
    "SĐT: 0xxxxxxxxxx\n" +
    "Loại SP: \n" +
    "Size:",
    "0 VND",
    "Chờ Xử Lý"
  );
  currentOrders.unshift(newOrder);
  nextId++;
  renderOrders();
  document.getElementById(`row-${newOrder.id}`).style.backgroundColor = getRowColor(newOrder.status);
}

// HÀM LƯU ĐƠN HÀNG (SAVE/UPDATE)
function saveOrder(id) {
  const index = currentOrders.findIndex(order => order.id === id);
  if (index === -1) return;

  // Lấy dữ liệu mới từ các Input/Select
  const newTime = document.getElementById(`time-${id}`).value;
  const newTotal = document.getElementById(`total-${id}`).value;
  const newNote = document.getElementById(`note-${id}`).value;
  const newStatus = document.getElementById(`status-${id}`).value;
  const newName = document.getElementById(`name-${id}`).value;
  const newPhone = document.getElementById(`phone-${id}`).value;

  // Cập nhật khối Summary
  let oldSummary = currentOrders[index].summary;
  let updatedSummary = oldSummary
    .replace(/Họ tên:\s*([^\n]+)/i, `Họ tên: ${newName}`)
    .replace(/SĐT:\s*([^\n]+)/i, `SĐT: ${newPhone}`);

  // Cập nhật mảng
  currentOrders[index].time = newTime;
  currentOrders[index].total = newTotal;
  currentOrders[index].note = newNote;
  currentOrders[index].status = newStatus;
  currentOrders[index].summary = updatedSummary;

  renderOrders();
  alert(`Đơn hàng #${id} đã được lưu thành công trong phiên làm việc.`);
}

// HÀM XÓA ĐƠN HÀNG (DELETE)
function deleteOrder(id) {
  if (!confirm(`Bạn có chắc chắn muốn xóa đơn hàng #${id}?`)) {
    return;
  }

  const indexToDelete = currentOrders.findIndex(order => order.id === id);

  if (indexToDelete > -1) {
    currentOrders.splice(indexToDelete, 1);
    renderOrders();
    alert(`Đơn hàng #${id} đã được xóa.`);
  }
}

// HÀM SẮP XẾP BẢNG (SORTING)
function sortOrders(key) {
  // 1. Cập nhật trạng thái sắp xếp
  if (currentSortKey === key) {
    isAscending = !isAscending;
  } else {
    currentSortKey = key;
    isAscending = true;
  }

  // 2. Thực hiện sắp xếp mảng currentOrders
  currentOrders.sort((a, b) => {
    let valA, valB;

    switch (key) {
      case 'time':
        valA = new Date(a.time);
        valB = new Date(b.time);
        break;
      case 'total':
        valA = parseFloat(a.total.replace(/[^0-9.]/g, ""));
        valB = parseFloat(b.total.replace(/[^0-9.]/g, ""));
        break;
      case 'name':
        const nameMatchA = a.summary.match(/Họ tên:\s*([^\n]+)/i);
        const nameMatchB = b.summary.match(/Họ tên:\s*([^\n]+)/i);
        valA = (nameMatchA ? nameMatchA[1].trim() : "").toLowerCase();
        valB = (nameMatchB ? nameMatchB[1].trim() : "").toLowerCase();
        break;
      default:
        // Sắp xếp theo chuỗi (status)
        valA = String(a[key]).toLowerCase();
        valB = String(b[key]).toLowerCase();
    }

    // Thực hiện so sánh
    if (valA < valB) return isAscending ? -1 : 1;
    if (valA > valB) return isAscending ? 1 : -1;
    return 0;
  });

  renderOrders();
}

document.addEventListener('DOMContentLoaded', renderOrders);