const menuToggle = document.getElementById('menuToggle');
const dropdownMenu = document.getElementById('dropdownMenu');
const closeMenu = document.getElementById('closeMenu');
const arrowIcon = document.getElementById('arrowIcon');

menuToggle.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
    arrowIcon.classList.toggle('rotate');
});

closeMenu.addEventListener('click', () => {
    dropdownMenu.classList.remove('show');
    arrowIcon.classList.remove('rotate');
});

const settingsIcon = document.getElementById('settingsIcon');
const settingsModal = document.getElementById('settingsModal');
const closeSettings = document.getElementById('closeSettings');

settingsIcon.addEventListener('click', () => settingsModal.style.display = 'flex');
closeSettings.addEventListener('click', () => settingsModal.style.display = 'none');

function setTheme(theme) {
    if (theme === 'light') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    }
    settingsModal.style.display = 'none';
}

let isAdmin = false;
function toggleAdminMode() {
    const password = prompt("Рамзи админро ворид кунед:");
    if (password === "varzid2026") {
        isAdmin = true;
        document.getElementById('addCategoryBtn').style.display = 'inline-flex';
        alert("Ҳолати админ фаъол шуд!");
    } else {
        alert("Рамзи нодуруст!");
    }
    settingsModal.style.display = 'none';
}

function addNewCategory() {
    if (!isAdmin) return;
    const catName = prompt("Номи маҳсулоти навро ворид кунед:");
    if (catName && catName.trim() !== "") {
        const categoryList = document.getElementById('categoryList');
        const addBtn = document.getElementById('addCategoryBtn');
        
        const newItem = document.createElement('div');
        newItem.className = 'category-item';
        newItem.setAttribute('data-cat', catName);
        newItem.innerHTML = `<span class="cat-name">${catName}</span>`;
        
        newItem.addEventListener('click', () => selectCategory(newItem, catName));
        
        categoryList.insertBefore(newItem, addBtn);
    }
}

function selectCategory(itemElement, catName) {
    document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
    itemElement.classList.add('active');
    
    document.getElementById('channelName').textContent = catName;
    document.getElementById('postChannelName').textContent = catName;
    document.getElementById('postText').innerHTML = `✅ <b>ЭЪЛОНИ НАВ</b><br>Молу маҳсулоти ${catName} ва навори он:`;
    
    dropdownMenu.classList.remove('show');
    arrowIcon.classList.remove('rotate');
}

document.querySelectorAll('.category-item').forEach(item => {
    const catName = item.getAttribute('data-cat');
    item.addEventListener('click', () => selectCategory(item, catName));
});

let currentLang = 'tg';
function setLanguage(lang) {
    currentLang = lang;
    if (lang === 'ru') {
        document.getElementById('catMenuTitle').textContent = 'Выбор категории';
        document.getElementById('settingsTitle').textContent = 'Настройки VARZID';
        document.getElementById('themeLabel').textContent = 'Цветовая схема:';
        document.getElementById('lightText').textContent = 'Дневной режим';
        document.getElementById('darkText').textContent = 'Ночной режим';
        document.getElementById('langLabel').textContent = 'Язык:';
        document.getElementById('adminToggleBtn').textContent = '🔐 Режим Админа';
        document.getElementById('subTextLabel').textContent = isSubscribed ? 'подписчик' : 'подписчиков';
        document.getElementById('subBtn').textContent = isSubscribed ? 'Вы подписаны' : 'Подписаться';
        document.getElementById('postTime').textContent = 'Только что';
        document.getElementById('orderTitle').textContent = '🛒 Заказ';
        document.getElementById('orderDesc').textContent = 'Отправьте имя и номер для заказа:';
        document.getElementById('clientName').placeholder = 'Ваше имя...';
        document.getElementById('clientPhone').placeholder = 'Номер телефона (например: 900000000)...';
        document.getElementById('orderBtn').textContent = '📲 Отправить заказ в WhatsApp';
    } else {
        document.getElementById('catMenuTitle').textContent = 'Интихоби категория';
        document.getElementById('settingsTitle').textContent = 'Танзимоти VARZID';
        document.getElementById('themeLabel').textContent = 'Мавзӯи рангӣ:';
        document.getElementById('lightText').textContent = 'Режими рӯзона';
        document.getElementById('darkText').textContent = 'Режими шабона';
        document.getElementById('langLabel').textContent = 'Забон:';
        document.getElementById('adminToggleBtn').textContent = '🔐 Ҳолати Админ';
        document.getElementById('subTextLabel').textContent = 'обуначиён';
        document.getElementById('subBtn').textContent = isSubscribed ? 'Обуна ҳастед' : 'Обуна шудан';
        document.getElementById('postTime').textContent = 'Ҳоло';
        document.getElementById('orderTitle').textContent = '🛒 Заказ / Фармоиш';
        document.getElementById('orderDesc').textContent = 'Барои фармоиш ном ва рақами худро фиристед:';
        document.getElementById('clientName').placeholder = 'Номи шумо...';
        document.getElementById('clientPhone').placeholder = 'Рақами телефон (масалан: 900000000)...';
        document.getElementById('orderBtn').textContent = '📲 Фиристодани фармоиш ба WhatsApp';
    }
    settingsModal.style.display = 'none';
}

const subBtn = document.getElementById('subBtn');
const subCount = document.getElementById('subCount');
let subCountNum = 0;
let isSubscribed = false;

subBtn.addEventListener('click', () => {
    isSubscribed = !isSubscribed;
    if (isSubscribed) {
        subCountNum += 1;
        subBtn.style.backgroundColor = '#2e7d32';
        subBtn.textContent = currentLang === 'ru' ? 'Вы подписаны' : 'Обуна ҳастед';
    } else {
        subCountNum -= 1;
        subBtn.style.backgroundColor = '#e53935';
        subBtn.textContent = currentLang === 'ru' ? 'Подписаться' : 'Обуна шудан';
    }
    subCount.innerHTML = `${subCountNum} <span id="subTextLabel">${currentLang === 'ru' ? 'подписчиков' : 'обуначиён'}</span>`;
});

const likeBtn = document.getElementById('likeBtn');
const likeCountSpan = document.getElementById('likeCount');
let likes = 0, liked = false;
likeBtn.addEventListener('click', () => {
    likes += (liked ? -1 : 1);
    liked = !liked;
    likeBtn.style.color = liked ? '#e53935' : 'inherit';
    likeCountSpan.textContent = likes;
});

const loveBtn = document.getElementById('loveBtn');
const loveCountSpan = document.getElementById('loveCount');
let loves = 0, loved = false;
loveBtn.addEventListener('click', () => {
    loves += (loved ? -1 : 1);
    loved = !loved;
    loveBtn.style.color = loved ? '#e53935' : 'inherit';
    loveCountSpan.textContent = loves;
});

function sendToWhatsApp(event) {
    event.preventDefault();
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const text = `Салом! Ман заказ кардан мехохам.%0A👤 Ном: ${name}%0A📞 Телефон: ${phone}`;
    window.open(`https://wa.me/992000001606?text=${text}`, '_blank');
}
