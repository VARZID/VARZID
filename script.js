    categoryList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            e.stopPropagation();
            if (!isAdmin) return;
            let index = parseInt(e.target.getAttribute('data-index'));
            if (!isNaN(index) && index >= 0 && index < categories.length) {
                let catName = categories[index];
                // Огоҳӣ пеш аз нест кардан, то тасодуфан тоза нашавад
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
