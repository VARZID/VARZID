let panels = [
    "Карбамид (мочевина)",
    "Аммиачная селитра",
    "Пшеница",
    "Мука",
    "Ячмень",
    "Кукуруза",
    "Комбикорм"
];

let isSub = false;
let subs = 1200000;

function renderPanels() {
    const list = document.getElementById('panelList');
    list.innerHTML = '';
    panels.forEach(p => {
        list.innerHTML += `<div class="panel-item">${p}</div>`;
    });
}

function addPanel() {
    const input = document.getElementById('panelInput');
    const val = input.value.trim();
    if (val) {
        panels.push(val);
        input.value = '';
        renderPanels();
    }
}

function toggleSub() {
    isSub = !isSub;
    subs += isSub ? 1 : -1;
    
    const btn = document.getElementById('subscribe-btn');
    const countEl = document.getElementById('subCount');
    
    if (isSub) {
        btn.innerText = '✔';
        btn.classList.add('subscribed');
    } else {
        btn.innerText = 'Подписаться';
        btn.classList.remove('subscribed');
    }
    
    countEl.innerText = (subs / 1000000).toFixed(1) + ' млн';
}

window.onload = () => {
    renderPanels();
};
