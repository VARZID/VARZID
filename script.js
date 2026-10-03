document.addEventListener("DOMContentLoaded", () => {

    const brandToggle = document.getElementById("brandToggle");
    const dropdownMenu = document.getElementById("dropdownMenu");

    const settingsToggle = document.getElementById("settingsToggle");
    const settingsMenu = document.getElementById("settingsMenu");
    const closeSettingsHeader =
        document.getElementById("closeSettingsHeader");

    const subBtn = document.getElementById("subBtn");
    const subCount = document.getElementById("subCount");

    const categoryList = document.getElementById("categoryList");
    const addCategoryBtn =
        document.getElementById("addCategoryBtn");

    const productGrid =
        document.getElementById("productGrid");

    const currentCategoryTitle =
        document.getElementById("currentCategoryTitle");

    const themeToggle =
        document.getElementById("themeToggle");

    const themeValue =
        document.getElementById("themeValue");

    const notificationToggle =
        document.getElementById("notificationToggle");

    const notificationStatus =
        document.getElementById("notificationStatus");

    const languageToggle =
        document.getElementById("languageToggle");

    const languageValue =
        document.getElementById("languageValue");

    const adminModeToggle =
        document.getElementById("adminModeToggle");

    const themeModal =
        document.getElementById("themeModal");

    const themeCancel =
        document.getElementById("themeCancel");

    const languageModal =
        document.getElementById("languageModal");

    const languageCancel =
        document.getElementById("languageCancel");

    const cartPanel =
        document.getElementById("cartPanel");

    const cartClose =
        document.getElementById("cartClose");

    const cartItems =
        document.getElementById("cartItems");

    const cartEmpty =
        document.getElementById("cartEmpty");

    const cartTotal =
        document.getElementById("cartTotal");

    const cartCount =
        document.getElementById("cartCount");

    const buyCartBtn =
        document.getElementById("buyCartBtn");

    const cartBtn =
        document.getElementById("cartBtn");

    const homeBtn =
        document.getElementById("homeBtn");

    const favoritesBtn =
        document.getElementById("favoritesBtn");


    /* =========================
       TRANSLATIONS
       ========================= */

    const translations = {

        tg: {
            subscribers: "обуна",
            subscribe: "Обуна шудан",
            subscribed: "Обуна шуд",
            categories: "Категорияҳо",
            settings: "Танзимот",
            theme: "Мавзӯъ",
            notifications: "Огоҳиномаҳо",
            language: "Забон",
            chooseTheme: "Мавзӯъро интихоб кунед",
            cancel: "Бекор кардан",
            cart: "Сабад",
            cartEmpty: "Сабад холӣ аст.",
            total: "Ҳамагӣ",
            order: "Фармоиш диҳед",
            addToCart: "Илова ба сабад",
            outOfStock: "Тамом шуд",
            inStock: "Дар фурӯш",
            noPrice: "Нарх муайян нашудааст",
            noProducts: "Маҳсулот ҳоло илова нашудааст.",
            deleteConfirm: "Ин категорияро нест мекунед?",
            newCategory: "Номи категорияро ворид кунед:",
            deleteFailed: "Нест кардан иҷро нашуд.",
            emptyName: "Номи категория холӣ буда наметавонад.",
            noStock: "Миқдор кофӣ нест."
        },

        ru: {
            subscribers: "подписчиков",
            subscribe: "Подписаться",
            subscribed: "Вы подписаны",
            categories: "Категории",
            settings: "Настройки",
            theme: "Тема",
            notifications: "Уведомления",
            language: "Язык",
            chooseTheme: "Выберите тему",
            cancel: "Отмена",
            cart: "Корзина",
            cartEmpty: "Корзина пуста.",
            total: "Итого",
            order: "Заказать",
            addToCart: "В корзину",
            outOfStock: "Нет в наличии",
            inStock: "В продаже",
            noPrice: "Цена не указана",
            noProducts: "Товар пока не добавлен.",
            deleteConfirm: "Удалить эту категорию?",
            newCategory: "Введите название категории:",
            deleteFailed: "Не удалось удалить.",
            emptyName: "Название категории не может быть пустым.",
            noStock: "Недостаточно количества."
        },

        uz: {
            subscribers: "obunachi",
            subscribe: "Obuna bo‘lish",
            subscribed: "Obuna bo‘lindi",
            categories: "Kategoriyalar",
            settings: "Sozlamalar",
            theme: "Mavzu",
            notifications: "Bildirishnomalar",
            language: "Til",
            chooseTheme: "Mavzuni tanlang",
            cancel: "Bekor qilish",
            cart: "Savat",
            cartEmpty: "Savat bo‘sh.",
            total: "Jami",
            order: "Buyurtma berish",
            addToCart: "Savatga qo‘shish",
            outOfStock: "Tugagan",
            inStock: "Sotuvda",
            noPrice: "Narx belgilanmagan",
            noProducts: "Mahsulot hali qo‘shilmagan.",
            deleteConfirm: "Bu kategoriyani o‘chirasizmi?",
            newCategory: "Kategoriya nomini kiriting:",
            deleteFailed: "O‘chirish amalga oshmadi.",
            emptyName: "Kategoriya nomi bo‘sh bo‘lishi mumkin emas.",
            noStock: "Miqdor yetarli emas."
        }

    };


    /* =========================
       STATE
       ========================= */

    let currentCategory = null;


    function getLang() {

        const lang =
            localStorage.getItem("lang") || "ru";

        if (!translations[lang]) {
            return "ru";
        }

        return lang;
    }


    function t(key) {

        const lang = getLang();

        return (
            translations[lang][key] ||
            translations.ru[key] ||
            key
        );

    }


    /* =========================
       ADMIN CHECK
       ========================= */

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

        let categories;

        try {

            categories = JSON.parse(
                localStorage.getItem("categories") || "null"
            );

        } catch (error) {

            categories = null;

        }


        if (!Array.isArray(categories)) {
            categories = [];
        }


        /*
         * Remove old unwanted categories.
         */
        categories = categories
            .map(category => {

                if (typeof category === "string") {
                    return category.trim();
                }

                if (
                    category &&
                    typeof category.name === "string"
                ) {
                    return category.name.trim();
                }

                return "";

            })
            .filter(Boolean);


        categories = categories.filter(category => {

            const lower =
                category.toLowerCase();

            return (
                lower !== "варзидан" &&
                lower !== "все" &&
                lower !== "для вас"
            );

        });


        /*
         * Remove duplicates.
         */
        categories = [
            ...new Set(categories)
        ];


        /*
         * Save cleaned list.
         */
        localStorage.setItem(
            "categories",
            JSON.stringify(categories)
        );


        return categories;

    }


    function saveCategories(categories) {

        localStorage.setItem(
            "categories",
            JSON.stringify(categories)
        );

    }


    /* =========================
       PRODUCTS
       ========================= */

    function getProducts() {

        let raw;

        try {

            raw = JSON.parse(
                localStorage.getItem(
                    "varzid_custom_products"
                ) || "null"
            );

        } catch (error) {

            raw = null;

        }


        if (Array.isArray(raw)) {

            const converted = {};

            raw.forEach((product, index) => {

                if (!product) {
                    return;
                }


                const category =
                    product.category ||
                    product.categoryName ||
                    product.name;


                if (!category) {
                    return;
                }


                if (
                    category === "Варзидан" ||
                    category === "Все"
                ) {
                    return;
                }


                converted[category] = {
                    category: category,
                    name:
                        product.name ||
                        category,
                    price:
                        Number(product.price) || 0,
                    unit:
                        product.unit || "кг",
                    qty:
                        Number(product.qty) || 0,
                    bag:
                        Number(product.bag) || 0,
                    image:
                        product.image || "",
                    onSale:
                        !!product.onSale,
                    featured:
                        !!product.featured
                };

            });


            localStorage.setItem(
                "varzid_custom_products",
                JSON.stringify(converted)
            );


            return converted;

        }


        if (
            raw &&
            typeof raw === "object" &&
            !Array.isArray(raw)
        ) {

            return raw;

        }


        return {};

    }


    function saveProducts(products) {

        localStorage.setItem(
            "varzid_custom_products",
            JSON.stringify(products)
        );

    }


    /* =========================
       PRODUCT CARD
       ========================= */

    function createProductCard(
        category,
        product
    ) {

        const card =
            document.createElement("article");

        card.className =
            "product-card";


        const imageBox =
            document.createElement("div");

        imageBox.className =
            "product-image-box";


        if (product.image) {

            const img =
                document.createElement("img");

            img.src = product.image;

            img.alt =
                product.name || category;

            img.className =
                "product-image";

            imageBox.appendChild(img);

        } else {

            const noImage =
                document.createElement("div");

            noImage.className =
                "product-no-image";

            noImage.textContent =
                "Акс нест";

            imageBox.appendChild(noImage);

        }


        card.appendChild(imageBox);


        const info =
            document.createElement("div");

        info.className =
            "product-info";


        const name =
            document.createElement("div");

        name.className =
            "product-name";

        name.textContent =
            product.name || category;


        info.appendChild(name);


        const price =
            document.createElement("div");

        price.className =
            "product-price";


        if (Number(product.price) > 0) {

            price.textContent =
                `${product.price} сомонӣ`;

        } else {

            price.textContent =
                t("noPrice");

            price.classList.add(
                "price-empty"
            );

        }


        info.appendChild(price);


        const unit =
            document.createElement("div");

        unit.className =
            "product-unit";


        let unitText =
            `${product.qty || 0} ${product.unit || "кг"}`;


        if (
            product.unit === "халта" &&
            Number(product.bag) > 0
        ) {

            unitText +=
                ` • ${product.bag} кг/халта`;

        }


        unit.textContent =
            unitText;


        info.appendChild(unit);


        const status =
            document.createElement("div");

        status.className =
            "product-status";


        const stock =
            Number(product.qty) || 0;


        if (stock > 0) {

            status.textContent =
                t("inStock");

            status.classList.add(
                "in-stock"
            );

        } else {

            status.textContent =
                t("outOfStock");

            status.classList.add(
                "out-of-stock"
            );

        }


        info.appendChild(status);


        const addButton =
            document.createElement("button");

        addButton.className =
            "add-cart-btn";

        addButton.textContent =
            stock > 0
                ? t("addToCart")
                : t("outOfStock");


        if (
            stock <= 0 ||
            Number(product.price) <= 0
        ) {

            addButton.disabled = true;

        }


        addButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                addToCart({

                    id: category,

                    name:
                        product.name ||
                        category,

                    price:
                        Number(product.price) || 0,

                    unit:
                        product.unit || "кг",

                    stock:
                        Number(product.qty) || 0

                });

            }
        );


        info.appendChild(addButton);

        card.appendChild(info);


        return card;

    }


    /* =========================
       PRODUCTS
       ========================= */

    function renderProducts() {

        if (!productGrid) {
            return;
        }


        productGrid.innerHTML = "";


        /*
         * No "Все".
         * No "Варзидан".
         * Nothing is shown until
         * a real category is selected.
         */

        if (!currentCategory) {

            if (currentCategoryTitle) {
                currentCategoryTitle.textContent = "";
            }

            return;

        }


        const categories =
            getCategories();

        const products =
            getProducts();


        if (
            !categories.includes(
                currentCategory
            )
        ) {

            currentCategory = null;

            if (currentCategoryTitle) {
                currentCategoryTitle.textContent = "";
            }

            return;

        }


        if (currentCategoryTitle) {

            currentCategoryTitle.textContent =
                currentCategory;

        }


        const product =
            products[currentCategory];


        /*
         * Category exists,
         * but product has not been added yet.
         */

        if (!product) {

            const empty =
                document.createElement("div");

            empty.className =
                "products-empty";

            empty.textContent =
                t("noProducts");

            productGrid.appendChild(empty);

            return;

        }


        productGrid.appendChild(
            createProductCard(
                currentCategory,
                product
            )
        );

    }


    /* =========================
       RENDER CATEGORIES
       ========================= */

    function renderCategories() {

        if (!categoryList) {
            return;
        }


        categoryList.innerHTML = "";


        const categories =
            getCategories();


        categories.forEach(category => {

            const card =
                document.createElement("div");

            card.className =
                "category-card";


            if (
                category === currentCategory
            ) {

                card.classList.add(
                    "active"
                );

            }


            const name =
                document.createElement("button");

            name.className =
                "cat-name";

            name.textContent =
                category;


            name.addEventListener(
                "click",
                () => {

                    currentCategory =
                        category;

                    renderCategories();

                    renderProducts();

                    closeBrandMenu();

                }
            );


            card.appendChild(name);


            /*
             * Delete is also ADMIN ONLY.
             */

            if (isAdmin()) {

                const deleteButton =
                    document.createElement("button");

                deleteButton.className =
                    "delete-btn";

                deleteButton.textContent =
                    "×";


                deleteButton.addEventListener(
                    "click",
                    event => {

                        event.stopPropagation();


                        if (!isAdmin()) {
                            return;
                        }


                        const confirmed =
                            window.confirm(
                                t("deleteConfirm") +
                                "\n\n" +
                                category
                            );


                        if (!confirmed) {
                            return;
                        }


                        const updated =
                            getCategories().filter(
                                item =>
                                    item !== category
                            );


                        saveCategories(
                            updated
                        );


                        /*
                         * Product is NOT deleted.
                         * This prevents accidental
                         * product data loss.
                         */


                        if (
                            currentCategory ===
                            category
                        ) {

                            currentCategory =
                                null;

                        }


                        renderCategories();

                        renderProducts();

                    }
                );


                card.appendChild(
                    deleteButton
                );

            }


            categoryList.appendChild(
                card
            );

        });


        /*
         * PLUS ONLY FOR ADMIN
         */

        if (isAdmin()) {

            const plusCard =
                document.createElement("div");

            plusCard.className =
                "category-add-card";


            const plusButton =
                document.createElement("button");

            plusButton.className =
                "category-add-button";

            plusButton.textContent =
                "+";


            plusButton.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    addNewCategory();

                }
            );


            plusCard.appendChild(
                plusButton
            );


            categoryList.appendChild(
                plusCard
            );

        }

    }


    /* =========================
       HEADER + BUTTON + ONLY ADMIN
       ========================= */

    function updateAdminUI() {

        const admin =
            isAdmin();


        /*
         * The + button already exists
         * in index.html header.
         * Hide it from customers.
         */

        if (addCategoryBtn) {

            addCategoryBtn.style.display =
                admin
                    ? ""
                    : "none";

        }


        renderCategories();

    }


    /* =========================
       ADD CATEGORY
       ========================= */

    function addNewCategory() {

        if (!isAdmin()) {
            return;
        }


        const name =
            window.prompt(
                t("newCategory")
            );


        if (name === null) {
            return;
        }


        const cleanName =
            name.trim();


        if (!cleanName) {

            window.alert(
                t("emptyName")
            );

            return;

        }


        const lower =
            cleanName.toLowerCase();


        if (
            lower === "варзидан" ||
            lower === "все" ||
            lower === "для вас"
        ) {

            return;

        }


        const categories =
            getCategories();


        const exists =
            categories.some(
                category =>
                    category.toLowerCase() ===
                    lower
            );


        if (exists) {

            window.alert(
                "Такая категория уже существует."
            );

            return;

        }


        categories.push(
            cleanName
        );


        saveCategories(
            categories
        );


        /*
         * IMPORTANT:
         * We DO NOT create a product here.
         */


        currentCategory =
            cleanName;


        renderCategories();

        renderProducts();

    }


    /* =========================
       SUBSCRIBER
       ========================= */

    function updateSubscriber() {

        const count =
            Number(
                localStorage.getItem(
                    "subCount"
                ) || 0
            );


        const subscribed =
            localStorage.getItem(
                "isSubscribed"
            ) === "true";


        if (subCount) {

            subCount.textContent =
                count;

        }


        if (subBtn) {

            subBtn.textContent =
                subscribed
                    ? t("subscribed")
                    : t("subscribe");


            subBtn.classList.toggle(
                "subscribed",
                subscribed
            );

        }

    }


    if (subBtn) {

        subBtn.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                const subscribed =
                    localStorage.getItem(
                        "isSubscribed"
                    ) === "true";


                if (subscribed) {

                    localStorage.setItem(
                        "isSubscribed",
                        "false"
                    );


                    let count =
                        Number(
                            localStorage.getItem(
                                "subCount"
                            ) || 0
                        );


                    count =
                        Math.max(
                            0,
                            count - 1
                        );


                    localStorage.setItem(
                        "subCount",
                        count
                    );

                } else {

                    localStorage.setItem(
                        "isSubscribed",
                        "true"
                    );


                    let count =
                        Number(
                            localStorage.getItem(
                                "subCount"
                            ) || 0
                        );


                    count += 1;


                    localStorage.setItem(
                        "subCount",
                        count
                    );

                }


                updateSubscriber();

            }
        );

    }


    /* =========================
       BRAND MENU
       ========================= */

    function closeBrandMenu() {

        if (dropdownMenu) {

            dropdownMenu.classList.remove(
                "open"
            );

        }


        if (brandToggle) {

            brandToggle.classList.remove(
                "active"
            );

        }

    }


    if (brandToggle) {

        brandToggle.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                if (settingsMenu) {

                    settingsMenu.classList.remove(
                        "open"
                    );

                }


                brandToggle.classList.toggle(
                    "active"
                );


                if (dropdownMenu) {

                    dropdownMenu.classList.toggle(
                        "open"
                    );

                }

            }
        );

    }


    /* =========================
       SETTINGS
       ========================= */

    if (settingsToggle) {

        settingsToggle.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                closeBrandMenu();


                if (settingsMenu) {

                    settingsMenu.classList.toggle(
                        "open"
                    );

                }

            }
        );

    }


    if (closeSettingsHeader) {

        closeSettingsHeader.addEventListener(
            "click",
            () => {

                if (settingsMenu) {

                    settingsMenu.classList.remove(
                        "open"
                    );

                }

            }
        );

    }


    /* =========================
       ADD CATEGORY HEADER BUTTON
       ========================= */

    if (addCategoryBtn) {

        addCategoryBtn.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                if (!isAdmin()) {
                    return;
                }


                addNewCategory();

            }
        );

    }


    /* =========================
       THEME
       ========================= */

    function applyTheme(theme) {

        let actualTheme =
            theme;


        if (theme === "system") {

            actualTheme =
                window.matchMedia(
                    "(prefers-color-scheme: dark)"
                ).matches
                    ? "dark"
                    : "light";

        }


        document.body.classList.toggle(
            "light-theme",
            actualTheme === "light"
        );


        document.body.classList.toggle(
            "dark-theme",
            actualTheme === "dark"
        );


        if (themeValue) {

            if (theme === "dark") {

                themeValue.textContent =
                    getLang() === "ru"
                        ? "Тёмная"
                        : getLang() === "uz"
                            ? "Qorong‘i"
                            : "Торик";

            } else if (
                theme === "system"
            ) {

                themeValue.textContent =
                    getLang() === "ru"
                        ? "Система"
                        : getLang() === "uz"
                            ? "Tizim"
                            : "Система";

            } else {

                themeValue.textContent =
                    getLang() === "ru"
                        ? "Светлая"
                        : getLang() === "uz"
                            ? "Oq"
                            : "Сафед";

            }

        }

    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                if (themeModal) {

                    themeModal.classList.add(
                        "open"
                    );

                }

            }
        );

    }


    document.querySelectorAll(
        ".theme-option[data-theme]"
    ).forEach(option => {

        option.addEventListener(
            "click",
            () => {

                const theme =
                    option.dataset.theme;


                localStorage.setItem(
                    "theme",
                    theme
                );


                applyTheme(theme);


                if (themeModal) {

                    themeModal.classList.remove(
                        "open"
                    );

                }

            }
        );

    });


    if (themeCancel) {

        themeCancel.addEventListener(
            "click",
            () => {

                if (themeModal) {

                    themeModal.classList.remove(
                        "open"
                    );

                }

            }
        );

    }


    /* =========================
       NOTIFICATIONS
       ========================= */

    function updateNotifications() {

        const enabled =
            localStorage.getItem(
                "notifications"
            ) !== "false";


        if (!notificationStatus) {
            return;
        }


        notificationStatus.textContent =
            enabled
                ? "ON"
                : "OFF";


        notificationStatus.className =
            enabled
                ? "badge-on"
                : "badge-off";

    }


    if (notificationToggle) {

        notificationToggle.addEventListener(
            "click",
            () => {

                const enabled =
                    localStorage.getItem(
                        "notifications"
                    ) !== "false";


                localStorage.setItem(
                    "notifications",
                    String(!enabled)
                );


                updateNotifications();

            }
        );

    }


    /* =========================
       LANGUAGE
       ========================= */

    function applyLanguage() {

        const lang =
            getLang();


        document
            .querySelectorAll(
                "[data-i18n]"
            )
            .forEach(element => {

                const key =
                    element.dataset.i18n;


                if (
                    translations[lang] &&
                    translations[lang][key]
                ) {

                    element.textContent =
                        translations[lang][key];

                }

            });


        if (languageValue) {

            if (lang === "ru") {

                languageValue.textContent =
                    "Русский";

            } else if (
                lang === "uz"
            ) {

                languageValue.textContent =
                    "O‘zbekcha";

            } else {

                languageValue.textContent =
                    "Тоҷикӣ";

            }

        }


        updateSubscriber();

        updateNotifications();


        applyTheme(
            localStorage.getItem(
                "theme"
            ) || "light"
        );


        updateAdminUI();

        renderProducts();

        updateCart();

    }


    if (languageToggle) {

        languageToggle.addEventListener(
            "click",
            () => {

                if (languageModal) {

                    languageModal.classList.add(
                        "open"
                    );

                }

            }
        );

    }


    document.querySelectorAll(
        ".language-option"
    ).forEach(option => {

        option.addEventListener(
            "click",
            () => {

                const lang =
                    option.dataset.lang;


                if (
                    !translations[lang]
                ) {
                    return;
                }


                localStorage.setItem(
                    "lang",
                    lang
                );


                if (languageModal) {

                    languageModal.classList.remove(
                        "open"
                    );

                }


                applyLanguage();

            }
        );

    });


    if (languageCancel) {

        languageCancel.addEventListener(
            "click",
            () => {

                if (languageModal) {

                    languageModal.classList.remove(
                        "open"
                    );

                }

            }
        );

    }


    /* =========================
       ADMIN
       ========================= */

    if (adminModeToggle) {

        adminModeToggle.addEventListener(
            "click",
            () => {

                const link =
                    adminModeToggle.dataset.adminLink ||
                    "admin.html";


                window.location.href =
                    link;

            }
        );

    }


    /* =========================
       CART
       ========================= */

    function getCart() {

        let cart;

        try {

            cart = JSON.parse(
                localStorage.getItem(
                    "varzid_cart"
                ) || "[]"
            );

        } catch (error) {

            cart = [];

        }


        if (!Array.isArray(cart)) {

            cart = [];

        }


        return cart;

    }


    function saveCart(cart) {

        localStorage.setItem(
            "varzid_cart",
            JSON.stringify(cart)
        );

    }


    function addToCart(product) {

        const cart =
            getCart();


        const products =
            getProducts();


        const currentProduct =
            products[product.id];


        const stock =
            currentProduct
                ? Number(currentProduct.qty) || 0
                : Number(product.stock) || 0;


        const existing =
            cart.find(
                item =>
                    item.id === product.id
            );


        if (existing) {

            if (
                Number(existing.qty) >=
                stock
            ) {

                alert(
                    t("noStock")
                );

                return;

            }


            existing.qty += 1;

        } else {

            if (stock <= 0) {

                alert(
                    t("noStock")
                );

                return;

            }


            cart.push({

                id: product.id,

                name: product.name,

                price:
                    Number(product.price) || 0,

                unit:
                    product.unit || "кг",

                qty: 1

            });

        }


        saveCart(cart);

        updateCart();

    }


    function updateCart() {

        const cart =
            getCart();


        if (!cartItems) {
            return;
        }


        cartItems.innerHTML = "";


        let total = 0;

        let count = 0;


        if (cart.length === 0) {

            if (cartEmpty) {
                cartEmpty.style.display =
                    "block";
            }

        } else {

            if (cartEmpty) {
                cartEmpty.style.display =
                    "none";
            }

        }


        cart.forEach(item => {

            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "cart-item";


            const info =
                document.createElement(
                    "div"
                );

            info.className =
                "cart-item-info";


            const name =
                document.createElement(
                    "div"
                );

            name.className =
                "cart-item-name";

            name.textContent =
                item.name;


            const price =
                document.createElement(
                    "div"
                );

            price.className =
                "cart-item-price";

            price.textContent =
                `${item.price} сомонӣ / ${item.unit}`;


            info.appendChild(name);

            info.appendChild(price);


            const controls =
                document.createElement(
                    "div"
                );

            controls.className =
                "cart-controls";


            const minus =
                document.createElement(
                    "button"
                );

            minus.className =
                "quantity-btn";

            minus.textContent =
                "−";


            const number =
                document.createElement(
                    "span"
                );

            number.className =
                "quantity-number";

            number.textContent =
                item.qty;


            const plus =
                document.createElement(
                    "button"
                );

            plus.className =
                "quantity-btn";

            plus.textContent =
                "+";


            minus.addEventListener(
                "click",
                () => {

                    item.qty -= 1;


                    if (item.qty <= 0) {

                        const index =
                            cart.indexOf(item);


                        if (index !== -1) {

                            cart.splice(
                                index,
                                1
                            );

                        }

                    }


                    saveCart(cart);

                    updateCart();

                }
            );


            plus.addEventListener(
                "click",
                () => {

                    const products =
                        getProducts();


                    const product =
                        products[item.id];


                    const stock =
                        product
                            ? Number(product.qty) || 0
                            : 0;


                    if (
                        item.qty >= stock
                    ) {

                        alert(
                            t("noStock")
                        );

                        return;

                    }


                    item.qty += 1;


                    saveCart(cart);

                    updateCart();

                }
            );


            controls.appendChild(
                minus
            );

            controls.appendChild(
                number
            );

            controls.appendChild(
                plus
            );


            const remove =
                document.createElement(
                    "button"
                );

            remove.className =
                "remove-cart-item";

            remove.textContent =
                "×";


            remove.addEventListener(
                "click",
                () => {

                    const index =
                        cart.indexOf(item);


                    if (index !== -1) {

                        cart.splice(
                            index,
                            1
                        );

                    }


                    saveCart(cart);

                    updateCart();

                }
            );


            row.appendChild(info);

            row.appendChild(
                controls
            );

            row.appendChild(
                remove
            );


            cartItems.appendChild(
                row
            );


            total +=
                Number(item.price) *
                Number(item.qty);


            count +=
                Number(item.qty);

        });


        if (cartTotal) {

            cartTotal.textContent =
                total.toFixed(2)
                    .replace(".00", "");

        }


        if (cartCount) {

            cartCount.textContent =
                count;


            cartCount.style.display =
                count > 0
                    ? "flex"
                    : "none";

        }

    }


    if (cartBtn) {

        cartBtn.addEventListener(
            "click",
            () => {

                if (cartPanel) {

                    cartPanel.classList.toggle(
                        "open"
                    );

                }

                closeBrandMenu();

                if (settingsMenu) {

                    settingsMenu.classList.remove(
                        "open"
                    );

                }

            }
        );

    }


    if (cartClose) {

        cartClose.addEventListener(
            "click",
            () => {

                if (cartPanel) {

                    cartPanel.classList.remove(
                        "open"
                    );

                }

            }
        );

    }


    /* =========================
       HOME
       ========================= */

    if (homeBtn) {

        homeBtn.addEventListener(
            "click",
            () => {

                /*
                 * No "Все".
                 * Home simply clears
                 * the selected category.
                 */

                currentCategory =
                    null;


                renderCategories();

                renderProducts();


                if (cartPanel) {

                    cartPanel.classList.remove(
                        "open"
                    );

                }


                document
                    .querySelectorAll(
                        ".bottom-nav-btn"
                    )
                    .forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });


                homeBtn.classList.add(
                    "active"
                );

            }
        );

    }


    /* =========================
       FAVORITES
       ========================= */

    if (favoritesBtn) {

        favoritesBtn.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".bottom-nav-btn"
                    )
                    .forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });


                favoritesBtn.classList.add(
                    "active"
                );

            }
        );

    }


    /* =========================
       WHATSAPP
       ========================= */

    if (buyCartBtn) {

        buyCartBtn.addEventListener(
            "click",
            () => {

                const cart =
                    getCart();


                if (cart.length === 0) {
                    return;
                }


                const lines = [];


                lines.push(
                    "Салом, ман мехоҳам фармоиш диҳам:"
                );


                lines.push("");


                cart.forEach(item => {

                    lines.push(
                        `${item.name} — ${item.qty} ${item.unit} × ${item.price} сомонӣ`
                    );

                });


                const total =
                    cart.reduce(
                        (sum, item) =>
                            sum +
                            (
                                Number(item.price) *
                                Number(item.qty)
                            ),
                        0
                    );


                lines.push("");

                lines.push(
                    `Ҳамагӣ: ${total} сомонӣ`
                );


                lines.push("");

                lines.push(
                    "Арзиши расонидан вобаста ба масофа аст."
                );


                const message =
                    encodeURIComponent(
                        lines.join("\n")
                    );


                window.open(
                    `https://wa.me/992000001606?text=${message}`,
                    "_blank"
                );

            }
        );

    }


    /* =========================
       OUTSIDE CLICK
       ========================= */

    document.addEventListener(
        "click",
        event => {

            if (
                brandToggle &&
                dropdownMenu &&
                !brandToggle.contains(event.target) &&
                !dropdownMenu.contains(event.target)
            ) {

                closeBrandMenu();

            }


            if (
                settingsToggle &&
                settingsMenu &&
                !settingsToggle.contains(event.target) &&
                !settingsMenu.contains(event.target)
            ) {

                settingsMenu.classList.remove(
                    "open"
                );

            }

        }
    );


    /* =========================
       MODAL OUTSIDE CLICK
       ========================= */

    if (themeModal) {

        themeModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    themeModal
                ) {

                    themeModal.classList.remove(
                        "open"
                    );

                }

            }
        );

    }


    if (languageModal) {

        languageModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    languageModal
                ) {

                    languageModal.classList.remove(
                        "open"
                    );

                }

            }
        );

    }


    /* =========================
       INITIAL
       ========================= */

    if (
        !localStorage.getItem("theme")
    ) {

        localStorage.setItem(
            "theme",
            "light"
        );

    }


    if (
        !localStorage.getItem(
            "notifications"
        )
    ) {

        localStorage.setItem(
            "notifications",
            "true"
        );

    }


    /*
     * IMPORTANT:
     * We DO NOT create categories.
     * We DO NOT create products.
     * We DO NOT create "Варзидан".
     */


    applyLanguage();

    updateSubscriber();

    updateNotifications();

    updateAdminUI();

    renderCategories();

    renderProducts();

    updateCart();

});
