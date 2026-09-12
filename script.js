document.addEventListener('DOMContentLoaded', () => {
    const brandToggle = document.getElementById('brandToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsMenu = document.getElementById('settingsMenu');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    
    const subBtn = document.getElementById('subBtn');
    const subCountSpan = document.getElementById('subCount');
    const addCategoryBtn = document.getElementById('addCategoryBtn');
    const categoryList = document.getElementById('categoryList');
    
    const adminModeToggle = document.getElementById('adminModeToggle');
    const adminStatusBadge = document.getElementById('adminStatusBadge');

    let subscribers = parseInt(localStorage.getItem('subCount')) || 0;
    let isSubscribed = localStorage.getItem('isSubscribed') === 'true';
    let categories = JSON.parse(localStorage.getItem('categories')) || ['Варзид', 'Орд', 'Корм'];
    let isAdmin = localStorage.getItem('isAdmin') === 'true';

    function updateAdminUI() {
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(el => {
            el.style.display = isAdmin ? 'flex' : 'none';
        });
        if (isAdmin) {
            adminStatusBadge.textContent = 'Вкл';
            adminStatusBadge.className = 'badge-on';
        } else {
            adminStatusBadge.textContent = 'Выкл';
            adminStatusBadge.className = 'badge-off';
        }
    }

    function formatSubscribers(count) {
        if (count >= 1000) {
            return (count / 1000).toFixed(1).replace('.0', '') + ' тыс.';
        }
        return count;
    }

    function updateSubDisplay() {
        subCountSpan.textContent = formatSubscribers(subscribers);
    }

    updateSubDisplay();
    if (isSubscribed) {
        subBtn.textContent = 'Отписаться';
        subBtn.classList.add('subscribed');
    }

    function renderCategories() {
        categoryList.innerHTML = '';
        categories.forEach((cat, index) => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.innerHTML = `
                <span class="cat-name" data-index="${index}">${cat}</span> 
                <button class="delete-btn admin-only" data-index="${index}" style="display: ${isAdmin ? 'block' : 'none'};">×</button>
            `;
            categoryList.appendChild(card);
        });
        localStorage.setItem('categories', JSON.stringify(categories));
    }

    renderCategories();
    updateAdminUI();

    // Кушодани менюи категорияҳо
    brandToggle.addEventListener('click', () => {
        dropdownMenu.classList.toggle('open');
        brandToggle.classList.toggle('active');
        settingsMenu.classList.remove('open'); // Пинҳон кардани танзимот ҳангоми кушодани категория
    });

    // Кушодани менюи танзимот
    settingsToggle.addEventListener('click', () => {
        settingsMenu.classList.toggle('open');
        dropdownMenu.classList.remove('open');
        brandToggle.classList.remove('active');
    });

    closeSettingsBtn.addEventListener('click', () => {
        settingsMenu.classList.remove('open');
    });

    // Гузариш ба режими админ тавассути пахшкунӣ дар танзимот (бо парол)
    adminModeToggle.addEventListener('click', () => {
        if (!isAdmin) {
            let password = prompt('Пароли админро ворид кунед:');
            if (password === '1234') { // Рамзи пешфарз барои админ
                isAdmin = true;
                localStorage.setItem('isAdmin', 'true');
                alert('Режими админ фаъол шуд!');
            } else if (password !== null) {
                alert('Пароли нодуруст!');
            }
        } else {
            isAdmin = false;
            localStorage.setItem('isAdmin', 'false');
            alert('Режими админ хомӯш шуд.');
        }
        updateAdminUI();
        renderCategories();
    });

    subBtn.addEventListener('click', () => {
        if (!isSubscribed) {
            subscribers++;
            isSubscribed = true;
            subBtn.textContent = 'Отписаться';
            subBtn.classList.add('subscribed');
        } else {
            subscribers--;
            isSubscribed = false;
            subBtn.textContent = 'Подписаться';
            subBtn.classList.remove('subscribed');
        }
        updateSubDisplay();
        localStorage.setItem('subCount', subscribers);
        localStorage.setItem('isSubscribed', isSubscribed);
    });

    addCategoryBtn.addEventListener('click', () => {
        let newCat = prompt('Номи категорияи навро нависед:');
        if (newCat && newCat.trim() !== '') {
            categories.push(newCat.trim());
            renderCategories();
        }
    });

    categoryList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            e.stopPropagation();
            if (!isAdmin) return;
            let index = e.target.getAttribute('data-index');
            let catName = categories[index];
            // Нест кардани тасдиқи браузер ва бевосита тоза кардан
            categories.splice(index, 1);
            renderCategories();
        } else {
            const card = e.target.closest('.category-card');
            if (card) {
                const nameSpan = card.querySelector('.cat-name');
                const index = nameSpan.getAttribute('data-index');
                let catName = categories[index];
                alert(`Гузариши электронӣ ба категорияи: ${catName}`);
            }
        }
    });

    // Функсияҳои бахшҳои танзимот
    document.getElementById('setNotifications').addEventListener('click', () => {
        alert('Настройки уведомлений: Ҳамаи огоҳиҳо фаъоланд.');
    });
    document.getElementById('setLanguage').addEventListener('click', () => {
        alert('Изменить язык: Забони русӣ / тоҷикӣ.');
    });
    document.getElementById('setRate').addEventListener('click', () => {
        alert('Ташаккур барои баҳогузорӣ ба барномаи мо!');
    });
    document.getElementById('setContact').addEventListener('click', () => {
        alert('Бо мо тамос гиред: Telegram / WhatsApp саҳифаи VARZID.');
    });
});
