let panels = [
    "Карбамид (мочевина)",
    "Аммиачная селитра",
    "Пшеница",
    "Мука",
    "Ячмень",
    "Кукуруза",
    "Комбикорм"
];

let isSubscribed = false;
let subscribersCount = 1200000;

function renderPanels() {
    const list = document.getElementById('panelsList');
    list.innerHTML = '';
    panels.forEach(item => {
        list.innerHTML += `<div class="panel-row">${item}</div>`;
    });
}

function addPanel() {
    const input = document.getElementById('panelInput');
    const value = input.value.trim();
    if (value) {
        panels.push(value);
        input.value = '';
        renderPanels();
    }
}

function toggleSubscribe() {
    isSubscribed = !isSubscribed;
    subscribersCount += isSubscribed ? 1 : -1;
    
    const btn = document.getElementById('subscribeBtn');
    const countEl = document.getElementById('subCount');
    
    if (isSubscribed) {
        btn.innerText = '✔';
        btn.classList.add('subscribed');
    } else {
        btn.innerText = 'Подписаться';
        btn.classList.remove('subscribed');
    }
    
    countEl.innerText = (subscribersCount / 1000000).toFixed(1) + ' млн';
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

window.onload = () => {
    renderPanels();
};
