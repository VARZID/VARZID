// Нигоҳ доштани хотираи обуна шудан дар браузер
window.onload = function() {
    if (localStorage.getItem('varzid_permanent_sub') === 'true') {
        setSubscribedUI();
    }
};

function toggleSubscribe() {
    if (localStorage.getItem('varzid_permanent_sub') !== 'true') {
        localStorage.setItem('varzid_permanent_sub', 'true');
        setSubscribedUI();
    }
}

function setSubscribedUI() {
    let btn = document.getElementById('subBtn');
    btn.innerText = 'Обуна шудаед ✓';
    btn.classList.add('subscribed');
    document.getElementById('subCountText').innerText = '1 обуначӣ';
}

function performSearch() {
    let query = document.getElementById('searchInput').value;
    if(query.trim() !== "") {
        alert('Ҷустуҷӯ аз рӯи маҳсулот: ' + query);
    } else {
        document.getElementById('searchInput').focus();
    }
}
