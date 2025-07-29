 document.getElementById("RegisterBtn").addEventListener("click", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (email === "rara@gmail.com" && password === "rara123") {
        localStorage.setItem("isRegisterIn", "true");
        alert("✅ Register berhasil!");
        window.location.href = "/Project AAS El (1)/Project AAS El/home page/home.html";
      } else {
        alert("❌ Email atau password salah.");
      }
    });