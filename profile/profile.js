let editing = false;

    function toggleEdit() {
      editing = !editing;

      // Toggle all elements
      const fields = ["name", "dob", "gender", "email", "phone", "address"];
      fields.forEach(field => {
        const textEl = document.getElementById(field + "Text");
        const inputEl = document.getElementById(field + "Input");
        if (editing) {
          textEl.classList.add("hidden");
          inputEl.classList.remove("hidden");
        } else {
          // Save values
          if (inputEl.tagName === "INPUT" || inputEl.tagName === "TEXTAREA" || inputEl.tagName === "SELECT") {
            textEl.textContent = inputEl.value || "Not set";
          }
          textEl.classList.remove("hidden");
          inputEl.classList.add("hidden");
        }
      });

      // Ganti tombol teks
      document.getElementById("toggleEditBtn").textContent = editing ? "Save" : "Edit Profile";
    }