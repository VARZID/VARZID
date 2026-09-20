document.addEventListener('DOMContentLoaded', () => {

    const brandToggle = document.getElementById('brandToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsMenu = document.getElementById('settingsMenu');
    const closeSettingsHeader = document.getElementById('closeSettingsHeader');
    const subBtn = document.getElementById('subBtn');
    const categoryList = document.getElementById('categoryList');
    const adminModeToggle = document.getElementById('adminModeToggle');
    const adminStatusBadge = document.getElementById('adminStatusBadge');
    const setThemeBtn = document.getElementById('setTheme');
    const themeModal = document.getElementById('themeModal');
    const cancelTheme = document.getElementById('cancelTheme');
    const themeStatus = document.getElementById('themeStatus');
    const setLanguageBtn = document.getElementById('setLanguage');
    const setNotificationsBtn = document.getElementById('setNotifications');

    const homeBtn = document.getElementById('homeBtn');
    const favoritesBtn = document.getElementById('favoritesBtn');
    const cartBtn = document.getElementById('cartBtn');

    const cartPanel = document.getElementById('cartPanel');
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartCount = document.getElementById('cartCount');
    const buyCartBtn = document.getElementById('buyCartBtn');
    const closeCart = document.getElementById('closeCart');
    const cartTotal = document.getElementById('cartTotal');


    /* =========================
       STORAGE
    ========================= */

    let savedSubCount = parseInt(localStorage.getItem('subCount'));

    let subscribers = !isNaN(savedSubCount)
        ? savedSubCount
        : 0;

    let isSubscribed =
        localStorage.getItem('isSubscribed') === 'true';

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

    let currentTheme =
        localStorage.getItem('theme') || 'light';

    let currentLang =
        localStorage.getItem('lang') || 'tg';

    let notificationsEnabled =
        localStorage.getItem('notifications') === 'true';

    let cart =
        JSON.parse(localStorage.getItem('varzid_cart')) || [];

    cart = cart.map(item => ({
        ...item,
        quantity: Number(item.quantity) || 1
    }));


    /* =========================
       TRANSLATIONS
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
            adminLabel: 'Админ',
            adminOn: 'Админ',
            adminOff: 'Админ',
            themeModalTitle: 'Интихоби тема',
            cancelBtn: 'БЕКОР КАРДАН',
            cartTitle: 'Корзина',
            cartEmpty: 'Корзина ҳоло холӣ аст',
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
            adminLabel: 'Админ',
            adminOn: 'Админ',
            adminOff: 'Админ',
            themeModalTitle: 'Выбор темы',
            cancelBtn: 'ОТМЕНА',
            cartTitle: 'Корзина',
            cartEmpty: 'Корзина пока пуста',
            buy: 'Купить',
            total: 'Итого'
        },

        uz: {
            subscribers: 'obunachilar',
            subscribe: 'Obuna bo‘lish',
            subscribed: '✓ Obuna bo‘lgansiz',
            wrongPass: 'Kirish rad etildi',
            settingsTitle: 'Sozlamalar',
            categoriesTitle: 'Kategoriyalar',
            themeLabel: 'Mavzu',
            nightMode: 'Tungi rejim ›',
            dayMode: 'Kunduzgi rejim ›',
            notifLabel: 'Bildirishnomalar',
            notifOn: 'Yoqilgan ›',
            notifOff: 'O‘chirilgan ›',
            langLabel: 'Til',
            adminLabel: 'Admin',
            adminOn: 'Admin',
            adminOff: 'Admin',
            themeModalTitle: 'Mavzuni tanlash',
            cancelBtn: 'BEKOR QILISH',
            cartTitle: 'Savat',
            cartEmpty: 'Savat hozircha bo‘sh',
            buy: 'Sotib olish',
            total: 'Jami'
        }
    };


    /* =========================
       LANGUAGE
    ========================= */

    function setLanguage(lang) {

        currentLang = lang;

        localStorage.setItem('lang', lang);

        const t = dict[lang];

        document.querySelectorAll('[data-translate]')
            .forEach(element => {

                const key =
                    element.getAttribute('data-translate');

                if (t[key]) {
                    element.textContent = t[key];
                }
            });

        const langNames = {
            tg: 'Тоҷикӣ',
            ru: 'Русский',
            uz: 'O‘zbekcha'
        };

        const langDisplay =
            document.getElementById('currentLangDisplay');

        if (langDisplay) {
            langDisplay.textContent =
                langNames[lang] + ' ›';
        }

        if (themeStatus) {
            themeStatus.textContent =
                currentTheme === 'light'
                    ? t.dayMode
                    : t.nightMode;
        }

        const notifStatus =
            document.getElementById('notifStatusText');

        if (notifStatus) {

            notifStatus.textContent =
                notificationsEnabled
                    ? t.notifOn
                    : t.notifOff;

            notifStatus.className =
                notificationsEnabled
                    ? 'badge-on'
                    : 'badge-off';
        }

        if (subBtn) {

            subBtn.textContent =
                isSubscribed
                    ? t.subscribed
                    : t.subscribe;

            subBtn.classList.toggle(
                'subscribed',
                isSubscribed
            );
        }

        if (buyCartBtn) {
            buyCartBtn.textContent = t.buy;
        }

        updateSubDisplay();
        updateCart();
    }


    /* =========================
       ADMIN
    ========================= */

    function setupAdminLink() {

        const adminLinks =
            document.querySelectorAll(
                '#adminModeToggle, [data-admin-link]'
            );

        adminLinks.forEach(link => {

            link.style.display = '';

            link.addEventListener('click', event => {

                event.preventDefault();

                window.location.href = 'admin.html';
            });
        });

        if (adminStatusBadge) {

            adminStatusBadge.textContent = 'Админ';
            adminStatusBadge.className = 'badge-off';
        }
    }


    /* =========================
       SUBSCRIBERS
    ========================= */

    function updateSubDisplay() {

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
            <span id="subCount">${count}</span>
            <span>${t.subscribers}</span>
        `;
    }


    /* =========================
       CATEGORIES
       + ИЛОВА
       × НЕСТ КАРДАН
    ========================= */

    function createAddButton() {

        if (!categoryList || !dropdownMenu) return;

        let button =
            document.getElementById('addCategoryBtn');

        if (button) return;

        button = document.createElement('button');

        button.id = 'addCategoryBtn';
        button.type = 'button';
        button.textContent = '+ Илова кардани маҳсулот';

        button.style.cssText = `
            display:block;
            width:100%;
            margin:12px 0 5px;
            padding:11px;
            border:1px solid #16843a;
            border-radius:10px;
            background:transparent;
            color:#16843a;
            font-size:15px;
            font-weight:600;
            cursor:pointer;
        `;

        categoryList.parentNode.appendChild(button);

        button.addEventListener('click', addCategory);
    }


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

            const deleteBtn =
                document.createElement('button');

            deleteBtn.className = 'delete-btn';
            deleteBtn.type = 'button';
            deleteBtn.dataset.index = index;
            deleteBtn.textContent = '×';

            deleteBtn.style.cssText = `
                color:#e53935;
                background:transparent;
                border:0;
                font-size:22px;
                font-weight:bold;
                line-height:1;
                cursor:pointer;
                margin-left:auto;
                padding:0 4px;
            `;

            card.appendChild(name);
            card.appendChild(deleteBtn);

            categoryList.appendChild(card);
        });

        localStorage.setItem(
            'categories',
            JSON.stringify(categories)
        );

        createAddButton();
    }


    function addCategory() {

        const name = prompt(
            currentLang === 'ru'
                ? 'Введите название товара:'
                : currentLang === 'uz'
                    ? 'Mahsulot nomini kiriting:'
                    : 'Номи маҳсулотро ворид кунед:'
        );

        if (name === null) return;

        const newName = name.trim();

        if (!newName) return;

        const exists =
            categories.some(cat =>
                cat.toLowerCase() ===
                newName.toLowerCase()
            );

        if (exists) {

            alert(
                currentLang === 'ru'
                    ? 'Такой товар уже существует'
                    : currentLang === 'uz'
                        ? 'Bu mahsulot allaqachon mavjud'
                        : 'Ин маҳсулот аллакай ҳаст'
            );

            return;
        }

        categories.push(newName);

        localStorage.setItem(
            'categories',
            JSON.stringify(categories)
        );

        renderCategories();
    }


    categoryList?.addEventListener(
        'click',
        event => {

            const button =
                event.target.closest('.delete-btn');

            if (!button) return;

            const index =
                Number(button.dataset.index);

            if (
                Number.isNaN(index) ||
                !categories[index]
            ) return;

            const question =
                currentLang === 'ru'
                    ? `Удалить «${categories[index]}»?`
                    : currentLang === 'uz'
                        ? `«${categories[index]}» o‘chirilsinmi?`
                        : `«${categories[index]}»-ро нест кардан мехоҳед?`;

            const ok = confirm(question);

            if (!ok) return;

            categories.splice(index, 1);

            localStorage.setItem(
                'categories',
                JSON.stringify(categories)
            );

            renderCategories();
        }
    );


    /* =========================
       HEADER
    ========================= */

    brandToggle?.addEventListener(
        'click',
        () => {

            dropdownMenu?.classList.toggle('open');

            brandToggle.classList.toggle('active');

            settingsMenu?.classList.remove('open');
        }
    );


    settingsToggle?.addEventListener(
        'click',
        () => {

            settingsMenu?.classList.toggle('open');

            dropdownMenu?.classList.remove('open');

            brandToggle?.classList.remove('active');
        }
    );


    closeSettingsHeader?.addEventListener(
        'click',
        () => {

            settingsMenu?.classList.remove('open');
        }
    );


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
                event => {

                    const theme =
                        event.currentTarget
                            .getAttribute('data-theme');

                    if (!theme) return;

                    applyTheme(theme);

                    themeModal?.classList.remove('open');
                }
            );
        });


    /* =========================
       LANGUAGE MODAL
    ========================= */

    const langModal =
        document.createElement('div');

    langModal.className = 'theme-modal';

    langModal.innerHTML = `
        <div class="theme-modal-content">

            <h3>
                Интихоби забон / Выбор языка
            </h3>

            <div class="theme-option" id="langTajik">
                🇹🇯 Тоҷикӣ
            </div>

            <div class="theme-option" id="langRussian">
                🇷🇺 Русский
            </div>

            <div class="theme-option" id="langUzbek">
                🇺🇿 O‘zbekcha
            </div>

            <button
                class="theme-cancel"
                id="cancelLang">
                Бекор кардан
            </button>

        </div>
    `;

    document.body.appendChild(langModal);


    setLanguageBtn?.addEventListener(
        'click',
        () => {

            langModal.classList.add('open');

            settingsMenu?.classList.remove('open');
        }
    );


    document.getElementById('cancelLang')
        ?.addEventListener(
            'click',
            () => {
                langModal.classList.remove('open');
            }
        );


    document.getElementById('langTajik')
        ?.addEventListener(
            'click',
            () => {

                setLanguage('tg');

                langModal.classList.remove('open');
            }
        );


    document.getElementById('langRussian')
        ?.addEventListener(
            'click',
            () => {

                setLanguage('ru');

                langModal.classList.remove('open');
            }
        );


    document.getElementById('langUzbek')
        ?.addEventListener(
            'click',
            () => {

                setLanguage('uz');

                langModal.classList.remove('open');
            }
        );


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
       SUBSCRIBE
    ========================= */

    subBtn?.addEventListener(
        'click',
        () => {

            if (!isSubscribed) {

                subscribers++;
                isSubscribed = true;

                localStorage.setItem(
                    'subCount',
                    subscribers
                );

                localStorage.setItem(
                    'isSubscribed',
                    'true'
                );

            } else {

                subscribers =
                    Math.max(
                        0,
                        subscribers - 1
                    );

                isSubscribed = false;

                localStorage.setItem(
                    'subCount',
                    subscribers
                );

                localStorage.setItem(
                    'isSubscribed',
                    'false'
                );
            }

            setLanguage(currentLang);
        }
    );


    /* =========================
       CART
    ========================= */

    function getPriceNumber(price) {

        if (
            price === undefined ||
            price === null
        ) return 0;

        const number =
            parseFloat(
                String(price)
                    .replace(',', '.')
                    .replace(/[^\d.]/g, '')
            );

        return isNaN(number) ? 0 : number;
    }


    function formatPrice(number) {

        return new Intl.NumberFormat(
            'ru-RU'
        ).format(number) + ' сомонӣ';
    }


    function saveCart() {

        localStorage.setItem(
            'varzid_cart',
            JSON.stringify(cart)
        );
    }


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
                        ${item.price || ''}
                        ${item.unit
                            ? ' / ' + item.unit
                            : ''}
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

            cartTotal.textContent = '0 сомонӣ';

        } else {

            cartEmpty.style.display = 'none';

            buyCartBtn.style.display = 'block';

            cartTotal.textContent =
                formatPrice(total);
        }


        cartCount.textContent = count;

        cartCount.style.display =
            count > 0 ? 'flex' : 'none';

        saveCart();
    }


    /* =========================
       ADD TO CART
    ========================= */

    window.addToCart = function(product) {

        if (!product || !product.name) return;

        const existing =
            cart.find(
                item =>
                    item.id === product.id
            );

        if (existing) {

            existing.quantity =
                (existing.quantity || 1) + 1;

        } else {

            cart.push({
                ...product,
                quantity: 1
            });
        }

        updateCart();

        cartPanel?.classList.add('open');
    };


    /* =========================
       CART CONTROLS
    ========================= */

    cartItems?.addEventListener(
        'click',
        event => {

            const button =
                event.target.closest('button');

            if (!button) return;

            const action =
                button.dataset.action;

            const index =
                parseInt(button.dataset.index);

            if (
                isNaN(index) ||
                !cart[index]
            ) return;


            if (action === 'plus') {

                cart[index].quantity =
                    (cart[index].quantity || 1) + 1;
            }


            if (action === 'minus') {

                cart[index].quantity =
                    (cart[index].quantity || 1) - 1;

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


    /* =========================
       WHATSAPP
    ========================= */

    buyCartBtn?.addEventListener(
        'click',
        () => {

            if (cart.length === 0) return;

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
                    `${index + 1}. ${item.name}`;

                if (item.price) {
                    message +=
                        ` — ${item.price}`;
                }

                if (item.unit) {
                    message +=
                        ` / ${item.unit}`;
                }

                message +=
                    ` × ${quantity}`;

                if (lineTotal > 0) {
                    message +=
                        ` = ${formatPrice(lineTotal)}`;
                }

                message += '\n';
            });


            if (total > 0) {

                message +=
                    `\nҲамагӣ: ${formatPrice(total)}\n`;
            }

            message +=
                '\nЛутфан нархи расониданро низ хабар диҳед.';


            const url =
                'https://wa.me/992000001606?text=' +
                encodeURIComponent(message);

            window.open(url, '_blank');
        }
    );


    /* =========================
       BOTTOM NAV
    ========================= */

    function setActive(button) {

        document
            .querySelectorAll('.bottom-nav-btn')
            .forEach(btn => {

                btn.classList.remove('active');
            });

        button?.classList.add('active');
    }


    homeBtn?.addEventListener(
        'click',
        () => {

            setActive(homeBtn);

            cartPanel?.classList.remove('open');

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    );


    favoritesBtn?.addEventListener(
        'click',
        () => {

            setActive(favoritesBtn);

            cartPanel?.classList.remove('open');
        }
    );


    cartBtn?.addEventListener(
        'click',
        () => {

            setActive(cartBtn);

            updateCart();

            cartPanel?.classList.add('open');
        }
    );


    closeCart?.addEventListener(
        'click',
        () => {

            cartPanel?.classList.remove('open');

            setActive(homeBtn);
        }
    );


    /* =========================
       INITIAL
    ========================= */

    applyTheme(currentTheme);

    setLanguage(currentLang);

    renderCategories();

    setupAdminLink();

    updateCart();

});
