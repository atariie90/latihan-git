const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
let selectedItems = cartItems.map((_, i) => i);

const container = document.getElementById('cartContainer');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const selectAllBox = document.getElementById('selectAll');
const checkoutBtn = document.getElementById('checkoutBtn');
const deliveryCost = 150000;
const deliveryInfoEl = document.getElementById('deliveryinfo'); // Pastikan ID-nya sesuai

function formatRupiah(number) {
  return "Rp " + number.toLocaleString("id-ID") + ",00";
}

function updateSummary() {
  const subtotal = selectedItems.reduce((sum, idx) => {
    const item = cartItems[idx];
    return sum + item.price * item.quantity;
  }, 0);

  subtotalEl.textContent = formatRupiah(subtotal);

  if (selectedItems.length === 0) {
    totalEl.textContent = formatRupiah(0);
    if (deliveryInfoEl) deliveryInfoEl.style.display = "none";
  } else {
    totalEl.textContent = formatRupiah(subtotal + deliveryCost);
    if (deliveryInfoEl) deliveryInfoEl.style.display = "flex";
  }
}

function toggleSelectAll() {
  if (selectedItems.length === cartItems.length) {
    selectedItems = [];
  } else {
    selectedItems = cartItems.map((_, i) => i);
  }
  renderCart();
  updateSummary();
}

function toggleItemSelection(index) {
  if (selectedItems.includes(index)) {
    selectedItems = selectedItems.filter(i => i !== index);
  } else {
    selectedItems.push(index);
  }
  renderCart();
  updateSummary();
}

function updateQuantity(index, delta) {
  cartItems[index].quantity = Math.max(1, cartItems[index].quantity + delta);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  renderCart();
  updateSummary();
}

function deleteItem(index) {
  cartItems.splice(index, 1);
  selectedItems = selectedItems.filter(i => i !== index);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  renderCart();
  updateSummary();
}

function renderCart() {
  container.innerHTML = "";

  cartItems.forEach((item, index) => {
    const isChecked = selectedItems.includes(index);
    const totalPerItem = item.price * item.quantity;

    const div = document.createElement('div');
    div.className = "flex items-start bg-white p-4 rounded-lg shadow gap-4";

    div.innerHTML = `
      <input type="checkbox" class="product-check mt-2" ${isChecked ? 'checked' : ''}>
      <img src="${item.thumbnail}" class="w-20 h-20 object-cover" />
      <div class="flex-1">
        <h4 class="font-bold">${item.brand}</h4>
        <p class="text-sm text-gray-500">${item.title}<br>${item.description}</p>
        <p class="text-sm text-gray-700 mt-1">Harga Satuan: ${formatRupiah(item.price)}</p>
        <p class="text-sm text-blue-600 font-medium">Total Produk: <span class="item-total">${formatRupiah(totalPerItem)}</span></p>
        <button class="delete-item text-red-500 text-sm mt-2 hover:underline">Hapus</button>
      </div>
      <div class="text-right">
        <div class="flex items-center gap-2 mt-2">
          <button class="minus bg-gray-200 w-6 h-6">−</button>
          <span>${item.quantity}</span>
          <button class="plus bg-gray-200 w-6 h-6">+</button>
        </div>
        <p class="text-sm text-gray-500 mt-1">Stok: ${item.stock}</p>
      </div>
    `;

    div.querySelector('.product-check').addEventListener('change', () => toggleItemSelection(index));
    div.querySelector('.plus').addEventListener('click', () => updateQuantity(index, 1));
    div.querySelector('.minus').addEventListener('click', () => updateQuantity(index, -1));
    div.querySelector('.delete-item').addEventListener('click', () => deleteItem(index));

    container.appendChild(div);
  });

  selectAllBox.checked = selectedItems.length === cartItems.length && cartItems.length > 0;
}

function goToCheckout() {
  localStorage.setItem('cart', JSON.stringify(cartItems));
  localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
  window.location.href = '/Project AAS El (1)/Project AAS El/checkout/checkout.html';
}

selectAllBox.addEventListener('change', toggleSelectAll);
checkoutBtn.addEventListener('click', goToCheckout);

renderCart();
updateSummary();
