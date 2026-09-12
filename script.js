document.addEventListener('DOMContentLoaded', () => {
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

    let savedSubCount = parseInt(localStorage.getItem('subCount'));
    let subscribers = (!isNaN(savedSubCount) && savedSubCount !== 30000) ? savedSubCount : 0;
    
    let isSubscribed = localStorage.getItem('isSubscribed') === 'true';
    let categories = JSON.parse(localStorage.getItem('categories')) || ['Варзид', 'Орд', 'Корм'];
    let isAdmin = localStorage.getItem('isAdmin') === 'true';
    let currentTheme = localStorage.getItem('theme') || 'dark';

    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeStatus.textContent = 'Дневной режим ›';
        } else if (theme === 'dark') {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeStatus.textContent = 'Ночной режим ›';
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.body.classList.remove('light-theme');
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
                document.body.classList.add('light-theme');
            }
            themeStatus.textContent = 'Системные ›';
        }
        localStorage.setItem('theme', theme);
    }

    applyTheme(currentTheme);

    setThemeBtn.addEventListener('click', () => {
        themeModal.classList.add('open');
    });

    cancelTheme.addEventListener('click', () => {
        themeModal.classList.remove('open');
    });

    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const selectedTheme = e.target.getAttribute('data-theme');
            applyTheme(selectedTheme);
            themeModal.classList.remove('open');
        });
    });

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

    function updateSubDisplay() {
        if (subscribers >= 1000) {
            let thousands = (subscribers / 1000).toFixed(1);
            if (thousands.endsWith('.0')) {
                thousands = parseInt(thousands);
            }
            subCountSpan.textContent = thousands + ' тыс';
        } else {
            subCountSpan.textContent = subscribers;
        }
    }

    updateSubDisplay();
    
    if (isSubscribed) {
        subBtn.textContent = 'Отписаться';
        subBtn.classList.add('subscribed');
    } else {
        subBtn.textContent = 'Подписаться';
        subBtn.classList.remove('subscribed');
    }

    function renderCategories() {
        categoryList.innerHTML = '';
        categories.forEach((cat, index) => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.innerHTML = `
                <span class="cat-name" data-index="${index}">${cat}</span> 
                <button class="delete-btn admin-only" data-index="${index}" style="display: ${isAdmin ? 'flex' : 'none'};">×</button>
            `;
            categoryList.appendChild(card);
        });
        localStorage.setItem('categories', JSON.stringify(categories));
    }

    renderCategories();
    updateAdminUI();

    brandToggle.addEventListener('click', () => {
        dropdownMenu.classList.toggle('open');
        brandToggle.classList.toggle('active');
        settingsMenu.classList.remove('open');
    });

    settingsToggle.addEventListener('click', () => {
        settingsMenu.classList.toggle('open');
        dropdownMenu.classList.remove('open');
        brandToggle.classList.remove('active');
    });

    closeSettingsHeader.addEventListener('click', () => {
        settingsMenu.classList.remove('open');
    });

    adminModeToggle.addEventListener('click', () => {
        if (!isAdmin) {
            let password = prompt('Пароли админро ворид кунед:');
            if (password === '1604') { 
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
            subscribers = Math.max(0, subscribers - 1);
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
            let index = parseInt(e.target.getAttribute('data-index'));
            if (!isNaN(index) && index >= 0 && index < categories.length) {
                let catName = categories[index];
                // Огоҳӣ медиҳад то тугмаи × тасодуфан пахш шуда категорияро нест накунад
                if (confirm(`Шумо мутмаин ҳастед, ки категорияи "${catName}"-ро нест кардан мехоҳед?`)) {
                    categories.splice(index, 1);
                    renderCategories();
                }
            }
        } else {
            const card = e.target.closest('.category-card');
            if (card) {
                const nameSpan = card.querySelector('.cat-name');
                const index = parseInt(nameSpan.getAttribute('data-index'));
                if (!isNaN(index) && categories[index]) {
                    let catName = categories[index];
                    alert(`Гузариши электронӣ ба категорияи: ${catName}`);
                }
            }
        }
    });

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
