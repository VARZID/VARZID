document.addEventListener('DOMContentLoaded', () => {
    const brandToggle = document.getElementById('brandToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const subBtn = document.getElementById('subBtn');
    const subCountSpan = document.getElementById('subCount');
    const addCategoryBtn = document.getElementById('addCategoryBtn');
    const categoryList = document.getElementById('categoryList');

    let subscribers = parseInt(localStorage.getItem('subCount')) || 30000;
    let isSubscribed = localStorage.getItem('isSubscribed') === 'true';
    let categories = JSON.parse(localStorage.getItem('categories')) || ['Варзид Орд'];

    subCountSpan.textContent = subscribers;
    if (isSubscribed) {
        subBtn.textContent = 'Отписаться';
        subBtn.classList.add('subscribed');
    }

    function renderCategories() {
        categoryList.innerHTML = '';
        categories.forEach((cat, index) => {
            const li = document.createElement('li');
            li.className = 'category-item';
            li.innerHTML = `<span>${cat}</span> <button class="delete-btn" data-index="${index}">×</button>`;
            categoryList.appendChild(li);
        });
        localStorage.setItem('categories', JSON.stringify(categories));
    }

    renderCategories();

    brandToggle.addEventListener('click', () => {
        dropdownMenu.classList.toggle('open');
        brandToggle.classList.toggle('active');
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
        subCountSpan.textContent = subscribers;
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
            let index = e.target.getAttribute('data-index');
            let catName = categories[index];
            if (confirm(`Шумо воқеан мехоҳед категорияи «${catName}»-ро нест кунед?`)) {
                categories.splice(index, 1);
                renderCategories();
            }
        }
    });
});
