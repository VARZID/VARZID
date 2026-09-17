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
    let categories = JSON.parse(localStorage.getItem('categories')) || ['Варзид', 'Орд', 'Корм', 'Ҷав', 'Селитра', 'Карбамид'];
    let isAdmin = localStorage.getItem('isAdmin') === 'true';
    let currentTheme = localStorage.getItem('theme') || 'light';
    let currentLang = localStorage.getItem('lang') || 'tg';

    // Луғати мукаммал барои се забон (Тоҷикӣ, Русский, O'zbekcha)
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
            cancelBtn: "БЕКОР КАРДАН"
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
            cancelBtn: "ОТМЕНА"
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
            cancelBtn: "BEKOR QILISH"
        }
    };

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        
        const t = dict[lang];
        
        // Иваз кардани ҳамаи элементҳое, ки data-translate доранд
        document.querySelectorAll("[data-translate]").forEach(element => {
            const key = element.getAttribute("data-translate");
            if (t[key]) {
                element.textContent = t[key];
            }
        });

        // Номи забони ҷорӣ дар менюи танзимот
        const langNames = { tg: "Тоҷикӣ", ru: "Русский", uz: "O'zbekcha" };
        const currentLangDisplay = document.getElementById('currentLangDisplay');
        if(currentLangDisplay) {
            currentLangDisplay.textContent = langNames[lang] + " ›";
        }

        // Ҳолати Тема ва Огоҳиҳо
        if(themeStatus) {
            themeStatus.textContent = currentTheme === 'light' ? t.dayMode : t.nightMode;
        }

        const notifStatusText = document.getElementById('notifStatusText');
        let notificationsEnabled = localStorage.getItem('notifications') === 'true';
        if(notifStatusText) {
            notifStatusText.textContent = notificationsEnabled ? t.notifOn : t.notifOff;
        }

        updateAdminUI();
        
        if(subBtn) {
            subBtn.textContent = isSubscribed ? t.subscribed : t.subscribe;
        }

        updateSubDisplay();
    }

    // Сохтани модалҳо бо дастгирии забонҳо
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
        currentTheme = theme;
        if (theme === 'light') {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
        }
        localStorage.setItem('theme', theme);
        setLanguage(currentLang);
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
                const selectedTheme = e.currentTarget.getAttribute('data-theme');
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

    const cancelLangBtn = document.getElementById('cancelLang');
    if(cancelLangBtn) {
        cancelLangBtn.addEventListener('click', () => {
            langModal.classList.remove('open');
        });
    }

    if(langTajik) langTajik.addEventListener('click', () => { setLanguage('tg'); langModal.classList.remove('open'); });
    if(langRussian) langRussian.addEventListener('click', () => { setLanguage('ru'); langModal.classList.remove('open'); });
    if(langUzbek) langUzbek.addEventListener('click', () => { setLanguage('uz'); langModal.classList.remove('open'); });

    const setNotificationsBtn = document.getElementById('setNotifications');
    let notificationsEnabled = localStorage.getItem('notifications') === 'true';

    if (setNotificationsBtn) {
        setNotificationsBtn.addEventListener('click', () => {
            notificationsEnabled = !notificationsEnabled;
            localStorage.setItem('notifications', notificationsEnabled);
            setLanguage(currentLang);
        });
    }

    function updateAdminUI() {
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(el => {
            el.style.display = isAdmin ? 'inline-block' : 'none';
        });
        const t = dict[currentLang];
        if (isAdmin && adminStatusBadge) {
            adminStatusBadge.textContent = t.adminOn;
            adminStatusBadge.className = 'badge-on';
        } else if(adminStatusBadge) {
            adminStatusBadge.textContent = t.adminOff;
            adminStatusBadge.className = 'badge-off';
        }
    }

    function updateSubDisplay() {
        if (!subCountSpan) return;
        const t = dict[currentLang];
        const subTextNode = document.querySelector('.subscribers-info div');
        if(subTextNode) {
            let countStr = subscribers >= 1000 ? (subscribers/1000).toFixed(1) : subscribers;
            subTextNode.innerHTML = `<span id="subCount">${countStr}</span> ${t.subscribers}`;
        }
    }

    updateSubDisplay();

    function renderCategories() {
        if (!categoryList) return;
        categoryList.innerHTML = '';
        categories.categoriesList = categories || [];
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

    const cancelAdminBtn = document.getElementById('cancelAdmin');
    if(cancelAdminBtn) {
        cancelAdminBtn.addEventListener('click', () => {
            adminModal.classList.remove('open');
        });
    }

    const confirmAdminBtn = document.getElementById('confirmAdmin');
    if(confirmAdminBtn) {
        confirmAdminBtn.addEventListener('click', () => {
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
    }

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
                subBtn.textContent = dict[currentLang].subscribe;
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
            document.getElementById('newCatInput').value = '';
            addCatModal.classList.add('open');
        });
    }

    const cancelAddCatBtn = document.getElementById('cancelAddCat');
    if(cancelAddCatBtn) {
        cancelAddCatBtn.addEventListener('click', () => {
            addCatModal.classList.remove('open');
        });
    }

    const confirmAddCatBtn = document.getElementById('confirmAddCat');
    if(confirmAddCatBtn) {
        confirmAddCatBtn.addEventListener('click', () => {
            let newCat = document.getElementById('newCatInput').value;
            if (newCat && newCat.trim() !== '') {
                categories.push(newCat.trim());
                renderCategories();
            }
            addCatModal.classList.remove('open');
        });
    }

    const cancelDeleteBtn = document.getElementById('cancelDelete');
    if(cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', () => {
            deleteModal.classList.remove('open');
            deleteTargetIndex = null;
        });
    }

    const confirmDeleteBtn = document.getElementById('confirmDelete');
    if(confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', () => {
            if (deleteTargetIndex !== null && !isNaN(deleteTargetIndex) && deleteTargetIndex >= 0 && deleteTargetIndex < categories.length) {
                categories.splice(deleteTargetIndex, 1);
                renderCategories();
            }
            deleteModal.classList.remove('open');
            deleteTargetIndex = null;
        });
    }

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
