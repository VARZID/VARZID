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

// Интихоби мавзӯъ ва захира кардани он танҳо барои ҳамин муштари дар дастгоҳаш
function setTheme(theme) {
    if (theme === 'light') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        localStorage.setItem('varzid_theme', 'light');
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        localStorage.setItem('varzid_theme', 'dark');
    }
    settingsModal.style.display = 'none';
}

let isAdmin = false;

function openAdminModal() {
    settingsModal.style.display = 'none';
    document.getElementById('adminPasswordInput').value = '';
    document.getElementById('adminErrorMsg').style.display = 'none';
    document.getElementById('adminModal').style.display = 'flex';
}

function closeAdminModal() {
    document.getElementById('adminModal').style.display = 'none';
}

function submitAdminPassword() {
    const password = document.getElementById('adminPasswordInput').value;
    const errorMsg = document.getElementById('adminErrorMsg');
    
    if (password === "varzid2026") {
        isAdmin = true;
        document.getElementById('addCategoryBtn').style.display = 'inline-flex';
        document.getElementById('exitAdminBtn').style.display = 'inline-flex';
        closeAdminModal();
        renderCategories();
    } else {
        errorMsg.style.display = 'block';
    }
}

function exitAdminMode() {
    isAdmin = false;
    document.getElementById('addCategoryBtn').style.display = 'none';
    document.getElementById('exitAdminBtn').style.display = 'none';
    renderCategories();
}

function openAddCategoryModal() {
    if (!isAdmin) return;
    document.getElementById('newCatInput').value = '';
    document.getElementById('addCatModal').style.display = 'flex';
}

function closeAddCategoryModal() {
    document.getElementById('addCatModal').style.display = 'none';
}

let defaultCategories = ['Варзидан', 'Мука', 'Комбикорм', 'Пшеница', 'Ячмень', 'Кукуруза', 'Селитра', 'Карбамид'];

function getSavedCategories() {
    const saved = localStorage.getItem('varzid_categories');
    return saved ? JSON.parse(saved) : defaultCategories;
}

function saveCategories(categories) {
    localStorage.setItem('varzid_categories', JSON.stringify(categories));
}

function renderCategories() {
    const categoryList = document.getElementById('categoryList');
    const addBtn = document.getElementById('addCategoryBtn');
    
    document.querySelectorAll('.category-item').forEach(el => el.remove());
    
    const categories = getSavedCategories();
    
    categories.forEach(catName => {
        const newItem = document.createElement('div');
        newItem.className = 'category-item';
        if (catName === document.getElementById('channelName').textContent) {
            newItem.classList.add('active');
        }
        newItem.setAttribute('data-cat', catName);
        
        let html = `<span class="cat-name">${catName}</span>`;
        
        if (isAdmin && catName !== 'Варзидан') {
            html += `<span class="delete-cat-btn" onclick="confirmDeleteCategory(event, '${catName}')" title="Нест кардан">✕</span>`;
        }
        
        newItem.innerHTML = html;
        newItem.addEventListener('click', (e) => {
            if(e.target.classList.contains('delete-cat-btn')) return;
            selectCategory(newItem, catName);
        });
        
        categoryList.insertBefore(newItem, addBtn);
    });
    
    if (isAdmin) {
        addBtn.style.display = 'inline-flex';
        document.getElementById('exitAdminBtn').style.display = 'inline-flex';
    } else {
        addBtn.style.display = 'none';
        document.getElementById('exitAdminBtn').style.display = 'none';
    }
}

function confirmAddCategory() {
    const catName = document.getElementById('newCatInput').value.trim();
    if (catName) {
        let categories = getSavedCategories();
        if (!categories.includes(catName)) {
            categories.push(catName);
            saveCategories(categories);
            renderCategories();
        }
        closeAddCategoryModal();
    }
}

function confirmDeleteCategory(event, catName) {
    event.stopPropagation();
    if (!isAdmin) return;
    
    const isConfirmed = window.confirm(`Оё шумо мутмаин ҳастед, ки мехоҳед категорияи "${catName}"-ро нест кунед?`);
    if (isConfirmed) {
        let categories = getSavedCategories();
        categories = categories.filter(c => c !== catName);
        saveCategories(categories);
        
        if (document.getElementById('channelName').textContent === catName) {
            selectCategory(document.querySelector('.category-item'), 'Варзидан');
        }
        
        renderCategories();
    }
}

function selectCategory(itemElement, catName) {
    document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
    if(itemElement) itemElement.classList.add('active');
    
    document.getElementById('channelName').textContent = catName;
    document.getElementById('postChannelName').textContent = catName;
    
    const specificCategories = ['Мука', 'Комбикорм', 'Пшеница', 'Ячмень', 'Кукуруза', 'Селитра', 'Карбамид'];
    
    if (specificCategories.includes(catName)) {
        document.getElementById('postText').innerHTML = `✅ <b>ЭЪЛОНИ НАВ</b><br>Маҳсулоти ${catName} ва навъҳои он:`;
    } else {
        document.getElementById('postText').innerHTML = `✅ <b>ЭЪЛОНИ НАВ</b><br>Молу маҳсулоти гуногун ва навори онҳо:`;
    }
    
    dropdownMenu.classList.remove('show');
    arrowIcon.classList.remove('rotate');
}

window.addEventListener('DOMContentLoaded', () => {
    // Санҷидани мавзӯи шахсии муштари аз хотираи телефон (агар набошад пешфарз рӯзона аст)
    const savedTheme = localStorage.getItem('varzid_theme') || 'light';
    setTheme(savedTheme);
    renderCategories();
});

let currentLang = 'tg';
function setLanguage(lang) {
    currentLang = lang;
    if (lang === 'ru') {
        document.getElementById('catMenuTitle').textContent = 'Выбор категории';
        document.getElementById('settingsTitle').textContent = 'Настройки';
        document.getElementById('themeLabel').textContent = 'Цветовая схема:';
        document.getElementById('lightText').textContent = 'Дневной режим';
        document.getElementById('darkText').textContent = 'Ночной режим';
        document.getElementById('langLabel').textContent = 'Язык:';
        document.getElementById('adminToggleBtn').textContent = '🔐 Режим Админа';
        document.getElementById('postTime').textContent = 'Только что';
        document.getElementById('orderTitle').textContent = '🛒 Заказ';
        document.getElementById('orderDesc').textContent = 'Отправьте имя и номер для заказа:';
        document.getElementById('clientName').placeholder = 'Ваше имя...';
        document.getElementById('clientPhone').placeholder = 'Номер телефона (например: 900000000)...';
        document.getElementById('orderBtn').textContent = '📲 Отправить заказ в WhatsApp';
    } else {
        document.getElementById('catMenuTitle').textContent = 'Интихоби категория';
        document.getElementById('settingsTitle').textContent = 'Танзимот';
        document.getElementById('themeLabel').textContent = 'Мавзӯи рангӣ:';
        document.getElementById('lightText').textContent = 'Режими рӯзона';
        document.getElementById('darkText').textContent = 'Режими шабона';
        document.getElementById('langLabel').textContent = 'Забон:';
        document.getElementById('adminToggleBtn').textContent = '🔐 Ҳолати Админ';
        document.getElementById('postTime').textContent = 'Ҳоло';
        document.getElementById('orderTitle').textContent = '🛒 Заказ / Фармоиш';
        document.getElementById('orderDesc').textContent = 'Барои фармоиш ном ва рақами худро фиристед:';
        document.getElementById('clientName').placeholder = 'Номи шумо...';
        document.getElementById('clientPhone').placeholder = 'Рақами телефон (масалан: 900000000)...';
        document.getElementById('orderBtn').textContent = '📲 Фиристодани фармоиш ба WhatsApp';
    }
    settingsModal.style.display = 'none';
}

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
