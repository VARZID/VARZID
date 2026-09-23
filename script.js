document.addEventListener("DOMContentLoaded", () => {
    const categoryToggle = document.getElementById("categoryToggle");
    const categoryMenu = document.getElementById("categoryMenu");
    const categoryListContainer = document.getElementById("categoryListContainer");
    
    const settingsBtn = document.getElementById("settingsBtn");
    const settingsModal = document.getElementById("settingsModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    
    const adminCodeInput = document.getElementById("adminCodeInput");
    const adminLoginBtn = document.getElementById("adminLoginBtn");
    
    const addProductBtn = document.getElementById("addProductBtn");
    const addCategoryStartBtn = document.getElementById("addCategoryStartBtn");
    const addCategoryEndBtn = document.getElementById("addCategoryEndBtn");
    
    const addProductModal = document.getElementById("addProductModal");
    const closeProdModalBtn = document.getElementById("closeProdModalBtn");
    const saveProductBtn = document.getElementById("saveProductBtn");
    
    const dayModeBtn = document.getElementById("dayModeBtn");
    const nightModeBtn = document.getElementById("nightModeBtn");
    const productsGallery = document.getElementById("productsGallery");

    // Кушодани менюи категорияҳо
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

    // Санҷиши коди админ (1604)
    adminLoginBtn.addEventListener("click", () => {
        if (adminCodeInput.value === "1604") {
            varzidData.isAdmin = true;
            alert("Режим админа активирован!");
            settingsModal.classList.add("hidden");
            updateAdminUI();
        } else {
            alert("Неверный код!");
        }
    });

    function updateAdminUI() {
        if (varzidData.isAdmin) {
            addProductBtn.classList.remove("hidden");
            addCategoryStartBtn.classList.remove("hidden");
            addCategoryEndBtn.classList.remove("hidden");
            renderProducts(varzidData.products);
        }
    }

    // Танзими режимҳо
    dayModeBtn.addEventListener("click", () => {
        document.documentElement.setAttribute("data-theme", "light");
    });

    nightModeBtn.addEventListener("click", () => {
        document.documentElement.setAttribute("data-theme", "dark");
    });

    // Илова кардани категория бо тугмаи +
    function handleAddCategory() {
        if (!varzidData.isAdmin) return;
        const catName = prompt("Введите название новой категории:");
        if (catName) {
            const catId = "cat_" + Date.now();
            varzidData.categories.push({ id: catId, name: catName });
            renderCategories();
        }
    }

    addCategoryStartBtn.addEventListener("click", handleAddCategory);
    addCategoryEndBtn.addEventListener("click", handleAddCategory);

    // Кушодани модали иловаи маҳсулот
    addProductBtn.addEventListener("click", () => {
        const catSelect = document.getElementById("newProdCategory");
        catSelect.innerHTML = "";
        varzidData.categories.forEach(cat => {
            if (cat.id !== "all") {
                const opt = document.createElement("option");
                opt.value = cat.id;
                opt.textContent = cat.name;
                catSelect.appendChild(opt);
            }
        });
        addProductModal.classList.remove("hidden");
    });

    closeProdModalBtn.addEventListener("click", () => {
        addProductModal.classList.add("hidden");
    });

    // Захира кардани маҳсулот (бо то 10 акс)
    saveProductBtn.addEventListener("click", () => {
        const title = document.getElementById("newProdTitle").value;
        const category = document.getElementById("newProdCategory").value;
        const price = document.getElementById("newProdPrice").value;
        const unit = document.getElementById("newProdUnit").value;
        const description = document.getElementById("newProdDesc").value;
        const imageFiles = document.getElementById("newProdImages").files;

        if (!title || !price) {
            alert("Заполните обязательные поля!");
            return;
        }

        if (imageFiles.length > 10) {
            alert("Можно загрузить не более 10 фотографий!");
            return;
        }

        let images = [];
        for (let i = 0; i < imageFiles.length; i++) {
            images.push(URL.createObjectURL(imageFiles[i]));
        }

        const newProduct = {
            id: Date.now(),
            title,
            category,
            price: parseFloat(price),
            unit: unit || "шт",
            description,
            images
        };

        varzidData.products.push(newProduct);
        addProductModal.classList.add("hidden");
        renderProducts(varzidData.products);
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
            
            let htmlContent = `
                <div class="product-title">${p.title}</div>
                <div class="product-price">${p.price} сомони / ${p.unit}</div>
                <div class="product-desc">${p.description}</div>
            `;

            // Тугмаи сурхи удаления (×) танҳо барои админ
            if (varzidData.isAdmin) {
                htmlContent += `<button class="delete-product-btn" onclick="deleteProduct(${p.id})">×</button>`;
            }

            card.innerHTML = htmlContent;
            productsGallery.appendChild(card);
        });
    }

    window.deleteProduct = function(id) {
        if (!varzidData.isAdmin) return;
        if (confirm("Вы уверены, что хотите удалить товар?")) {
            varzidData.products = varzidData.products.filter(p => p.id !== id);
            renderProducts(varzidData.products);
        }
    };

    function filterProducts(catId) {
        if (catId === "all") {
            renderProducts(varzidData.products);
        } else {
            const filtered = varzidData.products.filter(p => p.category === catId);
            renderProducts(filtered);
        }
    }

    renderProducts(varzidData.products);
});
