document.addEventListener('DOMContentLoaded', () => {

/* =========================
   ELEMENTS
========================= */

const brandToggle = document.getElementById('brandToggle');
const dropdownMenu = document.getElementById('dropdownMenu');
const settingsToggle = document.getElementById('settingsToggle');
const settingsMenu = document.getElementById('settingsMenu');
const closeSettingsHeader = document.getElementById('closeSettingsHeader');

const subBtn = document.getElementById('subBtn');
const subCountSpan = document.getElementById('subCount');
const addCategoryBtn = document.getElementById('addCategoryBtn');
const categoryList = document.getElementById('categoryList');

const adminModeToggle = document.getElementById('adminModeToggle');
const adminStatusBadge = document.getElementById('adminStatusBadge');

const setThemeBtn = document.getElementById('setTheme');
const themeModal = document.getElementById('themeModal');
const cancelTheme = document.getElementById('cancelTheme');
const themeStatus = document.getElementById('themeStatus');

const setLanguageBtn = document.getElementById('setLanguage');
const setNotificationsBtn = document.getElementById('setNotifications');

/* Bottom nav */
const homeBtn = document.getElementById('homeBtn');
const favoritesBtn = document.getElementById('favoritesBtn');
const cartBtn = document.getElementById('cartBtn');

/* Cart */
const cartPanel = document.getElementById('cartPanel');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartCount = document.getElementById('cartCount');
const buyCartBtn = document.getElementById('buyCartBtn');
const closeCart = document.getElementById('closeCart');


/* =========================
   STORAGE
========================= */

let savedSubCount = parseInt(localStorage.getItem('subCount'));
let subscribers =
    (!isNaN(savedSubCount) && savedSubCount !== 30000)
        ? savedSubCount
        : 0;

let isSubscribed =
    localStorage.getItem('isSubscribed') === 'true';

let categories =
    JSON.parse(localStorage.getItem('categories')) ||
    ['Варзид', 'Орд', 'Корм', 'Ҷав', 'Селитра', 'Карбамид'];

let isAdmin =
    localStorage.getItem('isAdmin') === 'true';

let currentTheme =
    localStorage.getItem('theme') || 'light';

let currentLang =
    localStorage.getItem('lang') || 'tg';

let notificationsEnabled =
    localStorage.getItem('notifications') === 'true';

let cart =
    JSON.parse(localStorage.getItem('varzid_cart')) || [];

let favorites =
    JSON.parse(localStorage.getItem('varzid_favorites')) || [];


/* =========================
   TRANSLATIONS
========================= */

const dict = {

    tg: {
        subscribers: "подписчиков",
        subscribe: "Подписаться",
        subscribed: "✓ Шумо обуна ҳастед",
        wrongPass: "Пароли нодуруст!",
        settingsTitle: "Танзимот",
        categoriesTitle: "Категорияҳо",
        themeLabel: "Тема",
        nightMode: "Режими шабона ›",
        dayMode: "Режими рӯзона ›",
        notifLabel: "Огоҳиҳо",
        notifOn: "Фаъол ›",
        notifOff: "Хомӯш ›",
        langLabel: "Забон",
        adminLabel: "Режими Админ",
        adminOn: "Фаъол",
        adminOff: "Хомӯш",
        themeModalTitle: "Интихоби тема",
        nightModeOpt: "🌙 Режими шабона",
        dayModeOpt: "☀️ Режими рӯзона",
        cancelBtn: "БЕКОР КАРДАН",
        cartTitle: "Сабад",
        cartEmpty: "Сабад ҳоло холӣ аст"
    },

    ru: {
        subscribers: "подписчиков",
        subscribe: "Подписаться",
        subscribed: "✓ Вы подписаны",
        wrongPass: "Неверный пароль!",
        settingsTitle: "Настройки",
        categoriesTitle: "Категории",
        themeLabel: "Тема",
        nightMode: "Ночной режим ›",
        dayMode: "Дневной режим ›",
        notifLabel: "Уведомления",
        notifOn: "Вкл ›",
        notifOff: "Выкл ›",
        langLabel: "Язык",
        adminLabel: "Режим Админа",
        adminOn: "Вкл",
        adminOff: "Выкл",
        themeModalTitle: "Выбор темы",
        nightModeOpt: "🌙 Ночной режим",
        dayModeOpt: "☀️ Дневной режим",
        cancelBtn: "ОТМЕНА",
        cartTitle: "Корзина",
        cartEmpty: "Корзина пока пуста"
    },

    uz: {
        subscribers: "obunachilar",
        subscribe: "Obuna bo'lish",
        subscribed: "✓ Obuna bo'lgansiz",
        wrongPass: "Noto'g'ri parol!",
        settingsTitle: "Sozlamalar",
        categoriesTitle: "Kategoriyalar",
        themeLabel: "Mavzu",
        nightMode: "Tungi rejim ›",
        dayMode: "Kunduzgi rejim ›",
        notifLabel: "Bildirishnomalar",
        notifOn: "Yoqilgan ›",
        notifOff: "O'chirilgan ›",
        langLabel: "Til",
        adminLabel: "Admin rejimi",
        adminOn: "Yoqilgan",
        adminOff: "O'chirilgan",
        themeModalTitle: "Mavzuni tanlash",
        nightModeOpt: "🌙 Tungi rejim",
        dayModeOpt: "☀️ Kunduzgi rejim",
        cancelBtn: "BEKOR QILISH",
        cartTitle: "Savat",
        cartEmpty: "Savat hozircha bo'sh"
    }
};


/* =========================
   LANGUAGE
========================= */

function setLanguage(lang) {

    currentLang = lang;
    localStorage.setItem('lang', lang);

    const t = dict[lang];

    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');

        if (t[key]) {
            element.textContent = t[key];
        }
    });

    const langNames = {
        tg: "Тоҷикӣ",
        ru: "Русский",
        uz: "O'zbekcha"
    };

    const currentLangDisplay =
        document.getElementById('currentLangDisplay');

    if (currentLangDisplay) {
        currentLangDisplay.textContent =
            langNames[lang] + " ›";
    }

    if (themeStatus) {
        themeStatus.textContent =
            currentTheme === 'light'
                ? t.dayMode
                : t.nightMode;
    }

    const notifStatusText =
        document.getElementById('notifStatusText');

    if (notifStatusText) {
        notifStatusText.textContent =
            notificationsEnabled
                ? t.notifOn
                : t.notifOff;

        notifStatusText.className =
            notificationsEnabled
                ? 'badge-on'
                : 'badge-off';
    }

    if (subBtn) {
        subBtn.textContent =
            isSubscribed
                ? t.subscribed
                : t.subscribe;
    }

    updateAdminUI();
    updateSubDisplay();
}


/* =========================
   MODALS
========================= */

const unSubModal = document.createElement('div');
unSubModal.className = 'theme-modal';
unSubModal.innerHTML = `
    <div class="theme-modal-content">
        <h3>Управление подпиской</h3>

        <div class="theme-option" id="confirmUnsub"
             style="color:#16843A;font-weight:bold;">
            <span>Отменить подписку</span>
        </div>

        <button class="theme-cancel" id="cancelUnsub">
            ОТМЕНИТЬ
        </button>
    </div>
`;

document.body.appendChild(unSubModal);


const langModal = document.createElement('div');
langModal.className = 'theme-modal';
langModal.innerHTML = `
    <div class="theme-modal-content">
        <h3>Интихоби забон / Выбор языка</h3>

        <div class="theme-option" id="langTajik">
            <span>🇹🇯</span>
            <span>Тоҷикӣ</span>
        </div>

        <div class="theme-option" id="langRussian">
            <span>🇷🇺</span>
            <span>Русский</span>
        </div>

        <div class="theme-option" id="langUzbek">
            <span>🇺🇿</span>
            <span>O'zbekcha</span>
        </div>

        <button class="theme-cancel" id="cancelLang">
            Бекор кардан
        </button>
    </div>
`;

document.body.appendChild(langModal);


const deleteModal = document.createElement('div');
deleteModal.className = 'theme-modal';
deleteModal.innerHTML = `
    <div class="theme-modal-content">
        <h3 id="deleteModalText">
            Шумо мутмаин ҳастед?
        </h3>

        <div style="display:flex;gap:10px;justify-content:flex-end;">
            <button class="theme-cancel"
                    id="cancelDelete"
                    style="margin-top:0;">
                Бекор кардан
            </button>

            <button class="theme-cancel"
                    id="confirmDelete"
                    style="margin-top:0;">
                Нест кардан
            </button>
        </div>
    </div>
`;

document.body.appendChild(deleteModal);


const adminModal = document.createElement('div');
adminModal.className = 'theme-modal';
adminModal.innerHTML = `
    <div class="theme-modal-content">
        <h3>Ворид кардани пароли админ</h3>

        <input
            type="password"
            id="adminPasswordInput"
            placeholder="Паролро нависед..."
            style="width:100%;padding:12px;margin-bottom:15px;
            border-radius:8px;border:1px solid #555;
            background:#222;color:#fff;font-size:16px;outline:none;"
        >

        <div style="display:flex;gap:10px;justify-content:flex-end;">
            <button class="theme-cancel"
                    id="cancelAdmin"
                    style="margin-top:0;">
                Бекор кардан
            </button>

            <button class="theme-cancel"
                    id="confirmAdmin"
                    style="margin-top:0;">
                Ворид шудан
            </button>
        </div>
    </div>
`;

document.body.appendChild(adminModal);


const addCatModal = document.createElement('div');
addCatModal.className = 'theme-modal';
addCatModal.innerHTML = `
    <div class="theme-modal-content">
        <h3>Илова кардани категория</h3>

        <input
            type="text"
            id="newCatInput"
            placeholder="Номи категория..."
            style="width:100%;padding:12px;margin-bottom:15px;
            border-radius:8px;border:1px solid #555;
            background:#222;color:#fff;font-size:16px;outline:none;"
        >

        <div style="display:flex;gap:10px;justify-content:flex-end;">
            <button class="theme-cancel"
                    id="cancelAddCat"
                    style="margin-top:0;">
                Бекор кардан
            </button>

            <button class="theme-cancel"
                    id="confirmAddCat"
                    style="margin-top:0;">
                Илова кардан
            </button>
        </div>
    </div>
`;

document.body.appendChild(addCatModal);


let deleteTargetIndex = null;


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

    localStorage.setItem('theme', theme);

    setLanguage(currentLang);
}

applyTheme(currentTheme);
setLanguage(currentLang);


if (setThemeBtn) {
    setThemeBtn.addEventListener('click', () => {
        themeModal.classList.add('open');
    });
}

if (cancelTheme) {
    cancelTheme.addEventListener('click', () => {
        themeModal.classList.remove('open');
    });
}


document.querySelectorAll('.theme-option').forEach(option => {

    if (option.getAttribute('data-theme')) {

        option.addEventListener('click', e => {

            const selectedTheme =
                e.currentTarget.getAttribute('data-theme');

            applyTheme(selectedTheme);
            themeModal.classList.remove('open');
        });
    }
});


/* =========================
   LANGUAGE EVENTS
========================= */

const langTajik =
    document.getElementById('langTajik');

const langRussian =
    document.getElementById('langRussian');

const langUzbek =
    document.getElementById('langUzbek');

if (setLanguageBtn) {
    setLanguageBtn.addEventListener('click', () => {
        langModal.classList.add('open');

        if (settingsMenu) {
            settingsMenu.classList.remove('open');
        }
    });
}

document.getElementById('cancelLang')
    ?.addEventListener('click', () => {
        langModal.classList.remove('open');
    });

langTajik?.addEventListener('click', () => {
    setLanguage('tg');
    langModal.classList.remove('open');
});

langRussian?.addEventListener('click', () => {
    setLanguage('ru');
    langModal.classList.remove('open');
});

langUzbek?.addEventListener('click', () => {
    setLanguage('uz');
    langModal.classList.remove('open');
});


/* =========================
   NOTIFICATIONS
========================= */

if (setNotificationsBtn) {

    setNotificationsBtn.addEventListener('click', () => {

        notificationsEnabled = !notificationsEnabled;

        localStorage.setItem(
            'notifications',
            notificationsEnabled
        );

        setLanguage(currentLang);
    });
}


/* =========================
   ADMIN
========================= */

function updateAdminUI() {

    document.querySelectorAll('.admin-only')
        .forEach(el => {
            el.style.display =
                isAdmin ? 'inline-block' : 'none';
        });

    const t = dict[currentLang];

    if (adminStatusBadge) {

        adminStatusBadge.textContent =
            isAdmin
                ? t.adminOn
                : t.adminOff;

        adminStatusBadge.className =
            isAdmin
                ? 'badge-on'
                : 'badge-off';
    }
}


/* =========================
   SUBSCRIBERS
========================= */

function updateSubDisplay() {

    if (!subCountSpan) return;

    const t = dict[currentLang];

    const subTextNode =
        document.querySelector('.subscribers-info div');

    if (subTextNode) {

        const countStr =
            subscribers >= 1000
                ? (subscribers / 1000).toFixed(1)
                : subscribers;

        subTextNode.innerHTML =
            `<span id="subCount">${countStr}</span> ${t.subscribers}`;
    }
}


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

        card.innerHTML = `
            <span class="cat-name"
                  data-index="${index}">
                ${cat}
            </span>

            <button
                class="delete-btn admin-only"
                data-index="${index}"
                style="display:${isAdmin ? 'inline-block' : 'none'};">
                ×
            </button>
        `;

        categoryList.appendChild(card);
    });

    localStorage.setItem(
        'categories',
        JSON.stringify(categories)
    );
}

renderCategories();
updateAdminUI();


/* =========================
   HEADER
========================= */

brandToggle?.addEventListener('click', () => {

    dropdownMenu.classList.toggle('open');
    brandToggle.classList.toggle('active');

    settingsMenu?.classList.remove('open');
});


settingsToggle?.addEventListener('click', () => {

    settingsMenu.classList.toggle('open');

    dropdownMenu?.classList.remove('open');
    brandToggle?.classList.remove('active');
});


closeSettingsHeader?.addEventListener('click', () => {
    settingsMenu.classList.remove('open');
});


/* =========================
   ADMIN LOGIN
========================= */

adminModeToggle?.addEventListener('click', () => {

    if (!isAdmin) {

        document.getElementById(
            'adminPasswordInput'
        ).value = '';

        adminModal.classList.add('open');

        settingsMenu?.classList.remove('open');

    } else {

        isAdmin = false;

        localStorage.setItem(
            'isAdmin',
            'false'
        );

        updateAdminUI();
        renderCategories();
    }
});


document.getElementById('cancelAdmin')
    ?.addEventListener('click', () => {
        adminModal.classList.remove('open');
    });


document.getElementById('confirmAdmin')
    ?.addEventListener('click', () => {

        const password =
            document.getElementById(
                'adminPasswordInput'
            ).value;

        if (password === '1604') {

            isAdmin = true;

            localStorage.setItem(
                'isAdmin',
                'true'
            );

            updateAdminUI();
            renderCategories();

            adminModal.classList.remove('open');

        } else {

            alert(dict[currentLang].wrongPass);
        }
    });


/* =========================
   SUBSCRIBE
========================= */

subBtn?.addEventListener('click', () => {

    if (!isSubscribed) {

        subscribers++;
        isSubscribed = true;

        subBtn.textContent =
            dict[currentLang].subscribed;

        subBtn.classList.add('subscribed');

        updateSubDisplay();

        localStorage.setItem(
            'subCount',
            subscribers
        );

        localStorage.setItem(
            'isSubscribed',
            isSubscribed
        );

    } else {

        unSubModal.classList.add('open');
    }
});


document.getElementById('cancelUnsub')
    ?.addEventListener('click', () => {
        unSubModal.classList.remove('open');
    });


document.getElementById('confirmUnsub')
    ?.addEventListener('click', () => {

        subscribers =
            Math.max(0, subscribers - 1);

        isSubscribed = false;

        subBtn.textContent =
            dict[currentLang].subscribe;

        subBtn.classList.remove('subscribed');

        updateSubDisplay();

        localStorage.setItem(
            'subCount',
            subscribers
        );

        localStorage.setItem(
            'isSubscribed',
            isSubscribed
        );

        unSubModal.classList.remove('open');
    });


/* =========================
   ADD CATEGORY
========================= */

addCategoryBtn?.addEventListener('click', () => {

    document.getElementById(
        'newCatInput'
    ).value = '';

    addCatModal.classList.add('open');
});


document.getElementById('cancelAddCat')
    ?.addEventListener('click', () => {
        addCatModal.classList.remove('open');
    });


document.getElementById('confirmAddCat')
    ?.addEventListener('click', () => {

        const input =
            document.getElementById(
                'newCatInput'
            );

        const newCat =
            input.value.trim();

        if (newCat) {

            categories.push(newCat);

            renderCategories();

            /* Хатои кӯҳна ислоҳ шуд */
            addCatModal.classList.remove('open');
        }
    });


/* =========================
   DELETE CATEGORY
========================= */

document.getElementById('cancelDelete')
    ?.addEventListener('click', () => {

        deleteModal.classList.remove('open');
        deleteTargetIndex = null;
    });


document.getElementById('confirmDelete')
    ?.addEventListener('click', () => {

        if (
            deleteTargetIndex !== null &&
            deleteTargetIndex >= 0 &&
            deleteTargetIndex < categories.length
        ) {

            categories.splice(
                deleteTargetIndex,
                1
            );

            renderCategories();
        }

        deleteModal.classList.remove('open');
        deleteTargetIndex = null;
    });


categoryList?.addEventListener('click', e => {

    if (
        e.target.classList.contains(
            'delete-btn'
        )
    ) {

        e.stopPropagation();

        if (!isAdmin) return;

        const index =
            parseInt(
                e.target.getAttribute(
                    'data-index'
                )
            );

        if (
            !isNaN(index) &&
            index >= 0 &&
            index < categories.length
        ) {

            deleteTargetIndex = index;

            const catName =
                categories[index];

            document.getElementById(
                'deleteModalText'
            ).textContent =
                `Шумо мутмаин ҳастед, ки категорияи "${catName}"-ро нест кардан мехоҳед?`;

            deleteModal.classList.add('open');
        }
    }
});


/* ==================================================
   CART
   Барои маҳсулоти оянда:
   addToCart({
       id: 1,
       name: "Орд",
       price: "350",
       unit: "кг"
   });
================================================== */

function saveCart() {
    localStorage.setItem(
        'varzid_cart',
        JSON.stringify(cart)
    );
}


function updateCart() {

    if (!cartItems) return;

    cartItems.innerHTML = '';

    if (cart.length === 0) {

        cartEmpty.style.display = 'block';
        buyCartBtn.style.display = 'none';

    } else {

        cartEmpty.style.display = 'none';
        buyCartBtn.style.display = 'block';

        cart.forEach((item, index) => {

            const row =
                document.createElement('div');

            row.className = 'cart-item';

            row.innerHTML = `
                <div>
                    <div class="cart-item-name">
                        ${item.name}
                    </div>

                    <div class="cart-item-price">
                        ${item.price || ''}
                        ${item.unit ? ' / ' + item.unit : ''}
                    </div>
                </div>

                <button
                    class="remove-cart-item"
                    data-index="${index}">
                    ×
                </button>
            `;

            cartItems.appendChild(row);
        });
    }

    const count = cart.length;

    cartCount.textContent = count;

    cartCount.style.display =
        count > 0 ? 'flex' : 'none';

    saveCart();
}


/* Функсия барои маҳсулоти оянда */
window.addToCart = function(product) {

    if (!product || !product.name) return;

    const existing =
        cart.find(item =>
            item.id === product.id
        );

    if (!existing) {
        cart.push(product);
    }

    updateCart();

    cartPanel.classList.add('open');
};


cartItems?.addEventListener('click', e => {

    if (
        !e.target.classList.contains(
            'remove-cart-item'
        )
    ) return;

    const index =
        parseInt(
            e.target.getAttribute(
                'data-index'
            )
        );

    if (!isNaN(index)) {

        cart.splice(index, 1);

        updateCart();
    }
});


/* =========================
   WHATSAPP BUY
========================= */

buyCartBtn?.addEventListener('click', () => {

    if (cart.length === 0) return;

    let message =
        'Салом, ман мехоҳам фармоиш диҳам:%0A%0A';

    cart.forEach((item, index) => {

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

        message += '%0A';
    });

    message +=
        '%0AЛутфан нархи умумӣ ва расониданро хабар диҳед.';

    const whatsappNumber =
        '992000001606';

    const url =
        `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(url, '_blank');
});


/* =========================
   BOTTOM NAVIGATION
========================= */

function setActiveBottomButton(button) {

    document
        .querySelectorAll('.bottom-nav-btn')
        .forEach(btn => {
            btn.classList.remove('active');
        });

    button?.classList.add('active');
}


homeBtn?.addEventListener('click', () => {

    setActiveBottomButton(homeBtn);

    cartPanel?.classList.remove('open');

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


favoritesBtn?.addEventListener('click', () => {

    setActiveBottomButton(favoritesBtn);

    cartPanel?.classList.remove('open');

    /* Қисми маҳсулоти дӯстдошта баъдтар пайваст мешавад */
});


cartBtn?.addEventListener('click', () => {

    setActiveBottomButton(cartBtn);

    updateCart();

    cartPanel?.classList.add('open');
});


closeCart?.addEventListener('click', () => {

    cartPanel.classList.remove('open');

    setActiveBottomButton(homeBtn);
});


/* =========================
   INITIAL
========================= */

updateSubDisplay();
updateAdminUI();
renderCategories();
updateCart();

});
