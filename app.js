const $ = id => document.getElementById(id);


/* =========================
   ТАРҶУМА
========================= */

const translations = {

    tg: {
        catMenuTitle: "Интихоби категория",
        settingsTitle: "Танзимот",
        themeLabel: "Мавзӯи рангӣ:",
        lightText: "Режими рӯзона",
        darkText: "Режими шабона",
        langLabel: "Забон:",

        adminToggleBtn: "🔐 Ҳолати Админ",
        admin: "Админ",

        adminModalTitle: "Ворид кардани парол",
        adminPlaceholder: "Рамзи админро ворид кунед...",
        adminSubmit: "Тасдиқ",
        adminError: "Рамзи нодуруст!",

        addCatTitle: "Иловаи категория",
        addCatPlaceholder: "Номи категорияи нав...",
        addCatConfirm: "Илова кардан",

        now: "Ҳоло",

        newPost: "ЭЪЛОНИ НАВ",
        generalPost: "Молу маҳсулоти нав ва навори он:",
        productPost: "Маҳсулоти {cat} ва навъҳои он:",

        orderTitle: "🛒 Заказ / Фармоиш",
        orderDesc: "Барои фармоиш ном ва рақами худро фиристед:",

        name: "Номи шумо...",
        phone: "Рақами телефон (масалан: 900000000)...",
        location: "Ҷойи расонидан...",

        orderBtn: "📲 Фиристодани фармоиш ба WhatsApp",

        delivery: "Арзиши расонидан вобаста ба масофа аст.",

        emptyCat: "Номи категорияро ворид кунед.",
        duplicateCat: "Ин категория аллакай ҳаст.",

        deleteConfirm:
            "Оё шумо мутмаин ҳастед, ки мехоҳед категорияи «{cat}»-ро нест кунед?",

        adminOn: "Ҳолати админ фаъол шуд.",
        adminOff: "Ҳолати админ хомӯш шуд.",

        orderReady: "Фармоиш барои фиристодан ба WhatsApp омода шуд."
    },


    ru: {
        catMenuTitle: "Выбор категории",
        settingsTitle: "Настройки",
        themeLabel: "Цветовая схема:",
        lightText: "Дневной режим",
        darkText: "Ночной режим",
        langLabel: "Язык:",

        adminToggleBtn: "🔐 Режим Админа",
        admin: "Админ",

        adminModalTitle: "Введите пароль",
        adminPlaceholder: "Введите пароль администратора...",
        adminSubmit: "Подтвердить",
        adminError: "Неверный пароль!",

        addCatTitle: "Добавить категорию",
        addCatPlaceholder: "Название новой категории...",
        addCatConfirm: "Добавить",

        now: "Только что",

        newPost: "НОВОЕ ОБЪЯВЛЕНИЕ",
        generalPost: "Новые товары и видео:",
        productPost: "Товар «{cat}» и его виды:",

        orderTitle: "🛒 Заказ",
        orderDesc: "Отправьте имя и номер для заказа:",

        name: "Ваше имя...",
        phone: "Номер телефона (например: 900000000)...",
        location: "Место доставки...",

        orderBtn: "📲 Отправить заказ в WhatsApp",

        delivery: "Стоимость доставки зависит от расстояния.",

        emptyCat: "Введите название категории.",
        duplicateCat: "Эта категория уже существует.",

        deleteConfirm:
            "Вы уверены, что хотите удалить категорию «{cat}»?",

        adminOn: "Режим администратора включён.",
        adminOff: "Режим администратора выключен.",

        orderReady: "Заказ подготовлен для отправки в WhatsApp."
    }

};


/* =========================
   КАТЕГОРИЯҲО
========================= */

const defaultCategories = [

    {
        tg: "Варзидан",
        ru: "Варзидан"
    },

    {
        tg: "Орд",
        ru: "Мука"
    },

    {
        tg: "Комбикорм",
        ru: "Комбикорм"
    },

    {
        tg: "Гандум",
        ru: "Пшеница"
    },

    {
        tg: "Ҷав",
        ru: "Ячмень"
    },

    {
        tg: "Ҷуворимакка",
        ru: "Кукуруза"
    },

    {
        tg: "Селитра",
        ru: "Селитра"
    },

    {
        tg: "Карбамид",
        ru: "Карбамид"
    }

];


let currentLang =
    localStorage.getItem("varzid_lang") || "tg";

let currentCat = "Варзидан";

let isAdmin = false;


/*
   Муҳим:
   Ин парол дар frontend аст.
   Барои амнияти воқеии админ баъдтар backend лозим мешавад.
*/

const ADMIN_PASSWORD = "varzid2026";


/* =========================
   ТАРҶУМАИ МАТН
========================= */

function t(key, vars = {}) {

    let text =
        translations[currentLang][key] || key;

    Object.keys(vars).forEach(keyName => {

        text = text.replaceAll(
            `{${keyName}}`,
            vars[keyName]
        );

    });

    return text;
}


/* =========================
   MODAL
========================= */

function showModal(id) {

    const element = $(id);

    if (!element) return;

    element.style.display = "flex";

}


function hideModal(id) {

    const element = $(id);

    if (!element) return;

    element.style.display = "none";

}


/* =========================
   TOAST
========================= */

function showToast(message) {

    const toast = $("toast");

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.varzidToast);

    window.varzidToast =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2200);
}


/* =========================
   CATEGORY STORAGE
========================= */

function getCategories() {

    try {

        const saved =
            JSON.parse(
                localStorage.getItem(
                    "varzid_categories"
                )
            );

        if (
            Array.isArray(saved) &&
            saved.length
        ) {

            return saved;

        }

    } catch (error) {

        console.log(
            "Category error:",
            error
        );

    }

    return JSON.parse(
        JSON.stringify(defaultCategories)
    );
}


function saveCategories(categories) {

    localStorage.setItem(
        "varzid_categories",
        JSON.stringify(categories)
    );

}


/* =========================
   CATEGORY NAME
========================= */

function getCategoryName(category) {

    if (typeof category === "string") {

        return category;

    }

    return (
        category[currentLang] ||
        category.tg ||
        category.ru
    );

}


function getCategoryByTg(tg) {

    const categories =
        getCategories();

    return categories.find(
        category =>
            (category.tg || category) === tg
    );

}


function getCategoryLabel(tg) {

    const category =
        getCategoryByTg(tg);

    if (!category) return tg;

    return getCategoryName(category);

}


/* =========================
   RENDER CATEGORY
========================= */

function renderCategories() {

    const list =
        $("categoryList");

    list.innerHTML = "";


    const categories =
        getCategories();


    categories.forEach(category => {

        const tgName =
            category.tg || category;

        const label =
            getCategoryName(category);


        const item =
            document.createElement("div");

        item.className =
            "category-item";


        if (tgName === currentCat) {

            item.classList.add("active");

        }


        const name =
            document.createElement("span");

        name.className =
            "cat-name";

        name.textContent =
            label;


        item.appendChild(name);


        /* Нест кардани категория танҳо админ */

        if (
            isAdmin &&
            tgName !== "Варзидан"
        ) {

            const deleteButton =
                document.createElement("span");

            deleteButton.className =
                "delete-cat-btn";

            deleteButton.textContent =
                "✕";


            deleteButton.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    deleteCategory(tgName);

                }
            );


            item.appendChild(
                deleteButton
            );

        }


        item.addEventListener(
            "click",
            () => {

                selectCategory(
                    tgName
                );

            }
        );


        list.appendChild(item);

    });


    /* + танҳо барои админ */

    if (isAdmin) {

        const addButton =
            document.createElement("button");

        addButton.className =
            "add-category-btn";

        addButton.textContent =
            "+";

        addButton.type =
            "button";

        addButton.addEventListener(
            "click",
            openAddCategoryModal
        );

        list.appendChild(addButton);

    }


    $("exitAdminBtn").style.display =
        isAdmin
            ? "inline-flex"
            : "none";

}


/* =========================
   SELECT CATEGORY
========================= */

function selectCategory(tgName) {

    currentCat =
        tgName;


    const label =
        getCategoryLabel(tgName);


    $("channelName").textContent =
        label;

    $("postChannelName").textContent =
        label;


    const productCategories = [

        "Орд",
        "Комбикорм",
        "Гандум",
        "Ҷав",
        "Ҷуворимакка",
        "Селитра",
        "Карбамид"

    ];


    if (
        productCategories.includes(tgName)
    ) {

        $("postText").innerHTML =
            `✅ <b>${t("newPost")}</b><br>` +
            t("productPost", {
                cat: label
            });

    } else {

        $("postText").innerHTML =
            `✅ <b>${t("newPost")}</b><br>` +
            t("generalPost");

    }


    renderCategories();

    hideModal("dropdownMenu");

    $("arrowIcon")
        .classList
        .remove("rotate");

}


/* =========================
   ADD CATEGORY
========================= */

function openAddCategoryModal() {

    if (!isAdmin) return;

    $("newCatInput").value = "";

    showModal("addCatModal");

    setTimeout(() => {

        $("newCatInput").focus();

    }, 100);

}


function closeAddCategoryModal() {

    hideModal("addCatModal");

}


function confirmAddCategory() {

    const input =
        $("newCatInput");

    const value =
        input.value.trim();


    if (!value) {

        showToast(
            t("emptyCat")
        );

        return;

    }


    const categories =
        getCategories();


    const exists =
        categories.some(
            category => {

                const tg =
                    (category.tg ||
                     category)
                    .toLowerCase();

                const ru =
                    (
                        category.ru ||
                        category
                    )
                    .toLowerCase();


                return (
                    tg === value.toLowerCase() ||
                    ru === value.toLowerCase()
                );

            }
        );


    if (exists) {

        showToast(
            t("duplicateCat")
        );

        return;

    }


    categories.push({

        tg: value,
        ru: value

    });


    saveCategories(
        categories
    );


    input.value = "";

    closeAddCategoryModal();

    renderCategories();

}


/* =========================
   DELETE CATEGORY
========================= */

function deleteCategory(tgName) {

    if (!isAdmin) return;

    if (tgName === "Варзидан") return;


    const label =
        getCategoryLabel(tgName);


    const confirmed =
        confirm(
            t(
                "deleteConfirm",
                {
                    cat: label
                }
            )
        );


    if (!confirmed) return;


    const categories =
        getCategories()
        .filter(
            category =>
                (category.tg || category)
                !== tgName
        );


    saveCategories(
        categories
    );


    if (currentCat === tgName) {

        currentCat =
            "Варзидан";

    }


    renderCategories();

    selectCategory(
        currentCat
    );

}


/* =========================
   ADMIN
========================= */

function openAdminModal() {

    hideModal(
        "settingsModal"
    );

    $("adminPasswordInput").value = "";

    $("adminErrorMsg").style.display =
        "none";

    showModal(
        "adminModal"
    );

}


function closeAdminModal() {

    hideModal(
        "adminModal"
    );

}


function submitAdminPassword() {

    const password =
        $("adminPasswordInput")
        .value;


    if (
        password ===
        ADMIN_PASSWORD
    ) {

        isAdmin = true;

        closeAdminModal();

        renderCategories();

        showToast(
            t("adminOn")
        );

    } else {

        $("adminErrorMsg")
            .style.display =
            "block";

    }

}


function exitAdminMode() {

    isAdmin = false;

    renderCategories();

    showToast(
        t("adminOff")
    );

}


/* =========================
   THEME
========================= */

function setTheme(theme) {

    document.body.classList.toggle(
        "dark-theme",
        theme === "dark"
    );


    document.body.classList.toggle(
        "light-theme",
        theme !== "dark"
    );


    localStorage.setItem(
        "varzid_theme",
        theme
    );


    hideModal(
        "settingsModal"
    );

}


/* =========================
   LANGUAGE
========================= */

function setLanguage(lang) {

    if (
        !translations[lang]
    ) return;


    currentLang =
        lang;


    localStorage.setItem(
        "varzid_lang",
        lang
    );


    applyLanguage();

    renderCategories();

    selectCategory(
        currentCat
    );

    hideModal(
        "settingsModal"
    );

}


function applyLanguage() {

    $("catMenuTitle").textContent =
        t("catMenuTitle");


    $("settingsTitle").textContent =
        t("settingsTitle");


    $("themeLabel").textContent =
        t("themeLabel");


    $("lightText").textContent =
        t("lightText");


    $("darkText").textContent =
        t("darkText");


    $("langLabel").textContent =
        t("langLabel");


    $("adminToggleBtn").textContent =
        t("adminToggleBtn");


    $("adminExitText").textContent =
        t("admin");


    $("adminModalTitle").textContent =
        t("adminModalTitle");


    $("adminPasswordInput").placeholder =
        t("adminPlaceholder");


    $("adminSubmitBtn").textContent =
        t("adminSubmit");


    $("adminErrorMsg").textContent =
        t("adminError");


    $("addCatTitle").textContent =
        t("addCatTitle");


    $("newCatInput").placeholder =
        t("addCatPlaceholder");


    $("addCatConfirm").textContent =
        t("addCatConfirm");


    $("postTime").textContent =
        t("now");


    $("orderTitle").textContent =
        t("orderTitle");


    $("orderDesc").textContent =
        t("orderDesc");


    $("clientName").placeholder =
        t("name");


    $("clientPhone").placeholder =
        t("phone");


    $("clientLocation").placeholder =
        t("location");


    $("orderBtn").textContent =
        t("orderBtn");


    $("deliveryNote").textContent =
        t("delivery");

}


/* =========================
   MENU
========================= */

$("menuToggle")
    .addEventListener(
        "click",
        () => {

            const menu =
                $("dropdownMenu");

            const open =
                !menu.classList.contains(
                    "show"
                );


            menu.classList.toggle(
                "show",
                open
            );


            $("arrowIcon")
                .classList.toggle(
                    "rotate",
                    open
                );

        }
    );


$("closeMenu")
    .addEventListener(
        "click",
        () => {

            hideModal(
                "dropdownMenu"
            );

            $("arrowIcon")
                .classList.remove(
                    "rotate"
                );

        }
    );


$("settingsIcon")
    .addEventListener(
        "click",
        () => {

            showModal(
                "settingsModal"
            );

        }
    );


$("closeSettings")
    .addEventListener(
        "click",
        () => {

            hideModal(
                "settingsModal"
            );

        }
    );


$("exitAdminBtn")
    .addEventListener(
        "click",
        exitAdminMode
    );


/* =========================
   CLOSE MODAL
========================= */

[
    "settingsModal",
    "adminModal",
    "addCatModal"
].forEach(id => {

    $(id).addEventListener(
        "click",
        event => {

            if (
                event.target.id === id
            ) {

                hideModal(id);

            }

        }
    );

});


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            hideModal(
                "settingsModal"
            );

            hideModal(
                "adminModal"
            );

            hideModal(
                "addCatModal"
            );

        }

    }
);


/* =========================
   REACTIONS
========================= */

let likes =
    Number(
        localStorage.getItem(
            "varzid_likes"
        ) || 0
    );

let liked =
    localStorage.getItem(
        "varzid_liked"
    ) === "1";


let loves =
    Number(
        localStorage.getItem(
            "varzid_loves"
        ) || 0
    );

let loved =
    localStorage.getItem(
        "varzid_loved"
    ) === "1";


function updateReactions() {

    $("likeCount").textContent =
        likes;

    $("loveCount").textContent =
        loves;


    $("likeBtn")
        .classList
        .toggle(
            "active",
            liked
        );


    $("loveBtn")
        .classList
        .toggle(
            "active",
            loved
        );

}


$("likeBtn")
    .addEventListener(
        "click",
        () => {

            liked =
                !liked;

            likes =
                Math.max(
                    0,
                    likes +
                    (liked ? 1 : -1)
                );


            localStorage.setItem(
                "varzid_likes",
                likes
            );

            localStorage.setItem(
                "varzid_liked",
                liked ? "1" : "0"
            );


            updateReactions();

        }
    );


$("loveBtn")
    .addEventListener(
        "click",
        () => {

            loved =
                !loved;

            loves =
                Math.max(
                    0,
                    loves +
                    (loved ? 1 : -1)
                );


            localStorage.setItem(
                "varzid_loves",
                loves
            );

            localStorage.setItem(
                "varzid_loved",
                loved ? "1" : "0"
            );


            updateReactions();

        }
    );


/* =========================
   WHATSAPP
========================= */

$("orderForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                $("clientName")
                .value
                .trim();


            const phone =
                $("clientPhone")
                .value
                .trim();


            const location =
                $("clientLocation")
                .value
                .trim();


            if (
                !name ||
                !phone ||
                !location
            ) {

                return;

            }


            const category =
                getCategoryLabel(
                    currentCat
                );


            const message =
                `Салом! Ман фармоиш додан мехоҳам.\n` +
                `👤 Ном: ${name}\n` +
                `📞 Телефон: ${phone}\n` +
                `📍 Ҷойи расонидан: ${location}\n` +
                `📦 Категория: ${category}`;


            const whatsappURL =
                "https://wa.me/992000001606?text=" +
                encodeURIComponent(
                    message
                );


            window.open(
                whatsappURL,
                "_blank"
            );


            showToast(
                t("orderReady")
            );

        }
    );


/* =========================
   START
========================= */

window.addEventListener(
    "DOMContentLoaded",
    () => {

        const savedTheme =
            localStorage.getItem(
                "varzid_theme"
            ) || "light";


        setTheme(
            savedTheme
        );


        applyLanguage();

        renderCategories();

        selectCategory(
            currentCat
        );

        updateReactions();

    }
);
