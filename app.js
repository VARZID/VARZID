const menuToggle = document.getElementById('menuToggle');
const dropdownMenu = document.getElementById('dropdownMenu');
const closeMenu = document.getElementById('closeMenu');
const arrowIcon = document.getElementById('arrowIcon');

if (menuToggle && dropdownMenu) {
    menuToggle.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
        if (arrowIcon) arrowIcon.classList.toggle('rotate');
    });
}

if (closeMenu && dropdownMenu) {
    closeMenu.addEventListener('click', () => {
        dropdownMenu.classList.remove('show');
        if (arrowIcon) arrowIcon.classList.remove('rotate');
    });
}

const settingsIcon = document.getElementById('settingsIcon');
const settingsModal = document.getElementById('settingsModal');
const closeSettings = document.getElementById('closeSettings');

if (settingsIcon && settingsModal) {
    settingsIcon.addEventListener('click', () => settingsModal.style.display = 'flex');
}
if (closeSettings && settingsModal) {
    closeSettings.addEventListener('click', () => settingsModal.style.display = 'none');
}

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
    if (settingsModal) settingsModal.style.display = 'none';
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('varzid_theme') || 'light';
    setTheme(savedTheme);
});

function selectCategory(itemElement, catName) {
    document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
    if (itemElement) itemElement.classList.add('active');
    
    const channelName = document.getElementById('channelName');
    if (channelName) channelName.textContent = catName;
    
    const postText = document.getElementById('postText');
    if (postText) {
        if (catName === 'Варзидан') {
            postText.innerHTML = `✅ <b>НОВЫЕ ОБЪЯВЛЕНИЯ</b><br>Различные товары и их видеоматериалы:`;
        } else {
            postText.innerHTML = `✅ <b>НОВЫЕ ОБЪЯВЛЕНИЯ</b><br>Продукция ${catName} и ее виды:`;
        }
    }
    
    if (dropdownMenu) dropdownMenu.classList.remove('show');
    if (arrowIcon) arrowIcon.classList.remove('rotate');
}

const likeBtn = document.getElementById('likeBtn');
const likeCountSpan = document.getElementById('likeCount');
let likes = 0, liked = false;
if (likeBtn && likeCountSpan) {
    likeBtn.addEventListener('click', () => {
        likes += (liked ? -1 : 1);
        liked = !liked;
        likeBtn.style.color = liked ? '#e53935' : 'inherit';
        likeCountSpan.textContent = likes;
    });
}

const loveBtn = document.getElementById('loveBtn');
const loveCountSpan = document.getElementById('loveCount');
let loves = 0, loved = false;
if (loveBtn && loveCountSpan) {
    loveBtn.addEventListener('click', () => {
        loves += (loved ? -1 : 1);
        loved = !loved;
        loveBtn.style.color = loved ? '#e53935' : 'inherit';
        loveCountSpan.textContent = loves;
    });
}

function sendToWhatsApp(event) {
    event.preventDefault();
    const nameEl = document.getElementById('clientName');
    const phoneEl = document.getElementById('clientPhone');
    if (!nameEl || !phoneEl) return;
    const name = nameEl.value;
    const phone = phoneEl.value;
    const text = `Здравствуйте! Хочу сделать заказ.%0A👤 Имя: ${name}%0A📞 Телефон: ${phone}`;
    window.open(`https://wa.me/992000001606?text=${text}`, '_blank');
}
