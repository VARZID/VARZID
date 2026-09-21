'use strict';

const WA_NUMBER = '992000001606';
const ALL = '__all__';

const KEYS = {
    cats: 'varzid_categories',
    products: 'varzid_products',
    cart: 'varzid_cart',
    lang: 'varzid_lang',
    theme: 'varzid_theme',
    notify: 'varzid_notify',
    sub: 'varzid_subscribed'
};

const DEFAULT_CATEGORIES = [
    'Орд',
    'Комбикорм',
    'Гандум',
    'Ҷав',
    'Ҷуворимакка',
    'Селитра',
    'Карбамид'
];

const CATEGORY_RU = {
    'Орд': 'Мука',
    'Комбикорм': 'Комбикорм',
    'Гандум': 'Пшеница',
    'Ҷав': 'Ячмень',
    'Ҷуворимакка': 'Кукуруза',
    'Селитра': 'Селитра',
    'Карбамид': 'Карбамид'
};

const CATEGORY_UZ = {
    'Орд': 'Un',
    'Комбикорм': 'Kombikorm',
    'Гандум': 'Bug‘doy',
    'Ҷав': 'Arpa',
    'Ҷуворимакка': 'Makkajo‘xori',
    'Селитра': 'Selitra',
    'Карбамид': 'Karbamid'
};

const $ = id => document.getElementById(id);

function load(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
    } catch {
        return fallback;
    }
}

function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));
}

function money(value) {
    return `${Number(value || 0).toLocaleString('ru-RU')} сомонӣ`;
}

function newId() {
    return 'p_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
}

let categories = Array.from(
    new Set(
        (
            Array.isArray(load(KEYS.cats, DEFAULT_CATEGORIES))
                ? load(KEYS.cats, DEFAULT_CATEGORIES)
                : DEFAULT_CATEGORIES
        ).filter(c => c && c !== 'Варзидан')
    )
);

let products = load(KEYS.products, []);
let cart = load(KEYS.cart, []);

let lang = ['tg', 'ru', 'uz'].includes(
    localStorage.getItem(KEYS.lang)
)
    ? localStorage.getItem(KEYS.lang)
    : 'tg';

let theme =
    localStorage.getItem(KEYS.theme) === 'dark'
        ? 'dark'
        : 'light';

let notifications =
    localStorage.getItem(KEYS.notify) === 'true';

let currentCategory = ALL;

const TEXT = {
    tg: {
        subscribers: 'обуначӣ',
        subscribe: 'Обуна шудан',
        subscribed: 'Обуна шуд',
        categories: 'Категорияҳо',
        settings: 'Танзимот',
        theme: 'Тема',
        day: 'Режими рӯзона ›',
        night: 'Режими шабона ›',
        notifications: 'Огоҳиҳо',
        on: 'Фаъол ›',
        off: 'Хомӯш ›',
        language: 'Забон',
        admin: 'Админ',
        home: 'Асосӣ',
        favorites: 'Дӯстдоштаҳо',
        cart: 'Сабад',
        profile: 'Профил',
        empty: 'Ҳоло маҳсулот нест',
        add: 'Илова ба сабад',
        available: 'ДАР ФУРӮШ',
        sold: 'ТАМОМ ШУД',
        total: 'Ҳамагӣ',
        buy: 'Харидан',
        cartEmpty: 'Сабад ҳоло холӣ аст',
        delivery: 'Арзиши расонидан вобаста ба масофа аст.'
    },

    ru: {
        subscribers: 'подписчиков',
        subscribe: 'Подписаться',
        subscribed: 'Вы подписаны',
        categories: 'Категории',
        settings: 'Настройки',
        theme: 'Тема',
        day: 'Дневной режим ›',
        night: 'Ночной режим ›',
        notifications: 'Уведомления',
        on: 'Включены ›',
        off: 'Выключены ›',
        language: 'Язык',
        admin: 'Админ',
        home: 'Главная',
        favorites: 'Избранное',
        cart: 'Корзина',
        profile: 'Профиль',
        empty: 'Товаров пока нет',
        add: 'Добавить в корзину',
        available: 'В ПРОДАЖЕ',
        sold: 'ЗАКОНЧИЛСЯ',
        total: 'Итого',
        buy: 'Заказать',
        cartEmpty: 'Корзина пуста',
        delivery: 'Стоимость доставки зависит от расстояния.'
    },

    uz: {
        subscribers: 'obunachi',
        subscribe: 'Obuna bo‘lish',
        subscribed: 'Obuna bo‘lindi',
        categories: 'Kategoriyalar',
        settings: 'Sozlamalar',
        theme: 'Mavzu',
        day: 'Kunduzgi rejim ›',
        night: 'Tungi rejim ›',
        notifications: 'Bildirishnomalar',
        on: 'Yoqilgan ›',
        off: 'O‘chirilgan ›',
        language: 'Til',
        admin: 'Admin',
        home: 'Bosh sahifa',
        favorites: 'Sevimlilar',
        cart: 'Savat',
        profile: 'Profil',
        empty: 'Hozircha mahsulot yo‘q',
        add: 'Savatga qo‘shish',
        available: 'SOTUVDA',
        sold: 'TUGAGAN',
        total: 'Jami',
        buy: 'Buyurtma berish',
        cartEmpty: 'Savat bo‘sh',
        delivery: 'Yetkazib berish narxi masofaga bog‘liq.'
    }
};

function t(key) {
    return TEXT[lang][key] || TEXT.tg[key] || key;
}

function categoryName(category) {
    if (lang === 'ru') {
        return CATEGORY_RU[category] || category;
    }

    if (lang === 'uz') {
        return CATEGORY_UZ[category] || category;
    }

    return category;
}

function persist() {
    save(KEYS.cats, categories);
    save(KEYS.products, products);
    save(KEYS.cart, cart);

    localStorage.setItem(KEYS.lang, lang);
    localStorage.setItem(KEYS.theme, theme);
    localStorage.setItem(KEYS.notify, String(notifications));
}

function applyTheme() {
    document.body.classList.toggle(
        'dark-theme',
        theme === 'dark'
    );

    document.body.classList.toggle(
        'light-theme',
        theme !== 'dark'
    );
}

function openModal(id) {
    const element = $(id);

    if (element) {
        element.classList.remove('hidden');
    }
}

function closeModal(id) {
    const element = $(id);

    if (element) {
        element.classList.add('hidden');
    }
}


/* =========================
   CATEGORIES
========================= */

function renderCategories() {
    const menu = $('categoryMenu');

    if (!menu) return;

    menu.innerHTML = '';

    const allButton = document.createElement('button');

    allButton.type = 'button';
    allButton.className =
        'category-btn' +
        (currentCategory === ALL ? ' active' : '');

    allButton.textContent =
        lang === 'ru'
            ? 'Все товары'
            : lang === 'uz'
                ? 'Barcha mahsulotlar'
                : 'Варзидан';

    allButton.onclick = () => {
        currentCategory = ALL;

        const dropdown = $('dropdownMenu');

        if (dropdown) {
            dropdown.classList.remove('open');
        }

        renderAll();
    };

    menu.appendChild(allButton);

    categories.forEach(category => {
        const button = document.createElement('button');

        button.type = 'button';
        button.className =
            'category-btn' +
            (currentCategory === category ? ' active' : '');

        button.textContent = categoryName(category);

        button.onclick = () => {
            currentCategory = category;

            const dropdown = $('dropdownMenu');

            if (dropdown) {
                dropdown.classList.remove('open');
            }

            renderAll();
        };

        menu.appendChild(button);
    });
}


/* =========================
   PRODUCTS
========================= */

function renderProducts() {
    const list = $('productList');

    if (!list) return;

    list.innerHTML = '';

    let visibleProducts;

    if (currentCategory === ALL) {
        visibleProducts = products.filter(
            product => product.active !== false
        );
    } else {
        visibleProducts = products.filter(
            product =>
                product.category === currentCategory &&
                product.active !== false
        );
    }

    if (!visibleProducts.length) {
        list.innerHTML = `
            <div class="empty">
                ${t('empty')}
            </div>
        `;

        return;
    }

    visibleProducts.forEach(product => {
        const card = document.createElement('article');

        card.className = 'product-card';

        const image = product.image
            ? `
                <img
                    class="product-image"
                    src="${product.image}"
                    alt="${escapeHtml(product.name)}"
                >
            `
            : `
                <div class="product-image placeholder-image"></div>
            `;

        const stock =
            Number(product.qty || 0) > 0
                ? t('available')
                : t('sold');

        card.innerHTML = `
            ${image}

            <div class="product-body">

                <div class="product-name">
                    ${escapeHtml(product.name)}
                </div>

                <div class="product-price">
                    ${money(product.price)}
                    /
                    ${escapeHtml(product.unit || 'кг')}
                </div>

                <div class="product-status">
                    ${stock}
                </div>

                <div class="card-actions">

                    <button
                        type="button"
                        class="card-btn"
                        data-add="${product.id}"
                    >
                        ${t('add')}
                    </button>

                    <button
                        type="button"
                        class="card-btn secondary"
                        data-fav="${product.id}"
                    >
                        ♡
                    </button>

                </div>

            </div>
        `;

        list.appendChild(card);
    });

    list.querySelectorAll('[data-add]').forEach(button => {
        button.onclick = () => {
            addToCart(button.dataset.add);
        };
    });

    list.querySelectorAll('[data-fav]').forEach(button => {
        button.onclick = () => {
            button.textContent =
                button.textContent === '♥'
                    ? '♡'
                    : '♥';
        };
    });
}


/* =========================
   CART
========================= */

function renderCart() {
    const box = $('cartItems');

    if (!box) return;

    box.innerHTML = '';

    let total = 0;

    cart = cart.filter(item =>
        products.some(product => product.id === item.id)
    );

    cart.forEach(item => {
        const product =
            products.find(p => p.id === item.id);

        if (!product) return;

        const quantity = Number(item.qty || 1);

        const sum =
            Number(product.price || 0) * quantity;

        total += sum;

        const row = document.createElement('div');

        row.className = 'cart-row';

        row.innerHTML = `
            <span>
                ${escapeHtml(product.name)}
                × ${quantity}
            </span>

            <strong>
                ${money(sum)}
            </strong>
        `;

        box.appendChild(row);
    });

    if (!box.children.length) {
        box.innerHTML = `
            <div class="empty">
                ${t('cartEmpty')}
            </div>
        `;
    }

    if ($('cartTotal')) {
        $('cartTotal').textContent = money(total);
    }

    if ($('cartBadge')) {
        $('cartBadge').textContent =
            cart.reduce(
                (sum, item) =>
                    sum + Number(item.qty || 0),
                0
            );
    }
}

function addToCart(id) {
    const product =
        products.find(p => p.id === id);

    if (!product) return;

    const available =
        Number(product.qty || 0);

    if (available <= 0) {
        return;
    }

    const item =
        cart.find(x => x.id === id);

    const currentQty =
        item ? Number(item.qty || 0) : 0;

    if (currentQty >= available) {
        return;
    }

    if (item) {
        item.qty += 1;
    } else {
        cart.push({
            id,
            qty: 1
        });
    }

    persist();
    renderCart();

    openModal('cartModal');
}


/* =========================
   SETTINGS
========================= */

function updateSettingsText() {

    if ($('themeValue')) {
        $('themeValue').textContent =
            theme === 'dark'
                ? t('night')
                : t('day');
    }

    if ($('notificationValue')) {
        $('notificationValue').textContent =
            notifications
                ? t('on')
                : t('off');
    }

    if ($('languageValue')) {
        $('languageValue').textContent =
            lang === 'ru'
                ? 'Русский'
                : lang === 'uz'
                    ? 'O‘zbekcha'
                    : 'Тоҷикӣ';
    }

    if ($('adminStatusBadge')) {
        $('adminStatusBadge').textContent =
            lang === 'ru'
                ? 'Открыть ›'
                : lang === 'uz'
                    ? 'Ochish ›'
                    : 'Кушодан ›';
    }

    if ($('settingsTitle')) {
        $('settingsTitle').textContent = t('settings');
    }

    if ($('themeLabel')) {
        $('themeLabel').textContent = t('theme');
    }

    if ($('notificationLabel')) {
        $('notificationLabel').textContent =
            t('notifications');
    }

    if ($('languageLabel')) {
        $('languageLabel').textContent =
            t('language');
    }

    if ($('adminLabel')) {
        $('adminLabel').textContent =
            t('admin');
    }

    if ($('categoryTitle')) {
        $('categoryTitle').textContent =
            t('categories');
    }

    if ($('homeNav')) {
        const span = $('homeNav').querySelector('span');

        if (span) span.textContent = t('home');
    }

    if ($('favoritesNav')) {
        const span =
            $('favoritesNav').querySelector('span');

        if (span) span.textContent = t('favorites');
    }

    if ($('cartNav')) {
        const span =
            $('cartNav').querySelector('span');

        if (span) span.textContent = t('cart');
    }

    if ($('profileNav')) {
        const span =
            $('profileNav').querySelector('span');

        if (span) span.textContent = t('profile');
    }

    if ($('themeModalTitle')) {
        $('themeModalTitle').textContent =
            lang === 'ru'
                ? 'Выбор темы'
                : lang === 'uz'
                    ? 'Mavzuni tanlash'
                    : 'Интихоби тема';
    }

    if ($('darkThemeBtn')) {
        $('darkThemeBtn').textContent =
            lang === 'ru'
                ? '🌙 Ночной режим'
                : lang === 'uz'
                    ? '🌙 Tungi rejim'
                    : '🌙 Режими шабона';
    }

    if ($('lightThemeBtn')) {
        $('lightThemeBtn').textContent =
            lang === 'ru'
                ? '☀️ Дневной режим'
                : lang === 'uz'
                    ? '☀️ Kunduzgi rejim'
                    : '☀️ Режими рӯзона';
    }

    if ($('themeCancel')) {
        $('themeCancel').textContent = 'БЕКОР КАРДАН';
    }

    if ($('languageModalTitle')) {
        $('languageModalTitle').textContent =
            t('language');
    }

    if ($('cartTitle')) {
        $('cartTitle').textContent =
            t('cart');
    }

    if ($('cartTotalLabel')) {
        $('cartTotalLabel').textContent =
            t('total');
    }

    if ($('buyBtn')) {
        $('buyBtn').textContent =
            t('buy');
    }

    if ($('subscriberCount')) {
        $('subscriberCount').textContent =
            `0 ${t('subscribers')}`;
    }

    if ($('subscribeBtn')) {
        $('subscribeBtn').textContent =
            localStorage.getItem(KEYS.sub) === 'true'
                ? t('subscribed')
                : t('subscribe');
    }
}


/* =========================
   LANGUAGE
========================= */

function changeLanguage(newLang) {
    if (!['tg', 'ru', 'uz'].includes(newLang)) {
        return;
    }

    lang = newLang;

    persist();
    renderAll();

    closeModal('languageModal');
}


/* =========================
   WHATSAPP ORDER
========================= */

function sendOrder() {

    if (!cart.length) {
        return;
    }

    const lines = [];

    cart.forEach(item => {

        const product =
            products.find(p => p.id === item.id);

        if (!product) return;

        const quantity =
            Number(item.qty || 1);

        const sum =
            Number(product.price || 0) *
            quantity;

        lines.push(
            `${product.name} × ${quantity} = ${sum} сомонӣ`
        );
    });

    if (!lines.length) {
        return;
    }

    const total =
        cart.reduce((sum, item) => {

            const product =
                products.find(p => p.id === item.id);

            if (!product) return sum;

            return sum +
                Number(product.price || 0) *
                Number(item.qty || 1);

        }, 0);

    const message =
`Салом, ман фармоиш додан мехоҳам:

${lines.join('\n')}

Ҳамагӣ: ${total} сомонӣ

Ном:
Телефон:
Ҷойи расонидан:

${t('delivery')}`;

    window.open(
        `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`,
        '_blank'
    );
}


/* =========================
   EVENTS
========================= */

function setupEvents() {

    const menuToggle =
        $('menuToggle');

    if (menuToggle) {
        menuToggle.onclick = () => {

            const menu =
                $('dropdownMenu');

            if (!menu) return;

            menu.classList.toggle('open');

            renderCategories();
        };
    }

    const settingsButton =
        $('settingsButton');

    if (settingsButton) {
        settingsButton.onclick = () =>
            openModal('settingsModal');
    }

    if ($('themeSetting')) {
        $('themeSetting').onclick = () =>
            openModal('themeModal');
    }

    if ($('languageSetting')) {
        $('languageSetting').onclick = () =>
            openModal('languageModal');
    }

    if ($('notificationSetting')) {
        $('notificationSetting').onclick = () => {

            notifications = !notifications;

            persist();
            updateSettingsText();
        };
    }

    if ($('darkThemeBtn')) {
        $('darkThemeBtn').onclick = () => {

            theme = 'dark';

            persist();
            applyTheme();
            updateSettingsText();

            closeModal('themeModal');
        };
    }

    if ($('lightThemeBtn')) {
        $('lightThemeBtn').onclick = () => {

            theme = 'light';

            persist();
            applyTheme();
            updateSettingsText();

            closeModal('themeModal');
        };
    }

    document
        .querySelectorAll('[data-lang]')
        .forEach(button => {

            button.onclick = () =>
                changeLanguage(
                    button.dataset.lang
                );
        });

    if ($('subscribeBtn')) {
        $('subscribeBtn').onclick = () => {

            const subscribed =
                localStorage.getItem(KEYS.sub) === 'true';

            localStorage.setItem(
                KEYS.sub,
                String(!subscribed)
            );

            updateSettingsText();
        };
    }

    if ($('homeNav')) {
        $('homeNav').onclick = () => {

            currentCategory = ALL;

            renderAll();
        };
    }

    if ($('cartNav')) {
        $('cartNav').onclick = () =>
            openModal('cartModal');
    }

    if ($('favoritesNav')) {
        $('favoritesNav').onclick = () => {

            const message =
                lang === 'ru'
                    ? 'Избранное пока пусто.'
                    : lang === 'uz'
                        ? 'Sevimlilar hozircha bo‘sh.'
                        : 'Дӯстдоштаҳо ҳоло холӣ аст.';

            const list =
                $('productList');

            if (list) {
                list.innerHTML =
                    `<div class="empty">${message}</div>`;
            }
        };
    }

    if ($('profileNav')) {
        $('profileNav').onclick = () =>
            openModal('settingsModal');
    }

    /*
       АДМИН:
       дигар дар storefront парол намепурсад.
       Админ аз settings ба admin.html меравад.
    */

    if ($('adminSetting')) {
        $('adminSetting').onclick = () => {

            window.location.href = 'admin.html';
        };
    }

    /*
       + категория дар storefront пинҳон карда мешавад.
       Категорияҳоро танҳо аз admin.html идора мекунем.
    */

    if ($('addCategoryTop')) {
        $('addCategoryTop').style.display = 'none';
    }

    if ($('buyBtn')) {
        $('buyBtn').onclick = sendOrder;
    }

    document
        .querySelectorAll('[data-close]')
        .forEach(button => {

            button.onclick = () =>
                closeModal(
                    button.dataset.close
                );
        });

    document.addEventListener(
        'click',
        event => {

            if (
                event.target.classList.contains('modal')
            ) {
                closeModal(event.target.id);
            }
        }
    );
}


/* =========================
   OLD DATA MIGRATION
========================= */

function migrateOldProducts() {

    if (!Array.isArray(products)) {
        products = [];
    }

    products = products.map(product => {

        if (!product.id) {
            product.id = newId();
        }

        if (!product.category) {
            product.category =
                product.name || 'Орд';
        }

        if (product.qty === undefined) {
            product.qty = 0;
        }

        if (!product.unit) {
            product.unit = 'кг';
        }

        if (product.price === undefined) {
            product.price = 0;
        }

        if (product.active === undefined) {
            product.active =
                Number(product.qty) > 0;
        }

        return product;
    });

    const usedCategories =
        products
            .map(product => product.category)
            .filter(Boolean);

    usedCategories.forEach(category => {

        if (
            category !== 'Варзидан' &&
            !categories.includes(category)
        ) {
            categories.push(category);
        }
    });
}


/* =========================
   RENDER ALL
========================= */

function renderAll() {

    applyTheme();

    renderCategories();

    renderProducts();

    renderCart();

    updateSettingsText();
}


/* =========================
   START
========================= */

document.addEventListener(
    'DOMContentLoaded',
    () => {

        migrateOldProducts();

        persist();

        setupEvents();

        renderAll();
    }
);
