
document.addEventListener("DOMContentLoaded", () => {
    const categoryToggle = document.getElementById("categoryToggle");
    const categoryMenu = document.getElementById("categoryMenu");
    const categoryListContainer = document.getElementById("categoryListContainer");
    
    const settingsBtn = document.getElementById("settingsBtn");
    const settingsModal = document.getElementById("settingsModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    
    const dayModeBtn = document.getElementById("dayModeBtn");
    const nightModeBtn = document.getElementById("nightModeBtn");
    const langSelect = document.getElementById("langSelect");
    const productsGallery = document.getElementById("productsGallery");

    // Кушодани менюи категорияҳо бо тирча
    categoryToggle.addEventListener("click", () => {
        categoryMenu.classList.toggle("hidden");
        renderCategories();
    });

    // Кушодани танзимот
    settingsBtn.addEventListener("click", () => {
        settingsModal.classList.remove("hidden");
    });

    closeModalBtn.addEventListener("click", () => {
        settingsModal.classList.add("hidden");
    });

    // Танзими режимҳо
    dayModeBtn.addEventListener("click", () => {
        document.documentElement.setAttribute("data-theme", "light");
    });

    nightModeBtn.addEventListener("click", () => {
        document.documentElement.setAttribute("data-theme", "dark");
    });

    // Намоиши категорияҳо
    function renderCategories() {
        categoryListContainer.innerHTML = "";
        varzidData.categories.forEach(cat => {
            const btn = document.createElement("button");
            btn.className = "category-btn";
            btn.textContent = cat.name;
            btn.addEventListener("click", () => {
                filterProducts(cat.id);
            });
            categoryListContainer.appendChild(btn);
        });
    }

    // Намоиши маҳсулот
    function renderProducts(productsToRender) {
        productsGallery.innerHTML = "";
        productsToRender.forEach(p => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <div class="product-title">${p.title}</div>
                <div class="product-price">${p.price} сомони / ${p.unit}</div>
                <div class="product-desc">${p.description}</div>
            `;
            productsGallery.appendChild(card);
        });
    }

    function filterProducts(catId) {
        if (catId === "all") {
            renderProducts(varzidData.products);
        } else {
            const filtered = varzidData.products.filter(p => p.category === catId);
            renderProducts(filtered);
        }
    }

    // Боркунии аввалия
    renderProducts(varzidData.products);
});
