const menuToggle = document.getElementById('menuToggle');
const dropdownMenu = document.getElementById('dropdownMenu');
const closeMenu = document.getElementById('closeMenu');
const arrowIcon = document.getElementById('arrowIcon');
const activeCatDisplay = document.getElementById('activeCatDisplay');

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
        closeAdminModal();
    } else {
        errorMsg.style.display = 'block';
    }
}

function openAddCategoryModal() {
    if (!isAdmin) return;
    document.getElementById('newCatInput').value = '';
    document.getElementById('addCatModal').style.display = 'flex';
}

function closeAddCategoryModal() {
    document.getElementById('addCatModal').style.display = 'none';
}

function confirmAddCategory() {
    const catName = document.getElementById('newCatInput').value;
    if (catName && catName.trim() !== "") {
        const categoryList = document.getElementById('categoryList');
        const addBtn = document.getElementById('addCategoryBtn');
        
        const newItem = document.createElement('div');
        newItem.className = 'category-item';
        newItem.setAttribute('data-cat', catName);
        newItem.innerHTML = `<span class="cat-name">${catName}</span>`;
        
        newItem.addEventListener('click', () => selectCategory(newItem, catName));
        
        categoryList.insertBefore(newItem, addBtn);
        closeAddCategoryModal();
    }
}

function selectCategory(itemElement, catName) {
    document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
    itemElement.classList.add('active');
    
    activeCatDisplay.textContent = catName;
    document.getElementById('channelName').textContent = catName;
    
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
        document.getElementById('settingsTitle').textContent = 'Настройки';
        document.getElementById('themeLabel').textContent = 'Цветовая схема:';
        document.getElementById('lightText').textContent = 'Дневной режим';
        document.getElementById('darkText').textContent = 'Ночной режим';
        document.getElementById('langLabel').textContent = 'Язык:';
        document.getElementById('adminToggleBtn').textContent = '🔐 Режим Админа';
    } else {
        document.getElementById('catMenuTitle').textContent = 'Интихоби категория';
        document.getElementById('settingsTitle').textContent = 'Танзимот';
        document.getElementById('themeLabel').textContent = 'Мавзӯи рангӣ:';
        document.getElementById('lightText').textContent = 'Режими рӯзона';
        document.getElementById('darkText').textContent = 'Режими шабона';
        document.getElementById('langLabel').textContent = 'Забон:';
        document.getElementById('adminToggleBtn').textContent = '🔐 Ҳолати Админ';
    }
    settingsModal.style.display = 'none';
}
