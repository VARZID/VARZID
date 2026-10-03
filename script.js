"use strict";

/* =========================
   VARZID — MAIN SCRIPT
   ========================= */

const CATEGORY_KEY = "varzid_categories";
const PRODUCTS_KEY = "varzid_products";
const OLD_PRODUCTS_KEY = "varzid_custom_products";

let currentCategory = null;
let currentLang = localStorage.getItem("lang") || "ru";
let notificationEnabled =
    localStorage.getItem("notifications") !== "off";

/* =========================
   TRANSLATIONS
   ========================= */

const translations = {
    ru: {
        subscribers: "подписчиков",
        subscribe: "Подписаться",
        subscribed: "Вы подписаны",
        categories: "Категории",
        settings: "Настройки",
        theme: "Тема",
        notifications: "Уведомления",
        language: "Язык",
        light: "Светлая",
        dark: "Тёмная",
        system: "Системная",
        chooseTheme: "Выберите тему",
        cancel: "Отмена",
        cart: "Корзина",
        cartEmpty: "Корзина пуста.",
        total: "Итого",
        order: "Оформить заказ",
        noProducts: "В этой категории пока нет товаров.",
        noCategories: "Категорий пока нет.",
        categoryName: "Название категории",
        categoryExists: "Такая категория уже существует.",
        categoryCreated: "Категория создана.",
        categoryDeleted: "Категория удалена.",
        deleteCategory: "Удалить эту категорию?",
        enterCategory: "Введите название категории:",
        yes: "Да",
        no: "Нет",
        added: "Добавлено в корзину",
        admin: "Admin"
    },

    tg: {
        subscribers: "обуна",
        subscribe: "Обуна шудан",
        subscribed: "Шумо обуна шудед",
        categories: "Категорияҳо",
        settings: "Танзимот",
        theme: "Мавзӯъ",
        notifications: "Огоҳиномаҳо",
        language: "Забон",
        light: "Сафед",
        dark: "Торик",
        system: "Системавӣ",
        chooseTheme: "Мавзӯъро интихоб кунед",
        cancel: "Бекор кардан",
        cart: "Сабад",
        cartEmpty: "Сабад холӣ аст.",
        total: "Ҳамагӣ",
        order: "Фармоиш диҳед",
        noProducts: "Дар ин категория ҳоло маҳсулот нест.",
        noCategories: "Ҳоло категория нест.",
        categoryName: "Номи категория",
        categoryExists: "Ин категория аллакай вуҷуд дорад.",
        categoryCreated: "Категория сохта шуд.",
        categoryDeleted: "Категория нест карда шуд.",
        deleteCategory: "Ин категория нест карда шавад?",
        enterCategory: "Номи категорияро ворид кунед:",
        yes: "Ҳа",
        no: "Не",
        added: "Ба сабад илова шуд",
        admin: "Admin"
    },

    uz: {
        subscribers: "obunachi",
        subscribe: "Obuna bo‘lish",
        subscribed: "Siz obuna bo‘ldingiz",
        categories: "Kategoriyalar",
        settings: "Sozlamalar",
        theme: "Mavzu",
        notifications: "Bildirishnomalar",
        language: "Til",
        light: "Yorug‘",
        dark: "Qorong‘i",
        system: "Tizim",
        chooseTheme: "Mavzuni tanlang",
        cancel: "Bekor qilish",
        cart: "Savat",
        cartEmpty: "Savat bo‘sh.",
        total: "Jami",
        order: "Buyurtma berish",
        noProducts: "Bu kategoriyada hozircha mahsulot yo‘q.",
        noCategories: "Hozircha kategoriya yo‘q.",
        categoryName: "Kategoriya nomi",
        categoryExists: "Bu kategoriya allaqachon mavjud.",
        categoryCreated: "Kategoriya yaratildi.",
        categoryDeleted: "Kategoriya o‘chirildi.",
        deleteCategory: "Bu kategoriya o‘chirilsinmi?",
        enterCategory: "Kategoriya nomini kiriting:",
        yes: "Ha",
        no: "Yo‘q",
        added: "Savatga qo‘shildi",
        admin: "Admin"
    }
};


/* =========================
   HELPERS
   ========================= */

function t(key) {
    return (
        translations[currentLang]?.[key] ||
        translations.ru[key] ||
        key
    );
}

function getElement(id) {
    return document.getElementById(id);
}

function isAdmin() {
    return (
        sessionStorage.getItem("isAdmin") === "true" ||
        localStorage.getItem("isAdmin") === "true"
    );
}


/* =========================
   CATEGORIES
   ========================= */

function getCategories() {
    let categories = [];

    try {
        const saved = localStorage.getItem(CATEGORY_KEY);

        if (saved) {
            const parsed = JSON.parse(saved);

            if (Array.isArray(parsed)) {
                categories = parsed;
            }
        }
    } catch (error) {
        categories = [];
    }

    categories = categories
        .map(item => {
            if (typeof item === "string") {
                return item.trim();
            }

            if (item && typeof item.name === "string") {
                return item.name.trim();
            }

            return "";
        })
        .filter(Boolean);

    /* Remove old virtual/default categories */
    categories = categories.filter(name => {
        const lower = name.toLowerCase();

        return (
            lower !== "варзидан" &&
            lower !== "все" &&
            lower !== "для вас"
        );
    });

    /* Remove duplicates */
    categories = [...new Set(categories)];

    return categories;
}

function saveCategories(categories) {
    localStorage.setItem(
        CATEGORY_KEY,
        JSON.stringify(categories)
    );
}


/* =========================
   PRODUCTS
   ========================= */

function getProducts() {
    let products = {};

    try {
        let saved = localStorage.getItem(PRODUCTS_KEY);

        if (!saved) {
            saved = localStorage.getItem(OLD_PRODUCTS_KEY);
        }

        if (!saved) {
            return {};
        }

        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
            parsed.forEach((product, index) => {
                if (product && typeof product === "object") {
                    const id =
                        product.id ||
                        `product_${index}_${Date.now()}`;

                    products[id] = product;
                }
            });
        } else if (
            parsed &&
            typeof parsed === "object"
        ) {
            products = parsed;
        }
    } catch (error) {
        products = {};
    }

    return products;
}


/* =========================
   PRODUCT CATEGORY CHECK
   ========================= */

function getProductCategory(product) {
    if (!product || typeof product !== "object") {
        return "";
    }

    return String(
        product.category ||
        product.categoryName ||
        product.category_id ||
        ""
    ).trim();
}


/* =========================
   RENDER CATEGORIES
   ========================= */

function renderCategories() {
    const categoryList = getElement("categoryList");

    if (!categoryList) {
        return;
    }

    categoryList.innerHTML = "";

    const categories = getCategories();

    /* No "Все" button */

    if (categories.length === 0) {
        const empty = document.createElement("div");

        empty.className = "category-empty";
        empty.textContent = t("noCategories");

        categoryList.appendChild(empty);
    } else {
        categories.forEach(category => {
            const button = document.createElement("button");

            button.type = "button";
            button.className = "category-btn";
            button.textContent = category;

            if (currentCategory === category) {
                button.classList.add("active");
            }

            button.addEventListener("click", () => {
                currentCategory = category;

                renderCategories();
                renderProducts();

                closeBrandMenu();
            });

            categoryList.appendChild(button);
        });
    }

    /* + ONLY FOR ADMIN */

    if (isAdmin()) {
        const addButton = document.createElement("button");

        addButton.type = "button";
        addButton.className = "add-category-btn";
        addButton.textContent = "+";
        addButton.setAttribute(
            "aria-label",
            "Добавить категорию"
        );

        addButton.addEventListener(
            "click",
            addNewCategory
        );

        categoryList.appendChild(addButton);
    }
}


/* =========================
   ADD CATEGORY
   ========================= */

function addNewCategory() {
    if (!isAdmin()) {
        return;
    }

    const name = window.prompt(
        t("enterCategory")
    );

    if (name === null) {
        return;
    }

    const category = name.trim();

    if (!category) {
        return;
    }

    const forbidden = [
        "варзидан",
        "все",
        "для вас"
    ];

    if (
        forbidden.includes(
            category.toLowerCase()
        )
    ) {
        return;
    }

    const categories = getCategories();

    const exists = categories.some(
        item =>
            item.toLowerCase() ===
            category.toLowerCase()
    );

    if (exists) {
        window.alert(t("categoryExists"));
        return;
    }

    categories.push(category);

    saveCategories(categories);

    currentCategory = category;

    renderCategories();
    renderProducts();
}


/* =========================
   PRODUCTS RENDER
   ========================= */

function renderProducts() {
    const grid = getElement("productGrid");
    const title = getElement("currentCategoryTitle");
    const header = getElement("productsHeader");

    if (!grid) {
        return;
    }

    grid.innerHTML = "";

    /* No category selected */

    if (!currentCategory) {
        if (title) {
            title.textContent = "";
        }

        if (header) {
            header.style.display = "none";
        }

        return;
    }

    if (header) {
        header.style.display = "";
    }

    if (title) {
        title.textContent = currentCategory;
    }

    const products = getProducts();

    const list = Object.values(products).filter(
        product =>
            getProductCategory(product) ===
            currentCategory
    );

    if (list.length === 0) {
        const empty = document.createElement("div");

        empty.className = "products-empty";
        empty.textContent = t("noProducts");

        grid.appendChild(empty);

        return;
    }

    list.forEach(product => {
        grid.appendChild(
            createProductCard(product)
        );
    });
}


/* =========================
   PRODUCT CARD
   ========================= */

function createProductCard(product) {
    const card = document.createElement("div");

    card.className = "product-card";

    const name =
        product.name ||
        product.title ||
        "";

    const price =
        product.price ??
        "";

    const unit =
        product.unit ||
        product.saleUnit ||
        "";

    let image =
        product.image ||
        product.photo ||
        "";

    if (
        Array.isArray(product.images) &&
        product.images.length > 0
    ) {
        image = product.images[0];
    }

    if (image) {
        const img = document.createElement("img");

        img.className = "product-image";
        img.src = image;
        img.alt = name;

        card.appendChild(img);
    }

    const content = document.createElement("div");

    content.className = "product-content";

    const title = document.createElement("h3");

    title.textContent = name;

    content.appendChild(title);

    if (price !== "") {
        const priceElement =
            document.createElement("div");

        priceElement.className = "product-price";

        priceElement.textContent =
            `${price} сомонӣ` +
            (unit ? ` / ${unit}` : "");

        content.appendChild(priceElement);
    }

    card.appendChild(content);

    return card;
}


/* =========================
   BRAND MENU
   ========================= */

function openBrandMenu() {
    const menu = getElement("dropdownMenu");

    if (menu) {
        menu.classList.toggle("show");
    }
}

function closeBrandMenu() {
    const menu = getElement("dropdownMenu");

    if (menu) {
        menu.classList.remove("show");
    }
}


/* =========================
   SETTINGS
   ========================= */

function openSettings() {
    const menu = getElement("settingsMenu");

    if (menu) {
        menu.classList.toggle("show");
    }
}

function closeSettings() {
    const menu = getElement("settingsMenu");

    if (menu) {
        menu.classList.remove("show");
    }
}


/* =========================
   THEME
   ========================= */

function applyTheme(theme) {
    document.body.classList.remove(
        "light-theme",
        "dark-theme"
    );

    if (theme === "dark") {
        document.body.classList.add(
            "dark-theme"
        );
    } else if (theme === "system") {
        const dark =
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;

        document.body.classList.add(
            dark
                ? "dark-theme"
                : "light-theme"
        );
    } else {
        document.body.classList.add(
            "light-theme"
        );
    }

    const themeValue =
        getElement("themeValue");

    if (themeValue) {
        if (theme === "dark") {
            themeValue.textContent =
                t("dark");
        } else if (theme === "system") {
            themeValue.textContent =
                t("system");
        } else {
            themeValue.textContent =
                t("light");
        }
    }
}

function openThemeModal() {
    const modal = getElement("themeModal");

    if (modal) {
        modal.classList.add("show");
    }
}

function closeThemeModal() {
    const modal = getElement("themeModal");

    if (modal) {
        modal.classList.remove("show");
    }
}


/* =========================
   LANGUAGE
   ========================= */

function applyLanguage() {
    document.documentElement.lang =
        currentLang;

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {
            const key =
                element.getAttribute(
                    "data-i18n"
                );

            if (translations[currentLang]?.[key]) {
                element.textContent =
                    translations[currentLang][key];
            }
        });

    const languageValue =
        getElement("languageValue");

    if (languageValue) {
        const names = {
            ru: "Русский",
            tg: "Тоҷикӣ",
            uz: "O‘zbekcha"
        };

        languageValue.textContent =
            names[currentLang] ||
            names.ru;
    }

    renderCategories();
    renderProducts();
}

function openLanguageModal() {
    const modal =
        getElement("languageModal");

    if (modal) {
        modal.classList.add("show");
    }
}

function closeLanguageModal() {
    const modal =
        getElement("languageModal");

    if (modal) {
        modal.classList.remove("show");
    }
}


/* =========================
   NOTIFICATIONS
   ========================= */

function updateNotificationUI() {
    const status =
        getElement("notificationStatus");

    if (!status) {
        return;
    }

    if (notificationEnabled) {
        status.textContent = "ON";
        status.className = "badge-on";
    } else {
        status.textContent = "OFF";
        status.className = "badge-off";
    }
}


/* =========================
   SUBSCRIPTION
   ========================= */

function updateSubscription() {
    const count =
        Number(
            localStorage.getItem(
                "subCount"
            ) || 0
        );

    const countElement =
        getElement("subCount");

    if (countElement) {
        countElement.textContent =
            count;
    }

    const subscribed =
        localStorage.getItem(
            "isSubscribed"
        ) === "true";

    const button =
        getElement("subBtn");

    if (button) {
        button.textContent =
            subscribed
                ? t("subscribed")
                : t("subscribe");
    }
}

function subscribe() {
    const already =
        localStorage.getItem(
            "isSubscribed"
        ) === "true";

    if (already) {
        return;
    }

    localStorage.setItem(
        "isSubscribed",
        "true"
    );

    const count =
        Number(
            localStorage.getItem(
                "subCount"
            ) || 0
        ) + 1;

    localStorage.setItem(
        "subCount",
        String(count)
    );

    updateSubscription();
}


/* =========================
   CART
   ========================= */

function getCart() {
    try {
        const saved =
            localStorage.getItem(
                "varzid_cart"
            );

        return saved
            ? JSON.parse(saved)
            : [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(
        "varzid_cart",
        JSON.stringify(cart)
    );
}

function updateCartCount() {
    const cart = getCart();

    const count =
        cart.reduce(
            (total, item) =>
                total +
                Number(item.quantity || 1),
            0
        );

    const element =
        getElement("cartCount");

    if (element) {
        element.textContent = count;
    }
}

function renderCart() {
    const container =
        getElement("cartItems");

    const empty =
        getElement("cartEmpty");

    const totalElement =
        getElement("cartTotal");

    if (!container) {
        return;
    }

    const cart = getCart();

    container.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        const quantity =
            Number(item.quantity || 1);

        const price =
            Number(item.price || 0);

        total +=
            price * quantity;

        const row =
            document.createElement("div");

        row.className =
            "cart-item";

        row.textContent =
            `${item.name || ""} × ${quantity}`;

        container.appendChild(row);
    });

    if (empty) {
        empty.style.display =
            cart.length
                ? "none"
                : "";
    }

    if (totalElement) {
        totalElement.textContent =
            total;
    }

    updateCartCount();
}

function openCart() {
    const panel =
        getElement("cartPanel");

    if (panel) {
        panel.classList.add("show");
        renderCart();
    }
}

function closeCart() {
    const panel =
        getElement("cartPanel");

    if (panel) {
        panel.classList.remove("show");
    }
}


/* =========================
   ADMIN
   ========================= */

function openAdmin() {
    const element =
        getElement("adminModeToggle");

    if (!element) {
        return;
    }

    const url =
        element.getAttribute(
            "data-admin-link"
        ) || "admin.html";

    window.location.href = url;
}


/* =========================
   INITIALIZATION
   ========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* Remove old category state */

        currentCategory = null;

        /* Brand */

        const brandToggle =
            getElement("brandToggle");

        if (brandToggle) {
            brandToggle.addEventListener(
                "click",
                event => {
                    event.stopPropagation();
                    openBrandMenu();
                }
            );
        }

        /* Settings */

        const settingsToggle =
            getElement("settingsToggle");

        if (settingsToggle) {
            settingsToggle.addEventListener(
                "click",
                event => {
                    event.stopPropagation();
                    openSettings();
                }
            );
        }

        const closeSettingsHeader =
            getElement(
                "closeSettingsHeader"
            );

        if (closeSettingsHeader) {
            closeSettingsHeader.addEventListener(
                "click",
                closeSettings
            );
        }

        /* Subscription */

        const subBtn =
            getElement("subBtn");

        if (subBtn) {
            subBtn.addEventListener(
                "click",
                subscribe
            );
        }

        /* Theme */

        const themeToggle =
            getElement("themeToggle");

        if (themeToggle) {
            themeToggle.addEventListener(
                "click",
                openThemeModal
            );
        }

        document
            .querySelectorAll(".theme-option")
            .forEach(option => {
                option.addEventListener(
                    "click",
                    () => {
                        const theme =
                            option.getAttribute(
                                "data-theme"
                            );

                        if (!theme) {
                            return;
                        }

                        localStorage.setItem(
                            "theme",
                            theme
                        );

                        applyTheme(theme);
                        closeThemeModal();
                    }
                );
            });

        const themeCancel =
            getElement("themeCancel");

        if (themeCancel) {
            themeCancel.addEventListener(
                "click",
                closeThemeModal
            );
        }

        /* Language */

        const languageToggle =
            getElement("languageToggle");

        if (languageToggle) {
            languageToggle.addEventListener(
                "click",
                openLanguageModal
            );
        }

        document
            .querySelectorAll(".language-option")
            .forEach(option => {
                option.addEventListener(
                    "click",
                    () => {
                        const lang =
                            option.getAttribute(
                                "data-lang"
                            );

                        if (
                            !["ru", "tg", "uz"]
                                .includes(lang)
                        ) {
                            return;
                        }

                        currentLang = lang;

                        localStorage.setItem(
                            "lang",
                            lang
                        );

                        applyLanguage();
                        closeLanguageModal();
                    }
                );
            });

        const languageCancel =
            getElement(
                "languageCancel"
            );

        if (languageCancel) {
            languageCancel.addEventListener(
                "click",
                closeLanguageModal
            );
        }

        /* Notifications */

        const notificationToggle =
            getElement(
                "notificationToggle"
            );

        if (notificationToggle) {
            notificationToggle.addEventListener(
                "click",
                () => {
                    notificationEnabled =
                        !notificationEnabled;

                    localStorage.setItem(
                        "notifications",
                        notificationEnabled
                            ? "on"
                            : "off"
                    );

                    updateNotificationUI();
                }
            );
        }

        /* Admin */

        const adminToggle =
            getElement(
                "adminModeToggle"
            );

        if (adminToggle) {
            adminToggle.addEventListener(
                "click",
                openAdmin
            );
        }

        /* Cart */

        const cartBtn =
            getElement("cartBtn");

        if (cartBtn) {
            cartBtn.addEventListener(
                "click",
                openCart
            );
        }

        const cartClose =
            getElement("cartClose");

        if (cartClose) {
            cartClose.addEventListener(
                "click",
                closeCart
            );
        }

        /* Favorites */

        const favoritesBtn =
            getElement("favoritesBtn");

        if (favoritesBtn) {
            favoritesBtn.addEventListener(
                "click",
                () => {
                    localStorage.setItem(
                        "varzid_current_page",
                        "favorites"
                    );
                }
            );
        }

        /* Home */

        const homeBtn =
            getElement("homeBtn");

        if (homeBtn) {
            homeBtn.addEventListener(
                "click",
                () => {
                    currentCategory = null;

                    renderCategories();
                    renderProducts();
                }
            );
        }

        /* Close menus when clicking outside */

        document.addEventListener(
            "click",
            event => {

                const brand =
                    getElement(
                        "brandToggle"
                    );

                const dropdown =
                    getElement(
                        "dropdownMenu"
                    );

                const settings =
                    getElement(
                        "settingsToggle"
                    );

                const settingsMenu =
                    getElement(
                        "settingsMenu"
                    );

                if (
                    dropdown &&
                    brand &&
                    !brand.contains(event.target) &&
                    !dropdown.contains(event.target)
                ) {
                    closeBrandMenu();
                }

                if (
                    settingsMenu &&
                    settings &&
                    !settings.contains(event.target) &&
                    !settingsMenu.contains(event.target)
                ) {
                    closeSettings();
                }
            }
        );

        /* Theme */

        const savedTheme =
            localStorage.getItem(
                "theme"
            ) || "light";

        applyTheme(savedTheme);

        /* Language */

        applyLanguage();

        /* Other UI */

        updateSubscription();
        updateNotificationUI();
        updateCartCount();

        /* Categories */

        renderCategories();
        renderProducts();
    }
);
