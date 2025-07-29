function openModal() {
  document.getElementById('successModal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('successModal').classList.add('hidden');
}

function formatRupiah(number) {
  return "Rp " + number.toLocaleString("id-ID") + ",00";
}

function renderCheckout(products) {
  const container = document.getElementById('product-card');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');
  const deliveryCost = 50000;

  container.innerHTML = '';
  let subtotal = 0;

  products.forEach(product => {
    const itemHTML = `
      <div class="flex items-center gap-4 border-b pb-4 mb-4">
        <img src="${product.thumbnail}" alt="product" class="w-20 h-20 rounded object-cover" />
        <div class="flex-grow">
          <p class="font-semibold">${product.title}</p>
          <p class="text-sm text-gray-600">Brand: ${product.brand}</p>
          <p class="text-sm">Qty: ${product.quantity}</p>
        </div>
        <p class="font-semibold">${formatRupiah(product.price * product.quantity)}</p>
      </div>
    `;
    container.innerHTML += itemHTML;
    subtotal += product.price * product.quantity;
  });

  subtotalEl.innerText = formatRupiah(subtotal);
  totalEl.innerText = formatRupiah(subtotal + deliveryCost);
}

function fetchCheckoutData() {
  const directProduct = JSON.parse(localStorage.getItem('checkoutNow'));
  const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
  const selectedIndexes = JSON.parse(localStorage.getItem('selectedItems')) || [];

  if (directProduct) {
    renderCheckout([directProduct]);
    localStorage.removeItem('checkoutNow'); // Bersihkan setelah digunakan
  } else if (selectedIndexes.length > 0) {
    const selectedProducts = selectedIndexes
      .map(index => cartProducts[index])
      .filter(item => item); // jaga-jaga kalau ada indeks kosong
    renderCheckout(selectedProducts);
  } else {
    document.getElementById('product-card').innerHTML = `
      <p class='text-center text-red-500 mt-8'>Tidak ada produk yang dipilih untuk checkout.</p>
    `;
    document.getElementById('subtotal').innerText = formatRupiah(0);
    document.getElementById('total').innerText = formatRupiah(0);
  }
}

fetchCheckoutData();
