let productCounter = 1; // Biến đếm ID duy nhất cho mỗi khối sản phẩm
const customerFields = ['fullName', 'phone', 'email', 'address'];

class PriceManager {
  constructor() {
    this.PRICE_LIST = {
      'jersey': 450000,
      'shoes': 1200000,
      'accessory': 150000,

      'brandPremium': {
        'Nike': 0,
        'Adidas': 0,
        'Puma': -50000,
        'UnderArmour': 50000
      },

      'sizePremium': {
        'XL': 20000,
        'XXL': 50000,
        '43': 50000,
        '44': 80000,
        '45': 100000,
        '46': 150000
      },

      'fee': {
        'printing': 100000 // Phí in tên/số
      }
    };
  }

  formatCurrency(number) {
    return number.toLocaleString('vi-VN') + ' VNĐ';
  }

  // Hàm tính toán giá cuối cùng của MỘT sản phẩm
  // FIX LỖI: Đảm bảo logic size premium chỉ áp dụng cho đúng loại sản phẩm
  calculatePrice(productType, brand, size, hasPrinting = false) {
    let basePrice = 0;

    // 1. Lấy giá cơ bản
    if (this.PRICE_LIST[productType]) {
      basePrice = this.PRICE_LIST[productType];
    } else {
      return 0;
    }

    // 2. Điều chỉnh giá theo Thương hiệu
    if (brand && brand !== "" && brand !== "Other" && this.PRICE_LIST.brandPremium.hasOwnProperty(brand)) {
      basePrice += this.PRICE_LIST.brandPremium[brand];
    }

    // 3. ĐIỀU CHỈNH GIÁ THEO SIZE (LOGIC ĐÃ ĐƯỢC LÀM RÕ)
    if (size) {
      const sizeMod = this.PRICE_LIST.sizePremium[size] || 0;

      const isApparelSizePremium = ['XL', 'XXL'].includes(size);
      const isShoeSizePremium = ['43', '44', '45', '46'].includes(size);

      // Chỉ áp dụng điều chỉnh size premium nếu khớp loại sản phẩm
      if (productType === 'jersey' && isApparelSizePremium) {
        basePrice += sizeMod;
      } else if (productType === 'shoes' && isShoeSizePremium) {
        basePrice += sizeMod;
      }
      // Các size không có premium (S, M, L, 39-42) sẽ có sizeMod = 0 hoặc sizeMod không được thêm vào
    }


    // 4. Cộng thêm phí dịch vụ in ấn (chỉ áp dụng cho Áo đấu)
    if (productType === 'jersey' && hasPrinting) {
      basePrice += this.PRICE_LIST.fee.printing;
    }

    return Math.max(0, basePrice);
  }
}

const priceManager = new PriceManager(); // Khởi tạo PriceManager


// =========================================================
// B. HÀM TẠO KHUÔN MẪU VÀ LOGIC FORM SẢN PHẨM ĐỘNG
// =========================================================

// 1. KHUÔN MẪU HTML CHO MỘT SẢN PHẨM
function createProductTemplate(id) {
  const printingFeeDisplay = priceManager.formatCurrency(priceManager.PRICE_LIST.fee.printing);

  return `
        <div class="product-item" data-product-id="${id}" id="item-${id}" 
            style="padding-top: 15px; margin-bottom: 30px; border-top: 1px dashed #555;">
            
            <h4 style="color: #FF9800; margin-bottom: 15px;">
                Sản Phẩm ${id}
                ${id > 1 ? `<span onclick="removeProductForm(${id})" 
                                style="float: right; color: #FF4444; font-size: 24px; cursor: pointer; line-height: 0.5;">&times;</span>` : ''}
            </h4>
            
            <label for="productType-${id}">Loại Sản Phẩm: <span>*</span></label>
            <select id="productType-${id}" name="productType-${id}" required onchange="handleProductLogic(${id}); updateOrderSummary();">
                <option value="">-- Chọn loại --</option>
                <option value="jersey">Áo đấu</option>
                <option value="shoes">Giày bóng đá</option>
                <option value="accessory">Phụ kiện</option>
            </select>

            <label for="teamName-${id}" id="teamNameLabel-${id}" style="display: none;">CLB / Đội tuyển:</label>
            <input type="text" id="teamName-${id}" name="teamName-${id}" placeholder="Ví dụ: Manchester United, Việt Nam..." style="display: none;">

            <label for="size-${id}">Kích thước (Size):</label>
            <select id="size-${id}" name="size-${id}" required onchange="updateOrderSummary()">
                <option value="">-- Chọn kích thước --</option>
                <option value="S">S</option><option value="M">M</option><option value="L">L</option>
                <option value="XL">XL</option><option value="XXL">XXL</option>
                <option value="39">39 (Giày)</option><option value="40">40 (Giày)</option>
                <option value="41">41 (Giày)</option><option value="42">42 (Giày)</option>
                <option value="43">43 (Giày - +50k)</option>
                <option value="44">44 (Giày - +80k)</option>
                <option value="45">45 (Giày - +100k)</option>
                <option value="46">46 (Giày - +150k)</option>
            </select>
            <button type="button" class="size-btn">Xem bảng size</button>
            <br>

            <label for="brandSelect-${id}">Thương hiệu:</label>
            <select id="brandSelect-${id}" name="brand-${id}" required onchange="handleProductLogic(${id}); updateOrderSummary();">
                <option value="">-- Chọn thương hiệu --</option>
                <option value="Nike">Nike</option><option value="Adidas">Adidas</option>
                <option value="Puma">Puma</option><option value="UnderArmour">Under Armour</option>
                <option value="Other">Khác</option>
            </select>
            <input type="text" id="otherBrand-${id}" name="otherBrand-${id}" placeholder="Nhập thương hiệu khác" style="display:none;">
            
            <label for="printing-${id}" style="display: none; align-items: center; margin-top: 15px;">
                <input type="checkbox" id="printing-${id}" name="printing-${id}" onchange="updateOrderSummary()" style="width: auto; margin-right: 10px; height: 16px;">
                Dịch vụ In Tên/Số (Phí: ${printingFeeDisplay})
            </label>

            <label for="color-${id}">Màu sắc:</label>
            <input type="text" id="color-${id}" name="color-${id}" placeholder="Đỏ / Trắng / Xanh..." oninput="updateOrderSummary()">

            <label for="quantitySelect-${id}">Số lượng:</label>
            <input type="number" id="quantitySelect-${id}" name="quantity-${id}" min="1" value="1" oninput="updateOrderSummary()">

            <label style="margin-top: 15px;">Giá tiền Sản phẩm này:</label>
            <span id="displayPrice-${id}" style="font-weight: bold; color: #d9534f;">0 VNĐ</span>
        </div>
    `;
}

// 2. HÀM THÊM MỘT KHỐI SẢN PHẨM VÀO TRANG
function addProductForm() {
  productCounter++;
  const container = document.getElementById('dynamic-product-forms');
  const newForm = createProductTemplate(productCounter);
  container.insertAdjacentHTML('beforeend', newForm);
  handleProductLogic(productCounter);
  updateOrderSummary();
}

// 3. HÀM XÓA MỘT KHỐI SẢN PHẨM
function removeProductForm(id) {
  const elementToRemove = document.querySelector(`.product-item[data-product-id="${id}"]`);
  if (elementToRemove) {
    elementToRemove.remove();
    updateOrderSummary();
  }
}

// 4. HÀM XỬ LÝ LOGIC ẨN/HIỆN (CLB, Thương hiệu khác, In ấn)
function handleProductLogic(id) {
  const productType = document.getElementById(`productType-${id}`).value;
  const teamNameInput = document.getElementById(`teamName-${id}`);
  const teamNameLabel = document.getElementById(`teamNameLabel-${id}`);
  const brandSelect = document.getElementById(`brandSelect-${id}`).value;
  const otherBrandInput = document.getElementById(`otherBrand-${id}`);
  const printingCheckbox = document.getElementById(`printing-${id}`);

  // Logic Áo đấu (CLB)
  const isJersey = productType === 'jersey';
  teamNameInput.style.display = isJersey ? 'block' : 'none';
  teamNameLabel.style.display = isJersey ? 'block' : 'none';
  if (!isJersey) teamNameInput.value = '';

  // Logic In ấn (Chỉ Áo đấu)
  if (printingCheckbox) {
    if (isJersey) {
      printingCheckbox.parentElement.style.display = 'flex';
    } else {
      printingCheckbox.parentElement.style.display = 'none';
      printingCheckbox.checked = false;
    }
  }

  // Logic Thương hiệu khác
  otherBrandInput.style.display = brandSelect === 'Other' ? 'block' : 'none';
  if (brandSelect !== 'Other') otherBrandInput.value = '';

  // Bắt buộc tính giá
  calculateProductPrice(id);
}

// 5. HÀM TÍNH GIÁ CỦA RIÊNG TỪNG SẢN PHẨM
function calculateProductPrice(id) {
  const productType = document.getElementById(`productType-${id}`).value;
  const size = document.getElementById(`size-${id}`).value;
  const quantity = parseInt(document.getElementById(`quantitySelect-${id}`).value) || 1;
  const brand = document.getElementById(`brandSelect-${id}`).value;
  const hasPrinting = document.getElementById(`printing-${id}`) ? document.getElementById(`printing-${id}`).checked : false;

  // LẤY GIÁ CƠ BẢN TỪ CLASS
  const singleItemPrice = priceManager.calculatePrice(productType, brand, size, hasPrinting);

  // TÍNH TỔNG TIỀN
  const finalItemPrice = singleItemPrice * quantity;

  // Hiển thị giá
  document.getElementById(`displayPrice-${id}`).innerText = priceManager.formatCurrency(finalItemPrice);

  // Kêu gọi cập nhật tóm tắt
  updateOrderSummary();
}


// =========================================================
// C. HÀM CẬP NHẬT TÓM TẮT ĐƠN HÀNG TỔNG THỂ
// =========================================================

function updateOrderSummary() {
  const productItems = document.querySelectorAll('.product-item');
  let summaryText = '';
  let grandTotalQuantity = 0;
  let grandTotalAmount = 0;

  if (productItems.length === 0) {
    summaryText = '<p style="color: #aaa;">Chưa có sản phẩm nào được thêm.</p>';
  } else {
    productItems.forEach((item) => {
      const id = item.dataset.productId;

      // Lấy các tham số cần thiết
      const productType = document.getElementById(`productType-${id}`).value;
      const size = document.getElementById(`size-${id}`).value;
      const brandSelect = document.getElementById(`brandSelect-${id}`);
      const brand = brandSelect ? brandSelect.value : '';
      const quantity = parseInt(document.getElementById(`quantitySelect-${id}`).value) || 0;
      const hasPrinting = document.getElementById(`printing-${id}`) ? document.getElementById(`printing-${id}`).checked : false;

      // Tính giá sử dụng PriceManager
      const singleItemPrice = priceManager.calculatePrice(productType, brand, size, hasPrinting);
      const itemTotal = singleItemPrice * quantity;

      // Đảm bảo rằng giá hiển thị trên form chi tiết (displayPrice) cũng được cập nhật
      // Đây là bước quan trọng để đồng bộ hóa, phòng trường hợp sự kiện bị bỏ qua.
      document.getElementById(`displayPrice-${id}`).innerText = priceManager.formatCurrency(itemTotal);

      grandTotalQuantity += quantity;
      grandTotalAmount += itemTotal;

      // Lấy tên sản phẩm hiển thị
      const productName = document.getElementById(`productType-${id}`).options[document.getElementById(`productType-${id}`).selectedIndex].text || "Sản Phẩm Mới";

      // Xây dựng chuỗi tóm tắt cho từng sản phẩm
      let printingNote = hasPrinting ? ' (+In)' : '';
      summaryText += `
                <p style="margin: 5px 0; color: #ccc; font-size: 14px;">
                    ${quantity}x ${productName} (${brand}) - Size ${size}${printingNote} | ${priceManager.formatCurrency(itemTotal)}
                </p>
            `;
    });
  }

  // Cập nhật nội dung vào Summary Box
  document.getElementById('summary-details').innerHTML = summaryText;
  document.getElementById('summary-quantity').innerText = grandTotalQuantity;
  document.getElementById('summary-total-price').innerText = priceManager.formatCurrency(grandTotalAmount);
}


// =========================================================
// D. LOGIC COUNTDOWN & POPUP
// =========================================================

function startCountdown() {
  let countDownDate = new Date().getTime() + 7200000;

  const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const timerElement = document.getElementById("countdown-timer");
    if (timerElement) {
      document.getElementById("days").innerText = String(days).padStart(2, '0');
      document.getElementById("hours").innerText = String(hours).padStart(2, '0');
      document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
      document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    }

    if (distance < 0) {
      clearInterval(x);
      if (timerElement) {
        timerElement.innerHTML = "ƯU ĐÃI ĐÃ KẾT THÚC";
      }
    }
  }, 1000);
}


function setupSizePopupLogic() {
  const popup = document.getElementById('sizePopup');
  const closePopupBtn = document.getElementById('closePopup');

  if (!popup || !closePopupBtn) return;

  // 1. Gán sự kiện đóng popup
  closePopupBtn.onclick = () => popup.style.display = 'none';
  window.onclick = (event) => {
    if (event.target == popup) popup.style.display = 'none';
  }

  // 2. Gán sự kiện mở popup cho TẤT CẢ các nút "Xem bảng size"
  document.body.addEventListener('click', function(event) {
    if (event.target.classList.contains('size-btn')) {
      popup.style.display = 'block';
    }
  });
}


// =========================================================
// E. LOGIC LƯU VÀ TẢI THÔNG TIN KHÁCH HÀNG (LOCAL STORAGE)
// =========================================================

// Hàm lưu thông tin khách hàng vào LocalStorage
function saveCustomerInfo() {
  const customerData = {};
  customerFields.forEach(fieldId => {
    const input = document.getElementById(fieldId);
    if (input) {
      customerData[fieldId] = input.value;
    }
  });
  localStorage.setItem('customerOrderInfo', JSON.stringify(customerData));
}

// Hàm tải thông tin khách hàng từ LocalStorage
function loadCustomerInfo() {
  const savedData = localStorage.getItem('customerOrderInfo');
  if (savedData) {
    try {
      const customerData = JSON.parse(savedData);
      customerFields.forEach(fieldId => {
        const input = document.getElementById(fieldId);
        if (input && customerData[fieldId] !== undefined) {
          input.value = customerData[fieldId];
        }
      });
    } catch (e) {
      console.error("Lỗi khi phân tích dữ liệu khách hàng từ LocalStorage:", e);
    }
  }
}

// Hàm thiết lập sự kiện cho form người mua
function setupCustomerInputListeners() {
  const form = document.querySelector('.customer-section');
  if (form) {
    // Lắng nghe sự kiện input trên toàn bộ khối form người mua
    form.addEventListener('input', saveCustomerInfo);
  }

  // Thêm chức năng cho nút "Lưu thông tin"
  const saveButton = form.querySelector('.button-wrap button');
  if (saveButton) {
    saveButton.onclick = function() {
      saveCustomerInfo();
      alert("Đã lưu thông tin tạm thời! Bạn có thể tiếp tục đặt hàng.");
    };
  }
}


// =========================================================
// F. HÀM KHỞI CHẠY CHÍNH
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Khởi tạo form sản phẩm đầu tiên
  const container = document.getElementById('dynamic-product-forms');
  if (container && container.children.length === 0) {
    container.innerHTML = createProductTemplate(1);
  }

  // 2. Tải thông tin khách hàng đã lưu & Setup listeners
  loadCustomerInfo();
  setupCustomerInputListeners();

  // 3. Chạy logic cho form sản phẩm đầu tiên
  handleProductLogic(1);

  // 4. Setup logic bảng size popup
  setupSizePopupLogic();

  // 5. Khởi tạo tóm tắt đơn hàng
  updateOrderSummary();

  // 6. Bắt đầu đếm ngược
  startCountdown();
});

const submitButton = document.querySelector('.submit-button');

submitButton.disabled = true;
submitButton.innerText = 'Đang xử lý...';
submitButton.style.backgroundColor = '#4A4A4A'; // Màu xám để báo hiệu đã vô hiệu hóa

setTimeout(() => {
  // 2. PHẢN HỒI THÀNH CÔNG
  alert("Đơn hàng đã được gửi thành công! Cảm ơn bạn.");
  document.querySelector('form').reset(); // Xóa form

  // 3. Khôi phục trạng thái nút
  submitButton.disabled = false;
  submitButton.innerText = 'GỬI ĐƠN HÀNG NGAY';
  submitButton.style.backgroundColor = '#d9534f'; // Màu đỏ ban đầu
}, 1500); // 1.5 giây giả lập thời gian gửi

function validateForm() {
  // ... (logic kiểm tra dữ liệu như cũ) ...

  if (!isValid) {
    // Tìm và cuộn đến trường bị lỗi đầu tiên
    const firstInvalid = document.querySelector('input[style*="2px solid #FF4444"], select[style*="2px solid #FF4444"], textarea[style*="2px solid #FF4444"]');
    if (firstInvalid) {
      firstInvalid.focus(); // Tập trung vào trường đó
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Cuộn mượt đến giữa màn hình
    }

    alert("Vui lòng điền đầy đủ và chính xác các thông tin bắt buộc (*).");
  }

  return isValid;
}