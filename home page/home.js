// 1. Fetch product utama (Flash Sale)
fetch("https://dummyjson.com/products/category/mens-shoes?limit=4")
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector(".products");
    data.products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card cursor-pointer";

      card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <h3>${product.title.length > 20 ? product.title.slice(0, 20) + '...' : product.title}</h3>
        <p>Rp${(product.price * 15000).toLocaleString()}</p>
      `;

      card.addEventListener("click", () => {
        window.location.href = '/Project AAS El (1)/Project AAS El/product/product.html?id=' + product.id;
      });

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Failed to fetch products:", error);
  });

  // 2. Timer countdown flash sale
const timerEl = document.querySelector(".timer");
let count = 60 * 60 * 2;

function updateTimer() {
  const hours = String(Math.floor(count / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((count % 3600) / 60)).padStart(2, '0');
  const seconds = String(count % 60).padStart(2, '0');
  timerEl.textContent = `${hours}:${minutes}:${seconds}`;
  if (count > 0) count--;
}
setInterval(updateTimer, 1000);
updateTimer();

// 3. Fetch for-you section
fetch("https://dummyjson.com/products/category/mens-shoes?limit=4")
  .then(response => response.json())
  .then(data => {
    const forYouContainer = document.getElementById("foryou-products");
    data.products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card cursor-pointer";

      card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <h3>${product.title.length > 20 ? product.title.slice(0, 20) + '...' : product.title}</h3>
        <p>Rp${(product.price * 15000).toLocaleString()}</p>
      `;

      card.addEventListener("click", () => {
        window.location.href = '/Project AAS El (1)/Project AAS El/product/product.html?id=' + product.id;
      });

      forYouContainer.appendChild(card);
    });
  })
  .catch(err => console.error("Failed to load For You products:", err));
