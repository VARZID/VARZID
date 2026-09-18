document.addEventListener('DOMContentLoaded', () => {

    const $ = id => document.getElementById(id);

    const brandToggle = $('brandToggle');
    const dropdownMenu = $('dropdownMenu');
    const settingsToggle = $('settingsToggle');
    const settingsMenu = $('settingsMenu');

    const categoryList = $('categoryList');
    const addCategoryBtn = $('addCategoryBtn');

    const productsList = $('productsList');
    const emptyProducts = $('emptyProducts');
    const currentCategoryTitle = $('currentCategoryTitle');

    const appModal = $('appModal');
    const modalCard = $('modalCard');

    const cartPanel = $('cartPanel');
    const cartItems = $('cartItems');
    const cartEmpty = $('cartEmpty');
    const cartCount = $('cartCount');
    const cartTotal = $('cartTotal');

    const ADMIN_PASSWORD = '1604';

    const defaultCategories = [
        'Орд',
        'Гандум',
        'Комбикорм',
        'Ҷав',
        'Ҷуворимакка',
        'Селитра',
        'Карбамид'
    ];

    const categoryTranslations = {

        'Орд': {
            tg: 'Орд',
            ru: 'Мука',
            uz: 'Un'
        },

        'Гандум': {
            tg: 'Гандум',
            ru: 'Пшеница',
            uz: 'Bug‘doy'
        },

        'Комбикорм': {
            tg: 'Комбикорм',
            ru: 'Комбикорм',
            uz: 'Kombikorm'
        },

        'Ҷав': {
            tg: 'Ҷав',
            ru: 'Ячмень',
            uz: 'Arpa'
        },

        'Ҷуворимакка': {
            tg: 'Ҷуворимакка',
            ru: 'Кукуруза',
            uz: 'Makkajo‘xori'
        },

        'Селитра': {
            tg: 'Селитра',
            ru: 'Селитра',
            uz: 'Selitra'
        },

        'Карбамид': {
            tg: 'Карбамид',
            ru: 'Карбамид',
            uz: 'Karbamid'
        }
    };

    const dict = {

        tg: {
            subscribers: 'подписчиков',
            subscribe: 'Подписаться',
            subscribed: '✓ Шумо обуна ҳастед',

            settings: 'Танзимот',
            categories: 'Категорияҳо',

            theme: 'Тема',
            day: 'Режими рӯзона ›',
            night: 'Режими шабона ›',

            notifications: 'Огоҳиҳо',
            on: 'Фаъол ›',
            off: 'Хомӯш ›',

            language: 'Забон',

            admin: 'Админ',
            active: 'Фаъол',
            disabled: 'Хомӯш',
            adminPanel: 'Панели Админ',

            cart: 'Сабад',
            buy: 'Харидан',
            total: 'Ҳамагӣ',

            empty: 'Ҳоло маҳсулот нест',

            addCart: 'Илова ба сабад',
            soldOut: 'ТАМОМ ШУД',
            inSale: 'ДАР ФУРӮШ',
            noImage: 'Акс нест',

            loginAdmin: 'Режими Админ',
            password: 'Паролро ворид кунед',
            login: 'Ворид шудан',
            cancel: 'БЕКОР КАРДАН',

            wrongPass: 'Дастрасӣ рад шуд',

            productNew: 'Маҳсулоти нав',
            editProduct: 'Тағйири маҳсулот',

            productName: 'Номи маҳсулот',
            category: 'Маҳсулот / категория',
            quantity: 'Миқдор',
            unit: 'Воҳид',
            count: 'Шумора',
            price: 'Нарх',
            image: 'Акс',

            save: 'Сабт кардан',
            add: 'Илова кардан',

            calc: 'Ҳисоби умумӣ',

            removeImage: 'Нест кардани акс',

            products: 'Маҳсулот',
            stockValue: 'Арзиши захира',
            stockQty: 'Миқдори умумӣ',
            stockCount: 'Шумораи умумӣ',

            edit: 'Тағйир',
            remove: 'Нест',

            logout: 'Баромадан аз Админ',
            close: 'Пӯшидан',

            newCategory: 'Номи маҳсулоти навро ворид кунед:',

            exists: 'Ин ном аллакай вуҷуд дорад',

            deleteQuestion: 'Маҳсулотро нест кунем?',
            categoryDeleteQuestion: 'Ин категорияро нест кунем?',

            languageTitle: 'Интихоби забон',
            themeTitle: 'Интихоби тема',

            nightMode: '🌙 Режими шабона',
            dayMode: '☀️ Режими рӯзона',

            confirm: 'Тасдиқ',
            yesDelete: 'Нест кардан',

            nameRequired: 'Номи маҳсулотро ворид кунед',
            quantityRequired: 'Миқдорро дуруст ворид кунед',
            priceRequired: 'Нархро дуруст ворид кунед',
            countRequired: 'Шумораро дуруст ворид кунед',

            delivery:
                'Лутфан нархи расониданро низ хабар диҳед.'
        },

        ru: {
            subscribers: 'подписчиков',
            subscribe: 'Подписаться',
            subscribed: '✓ Вы подписаны',

            settings: 'Настройки',
            categories: 'Категории',

            theme: 'Тема',
            day: 'Дневной режим ›',
            night: 'Ночной режим ›',

            notifications: 'Уведомления',
            on: 'Вкл ›',
            off: 'Выкл ›',

            language: 'Язык',

            admin: 'Админ',
            active: 'Вкл',
            disabled: 'Выкл',
            adminPanel: 'Панель Админа',

            cart: 'Корзина',
            buy: 'Купить',
            total: 'Итого',

            empty: 'Товаров пока нет',

            addCart: 'Добавить в корзину',
            soldOut: 'НЕТ В НАЛИЧИИ',
            inSale: 'В ПРОДАЖЕ',
            noImage: 'Нет фото',

            loginAdmin: 'Режим Админа',
            password: 'Введите пароль',
            login: 'Войти',
            cancel: 'ОТМЕНА',

            wrongPass: 'Доступ запрещён',

            productNew: 'Новый товар',
            editProduct: 'Изменить товар',

            productName: 'Название товара',
            category: 'Товар / категория',
            quantity: 'Количество',
            unit: 'Единица',
            count: 'Число',
            price: 'Цена',
            image: 'Фото',

            save: 'Сохранить',
            add: 'Добавить',

            calc: 'Общая сумма',

            removeImage: 'Удалить фото',

            products: 'Товары',
            stockValue: 'Стоимость запаса',
            stockQty: 'Общее количество',
            stockCount: 'Общее число',

            edit: 'Изменить',
            remove: 'Удалить',

            logout: 'Выйти из Админа',
            close: 'Закрыть',

            newCategory: 'Введите название нового товара:',

            exists: 'Такое название уже существует',

            deleteQuestion: 'Удалить товар?',
            categoryDeleteQuestion: 'Удалить эту категорию?',

            languageTitle: 'Выбор языка',
            themeTitle: 'Выбор темы',

            nightMode: '🌙 Ночной режим',
            dayMode: '☀️ Дневной режим',

            confirm: 'Подтверждение',
            yesDelete: 'Удалить',

            nameRequired: 'Введите название товара',
            quantityRequired: 'Введите правильное количество',
            priceRequired: 'Введите правильную цену',
            countRequired: 'Введите правильное число',

            delivery:
                'Пожалуйста, сообщите также стоимость доставки.'
        },

        uz: {
            subscribers: 'obunachi',
            subscribe: 'Obuna bo‘lish',
            subscribed: '✓ Siz obuna bo‘lgansiz',

            settings: 'Sozlamalar',
            categories: 'Kategoriyalar',

            theme: 'Mavzu',
            day: 'Kunduzgi rejim ›',
            night: 'Tungi rejim ›',

            notifications: 'Bildirishnomalar',
            on: 'Yoqilgan ›',
            off: 'O‘chirilgan ›',

            language: 'Til',

            admin: 'Admin',
            active: 'Yoqilgan',
            disabled: 'O‘chirilgan',
            adminPanel: 'Admin paneli',

            cart: 'Savat',
            buy: 'Sotib olish',
            total: 'Jami',

            empty: 'Hozircha mahsulot yo‘q',

            addCart: 'Savatga qo‘shish',
            soldOut: 'TUGAGAN',
            inSale: 'SOTUVDA',
            noImage: 'Rasm yo‘q',

            loginAdmin: 'Admin rejimi',
            password: 'Parolni kiriting',
            login: 'Kirish',
            cancel: 'BEKOR QILISH',

            wrongPass: 'Kirish rad etildi',

            productNew: 'Yangi mahsulot',
            editProduct: 'Mahsulotni o‘zgartirish',

            productName: 'Mahsulot nomi',
            category: 'Mahsulot / kategoriya',
            quantity: 'Miqdor',
            unit: 'Birlik',
            count: 'Soni',
            price: 'Narx',
            image: 'Rasm',

            save: 'Saqlash',
            add: 'Qo‘shish',

            calc: 'Umumiy hisob',

            removeImage: 'Rasmni o‘chirish',

            products: 'Mahsulotlar',
            stockValue: 'Zaxira qiymati',
            stockQty: 'Umumiy miqdor',
            stockCount: 'Umumiy son',

            edit: 'O‘zgartirish',
            remove: 'O‘chirish',

            logout: 'Admin rejimidan chiqish',
            close: 'Yopish',

            newCategory: 'Yangi mahsulot nomini kiriting:',

            exists: 'Bu nom allaqachon mavjud',

            deleteQuestion: 'Mahsulot o‘chirilsinmi?',
            categoryDeleteQuestion: 'Bu kategoriya o‘chirilsinmi?',

            languageTitle: 'Tilni tanlash',
            themeTitle: 'Mavzuni tanlash',

            nightMode: '🌙 Tungi rejim',
            dayMode: '☀️ Kunduzgi rejim',

            confirm: 'Tasdiqlash',
            yesDelete: 'O‘chirish',

            nameRequired: 'Mahsulot nomini kiriting',
            quantityRequired: 'Miqdorni to‘g‘ri kiriting',
            priceRequired: 'Narxni to‘g‘ri kiriting',
            countRequired: 'Sonni to‘g‘ri kiriting',

            delivery:
                'Yetkazib berish narxini ham xabar qiling.'
        }
    };

    function t(key) {
        return dict[currentLang]?.[key] || dict.tg[key] || key;
    }

    function readJSON(keys, fallback) {

        for (const key of keys) {

            try {

                const raw =
                    localStorage.getItem(key);

                if (raw !== null) {
                    return JSON.parse(raw);
                }

            } catch (e) {}
        }

        return fallback;
    }

    let subscribers =
        Number(localStorage.getItem('subCount')) || 0;

    let isSubscribed =
        localStorage.getItem('isSubscribed') === 'true';

    let isAdmin =
        sessionStorage.getItem('varzid_admin') === 'true';

    let currentTheme =
        localStorage.getItem('varzid_theme') ||
        localStorage.getItem('theme') ||
        'light';

    let currentLang =
        localStorage.getItem('varzid_lang') ||
        localStorage.getItem('lang') ||
        'tg';

    let notificationsEnabled =
        localStorage.getItem('notifications') === 'true';

    let categories =
        readJSON(
            ['varzid_categories', 'categories'],
            defaultCategories.slice()
        );

    if (!Array.isArray(categories)) {
        categories = defaultCategories.slice();
    }

    categories =
        categories.filter(
            (c, i, arr) =>
                c &&
                arr.indexOf(c) === i &&
                c !== 'Варзидан'
        );

    let products =
        readJSON(
            ['varzid_products'],
            []
        );

    if (!Array.isArray(products)) {
        products = [];
    }

    let cart =
        readJSON(
            ['varzid_cart'],
            []
        );

    if (!Array.isArray(cart)) {
        cart = [];
    }

    let currentCategory = 'Варзидан';

    function saveCategories() {

        localStorage.setItem(
            'varzid_categories',
            JSON.stringify(categories)
        );

        localStorage.setItem(
            'categories',
            JSON.stringify(categories)
        );
    }

    function saveProducts() {

        localStorage.setItem(
            'varzid_products',
            JSON.stringify(products)
        );
    }

    function saveCart() {

        localStorage.setItem(
            'varzid_cart',
            JSON.stringify(cart)
        );
    }

    function priceNumber(value) {

        const n =
            parseFloat(
                String(value ?? '')
                    .replace(',', '.')
                    .replace(/[^\d.-]/g, '')
            );

        return Number.isFinite(n)
            ? n
            : 0;
    }

    function money(value) {

        return new Intl.NumberFormat('ru-RU')
            .format(priceNumber(value)) +
            ' сомонӣ';
    }

    function categoryLabel(category) {

        return (
            categoryTranslations[category]?.[currentLang]
            ||
            category
        );
    }

    function escapeHtml(value) {

        return String(value ?? '')
            .replaceAll('&','&amp;')
            .replaceAll('<','&lt;')
            .replaceAll('>','&gt;')
            .replaceAll('"','&quot;')
            .replaceAll("'","&#039;");
    }

    function productName(product) {

        return product.name ||
            product.category ||
            '';
    }

    /* MODAL */

    function openModal(html, callback) {

        modalCard.innerHTML = html;

        appModal.classList.add('open');

        appModal.setAttribute(
            'aria-hidden',
            'false'
        );

        if (callback) {
            callback(modalCard);
        }
    }

    function closeModal() {

        appModal.classList.remove('open');

        appModal.setAttribute(
            'aria-hidden',
            'true'
        );

        modalCard.innerHTML = '';
    }

    document.addEventListener(
        'click',
        event => {

            if (
                event.target.matches(
                    '[data-close-modal="true"]'
                )
            ) {
                closeModal();
            }
        }
    );

    /* SUBSCRIBERS */

    function updateSubscribers() {

        const count =
            subscribers >= 1000
                ? (
                    subscribers / 1000
                )
                    .toFixed(1)
                    .replace('.0','') + 'K'
                : subscribers;

        $('subCount').textContent =
            count;

        $('subscriberLabel').textContent =
            t('subscribers');

        $('subBtn').textContent =
            isSubscribed
                ? t('subscribed')
                : t('subscribe');
    }

    $('subBtn').addEventListener(
        'click',
        () => {

            if (isSubscribed) {

                subscribers =
                    Math.max(
                        0,
                        subscribers - 1
                    );

                isSubscribed = false;

            } else {

                subscribers++;

                isSubscribed = true;
            }

            localStorage.setItem(
                'subCount',
                subscribers
            );

            localStorage.setItem(
                'isSubscribed',
                isSubscribed
            );

            updateSubscribers();
        }
    );

    /* SETTINGS */

    function updateAdminUI() {

        $('adminInfoText').textContent =
            t('admin');

        $('adminStatusBadge').textContent =
            isAdmin
                ? t('active')
                : t('disabled');

        $('adminStatusBadge').className =
            isAdmin
                ? 'badge-on'
                : 'badge-off';

        addCategoryBtn.style.display =
            isAdmin
                ? 'block'
                : 'none';

        $('adminSessionBtn').hidden =
            !isAdmin;

        $('adminSessionText').textContent =
            t('adminPanel');
    }

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
            'varzid_theme',
            currentTheme
        );

        localStorage.setItem(
            'theme',
            currentTheme
        );

        $('themeStatus').textContent =
            currentTheme === 'light'
                ? t('day')
                : t('night');
    }

    $('setTheme').addEventListener(
        'click',
        () => {

            openModal(`
                <h3 class="modal-title">
                    ${t('themeTitle')}
                </h3>

                <div class="modal-options">

                    <button
                        class="modal-option"
                        data-theme="dark"
                        type="button">
                        ${t('nightMode')}
                    </button>

                    <button
                        class="modal-option"
                        data-theme="light"
                        type="button">
                        ${t('dayMode')}
                    </button>

                </div>

                <button
                    class="modal-secondary"
                    id="themeCancel"
                    type="button">
                    ${t('cancel')}
                </button>
            `, modal => {

                modal
                    .querySelectorAll('[data-theme]')
                    .forEach(button => {

                        button.addEventListener(
                            'click',
                            () => {

                                applyTheme(
                                    button.dataset.theme
                                );

                                closeModal();
                            }
                        );
                    });

                modal
                    .querySelector('#themeCancel')
                    .addEventListener(
                        'click',
                        closeModal
                    );
            });
        }
    );

    $('setLanguage').addEventListener(
        'click',
        () => {

            openModal(`
                <h3 class="modal-title">
                    ${t('languageTitle')}
                </h3>

                <div class="modal-options">

                    <button
                        class="modal-option"
                        data-lang="tg"
                        type="button">
                        Тоҷикӣ
                    </button>

                    <button
                        class="modal-option"
                        data-lang="ru"
                        type="button">
                        Русский
                    </button>

                    <button
                        class="modal-option"
                        data-lang="uz"
                        type="button">
                        O‘zbekcha
                    </button>

                </div>

                <button
                    class="modal-secondary"
                    id="languageCancel"
                    type="button">
                    ${t('cancel')}
                </button>
            `, modal => {

                modal
                    .querySelectorAll('[data-lang]')
                    .forEach(button => {

                        button.addEventListener(
                            'click',
                            () => {

                                setLanguage(
                                    button.dataset.lang
                                );

                                closeModal();
                            }
                        );
                    });

                modal
                    .querySelector('#languageCancel')
                    .addEventListener(
                        'click',
                        closeModal
                    );
            });
        }
    );

    $('setNotifications').addEventListener(
        'click',
        () => {

            notificationsEnabled =
                !notificationsEnabled;

            localStorage.setItem(
                'notifications',
                notificationsEnabled
            );

            setLanguage(
                currentLang
            );
        }
    );

    function setLanguage(lang) {

        if (!dict[lang]) {
            lang = 'tg';
        }

        currentLang = lang;

        localStorage.setItem(
            'varzid_lang',
            lang
        );

        localStorage.setItem(
            'lang',
            lang
        );

        $('settingsTitle').textContent =
            t('settings');

        $('categoriesTitle').textContent =
            t('categories');

        $('themeLabel').textContent =
            t('theme');

        $('notifLabel').textContent =
            t('notifications');

        $('langLabel').textContent =
            t('language');

        $('cartTitle').textContent =
            t('cart');

        $('cartTotalLabel').textContent =
            t('total');

        $('buyCartBtn').textContent =
            t('buy');

        $('themeStatus').textContent =
            currentTheme === 'light'
                ? t('day')
                : t('night');

        $('notifStatusText').textContent =
            notificationsEnabled
                ? t('on')
                : t('off');

        $('currentLangDisplay').textContent =
            lang === 'tg'
                ? 'Тоҷикӣ ›'
                : lang === 'ru'
                    ? 'Русский ›'
                    : 'O‘zbekcha ›';

        updateSubscribers();
        updateAdminUI();
        renderCategories();
        renderProducts();
        updateCart();
    }

    /* КАТЕГОРИЯҲО */

    brandToggle.addEventListener(
        'click',
        () => {

            dropdownMenu.classList.toggle(
                'open'
            );

            brandToggle.classList.toggle(
                'active'
            );

            $('settingsMenu')
                .classList.remove('open');
        }
    );

    settingsToggle.addEventListener(
        'click',
        () => {

            $('settingsMenu')
                .classList.toggle('open');

            dropdownMenu
                .classList.remove('open');

            brandToggle
                .classList.remove('active');
        }
    );

    $('closeSettingsHeader')
        .addEventListener(
            'click',
            () => {
                $('settingsMenu')
                    .classList.remove('open');
            }
        );

    function renderCategories() {

        categoryList.innerHTML = '';

        /* ВАРЗИДАН = ҲАМАИ МАҲСУЛОТ */

        const allCard =
            document.createElement('div');

        allCard.className =
            'category-card' +
            (
                currentCategory === 'Варзидан'
                    ? ' active'
                    : ''
            );

        allCard.innerHTML =
            '<span class="cat-name">Варзидан</span>';

        allCard.addEventListener(
            'click',
            () => selectCategory('Варзидан')
        );

        categoryList.appendChild(
            allCard
        );

        /* МАҲСУЛОТ */

        categories.forEach(
            (category, index) => {

                const card =
                    document.createElement('div');

                card.className =
                    'category-card' +
                    (
                        currentCategory === category
                            ? ' active'
                            : ''
                    );

                const name =
                    document.createElement('span');

                name.className =
                    'cat-name';

                name.textContent =
                    categoryLabel(category);

                card.appendChild(name);

                /* + танҳо барои админ */

                if (isAdmin) {

                    const plus =
                        document.createElement('button');

                    plus.className =
                        'category-plus';

                    plus.type = 'button';

                    plus.textContent = '+';

                    plus.addEventListener(
                        'click',
                        event => {

                            event.stopPropagation();

                            openProductForm(
                                null,
                                category
                            );
                        }
                    );

                    card.appendChild(plus);

                    const del =
                        document.createElement('button');

                    del.className =
                        'delete-btn';

                    del.type = 'button';

                    del.textContent = '×';

                    del.addEventListener(
                        'click',
                        event => {

                            event.stopPropagation();

                            confirmDeleteCategory(
                                category,
                                index
                            );
                        }
                    );

                    card.appendChild(del);
                }

                card.addEventListener(
                    'click',
                    () => {

                        selectCategory(
                            category
                        );
                    }
                );

                categoryList.appendChild(card);
            }
        );
    }

    function selectCategory(category) {

        currentCategory =
            category;

        currentCategoryTitle.textContent =
            category === 'Варзидан'
                ? 'Варзидан'
                : categoryLabel(category);

        renderCategories();
        renderProducts();

        dropdownMenu.classList.remove(
            'open'
        );

        brandToggle.classList.remove(
            'active'
        );

        window.scrollTo({
            top:0,
            behavior:'smooth'
        });
    }

    /* МАҲСУЛОТ */

    function renderProducts() {

        productsList.innerHTML = '';

        /*
         * Варзидан:
         * ҳамаи маҳсулот.
         *
         * Орд:
         * танҳо Орд.
         */

        const visibleProducts =
            products.filter(
                product => {

                    if (
                        product.active === false
                    ) {
                        return false;
                    }

                    if (
                        currentCategory ===
                        'Варзидан'
                    ) {
                        return true;
                    }

                    return (
                        product.category ===
                        currentCategory
                    );
                }
            );

        emptyProducts.textContent =
            t('empty');

        emptyProducts.style.display =
            visibleProducts.length
                ? 'none'
                : 'block';

        visibleProducts.forEach(
            product => {

                const card =
                    document.createElement('div');

                card.className =
                    'product-card';

                /* АКС */

                if (product.image) {

                    const img =
                        document.createElement('img');

                    img.className =
                        'product-image';

                    img.src =
                        product.image;

                    img.alt =
                        productName(product);

                    card.appendChild(img);

                } else {

                    const noImage =
                        document.createElement('div');

                    noImage.className =
                        'product-no-image';

                    noImage.textContent =
                        t('noImage');

                    card.appendChild(
                        noImage
                    );
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
                    productName(product);

                const price =
                    document.createElement('div');

                price.className =
                    'product-price';

                price.textContent =
                    money(product.price);

                const quantity =
                    Number(product.quantity) || 0;

                const out =
                    quantity <= 0;

                const status =
                    document.createElement('span');

                status.className =
                    'product-status' +
                    (
                        out
                            ? ' out'
                            : ''
                    );

                status.textContent =
                    out
                        ? t('soldOut')
                        : t('inSale');

                info.appendChild(name);
                info.appendChild(price);
                info.appendChild(status);

                card.appendChild(info);

                /* МУШТАРӢ */

                const order =
                    document.createElement('button');

                order.className =
                    'product-order-btn';

                order.type = 'button';

                order.disabled =
                    out;

                order.textContent =
                    out
                        ? t('soldOut')
                        : t('addCart');

                order.addEventListener(
                    'click',
                    () => {

                        addToCart(
                            product
                        );
                    }
                );

                card.appendChild(order);

                /* АДМИН */

                if (isAdmin) {

                    const tools =
                        document.createElement('div');

                    tools.className =
                        'admin-product-tools';

                    const edit =
                        document.createElement('button');

                    edit.className =
                        'admin-tool';

                    edit.type = 'button';

                    edit.textContent =
                        t('edit');

                    edit.addEventListener(
                        'click',
                        () => {

                            openProductForm(
                                product
                            );
                        }
                    );

                    const del =
                        document.createElement('button');

                    del.className =
                        'admin-tool delete';

                    del.type = 'button';

                    del.textContent =
                        t('remove');

                    del.addEventListener(
                        'click',
                        () => {

                            confirmDeleteProduct(
                                product
                            );
                        }
                    );

                    tools.appendChild(edit);
                    tools.appendChild(del);

                    card.appendChild(tools);
                }

                productsList.appendChild(card);
            }
        );
    }

    /* ФОРМАИ МАҲСУЛОТ */

    function openProductForm(
        product = null,
        defaultCategory = ''
    ) {

        if (!isAdmin) {
            return;
        }

        const oldName =
            product
                ? productName(product)
                : '';

        const oldCategory =
            product
                ? product.category
                : (
                    defaultCategory ||
                    categories[0] ||
                    ''
                );

        const oldQuantity =
            product
                ? Number(product.quantity) || 0
                : 0;

        const oldCount =
            product
                ? Number(product.count) || 0
                : 0;

        const oldPrice =
            product
                ? priceNumber(product.price)
                : 0;

        const oldUnit =
            product?.unit ||
            'халта';

        openModal(`

            <h3 class="modal-title">
                ${
                    product
                        ? t('editProduct')
                        : t('productNew')
                }
            </h3>

            <label class="form-label">
                ${t('productName')}
            </label>

            <input
                class="admin-input"
                id="productName"
                type="text"
                value="${escapeHtml(oldName)}">

            <label class="form-label">
                ${t('category')}
            </label>

            <select
                class="admin-input"
                id="productCategory">

                ${
                    categories.map(
                        category => `
                            <option
                                value="${escapeHtml(category)}"
                                ${
                                    category === oldCategory
                                        ? 'selected'
                                        : ''
                                }>
                                ${escapeHtml(
                                    categoryLabel(category)
                                )}
                            </option>
                        `
                    ).join('')
                }

            </select>

            <label class="form-label">
                ${t('quantity')}
            </label>

            <input
                class="admin-input"
                id="productQuantity"
                type="number"
                min="0"
                step="0.01"
                value="${oldQuantity}">

            <label class="form-label">
                ${t('unit')}
            </label>

            <select
                class="admin-input"
                id="productUnit">

                <option value="халта"
                    ${
                        oldUnit === 'халта'
                            ? 'selected'
                            : ''
                    }>
                    халта
                </option>

                <option value="кг"
                    ${
                        oldUnit === 'кг'
                            ? 'selected'
                            : ''
                    }>
                    кг
                </option>

                <option value="дона"
                    ${
                        oldUnit === 'дона'
                            ? 'selected'
                            : ''
                    }>
                    дона
                </option>

                <option value="штук"
                    ${
                        oldUnit === 'штук'
                            ? 'selected'
                            : ''
                    }>
                    штук
                </option>

            </select>

            <label class="form-label">
                ${t('count')}
            </label>

            <input
                class="admin-input"
                id="productCount"
                type="number"
                min="0"
                step="1"
                value="${oldCount}">

            <label class="form-label">
                ${t('price')}
            </label>

            <input
                class="admin-input"
                id="productPrice"
                type="number"
                min="0"
                step="0.01"
                value="${oldPrice}">

            <label class="form-label">
                ${t('image')}
            </label>

            <input
                class="admin-input"
                id="productImage"
                type="file"
                accept="image/*">

            <div
                class="admin-calc"
                id="productCalculation">

                ${t('calc')}:
                ${money(oldQuantity * oldPrice)}

            </div>

            <button
                class="admin-submit"
                id="saveProduct"
                type="button">

                ${
                    product
                        ? t('save')
                        : t('add')
                }

            </button>

            ${
                product?.image
                    ? `
                        <button
                            class="modal-secondary modal-danger"
                            id="removeImage"
                            type="button">
                            ${t('removeImage')}
                        </button>
                    `
                    : ''
            }

            <button
                class="modal-secondary"
                id="cancelProduct"
                type="button">

                ${t('cancel')}

            </button>

        `, modal => {

            const quantity =
                modal.querySelector(
                    '#productQuantity'
                );

            const price =
                modal.querySelector(
                    '#productPrice'
                );

            const calculation =
                modal.querySelector(
                    '#productCalculation'
                );

            function calculate() {

                const q =
                    Number(quantity.value) || 0;

                const p =
                    Number(price.value) || 0;

                calculation.textContent =
                    `${t('calc')}: ${money(q * p)}`;
            }

            quantity.addEventListener(
                'input',
                calculate
            );

            price.addEventListener(
                'input',
                calculate
            );

            modal.querySelector(
                '#cancelProduct'
            ).addEventListener(
                'click',
                closeModal
            );

            modal.querySelector(
                '#saveProduct'
            ).addEventListener(
                'click',
                () => {

                    const name =
                        modal.querySelector(
                            '#productName'
                        ).value.trim();

                    const category =
                        modal.querySelector(
                            '#productCategory'
                        ).value;

                    const q =
                        Number(quantity.value);

                    const unit =
                        modal.querySelector(
                            '#productUnit'
                        ).value;

                    const count =
                        Number(
                            modal.querySelector(
                                '#productCount'
                            ).value
                        );

                    const p =
                        Number(price.value);

                    const file =
                        modal.querySelector(
                            '#productImage'
                        ).files[0];

                    if (!name) {
                        showMessage(
                            t('nameRequired')
                        );
                        return;
                    }

                    if (
                        !Number.isFinite(q) ||
                        q < 0
                    ) {
                        showMessage(
                            t('quantityRequired')
                        );
                        return;
                    }

                    if (
                        !Number.isFinite(count) ||
                        count < 0
                    ) {
                        showMessage(
                            t('countRequired')
                        );
                        return;
                    }

                    if (
                        !Number.isFinite(p) ||
                        p <= 0
                    ) {
                        showMessage(
                            t('priceRequired')
                        );
                        return;
                    }

                    const duplicate =
                        products.some(
                            item =>
                                item.id !== product?.id &&
                                productName(item)
                                    .trim()
                                    .toLowerCase() ===
                                name
                                    .toLowerCase()
                        );

                    if (duplicate) {

                        showMessage(
                            t('exists')
                        );

                        return;
                    }

                    function finish(
                        image
                    ) {

                        if (product) {

                            product.name =
                                name;

                            product.category =
                                category;

                            product.quantity =
                                q;

                            product.unit =
                                unit;

                            product.count =
                                count;

                            product.price =
                                p;

                            product.active =
                                true;

                            if (
                                image !== undefined
                            ) {
                                product.image =
                                    image;
                            }

                        } else {

                            products.push({

                                id:
                                    Date.now()
                                    .toString(),

                                name:
                                    name,

                                category:
                                    category,

                                quantity:
                                    q,

                                unit:
                                    unit,

                                count:
                                    count,

                                price:
                                    p,

                                image:
                                    image || '',

                                active:
                                    true
                            });
                        }

                        saveProducts();

                        closeModal();

                        renderProducts();

                        updateCart();
                    }

                    if (file) {

                        const reader =
                            new FileReader();

                        reader.onload =
                            () => {

                                finish(
                                    reader.result
                                );
                            };

                        reader.readAsDataURL(
                            file
                        );

                    } else {

                        finish(
                            product
                                ? product.image
                                : ''
                        );
                    }
                }
            );

            const removeImage =
                modal.querySelector(
                    '#removeImage'
                );

            if (removeImage) {

                removeImage.addEventListener(
                    'click',
                    () => {

                        product.image =
                            '';

                        saveProducts();

                        closeModal();

                        renderProducts();
                    }
                );
            }
        });
    }

    /* + БАРОИ МАҲСУЛОТИ НАВ */

    addCategoryBtn.addEventListener(
        'click',
        () => {

            if (!isAdmin) return;

            openModal(`

                <h3 class="modal-title">
                    ${t('productNew')}
                </h3>

                <p class="modal-subtitle">
                    ${t('newCategory')}
                </p>

                <input
                    class="admin-input"
                    id="newCategory"
                    type="text">

                <button
                    class="admin-submit"
                    id="saveNewCategory"
                    type="button">
                    ${t('add')}
                </button>

                <button
                    class="modal-secondary"
                    id="cancelNewCategory"
                    type="button">
                    ${t('cancel')}
                </button>

            `, modal => {

                modal.querySelector(
                    '#cancelNewCategory'
                ).addEventListener(
                    'click',
                    closeModal
                );

                modal.querySelector(
                    '#saveNewCategory'
                ).addEventListener(
                    'click',
                    () => {

                        const name =
                            modal.querySelector(
                                '#newCategory'
                            ).value.trim();

                        if (!name) return;

                        const exists =
                            categories.some(
                                category =>
                                    category
                                        .toLowerCase() ===
                                    name
                                        .toLowerCase()
                            );

                        if (exists) {

                            showMessage(
                                t('exists')
                            );

                            return;
                        }

                        categories.push(
                            name
                        );

                        saveCategories();

                        closeModal();

                        renderCategories();
                    }
                );
            });
        }
    );

    /* DELETE */

    function confirmDeleteProduct(
        product
    ) {

        if (!isAdmin) return;

        confirmModal(
            `${t('deleteQuestion')} «${productName(product)}»`,
            () => {

                product.active =
                    false;

                cart =
                    cart.filter(
                        item =>
                            item.id !==
                            product.id
                    );

                saveProducts();
                saveCart();

                renderProducts();
                updateCart();
            }
        );
    }

    function confirmDeleteCategory(
        category,
        index
    ) {

        if (!isAdmin) return;

        confirmModal(
            `${t('categoryDeleteQuestion')} «${categoryLabel(category)}»`,
            () => {

                categories.splice(
                    index,
                    1
                );

                products.forEach(
                    product => {

                        if (
                            product.category ===
                            category
                        ) {
                            product.active =
                                false;
                        }
                    }
                );

                saveCategories();
                saveProducts();

                if (
                    currentCategory ===
                    category
                ) {
                    currentCategory =
                        'Варзидан';
                }

                currentCategoryTitle.textContent =
                    currentCategory ===
                    'Варзидан'
                        ? 'Варзидан'
                        : categoryLabel(
                            currentCategory
                        );

                renderCategories();
                renderProducts();
            }
        );
    }

    function confirmModal(
        message,
        action
    ) {

        openModal(`

            <h3 class="modal-title">
                ${t('confirm')}
            </h3>

            <p class="modal-subtitle">
                ${escapeHtml(message)}
            </p>

            <button
                class="admin-submit"
                id="confirmYes"
                type="button">
                ${t('yesDelete')}
            </button>

            <button
                class="modal-secondary"
                id="confirmNo"
                type="button">
                ${t('cancel')}
            </button>

        `, modal => {

            modal.querySelector(
                '#confirmNo'
            ).addEventListener(
                'click',
                closeModal
            );

            modal.querySelector(
                '#confirmYes'
            ).addEventListener(
                'click',
                () => {

                    closeModal();

                    action();
                }
            );
        });
    }

    function showMessage(
        message
    ) {

        openModal(`

            <h3 class="modal-title">
                VARZID
            </h3>

            <p class="modal-subtitle">
                ${escapeHtml(message)}
            </p>

            <button
                class="admin-submit"
                id="messageOK"
                type="button">
                OK
            </button>

        `, modal => {

            modal.querySelector(
                '#messageOK'
            ).addEventListener(
                'click',
                closeModal
            );
        });
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
                    item.id ===
                    product.id
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

                quantity:
                    1
            });
        }

        updateCart();

        cartPanel.classList.add(
            'open'
        );
    }

    function updateCart() {

        cartItems.innerHTML = '';

        let total = 0;
        let count = 0;

        cart =
            cart.filter(
                item => {

                    const product =
                        products.find(
                            p =>
                                p.id ===
                                item.id
                        );

                    return (
                        product &&
                        product.active !== false &&
                        Number(product.quantity) > 0
                    );
                }
            );

        cart.forEach(
            (item, index) => {

                const product =
                    products.find(
                        p =>
                            p.id ===
                            item.id
                    );

                if (!product) return;

                const max =
                    Number(
                        product.quantity
                    ) || 0;

                item.quantity =
                    Math.min(
                        Number(item.quantity) || 1,
                        max
                    );

                const quantity =
                    item.quantity;

                const price =
                    priceNumber(
                        product.price
                    );

                total +=
                    price *
                    quantity;

                count +=
                    quantity;

                const row =
                    document.createElement(
                        'div'
                    );

                row.className =
                    'cart-item';

                row.innerHTML = `

                    <div class="cart-item-info">

                        <div class="cart-item-name">
                            ${escapeHtml(
                                productName(product)
                            )}
                        </div>

                        <div class="cart-item-price">
                            ${money(price)}
                            /
                            ${escapeHtml(
                                product.unit || ''
                            )}
                        </div>

                    </div>

                    <div class="cart-controls">

                        <button
                            class="quantity-btn"
                            data-action="minus"
                            data-index="${index}"
                            type="button">
                            −
                        </button>

                        <span class="quantity-number">
                            ${quantity}
                        </span>

                        <button
                            class="quantity-btn"
                            data-action="plus"
                            data-index="${index}"
                            type="button">
                            +
                        </button>

                    </div>

                    <button
                        class="remove-cart-item"
                        data-action="remove"
                        data-index="${index}"
                        type="button">
                        ×
                    </button>
                `;

                cartItems.appendChild(
                    row
                );
            }
        );

        cartEmpty.style.display =
            cart.length
                ? 'none'
                : 'block';

        $('buyCartBtn').style.display =
            cart.length
                ? 'block'
                : 'none';

        cartTotal.textContent =
            money(total);

        cartCount.textContent =
            count;

        cartCount.style.display =
            count > 0
                ? 'flex'
                : 'none';

        saveCart();
    }

    cartItems.addEventListener(
        'click',
        event => {

            const button =
                event.target.closest(
                    'button[data-action]'
                );

            if (!button) return;

            const index =
                Number(
                    button.dataset.index
                );

            const action =
                button.dataset.action;

            const item =
                cart[index];

            if (!item) return;

            const product =
                products.find(
                    p =>
                        p.id ===
                        item.id
                );

            if (!product) {

                cart.splice(
                    index,
                    1
                );

                updateCart();

                return;
            }

            if (
                action === 'plus' &&
                item.quantity <
                Number(product.quantity)
            ) {

                item.quantity++;
            }

            if (
                action === 'minus'
            ) {

                item.quantity--;

                if (
                    item.quantity <= 0
                ) {

                    cart.splice(
                        index,
                        1
                    );
                }
            }

            if (
                action === 'remove'
            ) {

                cart.splice(
                    index,
                    1
                );
            }

            updateCart();
        }
    );

    /* WHATSAPP */

    $('buyCartBtn').addEventListener(
        'click',
        () => {

            if (!cart.length) return;

            let message =
                currentLang === 'ru'
                    ? 'Здравствуйте, я хочу оформить заказ:\n\n'
                    : currentLang === 'uz'
                        ? 'Assalomu alaykum, buyurtma bermoqchiman:\n\n'
                        : 'Салом, ман мехоҳам фармоиш диҳам:\n\n';

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
                        Number(
                            item.quantity
                        ) || 1;

                    const price =
                        priceNumber(
                            product.price
                        );

                    const line =
                        price *
                        quantity;

                    total +=
                        line;

                    message +=
                        `${index + 1}. ` +
                        `${productName(product)} — ` +
                        `${money(price)} / ` +
                        `${product.unit || ''} × ` +
                        `${quantity} = ` +
                        `${money(line)}\n`;
                }
            );

            message +=
                `\n${t('total')}: ${money(total)}`;

            message +=
                `\n\n${t('delivery')}`;

            const url =
                'https://wa.me/992000001606?text=' +
                encodeURIComponent(message);

            window.open(
                url,
                '_blank'
            );
        }
    );

    /* ADMIN */

    function openAdminLogin() {

        if (isAdmin) {

            openAdminDashboard();

            return;
        }

        openModal(`

            <h3 class="modal-title">
                ${t('loginAdmin')}
            </h3>

            <p class="modal-subtitle">
                ${t('password')}
            </p>

            <input
                class="admin-input"
                id="adminPassword"
                type="password"
                inputmode="numeric"
                autocomplete="off">

            <button
                class="admin-submit"
                id="adminLoginButton"
                type="button">
                ${t('login')}
            </button>

            <button
                class="modal-secondary"
                id="adminCancel"
                type="button">
                ${t('cancel')}
            </button>

        `, modal => {

            const input =
                modal.querySelector(
                    '#adminPassword'
                );

            input.focus();

            function login() {

                if (
                    input.value ===
                    ADMIN_PASSWORD
                ) {

                    isAdmin = true;

                    sessionStorage.setItem(
                        'varzid_admin',
                        'true'
                    );

                    closeModal();

                    updateAdminUI();
                    renderCategories();
                    renderProducts();

                    openAdminDashboard();

                } else {

                    input.value = '';

                    showMessage(
                        t('wrongPass')
                    );
                }
            }

            modal.querySelector(
                '#adminLoginButton'
            ).addEventListener(
                'click',
                login
            );

            modal.querySelector(
                '#adminCancel'
            ).addEventListener(
                'click',
                closeModal
            );

            input.addEventListener(
                'keydown',
                event => {

                    if (
                        event.key ===
                        'Enter'
                    ) {
                        login();
                    }
                }
            );
        });
    }

    function openAdminDashboard() {

        if (!isAdmin) return;

        const activeProducts =
            products.filter(
                product =>
                    product.active !== false
            );

        let totalValue = 0;
        let totalQuantity = 0;
        let totalCount = 0;

        activeProducts.forEach(
            product => {

                totalValue +=
                    (
                        Number(
                            product.quantity
                        ) || 0
                    ) *
                    priceNumber(
                        product.price
                    );

                totalQuantity +=
                    Number(
                        product.quantity
                    ) || 0;

                totalCount +=
                    Number(
                        product.count
                    ) || 0;
            }
        );

        openModal(`

            <h3 class="modal-title">
                ${t('adminPanel')}
            </h3>

            <div class="admin-summary">

                <div class="admin-summary-box">
                    <div class="admin-summary-label">
                        ${t('products')}
                    </div>

                    <div class="admin-summary-value">
                        ${activeProducts.length}
                    </div>
                </div>

                <div class="admin-summary-box">
                    <div class="admin-summary-label">
                        ${t('stockValue')}
                    </div>

                    <div class="admin-summary-value">
                        ${money(totalValue)}
                    </div>
                </div>

                <div class="admin-summary-box">
                    <div class="admin-summary-label">
                        ${t('stockQty')}
                    </div>

                    <div class="admin-summary-value">
                        ${totalQuantity}
                    </div>
                </div>

                <div class="admin-summary-box">
                    <div class="admin-summary-label">
                        ${t('stockCount')}
                    </div>

                    <div class="admin-summary-value">
                        ${totalCount}
                    </div>
                </div>

            </div>

            <button
                class="admin-submit"
                id="adminNewProduct"
                type="button">
                + ${t('productNew')}
            </button>

            <div class="admin-dashboard-section">

                <div class="admin-dashboard-section-title">
                    ${t('products')}
                </div>

                <div id="adminProductRows"></div>

            </div>

            <button
                class="modal-secondary"
                id="adminLogout"
                type="button">
                ${t('logout')}
            </button>

            <button
                class="modal-secondary"
                id="adminClose"
                type="button">
                ${t('close')}
            </button>

        `, modal => {

            const rows =
                modal.querySelector(
                    '#adminProductRows'
                );

            if (
                !activeProducts.length
            ) {

                rows.innerHTML =
                    `<div class="modal-subtitle">
                        ${t('empty')}
                    </div>`;

            } else {

                activeProducts.forEach(
                    product => {

                        const row =
                            document.createElement(
                                'div'
                            );

                        row.className =
                            'admin-category-row';

                        const name =
                            document.createElement(
                                'div'
                            );

                        name.className =
                            'admin-category-name';

                        name.textContent =
                            `${productName(product)} — ` +
                            `${product.quantity || 0} ` +
                            `${product.unit || ''} / ` +
                            `${product.count || 0}`;

                        const edit =
                            document.createElement(
                                'button'
                            );

                        edit.className =
                            'admin-small-btn';

                        edit.type =
                            'button';

                        edit.textContent =
                            t('edit');

                        edit.addEventListener(
                            'click',
                            () => {

                                closeModal();

                                openProductForm(
                                    product
                                );
                            }
                        );

                        row.appendChild(
                            name
                        );

                        row.appendChild(
                            edit
                        );

                        rows.appendChild(
                            row
                        );
                    }
                );
            }

            modal.querySelector(
                '#adminNewProduct'
            ).addEventListener(
                'click',
                () => {

                    closeModal();

                    openProductForm();
                }
            );

            modal.querySelector(
                '#adminLogout'
            ).addEventListener(
                'click',
                () => {

                    isAdmin = false;

                    sessionStorage.removeItem(
                        'varzid_admin'
                    );

                    closeModal();

                    updateAdminUI();
                    renderCategories();
                    renderProducts();
                }
            );

            modal.querySelector(
                '#adminClose'
            ).addEventListener(
                'click',
                closeModal
            );
        });
    }

    $('adminSessionBtn')
        .addEventListener(
            'click',
            openAdminDashboard
        );

    /* HOME */

    $('homeBtn').addEventListener(
        'click',
        () => {

            document
                .querySelectorAll(
                    '.bottom-nav-btn'
                )
                .forEach(
                    button =>
                        button.classList.remove(
                            'active'
                        )
                );

            $('homeBtn')
                .classList.add('active');

            cartPanel.classList.remove(
                'open'
            );

            selectCategory(
                'Варзидан'
            );
        }
    );

    /* FAVORITES */

    $('favoritesBtn').addEventListener(
        'click',
        () => {

            document
                .querySelectorAll(
                    '.bottom-nav-btn'
                )
                .forEach(
                    button =>
                        button.classList.remove(
                            'active'
                        )
                );

            $('favoritesBtn')
                .classList.add('active');

            cartPanel.classList.remove(
                'open'
            );
        }
    );

    /* CART */

    $('cartBtn').addEventListener(
        'click',
        () => {

            document
                .querySelectorAll(
                    '.bottom-nav-btn'
                )
                .forEach(
                    button =>
                        button.classList.remove(
                            'active'
                        )
                );

            $('cartBtn')
                .classList.add('active');

            updateCart();

            cartPanel.classList.add(
                'open'
            );
        }
    );

    $('closeCart').addEventListener(
        'click',
        () => {

            cartPanel.classList.remove(
                'open'
            );

            $('cartBtn')
                .classList.remove(
                    'active'
                );

            $('homeBtn')
                .classList.add(
                    'active'
                );
        }
    );

    /*
     * АДМИН
     *
     * Барои соҳиби сайт:
     *
     * https://varzid.github.io/VARZID/#admin
     *
     * Барои муштарӣ дар интерфейс
     * тугмаи воридшавии админ нест.
     */

    const adminRequested =
        window.location.hash.toLowerCase() ===
            '#admin'
        ||
        new URLSearchParams(
            window.location.search
        ).get('admin') === '1';

    if (adminRequested) {

        history.replaceState(
            null,
            document.title,
            window.location.pathname
        );

        setTimeout(
            openAdminLogin,
            150
        );
    }

    /* START */

    applyTheme(
        currentTheme
    );

    setLanguage(
        currentLang
    );

    renderCategories();

    renderProducts();

    updateCart();

    updateAdminUI();

});
