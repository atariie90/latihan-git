  // 1. Fetch product utama
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

        // Klik produk -> redirect ke detailproduk.html dengan ID
        card.addEventListener("click", () => {
  window.location.href = `/Project AAS El (1)/Project AAS El/product/product.html?id=${product.id}`;
});
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Failed to fetch products:", error);
    });

  // 2. Timer countdown
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
  window.location.href = `/Project AAS El (1)/Project AAS El/login regis/login.html?id=${product.id}`;
});

        forYouContainer.appendChild(card);
      });
    })
    .catch(err => console.error("Failed to load For You products:", err));

  // 4. Hover efek logo dan icon
  document.querySelectorAll('.footer-logo, .social-icon').forEach(img => {
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.1)';
    });
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });

  // 5. Dropdown profile
  const btn = document.getElementById("profileBtn");
  const menu = document.getElementById("profileMenu");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("hidden");
  });

  window.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.add("hidden");
    }
  });


