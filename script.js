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
    let categories = JSON.parse(localStorage.getItem('categories')) || ['Варзид', 'Орд', 'Корм', 'Чав', 'Селитра', 'Карбамид'];
    let isAdmin = localStorage.getItem('isAdmin') === 'true';
    let currentTheme = localStorage.getItem('theme') || 'dark';

    const unSubModal = document.createElement('div');
    unSubModal.className = 'theme-modal';
    unSubModal.id = 'unSubModal';
    unSubModal.innerHTML = `
        <div class="theme-modal-content">
            <h3>Управление подпиской</h3>
            <div class="theme-option" id="confirmUnsub" style="display: flex; align-items: center; gap: 12px; color: #ff4757; font-weight: bold;">
                <span style="font-size: 18px;">👤</span> <span>Отменить подписку</span>
            </div>
            <button class="theme-cancel" id="cancelUnsub" style="cursor: pointer;">ОТМЕНИТЬ</button>
        </div>
    `;
    document.body.appendChild(unSubModal);

    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            if(themeStatus) themeStatus.textContent = 'Дневной режим ›';
        } else if (theme === 'dark') {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            if(themeStatus) themeStatus.textContent = 'Ночной режим ›';
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.body.classList.remove('light-theme');
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
                document.body.classList.add('light-theme');
            }
            if(themeStatus) themeStatus.textContent = 'Системные ›';
        }
        localStorage.setItem('theme', theme);
    }

    applyTheme(currentTheme);

    if(setThemeBtn) {
        setThemeBtn.addEventListener('click', () => {
            themeModal.classList.add('open');
        });
    }

    if(cancelTheme) {
        cancelTheme.addEventListener('click', () => {
            themeModal.classList.remove('open');
        });
    }

    document.querySelectorAll('.theme-option').forEach(option => {
        if(option.id !== 'confirmUnsub') {
            option.addEventListener('click', (e) => {
                const selectedTheme = e.target.closest('.theme-option').getAttribute('data-theme');
                if(selectedTheme) {
                    applyTheme(selectedTheme);
                    themeModal.classList.remove('open');
                }
            });
        }
    });

    function updateAdminUI() {
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(el => {
            el.style.display = isAdmin ? 'flex' : 'none';
        });
        if (isAdmin && adminStatusBadge) {
            adminStatusBadge.textContent = 'Вкл';
            adminStatusBadge.className = 'badge-on';
        } else if(adminStatusBadge) {
            adminStatusBadge.textContent = 'Выкл';
            adminStatusBadge.className = 'badge-off';
        }
    }

    function updateSubDisplay() {
        if (!subCountSpan) return;
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
    
    if (subBtn) {
        if (isSubscribed) {
            subBtn.innerHTML = '✓ Вы подписаны';
            subBtn.classList.add('subscribed');
        } else {
            subBtn.textContent = 'Подписаться';
            subBtn.classList.remove('subscribed');
        }
    }

    function renderCategories() {
        if (!categoryList) return;
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

    if(brandToggle && dropdownMenu) {
        brandToggle.addEventListener('click', () => {
            dropdownMenu.classList.toggle('open');
            brandToggle.classList.toggle('active');
            if(settingsMenu) settingsMenu.classList.remove('open');
        });
    }

    if(settingsToggle && settingsMenu) {
        settingsToggle.addEventListener('click', () => {
            settingsMenu.classList.toggle('open');
            if(dropdownMenu) dropdownMenu.classList.remove('open');
            if(brandToggle) brandToggle.classList.remove('active');
        });
    }

    if(closeSettingsHeader && settingsMenu) {
        closeSettingsHeader.addEventListener('click', () => {
            settingsMenu.classList.remove('open');
        });
    }

    if(adminModeToggle) {
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
    }

    if(subBtn) {
        subBtn.addEventListener('click', () => {
            if (!isSubscribed) {
                subscribers++;
                isSubscribed = true;
                subBtn.innerHTML = '✓ Вы подписаны';
                subBtn.classList.add('subscribed');
                updateSubDisplay();
                localStorage.setItem('subCount', subscribers);
                localStorage.setItem('isSubscribed', isSubscribed);
            } else {
                unSubModal.classList.add('open');
            }
        });
    }

    const cancelUnsubBtn = document.getElementById('cancelUnsub');
    if(cancelUnsubBtn) {
        cancelUnsubBtn.addEventListener('click', () => {
            unSubModal.classList.remove('open');
        });
    }

    const confirmUnsubBtn = document.getElementById('confirmUnsub');
    if(confirmUnsubBtn) {
        confirmUnsubBtn.addEventListener('click', () => {
            subscribers = Math.max(0, subscribers - 1);
            isSubscribed = false;
            if(subBtn) {
                subBtn.textContent = 'Подписаться';
                subBtn.classList.remove('subscribed');
            }
            updateSubDisplay();
            localStorage.setItem('subCount', subscribers);
            localStorage.setItem('isSubscribed', isSubscribed);
            unSubModal.classList.remove('open');
        });
    }

    if(addCategoryBtn) {
        addCategoryBtn.addEventListener('click', () => {
            let newCat = prompt('Номи категорияи навро нависед:');
            if (newCat && newCat.trim() !== '') {
                categories.push(newCat.trim());
                renderCategories();
            }
        });
    }

    if(categoryList) {
        categoryList.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                e.stopPropagation();
                if (!isAdmin) return;
                let index = parseInt(e.target.getAttribute('data-index'));
                if (!isNaN(index) && index >= 0 && index < categories.length) {
                    let catName = categories[index];
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
    }
});
