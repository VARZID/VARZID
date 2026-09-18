document.addEventListener('DOMContentLoaded', () => {

    const $ = id => document.getElementById(id);

    const brandToggle = $('brandToggle');
    const dropdownMenu = $('dropdownMenu');

    const settingsToggle = $('settingsToggle');
    const settingsMenu = $('settingsMenu');
    const closeSettingsHeader = $('closeSettingsHeader');

    const categoryList = $('categoryList');
    const addCategoryBtn = $('addCategoryBtn');

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

    /* Админ танҳо барои ҳамин сессия */
    let isAdmin =
        sessionStorage.getItem('varzid_admin') === 'true';

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

    const ADMIN_PASSWORD = '1604';

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
            total: 'Ҳамагӣ',
            admin: 'Админ',
            on: 'Фаъол',
            off: 'Хомӯш'
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
            total: 'Итого',
            admin: 'Админ',
            on: 'Вкл',
            off: 'Выкл'
        }
    };

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

    function getPriceNumber(price) {

        const n = parseFloat(
            String(price)
                .replace(',', '.')
                .replace(/[^\d.]/g, '')
        );

        return isNaN(n) ? 0 : n;
    }

    function formatPrice(number) {

        return new Intl.NumberFormat('ru-RU').format(
            getPriceNumber(number)
        ) + ' сомонӣ';
    }

    function updateSubscribers() {

        const text = document.querySelector('.subscriber-text');

        if (!text) return;

        const t = dict[currentLang];

        const count =
            subscribers >= 1000
                ? (subscribers / 1000)
                    .toFixed(1)
                    .replace('.0', '') + 'K'
                : subscribers;

        text.innerHTML = '';

        const number = document.createElement('span');
        number.textContent = count;

        const label = document.createElement('span');
        label.textContent = t.subscribers;

        text.appendChild(number);
        text.appendChild(label);
    }

    function updateAdminUI() {

        if (addCategoryBtn) {
            addCategoryBtn.style.display =
                isAdmin ? 'block' : 'none';
        }

        const badge = $('adminStatusBadge');

        if (badge) {

            badge.textContent =
                isAdmin
                    ? dict[currentLang].on
                    : dict[currentLang].off;

            badge.className =
                isAdmin
                    ? 'badge-on'
                    : 'badge-off';
        }

        const adminText = $('adminInfoText');

        if (adminText) {
            adminText.textContent =
                dict[currentLang].admin;
        }
    }

    function setLanguage(lang) {

        if (!dict[lang]) {
            lang = 'tg';
        }

        currentLang = lang;

        localStorage.setItem(
            'lang',
            lang
        );

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

        if (subBtn) {

            subBtn.textContent =
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

        if ($('cartTotalLabel')) {
            $('cartTotalLabel').textContent = t.total;
        }

        updateSubscribers();
        updateAdminUI();
        renderCategories();
        renderProducts();
        updateCart();
    }

    /* ОБУНА */

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

    /* КАТЕГОРИЯҲО */

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

            /* ПЛЮСИ АДМИН */

            if (
                isAdmin &&
                cat !== 'Варзидан'
            ) {

                const plus =
                    document.createElement('button');

                plus.className = 'add-btn';

                plus.textContent = '+';

                plus.title =
                    'Илова кардани маҳсулот';

                plus.addEventListener(
                    'click',
                    event => {

                        event.stopPropagation();

                        openStockForm(cat);
                    }
                );

                card.appendChild(plus);
            }

            /* НЕСТ КАРДАНИ КАТЕГОРИЯ */

            if (
                isAdmin &&
                cat !== 'Варзидан'
            ) {

                const del =
                    document.createElement('button');

                del.className = 'delete-btn';

                del.textContent = '×';

                del.addEventListener(
                    'click',
                    event => {

                        event.stopPropagation();

                        deleteCategory(cat, index);
                    }
                );

                card.appendChild(del);
            }

            card.addEventListener(
                'click',
                () => {

                    currentCategory = cat;

                    if (currentCategoryTitle) {

                        currentCategoryTitle.textContent =
                            cat;
                    }

                    renderProducts();

                    dropdownMenu?.classList.remove('open');

                    brandToggle?.classList.remove('active');
                }
            );

            categoryList.appendChild(card);
        });

        saveCategories();
    }

    /* ИЛОВАИ КАТЕГОРИЯ */

    addCategoryBtn?.addEventListener(
        'click',
        () => {

            if (!isAdmin) return;

            const name = prompt(
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
        }
    );

    function deleteCategory(cat, index) {

        if (!isAdmin) return;

        const ok = confirm(
            currentLang === 'ru'
                ? `Удалить категорию «${cat}»?`
                : `Категорияи «${cat}»-ро нест кунем?`
        );

        if (!ok) return;

        categories.splice(index, 1);

        products.forEach(product => {

            if (product.category === cat) {
                product.active = false;
            }
        });

        saveCategories();
        saveProducts();

        if (currentCategory === cat) {
            currentCategory = 'Варзидан';
        }

        renderCategories();
        renderProducts();
    }

    /* ФОРМАИ ЗАХИРА */

    function openStockForm(category) {

        if (!isAdmin) return;

        const old =
            products.find(
                p =>
                    p.category === category &&
                    p.active !== false
            );

        const modal =
            document.createElement('div');

        modal.className =
            'theme-modal open';

        modal.innerHTML = `
            <div class="theme-modal-content">

                <h3>
                    ${old ? 'Илова ба захира' : 'Маҳсулоти нав'}
                </h3>

                <div class="stock-add-title">
                    Категория
                </div>

                <div class="admin-calc">
                    ${category}
                </div>

                <div class="stock-add-title">
                    ${old ? 'Миқдори иловагӣ' : 'Миқдор'}
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
                    class="admin-input"
                >
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

                <div
                    class="admin-calc"
                    id="stockCalculation"
                >
                    Ҳисоб: 0 сомонӣ
                </div>

                <button
                    id="saveStock"
                    class="admin-submit"
                >
                    ${old ? 'Илова кардан' : 'Сабт кардан'}
                </button>

                <button
                    id="cancelStock"
                    class="theme-cancel"
                >
                    БЕКОР КАРДАН
                </button>

            </div>
        `;

        document.body.appendChild(modal);

        const quantityInput =
            modal.querySelector('#stockQuantity');

        const priceInput =
            modal.querySelector('#stockPrice');

        const calculation =
            modal.querySelector('#stockCalculation');

        if (old) {

            modal.querySelector('#stockUnit').value =
                old.unit || 'кг';

            priceInput.value =
                old.price || '';
        }

        function updateCalculation() {

            const quantity =
                Number(quantityInput.value) || 0;

            const price =
                Number(priceInput.value) || 0;

            const total =
                quantity * price;

            calculation.textContent =
                `Ҳисоб: ${formatPrice(total)}`;
        }

        quantityInput.addEventListener(
            'input',
            updateCalculation
        );

        priceInput.addEventListener(
            'input',
            updateCalculation
        );

        modal.querySelector('#saveStock')
            .addEventListener(
                'click',
                () => {

                    const quantity =
                        Number(quantityInput.value);

                    const unit =
                        modal.querySelector(
                            '#stockUnit'
                        ).value;

                    const price =
                        Number(priceInput.value);

                    const file =
                        modal.querySelector(
                            '#stockImage'
                        ).files[0];

                    if (
                        !quantity ||
                        quantity <= 0
                    ) {

                        alert(
                            currentLang === 'ru'
                                ? 'Введите количество'
                                : 'Миқдорро дуруст ворид кунед'
                        );

                        return;
                    }

                    if (
                        !price ||
                        price <= 0
                    ) {

                        alert(
                            currentLang === 'ru'
                                ? 'Введите цену'
                                : 'Нархро дуруст ворид кунед'
                        );

                        return;
                    }

                    if (
                        old &&
                        old.unit &&
                        old.unit !== unit
                    ) {

                        alert(
                            currentLang === 'ru'
                                ? 'У единицы товара уже есть другое значение'
                                : 'Воҳиди ин маҳсулот дигар аст'
                        );

                        return;
                    }

                    function finish(image) {

                        if (old) {

                            old.quantity =
                                Number(old.quantity || 0) +
                                quantity;

                            old.unit = unit;

                            old.price = price;

                            old.active = true;

                            if (image) {
                                old.image = image;
                            }

                        } else {

                            products.push({

                                id:
                                    Date.now().toString(),

                                name:
                                    category,

                                category:
                                    category,

                                quantity:
                                    quantity,

                                unit:
                                    unit,

                                price:
                                    price,

                                image:
                                    image || '',

                                active:
                                    true
                            });
                        }

                        saveProducts();

                        modal.remove();

                        renderProducts();
                    }

                    if (file) {

                        const reader =
                            new FileReader();

                        reader.onload =
                            () => finish(reader.result);

                        reader.readAsDataURL(file);

                    } else {

                        finish(
                            old?.image || ''
                        );
                    }
                }
            );

        modal.querySelector('#cancelStock')
            .addEventListener(
                'click',
                () => modal.remove()
            );
    }

    /* МАҲСУЛОТ */

    function renderProducts() {

        if (!productsList) return;

        productsList.innerHTML = '';

        const visibleProducts =
            products.filter(
                product => {

                    if (product.active === false) {
                        return false;
                    }

                    if (currentCategory === 'Варзидан') {
                        return true;
                    }

                    return (
                        product.category ===
                        currentCategory
                    );
                }
            );

        if (!visibleProducts.length) {

            emptyProducts.style.display =
                'block';

            return;

        } else {

            emptyProducts.style.display =
                'none';
        }

        visibleProducts.forEach(
            product => {

                const card =
                    document.createElement('div');

                card.className =
                    'product-card';

                const quantity =
                    Number(product.quantity) || 0;

                const out =
                    quantity <= 0;

                /* АКС */

                if (product.image) {

                    const img =
                        document.createElement('img');

                    img.className =
                        'product-image';

                    img.src =
                        product.image;

                    img.alt =
                        product.name;

                    card.appendChild(img);

                } else {

                    const noImage =
                        document.createElement('div');

                    noImage.className =
                        'product-no-image';

                    noImage.textContent =
                        'Акс нест';

                    card.appendChild(noImage);
                }

                const info =
                    document.createElement('div');

                info.className =
                    'product-info';

                const name =
                    document.createElement('div');

                name.className =
                    'product-name';

                name.textContent =
                    product.name;

                info.appendChild(name);

                const price =
                    document.createElement('div');

                price.className =
                    'product-price';

                price.textContent =
                    formatPrice(product.price);

                info.appendChild(price);

                /*
                    МИҚДОР ТАНҲО БАРОИ АДМИН
                */

                if (isAdmin) {

                    const stock =
                        document.createElement('div');

                    stock.className =
                        'product-stock';

                    stock.textContent =
                        `Захира: ${quantity} ${product.unit || ''}`;

                    info.appendChild(stock);

                    const value =
                        document.createElement('div');

                    value.className =
                        'product-stock';

                    value.textContent =
                        `Ҳисоб: ${formatPrice(
                            quantity *
                            getPriceNumber(product.price)
                        )}`;

                    info.appendChild(value);
                }

                const status =
                    document.createElement('span');

                status.className =
                    'product-status' +
                    (out ? ' out' : '');

                status.textContent =
                    out
                        ? 'ТАМОМ ШУД'
                        : 'ДАР ФУРӮШ';

                info.appendChild(status);

                card.appendChild(info);

                /* ТУГМАИ МУШТАРӢ */

                const order =
                    document.createElement('button');

                order.className =
                    'product-order-btn';

                order.disabled =
                    out;

                order.textContent =
                    out
                        ? 'ТАМОМ ШУД'
                        : 'Илова ба сабад';

                order.addEventListener(
                    'click',
                    () => {

                        if (!out) {
                            addToCart(product);
                        }
                    }
                );

                card.appendChild(order);

                /* ВОСИТАҲОИ АДМИН */

                if (isAdmin) {

                    const tools =
                        document.createElement('div');

                    tools.className =
                        'admin-product-tools';

                    const add =
                        document.createElement('button');

                    add.className =
                        'admin-tool';

                    add.textContent =
                        '+ Захира';

                    add.addEventListener(
                        'click',
                        () =>
                            openStockForm(
                                product.category
                            )
                    );

                    const edit =
                        document.createElement('button');

                    edit.className =
                        'admin-tool';

                    edit.textContent =
                        'Тағйир';

                    edit.addEventListener(
                        'click',
                        () =>
                            editProduct(product)
                    );

                    const del =
                        document.createElement('button');

                    del.className =
                        'admin-tool delete';

                    del.textContent =
                        'Нест';

                    del.addEventListener(
                        'click',
                        () =>
                            deleteProduct(product)
                    );

                    tools.appendChild(add);
                    tools.appendChild(edit);
                    tools.appendChild(del);

                    card.appendChild(tools);
                }

                productsList.appendChild(card);
            }
        );
    }

    /* ТАҒЙИРИ МАҲСУЛОТ */

    function editProduct(product) {

        if (!isAdmin) return;

        const modal =
            document.createElement('div');

        modal.className =
            'theme-modal open';

        modal.innerHTML = `
            <div class="theme-modal-content">

                <h3>
                    Тағйири ${product.name}
                </h3>

                <div class="stock-add-title">
                    Миқдор
                </div>

                <input
                    id="editQuantity"
                    class="admin-input"
                    type="number"
                    min="0"
                    step="0.01"
                    value="${Number(product.quantity) || 0}"
                >

                <div class="stock-add-title">
                    Воҳид
                </div>

                <select
                    id="editUnit"
                    class="admin-input"
                >
                    <option value="кг">кг</option>
                    <option value="халта">халта</option>
                    <option value="дона">дона</option>
                    <option value="штук">штук</option>
                </select>

                <div class="stock-add-title">
                    Нарх
                </div>

                <input
                    id="editPrice"
                    class="admin-input"
                    type="number"
                    min="0"
                    step="0.01"
                    value="${getPriceNumber(product.price)}"
                >

                <div class="stock-add-title">
                    Акс
                </div>

                <input
                    id="editImage"
                    class="admin-input"
                    type="file"
                    accept="image/*"
                >

                <div
                    class="admin-calc"
                    id="editCalculation"
                >
                    Ҳисоб: 0 сомонӣ
                </div>

                <button
                    id="saveEdit"
                    class="admin-submit"
                >
                    Сабт кардан
                </button>

                <button
                    id="deleteImage"
                    class="theme-cancel"
                >
                    Нест кардани акс
                </button>

                <button
                    id="cancelEdit"
                    class="theme-cancel"
                >
                    БЕКОР КАРДАН
                </button>

            </div>
        `;

        document.body.appendChild(modal);

        const quantity =
            modal.querySelector('#editQuantity');

        const price =
            modal.querySelector('#editPrice');

        const calculation =
            modal.querySelector('#editCalculation');

        modal.querySelector('#editUnit').value =
            product.unit || 'кг';

        function calculate() {

            const q =
                Number(quantity.value) || 0;

            const p =
                Number(price.value) || 0;

            calculation.textContent =
                `Ҳисоб: ${formatPrice(q * p)}`;
        }

        quantity.addEventListener(
            'input',
            calculate
        );

        price.addEventListener(
            'input',
            calculate
        );

        calculate();

        modal.querySelector('#saveEdit')
            .addEventListener(
                'click',
                () => {

                    const newQuantity =
                        Number(quantity.value);

                    const newPrice =
                        Number(price.value);

                    if (
                        isNaN(newQuantity) ||
                        newQuantity < 0
                    ) {

                        alert('Миқдор нодуруст аст');

                        return;
                    }

                    if (
                        isNaN(newPrice) ||
                        newPrice <= 0
                    ) {

                        alert('Нарх нодуруст аст');

                        return;
                    }

                    product.quantity =
                        newQuantity;

                    product.unit =
                        modal.querySelector(
                            '#editUnit'
                        ).value;

                    product.price =
                        newPrice;

                    product.active =
                        newQuantity > 0;

                    const file =
                        modal.querySelector(
                            '#editImage'
                        ).files[0];

                    if (file) {

                        const reader =
                            new FileReader();

                        reader.onload =
                            () => {

                                product.image =
                                    reader.result;

                                saveProducts();

                                modal.remove();

                                renderProducts();

                                updateCart();
                            };

                        reader.readAsDataURL(file);

                    } else {

                        saveProducts();

                        modal.remove();

                        renderProducts();

                        updateCart();
                    }
                }
            );

        modal.querySelector('#deleteImage')
            .addEventListener(
                'click',
                () => {

                    product.image = '';

                    saveProducts();

                    modal.remove();

                    renderProducts();
                }
            );

        modal.querySelector('#cancelEdit')
            .addEventListener(
                'click',
                () => modal.remove()
            );
    }

    function deleteProduct(product) {

        if (!isAdmin) return;

        const ok =
            confirm(
                currentLang === 'ru'
                    ? `Удалить товар «${product.name}»?`
                    : `Маҳсулоти «${product.name}»-ро нест кунем?`
            );

        if (!ok) return;

        product.active = false;

        cart =
            cart.filter(
                item =>
                    item.id !== product.id
            );

        saveProducts();
        saveCart();

        renderProducts();
        updateCart();
    }

    /* САБАД */

    function addToCart(product) {

        if (
            !product ||
            product.active === false ||
            Number(product.quantity) <= 0
        ) {
            return;
        }

        const existing =
            cart.find(
                item =>
                    item.id === product.id
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

                id:
                    product.id,

                name:
                    product.name,

                category:
                    product.category,

                quantity:
                    1,

                unit:
                    product.unit,

                price:
                    product.price
            });
        }

        updateCart();

        cartPanel?.classList.add('open');
    }

    window.addToCart = addToCart;

    function updateCart() {

        if (!cartItems) return;

        /* Маҳсулоти нестшуда аз сабад хориҷ мешавад */

        cart =
            cart.filter(
                item => {

                    const product =
                        products.find(
                            p =>
                                p.id === item.id
                        );

                    return (
                        product &&
                        product.active !== false &&
                        Number(product.quantity) > 0
                    );
                }
            );

        cartItems.innerHTML = '';

        let total = 0;
        let count = 0;

        cart.forEach(
            (item, index) => {

                const product =
                    products.find(
                        p =>
                            p.id === item.id
                    );

                if (!product) return;

                const maxStock =
                    Number(product.quantity) || 0;

                if (
                    item.quantity >
                    maxStock
                ) {
                    item.quantity =
                        maxStock;
                }

                const quantity =
                    Number(item.quantity) || 1;

                const price =
                    getPriceNumber(
                        product.price
                    );

                total +=
                    price * quantity;

                count += quantity;

                const row =
                    document.createElement('div');

                row.className =
                    'cart-item';

                const info =
                    document.createElement('div');

                info.className =
                    'cart-item-info';

                const name =
                    document.createElement('div');

                name.className =
                    'cart-item-name';

                name.textContent =
                    product.name;

                const itemPrice =
                    document.createElement('div');

                itemPrice.className =
                    'cart-item-price';

                itemPrice.textContent =
                    `${formatPrice(price)} / ${product.unit || ''}`;

                info.appendChild(name);
                info.appendChild(itemPrice);

                const controls =
                    document.createElement('div');

                controls.className =
                    'cart-controls';

                const minus =
                    document.createElement('button');

                minus.className =
                    'quantity-btn';

                minus.dataset.action =
                    'minus';

                minus.dataset.index =
                    index;

                minus.textContent =
                    '−';

                const number =
                    document.createElement('span');

                number.className =
                    'quantity-number';

                number.textContent =
                    quantity;

                const plus =
                    document.createElement('button');

                plus.className =
                    'quantity-btn';

                plus.dataset.action =
                    'plus';

                plus.dataset.index =
                    index;

                plus.textContent =
                    '+';

                controls.appendChild(minus);
                controls.appendChild(number);
                controls.appendChild(plus);

                const remove =
                    document.createElement('button');

                remove.className =
                    'remove-cart-item';

                remove.dataset.action =
                    'remove';

                remove.dataset.index =
                    index;

                remove.textContent =
                    '×';

                row.appendChild(info);
                row.appendChild(controls);
                row.appendChild(remove);

                cartItems.appendChild(row);
            }
        );

        if (cart.length === 0) {

            cartEmpty.style.display =
                'block';

            buyCartBtn.style.display =
                'none';

        } else {

            cartEmpty.style.display =
                'none';

            buyCartBtn.style.display =
                'block';
        }

        cartTotal.textContent =
            formatPrice(total);

        cartCount.textContent =
            count;

        cartCount.style.display =
            count > 0
                ? 'flex'
                : 'none';

        saveCart();
    }

    cartItems?.addEventListener(
        'click',
        event => {

            const btn =
                event.target.closest('button');

            if (!btn) return;

            const index =
                Number(btn.dataset.index);

            const action =
                btn.dataset.action;

            if (!cart[index]) return;

            const product =
                products.find(
                    p =>
                        p.id ===
                        cart[index].id
                );

            if (!product) {

                cart.splice(index, 1);

                updateCart();

                return;
            }

            if (action === 'plus') {

                if (
                    cart[index].quantity <
                    Number(product.quantity)
                ) {

                    cart[index].quantity++;
                }
            }

            if (action === 'minus') {

                cart[index].quantity--;

                if (
                    cart[index].quantity <= 0
                ) {

                    cart.splice(index, 1);
                }
            }

            if (action === 'remove') {

                cart.splice(index, 1);
            }

            updateCart();
        }
    );

    /* WHATSAPP */

    buyCartBtn?.addEventListener(
        'click',
        () => {

            if (!cart.length) return;

            let message =
                'Салом, ман мехоҳам фармоиш диҳам:\n\n';

            let total = 0;

            cart.forEach(
                (item, index) => {

                    const product =
                        products.find(
                            p =>
                                p.id ===
                                item.id
                        );

                    if (!product) return;

                    const quantity =
                        Number(item.quantity) || 1;

                    const price =
                        getPriceNumber(
                            product.price
                        );

                    const lineTotal =
                        price * quantity;

                    total +=
                        lineTotal;

                    message +=
                        `${index + 1}. ` +
                        `${product.name} — ` +
                        `${formatPrice(price)} / ` +
                        `${product.unit || ''} × ` +
                        `${quantity} = ` +
                        `${formatPrice(lineTotal)}\n`;
                }
            );

            message +=
                `\nҲамагӣ: ${formatPrice(total)}`;

            message +=
                '\n\nЛутфан нархи расониданро низ хабар диҳед.';

            const url =
                'https://wa.me/992000001606?text=' +
                encodeURIComponent(message);

            window.open(
                url,
                '_blank'
            );
        }
    );

    /* ТЕМА */

    function applyTheme(theme) {

        currentTheme =
            theme === 'dark'
                ? 'dark'
                : 'light';

        document.body.classList.toggle(
            'light-theme',
            currentTheme === 'light'
        );

        document.body.classList.toggle(
            'dark-theme',
            currentTheme === 'dark'
        );

        localStorage.setItem(
            'theme',
            currentTheme
        );

        setLanguage(currentLang);
    }

    setThemeBtn?.addEventListener(
        'click',
        () => {

            themeModal?.classList.add('open');
        }
    );

    cancelTheme?.addEventListener(
        'click',
        () => {

            themeModal?.classList.remove('open');
        }
    );

    document
        .querySelectorAll('.theme-option')
        .forEach(option => {

            option.addEventListener(
                'click',
                () => {

                    const theme =
                        option.dataset.theme;

                    if (!theme) return;

                    applyTheme(theme);

                    themeModal?.classList.remove(
                        'open'
                    );
                }
            );
        });

    /* ЗАБОН */

    setLanguageBtn?.addEventListener(
        'click',
        () => {

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
        }
    );

    /* ОГОҲИҲО */

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

    /* HOME */

    $('homeBtn')?.addEventListener(
        'click',
        () => {

            document
                .querySelectorAll(
                    '.bottom-nav-btn'
                )
                .forEach(
                    btn =>
                        btn.classList.remove(
                            'active'
                        )
                );

            $('homeBtn')
                .classList.add('active');

            cartPanel?.classList.remove('open');

            currentCategory =
                'Варзидан';

            currentCategoryTitle.textContent =
                'Варзидан';

            renderProducts();

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    );

    /* FAVORITES */

    $('favoritesBtn')?.addEventListener(
        'click',
        () => {

            document
                .querySelectorAll(
                    '.bottom-nav-btn'
                )
                .forEach(
                    btn =>
                        btn.classList.remove(
                            'active'
                        )
                );

            $('favoritesBtn')
                .classList.add('active');

            cartPanel?.classList.remove('open');
        }
    );

    /* CART */

    $('cartBtn')?.addEventListener(
        'click',
        () => {

            document
                .querySelectorAll(
                    '.bottom-nav-btn'
                )
                .forEach(
                    btn =>
                        btn.classList.remove(
                            'active'
                        )
                );

            $('cartBtn')
                .classList.add('active');

            updateCart();

            cartPanel?.classList.add('open');
        }
    );

    closeCart?.addEventListener(
        'click',
        () => {

            cartPanel?.classList.remove('open');

            $('homeBtn')
                ?.classList.add('active');

            $('cartBtn')
                ?.classList.remove('active');
        }
    );

    /*
     * АДМИН
     *
     * "Админ" дар Танзимот қасдан пахшшаванда нест.
     *
     * Барои соҳиб:
     * ба суроғаи сомона #admin илова мешавад.
     *
     * Масалан:
     * varzid.github.io/VARZID/#admin
     */

    function openAdminLogin() {

        if (isAdmin) {

            openAdminDashboard();

            return;
        }

        const modal =
            document.createElement('div');

        modal.className =
            'theme-modal open';

        modal.innerHTML = `
            <div class="theme-modal-content">

                <h3>
                    Режими Админ
                </h3>

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
                    class="admin-submit"
                >
                    Ворид шудан
                </button>

                <button
                    id="cancelAdmin"
                    class="theme-cancel"
                >
                    БЕКОР КАРДАН
                </button>

            </div>
        `;

        document.body.appendChild(modal);

        const input =
            modal.querySelector(
                '#adminPasswordInput'
            );

        input?.focus();

        modal.querySelector(
            '#confirmAdmin'
        )?.addEventListener(
            'click',
            () => {

                if (
                    input.value ===
                    ADMIN_PASSWORD
                ) {

                    isAdmin = true;

                    sessionStorage.setItem(
                        'varzid_admin',
                        'true'
                    );

                    modal.remove();

                    updateAdminUI();

                    renderCategories();

                    renderProducts();

                    openAdminDashboard();

                } else {

                    alert(
                        dict[currentLang].wrongPass
                    );

                    input.value = '';

                    input.focus();
                }
            }
        );

        modal.querySelector(
            '#cancelAdmin'
        )?.addEventListener(
            'click',
            () => modal.remove()
        );

        input?.addEventListener(
            'keydown',
            event => {

                if (event.key === 'Enter') {

                    modal.querySelector(
                        '#confirmAdmin'
                    )?.click();
                }
            }
        );
    }

    function openAdminDashboard() {

        if (!isAdmin) return;

        const old =
            document.getElementById(
                'adminDashboardModal'
            );

        if (old) old.remove();

        const modal =
            document.createElement('div');

        modal.id =
            'adminDashboardModal';

        modal.className =
            'theme-modal open';

        modal.innerHTML = `
            <div class="theme-modal-content">

                <h3>
                    Панели Админ
                </h3>

                <div
                    class="admin-dashboard"
                    id="adminDashboardContent"
                ></div>

                <button
                    id="adminLogout"
                    class="theme-cancel"
                >
                    Баромадан аз Админ
                </button>

                <button
                    id="adminClose"
                    class="theme-cancel"
                >
                    Пӯшидан
                </button>

            </div>
        `;

        document.body.appendChild(modal);

        renderAdminDashboard();

        modal.querySelector(
            '#adminLogout'
        ).addEventListener(
            'click',
            () => {

                isAdmin = false;

                sessionStorage.removeItem(
                    'varzid_admin'
                );

                modal.remove();

                updateAdminUI();

                renderCategories();

                renderProducts();
            }
        );

        modal.querySelector(
            '#adminClose'
        ).addEventListener(
            'click',
            () => modal.remove()
        );
    }

    function renderAdminDashboard() {

        const box =
            document.getElementById(
                'adminDashboardContent'
            );

        if (!box) return;

        const activeProducts =
            products.filter(
                p =>
                    p.active !== false
            );

        let totalValue = 0;

        activeProducts.forEach(
            product => {

                totalValue +=
                    (Number(product.quantity) || 0) *
                    getPriceNumber(product.price);
            }
        );

        box.innerHTML = '';

        const summary =
            document.createElement('div');

        summary.className =
            'admin-summary';

        const productsBox =
            document.createElement('div');

        productsBox.className =
            'admin-summary-box';

        productsBox.innerHTML = `
            <div class="admin-summary-label">
                Маҳсулот
            </div>
            <div class="admin-summary-value">
                ${activeProducts.length}
            </div>
        `;

        const valueBox =
            document.createElement('div');

        valueBox.className =
            'admin-summary-box';

        valueBox.innerHTML = `
            <div class="admin-summary-label">
                Ҳисоби захира
            </div>
            <div class="admin-summary-value">
                ${formatPrice(totalValue)}
            </div>
        `;

        summary.appendChild(productsBox);
        summary.appendChild(valueBox);

        box.appendChild(summary);

        const section =
            document.createElement('div');

        section.className =
            'admin-dashboard-section';

        const title =
            document.createElement('div');

        title.className =
            'admin-dashboard-section-title';

        title.textContent =
            'Категорияҳо ва захира';

        section.appendChild(title);

        categories.forEach(
            category => {

                if (category === 'Варзидан') {
                    return;
                }

                const row =
                    document.createElement('div');

                row.className =
                    'admin-category-row';

                const name =
                    document.createElement('div');

                name.className =
                    'admin-category-name';

                name.textContent =
                    category;

                const add =
                    document.createElement('button');

                add.className =
                    'admin-small-btn green';

                add.textContent =
                    '+ Захира';

                add.addEventListener(
                    'click',
                    () => {

                        modalCloseAdminDashboard();

                        openStockForm(category);
                    }
                );

                row.appendChild(name);
                row.appendChild(add);

                section.appendChild(row);
            }
        );

        box.appendChild(section);

        const productsSection =
            document.createElement('div');

        productsSection.className =
            'admin-dashboard-section';

        const productTitle =
            document.createElement('div');

        productTitle.className =
            'admin-dashboard-section-title';

        productTitle.textContent =
            'Маҳсулот';

        productsSection.appendChild(
            productTitle
        );

        activeProducts.forEach(
            product => {

                const row =
                    document.createElement('div');

                row.className =
                    'admin-category-row';

                const name =
                    document.createElement('div');

                name.className =
                    'admin-category-name';

                name.textContent =
                    `${product.name}: ` +
                    `${Number(product.quantity) || 0} ` +
                    `${product.unit || ''}`;

                const edit =
                    document.createElement('button');

                edit.className =
                    'admin-small-btn';

                edit.textContent =
                    'Тағйир';

                edit.addEventListener(
                    'click',
                    () => {

                        modalCloseAdminDashboard();

                        editProduct(product);
                    }
                );

                row.appendChild(name);
                row.appendChild(edit);

                productsSection.appendChild(row);
            }
        );

        box.appendChild(productsSection);
    }

    function modalCloseAdminDashboard() {

        const modal =
            document.getElementById(
                'adminDashboardModal'
            );

        if (modal) {
            modal.remove();
        }
    }

    /*
     * ВОРИДШАВИИ СОҲИБ
     *
     * Муштарӣ тугмаи Админро пахш карда наметавонад.
     * Соҳиб URL-и #admin-ро истифода мебарад.
     */

    if (
        window.location.hash === '#admin'
    ) {

        history.replaceState(
            null,
            document.title,
            window.location.pathname +
            window.location.search
        );

        setTimeout(
            () => openAdminLogin(),
            200
        );
    }

    /* ОҒОЗ */

    applyTheme(currentTheme);

    setLanguage(currentLang);

    renderCategories();

    renderProducts();

    updateCart();

    updateAdminUI();

});
