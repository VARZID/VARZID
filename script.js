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

    const setContactBtn = document.getElementById('setContact');
    const contactModal = document.getElementById('contactModal');
    const closeContactModal = document.getElementById('closeContactModal');

    let savedSubCount = parseInt(localStorage.getItem('subCount'));
    let subscribers = (!isNaN(savedSubCount) && savedSubCount !== 30000) ? savedSubCount : 0;
    
    let isSubscribed = localStorage.getItem('isSubscribed') === 'true';
    let categories = JSON.parse(localStorage.getItem('categories')) || ['Варзид', 'Орд', 'Корм', 'Ҷав', 'Селитра', 'Карбамид'];
    let isAdmin = localStorage.getItem('isAdmin') === 'true';
    let currentTheme = localStorage.getItem('theme') || 'light';
    let currentLang = localStorage.getItem('lang') || 'tg';

    // Луғат барои забонҳо
    const dict = {
        tg: {
            subscribers: "подписчиков",
            subscribe: "Подписаться",
            subscribed: "✓ Шумо обуна ҳастед",
            categories: "Категорияҳо",
            settings: "Танзимот",
            theme: "Мавзӯъ (Тема)",
            notifications: "Огоҳиҳо",
            language: "Забон",
            adminMode: "Режими Админ",
            rateSite: "Баҳо додан ба сомона",
            contactUs: "Тамос бо мо",
            addCatTitle: "Илова кардани категория",
            addCatPlaceholder: "Номи категория...",
            cancel: "Бекор кардан",
            confirm: "Илова кардан",
            adminTitle: "Ворид кардани пароли админ",
            adminPlaceholder: "Паролро нависед...",
            adminLogin: "Ворид шудан",
            wrongPass: "Пароли нодуруст!"
        },
        ru: {
            subscribers: "подписчиков",
            subscribe: "Подписаться",
            subscribed: "✓ Вы подписаны",
            categories: "Категории",
            settings: "Настройки",
            theme: "Тема",
            notifications: "Уведомления",
            language: "Язык",
            adminMode: "Режим Админа",
            rateSite: "Оценить сайт",
            contactUs: "Связаться с нами",
            addCatTitle: "Добавить категорию",
            addCatPlaceholder: "Имя категории...",
            cancel: "Отмена",
            confirm: "Добавить",
            adminTitle: "Вход в режим админа",
            adminPlaceholder: "Введите пароль...",
            adminLogin: "Войти",
            wrongPass: "Неверный пароль!"
        },
        uz: {
            subscribers: "obunachilar",
            subscribe: "Obuna bo'lish",
            subscribed: "✓ Obuna bo'lgansiz",
            categories: "Kategoriyalar",
            settings: "Sozlamalar",
            theme: "Mavzu",
            notifications: "Bildirishnomalar",
            language: "Til",
            adminMode: "Admin rejimi",
            rateSite: "Saytni baholash",
            contactUs: "Biz bilan bog'lanish",
            addCatTitle: "Kategoriya qo'shish",
            addCatPlaceholder: "Kategoriya nomi...",
            cancel: "Bekor qilish",
            confirm: "Qo'shish",
            adminTitle: "Admin parolini kiriting",
            adminPlaceholder: "Parolni kiriting...",
            adminLogin: "Kirish",
            wrongPass: "Noto'g'ri parol!"
        }
    };

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        
        const t = dict[lang];
        
        // Иваз кардани матни подписчики
        const subTextNode = document.querySelector('.subscribers-info div');
        if(subTextNode) {
            subTextNode.innerHTML = `<span id="subCount">${subscribers >= 1000 ? (subscribers/1000).toFixed(1) : subscribers}</span> ${t.subscribers}`;
        }
        
        // Иваз кардани тугмаи обуна
        if(subBtn) {
            subBtn.textContent = isSubscribed ? t.subscribed : t.subscribe;
        }

        // Сарлавҳаи категорияҳо
        const catTitle = document.querySelector('.menu-header span');
        if(catTitle) catTitle.textContent = t.categories;

        // Сарлавҳаи танзимот
        const setHead = document.querySelector('.settings-header span');
        if(setHead) setHead.textContent = t.settings;

        // Рӯйхати танзимот
        const items = document.querySelectorAll('.settings-list .setting-item');
        if(items.length >= 6) {
            items[0].querySelector('span').textContent = t.theme;
            items[1].querySelector('span').textContent = t.notifications;
            items[2].querySelector('span').textContent = t.language;
            items[3].querySelector('span').textContent = t.adminMode;
            items[4].querySelector('span').textContent = t.rateSite;
            items[5].querySelector('span').textContent = t.contactUs;
        }

        // Модали илова кардани категория
        const addCatTitleEl = document.querySelector('#addCatModal h3');
        if(addCatTitleEl) addCatTitleEl.textContent = t.addCatTitle;
        const newCatInputEl = document.getElementById('newCatInput');
        if(newCatInputEl) newCatInputEl.placeholder = t.addCatPlaceholder;
        const cancelAddCatEl = document.getElementById('cancelAddCat');
        if(cancelAddCatEl) cancelAddCatEl.textContent = t.cancel;
        const confirmAddCatEl = document.getElementById('confirmAddCat');
        if(confirmAddCatEl) confirmAddCatEl.textContent = t.confirm;

        // Модали админ
        const adminTitleEl = document.querySelector('#adminModal h3');
        if(adminTitleEl) adminTitleEl.textContent = t.adminTitle;
        const adminPassInputEl = document.getElementById('adminPasswordInput');
        if(adminPassInputEl) adminPassInputEl.placeholder = t.adminPlaceholder;
        const cancelAdminEl = document.getElementById('cancelAdmin');
        if(cancelAdminEl) cancelAdminEl.textContent = t.cancel;
        const confirmAdminEl = document.getElementById('confirmAdmin');
        if(confirmAdminEl) confirmAdminEl.textContent = t.adminLogin;
    }

    // Сохтани модалҳо
    const unSubModal = document.createElement('div');
    unSubModal.className = 'theme-modal';
    unSubModal.id = 'unSubModal';
    unSubModal.innerHTML = `
        <div class="theme-modal-content">
            <h3>Управление подпиской</h3>
            <div class="theme-option" id="confirmUnsub" style="display: flex; align-items: center; gap: 12px; color: #ff4757; font-weight: bold; cursor: pointer;">
                <span style="font-size: 18px;">👤</span> <span>Отменить подписку</span>
            </div>
            <button class="theme-cancel" id="cancelUnsub" style="cursor: pointer;">ОТМЕНИТЬ</button>
        </div>
    `;
    document.body.appendChild(unSubModal);

    const langModal = document.createElement('div');
    langModal.className = 'theme-modal';
    langModal.id = 'langModal';
    langModal.innerHTML = `
        <div class="theme-modal-content">
            <h3>Интихоби забон / Выбор языка</h3>
            <div class="theme-option" id="langTajik" style="display: flex; align-items: center; gap: 12px; font-weight: bold; cursor: pointer; padding: 10px 0;">
                <span>🇹🇯</span> <span>Тоҷикӣ</span>
            </div>
            <div class="theme-option" id="langRussian" style="display: flex; align-items: center; gap: 12px; font-weight: bold; cursor: pointer; padding: 10px 0;">
                <span>🇷🇺</span> <span>Русский</span>
            </div>
            <div class="theme-option" id="langUzbek" style="display: flex; align-items: center; gap: 12px; font-weight: bold; cursor: pointer; padding: 10px 0;">
                <span>🇺🇿</span> <span>O'zbekcha</span>
            </div>
            <button class="theme-cancel" id="cancelLang" style="cursor: pointer;">Бекор кардан</button>
        </div>
    `;
    document.body.appendChild(langModal);

    const deleteModal = document.createElement('div');
    deleteModal.className = 'theme-modal';
    deleteModal.id = 'deleteModal';
    deleteModal.innerHTML = `
        <div class="theme-modal-content">
            <h3 id="deleteModalText" style="margin-bottom: 20px; font-size: 16px; line-height: 1.4;">Шумо мутмаин ҳастед?</h3>
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button class="theme-cancel" id="cancelDelete" style="cursor: pointer; margin-top: 0; background: #333; color: #fff;">Бекор кардан</button>
                <button class="theme-cancel" id="confirmDelete" style="cursor: pointer; margin-top: 0; background: #ff4757; color: #fff;">Нест кардан</button>
            </div>
        </div>
    `;
    document.body.appendChild(deleteModal);

    const adminModal = document.createElement('div');
    adminModal.className = 'theme-modal';
    adminModal.id = 'adminModal';
    adminModal.innerHTML = `
        <div class="theme-modal-content">
            <h3 style="margin-bottom: 15px; font-size: 16px;">Ворид кардани пароли админ</h3>
            <input type="password" id="adminPasswordInput" placeholder="Паролро нависед..." style="width: 100%; padding: 12px; margin-bottom: 15px; border-radius: 8px; border: 1px solid #555; background: #222; color: #fff; font-size: 16px; outline: none;">
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button class="theme-cancel" id="cancelAdmin" style="cursor: pointer; margin-top: 0; background: #333; color: #fff;">Бекор кардан</button>
                <button class="theme-cancel" id="confirmAdmin" style="cursor: pointer; margin-top: 0; background: #e50914; color: #fff;">Ворид шудан</button>
            </div>
        </div>
    `;
    document.body.appendChild(adminModal);

    const addCatModal = document.createElement('div');
    addCatModal.className = 'theme-modal';
    addCatModal.id = 'addCatModal';
    addCatModal.innerHTML = `
        <div class="theme-modal-content">
            <h3 style="margin-bottom: 15px; font-size: 16px;">Илова кардани категория</h3>
            <input type="text" id="newCatInput" placeholder="Номи категория..." style="width: 100%; padding: 12px; margin-bottom: 15px; border-radius: 8px; border: 1px solid #555; background: #222; color: #fff; font-size: 16px; outline: none;">
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button class="theme-cancel" id="cancelAddCat" style="cursor: pointer; margin-top: 0; background: #333; color: #fff;">Бекор кардан</button>
                <button class="theme-cancel" id="confirmAddCat" style="cursor: pointer; margin-top: 0; background: #e50914; color: #fff;">Илова кардан</button>
            </div>
        </div>
    `;
    document.body.appendChild(addCatModal);

    let deleteTargetIndex = null;

    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            if(themeStatus) themeStatus.textContent = 'Дневной режим ›';
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            if(themeStatus) themeStatus.textContent = 'Ночной режим ›';
        }
        localStorage.setItem('theme', theme);
    }

    applyTheme(currentTheme);
    setLanguage(currentLang);

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
        if(option.getAttribute('data-theme')) {
            option.addEventListener('click', (e) => {
                const selectedTheme = e.target.getAttribute('data-theme');
                if(selectedTheme) {
                    applyTheme(selectedTheme);
                    themeModal.classList.remove('open');
                }
            });
        }
    });

    const setLanguageBtn = document.getElementById('setLanguage');
    if (setLanguageBtn) {
        setLanguageBtn.addEventListener('click', () => {
            langModal.classList.add('open');
            if(settingsMenu) settingsMenu.classList.remove('open');
        });
    }

    document.getElementById('cancelLang').addEventListener('click', () => {
        langModal.classList.remove('open');
    });

    // Иваз кардани забонҳо бо навсозии пурраи интерфейс
    document.getElementById('langTajik').addEventListener('click', () => {
        setLanguage('tg');
        langModal.classList.remove('open');
    });

    document.getElementById('langRussian').addEventListener('click', () => {
        setLanguage('ru');
        langModal.classList.remove('open');
    });

    document.getElementById('langUzbek').addEventListener('click', () => {
        setLanguage('uz');
        langModal.classList.remove('open');
    });

    const setNotificationsBtn = document.getElementById('setNotifications');
    const notifStatusText = document.getElementById('notifStatusText');
    let notificationsEnabled = localStorage.getItem('notifications') === 'true';
    
    function updateNotifUI() {
        if(notifStatusText) {
            notifStatusText.textContent = notificationsEnabled ? 'Вкл ›' : 'Выкл ›';
        }
    }
    updateNotifUI();

    if (setNotificationsBtn) {
        setNotificationsBtn.addEventListener('click', () => {
            notificationsEnabled = !notificationsEnabled;
            localStorage.setItem('notifications', notificationsEnabled);
            updateNotifUI();
        });
    }

    const setRateBtn = document.getElementById('setRate');
    if (setRateBtn) {
        setRateBtn.addEventListener('click', () => {
            localStorage.setItem('siteRating', '5');
        });
    }

    if (setContactBtn && contactModal) {
        setContactBtn.addEventListener('click', () => {
            contactModal.style.display = 'flex';
            if(settingsMenu) settingsMenu.classList.remove('open');
        });
    }

    if (closeContactModal && contactModal) {
        closeContactModal.addEventListener('click', () => {
            contactModal.style.display = 'none';
        });
    }

    function updateAdminUI() {
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(el => {
            el.style.display = isAdmin ? 'inline-block' : 'none';
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
            if (thousands.endsWith('.0')) thousands = parseInt(thousands);
            subCountSpan.textContent = thousands + ' тыс';
        } else {
            subCountSpan.textContent = subscribers;
        }
    }

    updateSubDisplay();
    
    if (subBtn) {
        if (isSubscribed) {
            subBtn.innerHTML = dict[currentLang].subscribed;
            subBtn.classList.add('subscribed');
        } else {
            subBtn.textContent = dict[currentLang].subscribe;
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
                <button class="delete-btn admin-only" data-index="${index}" style="display: ${isAdmin ? 'inline-block' : 'none'};">×</button>
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
                document.getElementById('adminPasswordInput').value = '';
                adminModal.classList.add('open');
                if(settingsMenu) settingsMenu.classList.remove('open');
            } else {
                isAdmin = false;
                localStorage.setItem('isAdmin', 'false');
                updateAdminUI();
                renderCategories();
            }
        });
    }

    document.getElementById('cancelAdmin').addEventListener('click', () => {
        adminModal.classList.remove('open');
    });

    document.getElementById('confirmAdmin').addEventListener('click', () => {
        let password = document.getElementById('adminPasswordInput').value;
        if (password === '1604') {
            isAdmin = true;
            localStorage.setItem('isAdmin', 'true');
            updateAdminUI();
            renderCategories();
            adminModal.classList.remove('open');
        } else {
            alert(dict[currentLang].wrongPass);
        }
    });

    if(subBtn) {
        subBtn.addEventListener('click', () => {
            if (!isSubscribed) {
                subscribers++;
                isSubscribed = true;
                subBtn.innerHTML = dict[currentLang].subscribed;
                subBtn.classList.add('subscribed');
                updateSubDisplay();
                localStorage.setItem('subCount', subscribers);
                localStorage.setItem('isSubscribed', isSubscribed);
            } else {
                unSubModal.classList.add('open');
            }
        });
    }

    document.getElementById('cancelUnsub').addEventListener('click', () => {
        unSubModal.classList.remove('open');
    });

    document.getElementById('confirmUnsub').addEventListener('click', () => {
        subscribers = Math.max(0, subscribers - 1);
        isSubscribed = false;
        if(subBtn) {
            subBtn.textContent = dict[currentLang].subscribe;
            subBtn.classList.remove('subscribed');
        }
        updateSubDisplay();
        localStorage.setItem('subCount', subscribers);
        localStorage.setItem('isSubscribed', isSubscribed);
        unSubModal.classList.remove('open');
    });

    if(addCategoryBtn) {
        addCategoryBtn.addEventListener('click', () => {
            document.getElementById('newCatInput').value = '';
            addCatModal.classList.add('open');
        });
    }

    document.getElementById('cancelAddCat').addEventListener('click', () => {
        addCatModal.classList.remove('open');
    });

    document.getElementById('confirmAddCat').addEventListener('click', () => {
        let newCat = document.getElementById('newCatInput').value;
        if (newCat && newCat.trim() !== '') {
            categories.push(newCat.trim());
            renderCategories();
        }
        addCatModal.classList.remove('open');
    });

    document.getElementById('cancelDelete').addEventListener('click', () => {
        deleteModal.classList.remove('open');
        deleteTargetIndex = null;
    });

    document.getElementById('confirmDelete').addEventListener('click', () => {
        if (deleteTargetIndex !== null && !isNaN(deleteTargetIndex) && deleteTargetIndex >= 0 && deleteTargetIndex < categories.length) {
            categories.splice(deleteTargetIndex, 1);
            renderCategories();
        }
        deleteModal.classList.remove('open');
        deleteTargetIndex = null;
    });

    if(categoryList) {
        categoryList.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                e.stopPropagation();
                if (!isAdmin) return;
                let index = parseInt(e.target.getAttribute('data-index'));
                if (!isNaN(index) && index >= 0 && index < categories.length) {
                    deleteTargetIndex = index;
                    let catName = categories[index];
                    document.getElementById('deleteModalText').textContent = `Шумо мутмаин ҳастед, ки категорияи "${catName}"-ро нест кардан мехоҳед?`;
                    deleteModal.classList.add('open');
                }
            }
        });
    }
});
