let isSubscribed = false;
let subscribersCount = 1200000;

let products = [
    { name: "Карбамид", views: "506 тыс.", image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=300" },
    { name: "Аммиачная селитра", views: "171 тыс.", image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=300" },
    { name: "Пшеница (Гандум)", views: "9.6 млн", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300" },
    { name: "Орд (Мука)", views: "32.1 млн", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300" },
    { name: "Ҷав (Ячмень)", views: "3.3 млн", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300" },
    { name: "Ҷуворимакка (Кукуруза)", views: "1.1 млн", image: "https://images.unsplash.com/photo-1551754655-cd97e64d2765?w=300" },
    { name: "Комбикорм", views: "6.9 млн", image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=300" }
];

function renderProducts(list) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    list.forEach(item => {
        grid.innerHTML += `
            <div class="product-card" onclick="selectProduct('${item.name}')">
                <img src="${item.image}" alt="${item.name}">
                <div class="product-info">${item.name} (${item.views})</div>
            </div>
        `;
    });
}

function toggleSubscribe() {
    const btn = document.getElementById('subscribe-btn');
    const countEl = document.getElementById('sub-count');
    
    if (!isSubscribed) {
        isSubscribed = true;
        subscribersCount++;
        btn.innerHTML = '✔';
        btn.classList.add('subscribed');
    } else {
        isSubscribed = false;
        subscribersCount--;
        btn.innerHTML = 'Подписаться';
        btn.classList.remove('subscribed');
    }
    countEl.innerText = (subscribersCount / 1000000).toFixed(1) + ' млн';
}

function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    renderProducts(filtered);
}

function addNewProduct() {
    const name = prompt("Номи маҳсулоти навро ворид кунед (масалан: Орди сафед):");
    if (name) {
        products.push({ name: name, views: "1 тыс.", image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=300" });
        renderProducts(products);
    }
}

function selectProduct(name) {
    document.getElementById('searchInput').value = name;
    filterProducts();
}

function openSettings() {
    document.getElementById('settingsModal').classList.remove('hidden');
}

function closeSettings() {
    document.getElementById('settingsModal').classList.add('hidden');
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
}

// Боргузории ибтидоӣ
window.onload = () => {
    renderProducts(products);
};
