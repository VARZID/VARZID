document.addEventListener('DOMContentLoaded', () => {

    const $ = id => document.getElementById(id);

    const brandToggle = $('brandToggle');
    const dropdownMenu = $('dropdownMenu');

    const settingsToggle = $('settingsToggle');
    const settingsMenu = $('settingsMenu');
    const closeSettingsHeader = $('closeSettingsHeader');

    const categoryList = $('categoryList');
    const addCategoryBtn = $('addCategoryBtn');
    const adminPanelBtn = $('adminPanelBtn');

    const productsList = $('productsList');
    const emptyProducts = $('emptyProducts');
    const currentCategoryTitle = $('currentCategoryTitle');

    const subBtn = $('subBtn');

    const setThemeBtn = $('setTheme');
    const themeModal = $('themeModal');
    const cancelTheme = $('cancelTheme');

    const setLanguageBtn = $('setLanguage');
    const setNotificationsBtn = $('setNotifications');

    const cartPanel = $('cartPanel');
    const cartItems = $('cartItems');
    const cartEmpty = $('cartEmpty');
    const cartCount = $('cartCount');
    const buyCartBtn = $('buyCartBtn');
    const closeCart = $('closeCart');
    const cartTotal = $('cartTotal');

    let subscribers =
        Number(localStorage.getItem('subCount')) || 0;

    let isSubscribed =
        localStorage.getItem('isSubscribed') === 'true';

    let isAdmin =
        localStorage.getItem('isAdmin') === 'true';

    let currentTheme =
        localStorage.getItem('theme') || 'light';

    let currentLang =
        localStorage.getItem('lang') || 'tg';

    let notificationsEnabled =
        localStorage.getItem('notifications') === 'true';

    let categories =
        JSON.parse(localStorage.getItem('categories')) || [
            'Варзидан',
            'Орд',
            'Комбикорм',
            'Гандум',
            'Ҷав',
            'Ҷуворимакка',
            'Селитра',
            'Карбамид'
        ];

    let products =
        JSON.parse(localStorage.getItem('varzid_products')) || [];

    let cart =
        JSON.parse(localStorage.getItem('varzid_cart')) || [];

    let currentCategory = 'Варзидан';


    /* =========================
       TRANSLATION
    ========================= */

    const dict = {

        tg: {
            subscribers: 'подписчиков',
            subscribe: 'Подписаться',
            subscribed: '✓ Шумо обуна ҳастед',
            wrongPass: 'Дастрасӣ рад шуд',

            settingsTitle: 'Танзимот',
            categoriesTitle: 'Категорияҳо',

            themeLabel: 'Тема',
            nightMode: 'Режими шабона ›',
            dayMode: 'Режими рӯзона ›',

            notifLabel: 'Огоҳиҳо',
            notifOn: 'Фаъол ›',
            notifOff: 'Хомӯш ›',

            langLabel: 'Забон',

            buy: 'Харидан',
            total: 'Ҳамагӣ'
        },

        ru: {
            subscribers: 'подписчиков',
            subscribe: 'Подписаться',
            subscribed: '✓ Вы подписаны',
            wrongPass: 'Доступ запрещён',

            settingsTitle: 'Настройки',
            categoriesTitle: 'Категории',

            themeLabel: 'Тема',
            nightMode: 'Ночной режим ›',
            dayMode: 'Дневной режим ›',

            notifLabel: 'Уведомления',
            notifOn: 'Вкл ›',
            notifOff: 'Выкл ›',

            langLabel: 'Язык',

            buy: 'Купить',
            total: 'Итого'
        }

    };


    /* =========================
       STORAGE
    ========================= */

    function saveProducts() {
        localStorage.setItem(
            'varzid_products',
            JSON.stringify(products)
        );
    }

    function saveCategories() {
        localStorage.setItem(
            'categories',
            JSON.stringify(categories)
        );
    }

    function saveCart() {
        localStorage.setItem(
            'varzid_cart',
            JSON.stringify(cart)
        );
    }


    /* =========================
       LANGUAGE
    ========================= */

    function setLanguage(lang) {

        if (!dict[lang]) lang = 'tg';

        currentLang = lang;

        localStorage.setItem('lang', lang);

        const t = dict[lang];

        document
            .querySelectorAll('[data-translate]')
            .forEach(el => {

                const key =
                    el.getAttribute('data-translate');

                if (t[key]) {
                    el.textContent = t[key];
                }
            });

        if ($('subBtn')) {

            $('subBtn').textContent =
                isSubscribed
                    ? t.subscribed
                    : t.subscribe;
        }

        if ($('themeStatus')) {

            $('themeStatus').textContent =
                currentTheme === 'light'
                    ? t.dayMode
                    : t.nightMode;
        }

        if ($('notifStatusText')) {

            $('notifStatusText').textContent =
                notificationsEnabled
                    ? t.notifOn
                    : t.notifOff;
        }

        if ($('currentLangDisplay')) {

            $('currentLangDisplay').textContent =
                lang === 'ru'
                    ? 'Русский ›'
                    : 'Тоҷикӣ ›';
        }

        if (buyCartBtn) {
            buyCartBtn.textContent = t.buy;
        }

        updateSubscribers();
        updateAdminUI();
        renderCategories();
        renderProducts();
        updateCart();
    }


    /* =========================
       SUBSCRIBERS
    ========================= */

    function updateSubscribers() {

        const text =
            document.querySelector('.subscriber-text');

        if (!text) return;

        const t = dict[currentLang];

        const count =
            subscribers >= 1000
                ? (subscribers / 1000)
                    .toFixed(1)
                    .replace('.0', '') + 'K'
                : subscribers;

        text.innerHTML = `
            <span>${count}</span>
            <span>${t.subscribers}</span>
        `;
    }


    subBtn?.addEventListener('click', () => {

        if (!isSubscribed) {

            subscribers++;
            isSubscribed = true;

        } else {

            subscribers =
                Math.max(0, subscribers - 1);

            isSubscribed = false;
        }

        localStorage.setItem(
            'subCount',
            subscribers
        );

        localStorage.setItem(
            'isSubscribed',
            isSubscribed
        );

        setLanguage(currentLang);
    });


    /* =========================
       ADMIN UI
    ========================= */

    function updateAdminUI() {

        document
            .querySelectorAll('.admin-only')
            .forEach(el => {

                el.style.display =
                    isAdmin ? '' : 'none';
            });
    }


    /* =========================
       ADMIN LOGIN
    ========================= */

    function openAdminLogin() {

        if (isAdmin) {

            isAdmin = false;

            localStorage.setItem(
                'isAdmin',
                'false'
            );

            renderCategories();
            renderProducts();

            return;
        }

        const modal =
            document.createElement('div');

        modal.className =
            'theme-modal open';

        modal.innerHTML = `

            <div class="theme-modal-content">

                <h3>Режими Админ</h3>

                <input
                    id="adminPasswordInput"
                    class="admin-input"
                    type="password"
                    inputmode="numeric"
                    placeholder="Паролро ворид кунед"
                    autocomplete="off"
                >

                <button
                    id="confirmAdmin"
                    class="admin-submit">
                    Ворид шудан
                </button>

                <button
                    id="cancelAdmin"
                    class="theme-cancel">
                    БЕКОР КАРДАН
                </button>

            </div>
        `;

        document.body.appendChild(modal);

        const input =
            modal.querySelector('#adminPasswordInput');

        input?.focus();

        modal
            .querySelector('#confirmAdmin')
            ?.addEventListener('click', () => {

                if (input.value === '1604') {

                    isAdmin = true;

                    localStorage.setItem(
                        'isAdmin',
                        'true'
                    );

                    modal.remove();

                    updateAdminUI();
                    renderCategories();
                    renderProducts();

                } else {

                    alert(
                        dict[currentLang].wrongPass
                    );

                    input.value = '';
                    input.focus();
                }
            });

        modal
            .querySelector('#cancelAdmin')
            ?.addEventListener('click', () => {
                modal.remove();
            });

        input?.addEventListener('keydown', e => {

            if (e.key === 'Enter') {

                modal
                    .querySelector('#confirmAdmin')
                    ?.click();
            }
        });
    }


    /* =========================
       HEADER
    ========================= */

    brandToggle?.addEventListener('click', () => {

        dropdownMenu?.classList.toggle('open');

        brandToggle.classList.toggle('active');

        settingsMenu?.classList.remove('open');
    });


    settingsToggle?.addEventListener('click', () => {

        settingsMenu?.classList.toggle('open');

        dropdownMenu?.classList.remove('open');

        brandToggle?.classList.remove('active');
    });


    closeSettingsHeader?.addEventListener('click', () => {

        settingsMenu?.classList.remove('open');
    });


    adminPanelBtn?.addEventListener(
        'click',
        openAdminLogin
    );


    /* =========================
       CATEGORIES
    ========================= */

    function renderCategories() {

        if (!categoryList) return;

        categoryList.innerHTML = '';

        categories.forEach((cat, index) => {

            const card =
                document.createElement('div');

            card.className = 'category-card';

            const name =
                document.createElement('span');

            name.className = 'cat-name';
            name.textContent = cat;

            card.appendChild(name);

            if (isAdmin && cat !== 'Варзидан') {

                const plus =
                    document.createElement('button');

                plus.className = 'add-btn';

                plus.textContent = '+';

                plus.title = 'Илова кардани маҳсулот';

                plus.addEventListener(
                    'click',
                    e => {

                        e.stopPropagation();

                        openStockForm(cat);
                    }
                );

                card.appendChild(plus);
            }

            if (isAdmin && cat !== 'Варзидан') {

                const del =
                    document.createElement('button');

                del.className = 'delete-btn';

                del.textContent = '×';

                del.addEventListener(
                    'click',
                    e => {

                        e.stopPropagation();

                        deleteCategory(cat, index);
                    }
                );

                card.appendChild(del);
            }

            card.addEventListener('click', () => {

                currentCategory = cat;

                if (currentCategoryTitle) {
                    currentCategoryTitle.textContent =
                        cat;
                }

                renderProducts();

                dropdownMenu?.classList.remove('open');
                brandToggle?.classList.remove('active');
            });

            categoryList.appendChild(card);
        });

        saveCategories();
        updateAdminUI();
    }


    /* =========================
       ADD CATEGORY
    ========================= */

    addCategoryBtn?.addEventListener('click', () => {

        if (!isAdmin) return;

        const name =
            prompt(
                currentLang === 'ru'
                    ? 'Введите название новой категории:'
                    : 'Номи категорияи навро ворид кунед:'
            );

        if (name === null) return;

        const newName = name.trim();

        if (!newName) return;

        const exists =
            categories.some(
                cat =>
                    cat.toLowerCase() ===
                    newName.toLowerCase()
            );

        if (exists) {

            alert(
                currentLang === 'ru'
                    ? 'Такая категория уже существует'
                    : 'Ин категория аллакай вуҷуд дорад'
            );

            return;
        }

        categories.push(newName);

        saveCategories();

        renderCategories();
    });


    /* =========================
       DELETE CATEGORY
    ========================= */

    function deleteCategory(cat, index) {

        const ok =
            confirm(
                `Категорияи «${cat}»-ро нест кунем?`
            );

        if (!ok) return;

        categories.splice(index, 1);

        products =
            products.filter(
                product =>
                    product.category !== cat
            );

        saveCategories();
        saveProducts();

        if (currentCategory === cat) {
            currentCategory = 'Варзидан';
        }

        renderCategories();
        renderProducts();
    }


    /* =========================
       STOCK FORM
    ========================= */

    function openStockForm(category) {

        if (!isAdmin) return;

        const old =
            products.find(
                p => p.category === category
            );

        const modal =
            document.createElement('div');

        modal.className =
            'theme-modal open';

        modal.innerHTML = `

            <div class="theme-modal-content">

                <h3>
                    ${category}
                </h3>

                <div class="stock-add-title">
                    Миқдор
                </div>

                <input
                    id="stockQuantity"
                    class="admin-input"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Миқдор"
                >

                <div class="stock-add-title">
                    Воҳид
                </div>

                <select
                    id="stockUnit"
                    class="admin-input">

                    <option value="кг">кг</option>
                    <option value="халта">халта</option>
                    <option value="дона">дона</option>
                    <option value="штук">штук</option>

                </select>

                <div class="stock-add-title">
                    Нарх
                </div>

                <input
                    id="stockPrice"
                    class="admin-input"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Нарх бо сомонӣ"
                >

                <div class="stock-add-title">
                    Акс
                </div>

                <input
                    id="stockImage"
                    class="admin-input"
                    type="file"
                    accept="image/*"
                >

                <button
                    id="saveStock"
                    class="admin-submit">
                    Илова кардан
                </button>

                <button
                    id="cancelStock"
                    class="theme-cancel">
                    БЕКОР КАРДАН
                </button>

            </div>
        `;

        document.body.appendChild(modal);

        if (old) {

            modal.querySelector('#stockUnit').value =
                old.unit || 'кг';

            modal.querySelector('#stockPrice').value =
                old.price || '';
        }

        modal
            .querySelector('#saveStock')
            ?.addEventListener('click', () => {

                const quantity =
                    Number(
                        modal.querySelector(
                            '#stockQuantity'
                        ).value
                    );

                const unit =
                    modal.querySelector(
                        '#stockUnit'
                    ).value;

                const price =
                    Number(
                        modal.querySelector(
                            '#stockPrice'
                        ).value
                    );

                const file =
                    modal.querySelector(
                        '#stockImage'
                    ).files[0];

                if (!quantity || quantity <= 0) {

                    alert('Миқдорро дуруст ворид кунед');
                    return;
                }

                if (!price || price < 0) {

                    alert('Нархро ворид кунед');
                    return;
                }

                function finish(image) {

                    if (old) {

                        old.quantity =
                            Number(old.quantity || 0)
                            + quantity;

                        old.unit = unit;
                        old.price = price;

                        if (image) {
                            old.image = image;
                        }

                    } else {

                        products.push({

                            id:
                                Date.now().toString(),

                            name: category,

                            category: category,

                            quantity: quantity,

                            unit: unit,

                            price: price,

                            image: image || '',

                            active: true
                        });
                    }

                    saveProducts();

                    modal.remove();

                    renderProducts();
                }

                if (file) {

                    const reader =
                        new FileReader();

                    reader.onload = () => {
                        finish(reader.result);
                    };

                    reader.readAsDataURL(file);

                } else {

                    finish(
                        old?.image || ''
                    );
                }
            });

        modal
            .querySelector('#cancelStock')
            ?.addEventListener(
                'click',
                () => modal.remove()
            );
    }


    /* =========================
       PRODUCTS
    ========================= */

    function renderProducts() {

        if (!productsList) return;

        productsList.innerHTML = '';

        let visibleProducts =
            currentCategory === 'Варзидан'
                ? products.filter(p => p.active !== false)
                : products.filter(
                    p =>
                        p.category === currentCategory &&
                        p.active !== false
                );

        if (visibleProducts.length === 0) {

            emptyProducts.style.display = 'block';

            return;

        } else {

            emptyProducts.style.display = 'none';
        }

        visibleProducts.forEach(product => {

            const card =
                document.createElement('div');

            card.className =
                'product-card';

            const quantity =
                Number(product.quantity) || 0;

            const out =
                quantity <= 0;

            let imageHTML = '';

            if (product.image) {

                imageHTML = `
                    <img
                        class="product-image"
                        src="${product.image}"
                        alt="${product.name}">
                `;

            } else {

                imageHTML = `
                    <div class="product-no-image">
                        Акс нест
                    </div>
                `;
            }

            card.innerHTML = `

                ${imageHTML}

                <div class="product-info">

                    <div class="product-name">
                        ${product.name}
                    </div>

                    <div class="product-price">
                        ${formatPrice(product.price)}
                    </div>

                    <div class="product-stock">
                        Миқдор: ${quantity}
                        ${product.unit || ''}
                    </div>

                    <span
                        class="product-status ${out ? 'out' : ''}">
                        ${out ? 'ТАМОМ ШУД' : 'ДАР ФУРӮШ'}
                    </span>

                </div>

                <button
                    class="product-order-btn"
                    ${out ? 'disabled' : ''}
                    data-id="${product.id}">
                    ${out ? 'ТАМОМ ШУД' : 'Илова ба сабад'}
                </button>
            `;

            card
                .querySelector('.product-order-btn')
                ?.addEventListener(
                    'click',
                    () => {

                        if (!out) {
                            addToCart(product);
                        }
                    }
                );

            if (isAdmin) {

                const tools =
                    document.createElement('div');

                tools.className =
                    'admin-product-tools';

                tools.innerHTML = `

                    <button
                        class="admin-tool"
                        data-action="add">
                        + Захира
                    </button>

                    <button
                        class="admin-tool"
                        data-action="edit">
                        Тағйир
                    </button>

                    <button
                        class="admin-tool delete"
                        data-action="delete">
                        Нест
                    </button>
                `;

                tools
                    .querySelector('[data-action="add"]')
                    .addEventListener(
                        'click',
                        () => openStockForm(product.category)
                    );

                tools
                    .querySelector('[data-action="edit"]')
                    .addEventListener(
                        'click',
                        () => editProduct(product)
                    );

                tools
                    .querySelector('[data-action="delete"]')
                    .addEventListener(
                        'click',
                        () => deleteProduct(product)
                    );

                card.appendChild(tools);
            }

            productsList.appendChild(card);
        });

        updateAdminUI();
    }


    /* =========================
       EDIT PRODUCT
    ========================= */

    function editProduct(product) {

        const modal =
            document.createElement('div');

        modal.className =
            'theme-modal open';

        modal.innerHTML = `

            <div class="theme-modal-content">

                <h3>
                    Тағйири ${product.name}
                </h3>

                <input
                    id="editQuantity"
                    class="admin-input"
                    type="number"
                    min="0"
                    value="${product.quantity}"
                    placeholder="Миқдор">

                <select
                    id="editUnit"
                    class="admin-input">

                    <option value="кг">кг</option>
                    <option value="халта">халта</option>
                    <option value="дона">дона</option>
                    <option value="штук">штук</option>

                </select>

                <input
                    id="editPrice"
                    class="admin-input"
                    type="number"
                    min="0"
                    value="${product.price}"
                    placeholder="Нарх">

                <input
                    id="editImage"
                    class="admin-input"
                    type="file"
                    accept="image/*">

                <button
                    id="saveEdit"
                    class="admin-submit">
                    Сабт кардан
                </button>

                <button
                    id="deleteImage"
                    class="theme-cancel">
                    Нест кардани акс
                </button>

                <button
                    id="cancelEdit"
                    class="theme-cancel">
                    БЕКОР КАРДАН
                </button>

            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('#editUnit').value =
            product.unit || 'кг';

        modal
            .querySelector('#saveEdit')
            .addEventListener(
                'click',
                () => {

                    product.quantity =
                        Number(
                            modal.querySelector(
                                '#editQuantity'
                            ).value
                        ) || 0;

                    product.unit =
                        modal.querySelector(
                            '#editUnit'
                        ).value;

                    product.price =
                        Number(
                            modal.querySelector(
                                '#editPrice'
                            ).value
                        ) || 0;

                    const file =
                        modal.querySelector(
                            '#editImage'
                        ).files[0];

                    if (file) {

                        const reader =
                            new FileReader();

                        reader.onload = () => {

                            product.image =
                                reader.result;

                            saveProducts();

                            modal.remove();

                            renderProducts();
                        };

                        reader.readAsDataURL(file);

                    } else {

                        saveProducts();

                        modal.remove();

                        renderProducts();
                    }
                }
            );

        modal
            .querySelector('#deleteImage')
            .addEventListener(
                'click',
                () => {

                    product.image = '';

                    saveProducts();

                    modal.remove();

                    renderProducts();
                }
            );

        modal
            .querySelector('#cancelEdit')
            .addEventListener(
                'click',
                () => modal.remove()
            );
    }


    /* =========================
       DELETE PRODUCT
    ========================= */

    function deleteProduct(product) {

        const ok =
            confirm(
                `Маҳсулоти «${product.name}»-ро нест кунем?`
            );

        if (!ok) return;

        product.active = false;

        saveProducts();

        renderProducts();
    }


    /* =========================
       CART
    ========================= */

    function getPriceNumber(price) {

        const n =
            parseFloat(
                String(price)
                    .replace(',', '.')
                    .replace(/[^\d.]/g, '')
            );

        return isNaN(n) ? 0 : n;
    }


    function formatPrice(number) {

        return new Intl.NumberFormat('ru-RU')
            .format(number) + ' сомонӣ';
    }


    function addToCart(product) {

        if (!product || Number(product.quantity) <= 0)
            return;

        const existing =
            cart.find(
                item => item.id === product.id
            );

        if (existing) {

            if (
                existing.quantity <
                Number(product.quantity)
            ) {

                existing.quantity++;
            }

        } else {

            cart.push({
                ...product,
                quantity: 1
            });
        }

        updateCart();

        cartPanel?.classList.add('open');
    }


    window.addToCart = addToCart;


    function updateCart() {

        if (!cartItems) return;

        cartItems.innerHTML = '';

        let total = 0;
        let count = 0;

        cart.forEach((item, index) => {

            const quantity =
                Number(item.quantity) || 1;

            const price =
                getPriceNumber(item.price);

            total += price * quantity;
            count += quantity;

            const row =
                document.createElement('div');

            row.className = 'cart-item';

            row.innerHTML = `

                <div class="cart-item-info">

                    <div class="cart-item-name">
                        ${item.name}
                    </div>

                    <div class="cart-item-price">
                        ${formatPrice(price)}
                        ${item.unit ? ' / ' + item.unit : ''}
                    </div>

                </div>

                <div class="cart-controls">

                    <button
                        class="quantity-btn"
                        data-action="minus"
                        data-index="${index}">
                        −
                    </button>

                    <span class="quantity-number">
                        ${quantity}
                    </span>

                    <button
                        class="quantity-btn"
                        data-action="plus"
                        data-index="${index}">
                        +
                    </button>

                </div>

                <button
                    class="remove-cart-item"
                    data-action="remove"
                    data-index="${index}">
                    ×
                </button>
            `;

            cartItems.appendChild(row);
        });

        if (cart.length === 0) {

            cartEmpty.style.display = 'block';
            buyCartBtn.style.display = 'none';

        } else {

            cartEmpty.style.display = 'none';
            buyCartBtn.style.display = 'block';
        }

        cartTotal.textContent =
            formatPrice(total);

        cartCount.textContent = count;

        cartCount.style.display =
            count > 0 ? 'flex' : 'none';

        saveCart();
    }


    cartItems?.addEventListener('click', event => {

        const btn =
            event.target.closest('button');

        if (!btn) return;

        const index =
            Number(btn.dataset.index);

        const action =
            btn.dataset.action;

        if (!cart[index]) return;

        if (action === 'plus') {

            const product =
                products.find(
                    p => p.id === cart[index].id
                );

            if (
                product &&
                cart[index].quantity <
                Number(product.quantity)
            ) {

                cart[index].quantity++;
            }
        }

        if (action === 'minus') {

            cart[index].quantity--;

            if (cart[index].quantity <= 0) {

                cart.splice(index, 1);
            }
        }

        if (action === 'remove') {

            cart.splice(index, 1);
        }

        updateCart();
    });


    /* =========================
       WHATSAPP
    ========================= */

    buyCartBtn?.addEventListener('click', () => {

        if (!cart.length) return;

        let message =
            'Салом, ман мехоҳам фармоиш диҳам:\n\n';

        let total = 0;

        cart.forEach((item, index) => {

            const quantity =
                Number(item.quantity) || 1;

            const price =
                getPriceNumber(item.price);

            const lineTotal =
                price * quantity;

            total += lineTotal;

            message +=
                `${index + 1}. ${item.name} — ` +
                `${formatPrice(price)} / ${item.unit || ''} ` +
                `× ${quantity} = ` +
                `${formatPrice(lineTotal)}\n`;
        });

        message +=
            `\nҲамагӣ: ${formatPrice(total)}`;

        message +=
            '\n\nЛутфан нархи расониданро низ хабар диҳед.';

        const url =
            'https://wa.me/992000001606?text=' +
            encodeURIComponent(message);

        window.open(url, '_blank');
    });


    /* =========================
       THEME
    ========================= */

    function applyTheme(theme) {

        currentTheme = theme;

        document.body.classList.toggle(
            'light-theme',
            theme === 'light'
        );

        document.body.classList.toggle(
            'dark-theme',
            theme === 'dark'
        );

        localStorage.setItem(
            'theme',
            theme
        );

        setLanguage(currentLang);
    }


    setThemeBtn?.addEventListener('click', () => {

        themeModal?.classList.add('open');
    });


    cancelTheme?.addEventListener('click', () => {

        themeModal?.classList.remove('open');
    });


    document
        .querySelectorAll('.theme-option')
        .forEach(option => {

            option.addEventListener('click', () => {

                const theme =
                    option.dataset.theme;

                if (!theme) return;

                applyTheme(theme);

                themeModal?.classList.remove('open');
            });
        });


    /* =========================
       LANGUAGE
    ========================= */

    setLanguageBtn?.addEventListener('click', () => {

        const choice =
            prompt(
                '1 — Тоҷикӣ\n2 — Русский'
            );

        if (choice === '1') {
            setLanguage('tg');
        }

        if (choice === '2') {
            setLanguage('ru');
        }
    });


    /* =========================
       NOTIFICATIONS
    ========================= */

    setNotificationsBtn?.addEventListener(
        'click',
        () => {

            notificationsEnabled =
                !notificationsEnabled;

            localStorage.setItem(
                'notifications',
                notificationsEnabled
            );

            setLanguage(currentLang);
        }
    );


    /* =========================
       BOTTOM NAV
    ========================= */

    $('homeBtn')?.addEventListener('click', () => {

        document
            .querySelectorAll('.bottom-nav-btn')
            .forEach(btn =>
                btn.classList.remove('active')
            );

        $('homeBtn').classList.add('active');

        cartPanel?.classList.remove('open');

        currentCategory = 'Варзидан';

        currentCategoryTitle.textContent =
            'Варзидан';

        renderProducts();

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    $('favoritesBtn')?.addEventListener('click', () => {

        document
            .querySelectorAll('.bottom-nav-btn')
            .forEach(btn =>
                btn.classList.remove('active')
            );

        $('favoritesBtn').classList.add('active');

        cartPanel?.classList.remove('open');
    });


    $('cartBtn')?.addEventListener('click', () => {

        document
            .querySelectorAll('.bottom-nav-btn')
            .forEach(btn =>
                btn.classList.remove('active')
            );

        $('cartBtn').classList.add('active');

        updateCart();

        cartPanel?.classList.add('open');
    });


    closeCart?.addEventListener('click', () => {

        cartPanel?.classList.remove('open');

        $('homeBtn')?.classList.add('active');

        $('cartBtn')?.classList.remove('active');
    });


    /* =========================
       START
    ========================= */

    applyTheme(currentTheme);

    setLanguage(currentLang);

    renderCategories();

    renderProducts();

    updateCart();

    updateAdminUI();

});
