// Ambil id
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

function addToCart(product, quantity) {
  if (quantity < 1) {
    alert("❌ Jumlah tidak valid.");
    return;
  }

  if (quantity > product.stock) {
    alert("❌ Stok tidak mencukupi.");
    return;
  }

  const convertedPrice = product.price * 16000;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingIndex = cart.findIndex(item => item.id === product.id);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      description: product.description,
      thumbnail: product.thumbnail,
      brand: product.brand,
      price: convertedPrice,
      stock: product.stock,
      quantity: quantity
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("✔ Berhasil ditambahkan ke keranjang!");
}

// Fetch produk 
fetch(`https://dummyjson.com/products/${productId}`)
  .then(res => res.json())
  .then(product => {
    const container = document.getElementById('product-container');

    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 border-b pb-6">
        <div>
          <img id="mainImage" src="${product.thumbnail}" alt="${product.title}" class="rounded-md shadow-md w-full h-[300px] object-cover mb-2" />
        </div>
        <div>
          <h2 class="text-xl font-semibold">${product.title}</h2>
          <p class="mt-2 text-gray-700">${product.description}</p>
          <div class="text-red-600 text-2xl font-bold mt-4">Rp${(product.price * 16000).toLocaleString()}</div>
          <div class="mt-4">
            <p class="text-sm font-semibold">Category</p>
            <p class="text-sm text-gray-600">${product.category}</p>
          </div>
          <div class="mt-4">
            <p class="text-sm font-semibold">Stock</p>
            <p class="text-sm text-gray-600">${product.stock}</p>
          </div>
          <div class="mt-4">
            <label for="qty" class="text-sm font-semibold mb-1 block">Quantity</label>
            <input id="qty" type="number" min="1" value="1" class="w-20 border px-2 py-1 text-sm rounded text-center" />
          </div>
          <div class="mt-6 flex gap-4">
            <button id="addToCartBtn" class="bg-[#8B0000] hover:bg-[#a50000] text-white px-6 py-2 rounded-full text-sm">
              Add to Cart
            </button>
            <button id="checkoutNowBtn" class="bg-[#8B0000] hover:bg-[#a50000] text-white px-6 py-2 rounded-full text-sm">
              Checkout
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("addToCartBtn").addEventListener("click", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    window.location.href = "/Project AAS El (1)/Project AAS El/login regis/login.html";
    return;
  }

  const qty = parseInt(document.getElementById("qty").value);
  addToCart(product, qty);
});

      document.getElementById("checkoutNowBtn").addEventListener("click", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    window.location.href = "/Project AAS El (1)/Project AAS El/login regis/login.html";
    return;
  }

  const qty = parseInt(document.getElementById("qty").value);
  if (qty < 1 || qty > product.stock) {
    alert("❌ Jumlah tidak valid.");
    return;
  }
        const checkoutProduct = {
          id: product.id,
          title: product.title,
          thumbnail: product.thumbnail,
          brand: product.brand,
          price: product.price * 16000,
          stock: product.stock,
          quantity: qty
        };

        localStorage.setItem("checkoutNow", JSON.stringify(checkoutProduct));
  window.location.href = "/Project AAS El (1)/Project AAS El/checkout/checkout.html";
});

    // Fetch produk dari kategori yang sama
    return fetch(`https://dummyjson.com/products/category/${product.category}?limit=4`);
  })
  .then(res => res.json())
  .then(data => {
    const sameStoreContainer = document.getElementById("samestore-products");

    data.products.forEach(product => {
      const card = document.createElement("div");
      card.className = "bg-white rounded-lg shadow p-4 flex flex-col items-center text-center hover:shadow-lg transition";

      card.innerHTML = `
        <a href="product.html?id=${product.id}">
          <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-40 object-cover rounded mb-2">
          <h3 class="font-semibold text-sm">
            ${product.title.length > 20 ? product.title.slice(0, 20) + '...' : product.title}
          </h3>
          <p class="text-red-600 font-bold">Rp${(product.price * 15000).toLocaleString()}</p>
        </a>
      `;

      sameStoreContainer.appendChild(card);
    });
  })
  .catch(err => {
    document.getElementById('product-container').innerHTML = `<p class="text-center text-red-600 mt-8">Failed to load product data.</p>`;
    console.error(err);
  });
