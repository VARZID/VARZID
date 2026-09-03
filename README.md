<!DOCTYPE html>
<html lang="tg">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ВАРЗИД - Фархор</title>
    <style>
        :root {
            --bg-color: #f4f4f4;
            --text-color: #333;
            --card-bg: #fff;
            --header-bg: #1e3d2f;
            --accent: #27ae60;
            --danger: #e74c3c;
        }
        [data-theme="dark"] {
            --bg-color: #121212;
            --text-color: #e0e0e0;
            --card-bg: #1e1e1e;
            --header-bg: #14261e;
            --accent: #2ecc71;
            --danger: #ff6b6b;
        }
        body {
            font-family: Arial, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            margin: 0;
            padding: 0;
            transition: 0.3s;
        }
        header {
            background-color: var(--header-bg);
            color: white;
            padding: 20px;
            text-align: center;
            border-bottom: 4px solid var(--accent);
        }
        header h1 {
            color: #2ecc71;
            margin: 0;
            font-size: 28px;
            letter-spacing: 1px;
        }
        .controls {
            display: flex;
            justify-content: space-around;
            padding: 10px;
            background: var(--card-bg);
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .container {
            padding: 15px;
            max-width: 600px;
            margin: auto;
        }
        .card {
            background: var(--card-bg);
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        button, select {
            padding: 8px 12px;
            border-radius: 5px;
            border: none;
            cursor: pointer;
            background-color: var(--accent);
            color: white;
            font-weight: bold;
        }
        select {
            background-color: var(--card-bg);
            color: var(--text-color);
            border: 1px solid var(--accent);
        }
        .item-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px solid #ddd;
        }
        .cart-box {
            margin-top: 20px;
            padding: 15px;
            background: var(--card-bg);
            border-radius: 8px;
            border: 2px dashed var(--accent);
        }
        .delivery-alert {
            background-color: var(--danger);
            color: white;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 15px;
            text-align: center;
            font-weight: bold;
            font-size: 13px;
            line-height: 1.4;
        }
        .map-box {
            text-align: center;
            margin-top: 20px;
        }
        .map-box iframe {
            width: 100%;
            height: 200px;
            border: 0;
            border-radius: 8px;
            margin-top: 10px;
        }
    </style>
</head>
<body>

<header>
    <h1 id="title">ВАРЗИД</h1>
    <p id="subtitle" style="margin: 5px 0 0 0; font-weight: bold;">Маҳсулоти кишоварзӣ ва хӯроки чорво дар Фархор</p>
</header>

<div class="controls">
    <select id="langSelect" onchange="changeLanguage()">
        <option value="tg">Тоҷикӣ</option>
        <option value="ru">Русский</option>
        <option value="uz">O'zbekcha</option>
    </select>
    <button onclick="toggleTheme()" style="background: #27ae60;">🌓 Тема</button>
</div>

<div class="container">
    <div class="card">
        <h3 id="goodsTitle" style="color: var(--accent);">Феҳристи молҳо:</h3>
        <div id="goodsList"></div>
    </div>

    <div class="cart-box">
        <div class="delivery-alert" id="alertText">
            ⚠️ Доставка дар шаҳраки Фархор. Ба деҳаҳо ва ноҳияҳои дигар танҳо бо шарте ки харидор пули доставкаро медиҳад!
        </div>
        <h3 id="cartTitle" style="color: var(--accent);">🛒 Сабади харид</h3>
        <ul id="cartItems" style="padding-left: 20px;">
            <li id="emptyCartText">Сабад холӣ аст</li>
        </ul>
        <h4 id="totalText">Ҳамагӣ: 0 сомонӣ</h4>
    </div>

    <div class="card map-box">
        <h3 id="mapTitle" style="color: var(--accent);">Ҷойгиршавии мо (Фархор)</h3>
        <p id="mapDesc">Анбор ва нуқтаи савдои ВАРЗИД</p>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25211.75!2d69.39!3d37.64!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bca8!2z0JfabjKg0L7QtNC40YDQsA!5e0!3m2!1stg!2stj!4v1234567890" allowfullscreen="" loading="lazy"></iframe>
        <br><br>
        <a href="https://maps.google.com/?q=Фархор" target="_blank" id="mapLink" style="color: var(--accent); font-weight: bold;">Кушодани харитаи калон дар Google Maps</a>
    </div>
</div>

<script>
    const translations = {
        tg: {
            subtitle: "Маҳсулоти кишоварзӣ ва хӯроки чорво дар Фархор",
            goodsTitle: "Феҳристи молҳо:",
            cartTitle: "🛒 Сабади харид",
            emptyCart: "Сабад холӣ аст",
            total: "Ҳамагӣ: ",
            addBtn: "Илова ба сабад",
            alertMsg: "⚠️ Доставка дар шаҳраки Фархор. Ба деҳаҳо ва ноҳияҳои дигар танҳо бо шарте ки харидор пули доставкаро медиҳад!",
            mapTitle: "Ҷойгиршавии мо (Фархор)",
            mapDesc: "Анбор ва нуқтаи савдои ВАРЗИД",
            mapLink: "Кушодани харитаи калон дар Google Maps",
            items: [
                {name: "Орд", price: 250},
                {name: "Гандум", price: 350},
                {name: "Ҷав", price: 300},
                {name: "Ҷуворимакка", price: 320},
                {name: "Корм (Хӯроки чорво)", price: 280},
                {name: "Каду", price: 150},
                {name: "Силитра", price: 400},
                {name: "Карбамид", price: 420},
                {name: "Сабзавот (чанд намуд)", price: 100},
                {name: "Тухмӣ (чанд намуд)", price: 500},
                {name: "Паранда", price: 60}
            ]
        },
        ru: {
            subtitle: "Сельхозпродукция и корма в Фархоре",
            goodsTitle: "Список товаров:",
            cartTitle: "🛒 Корзина покупок",
            emptyCart: "Корзина пуста",
            total: "Итого: ",
            addBtn: "В корзину",
            alertMsg: "⚠️ Доставка по пос. Фархор. В кишлаки и другие районы доставка только при условии оплаты доставки покупателем!",
            mapTitle: "Наше местоположение (Фархор)",
            mapDesc: "Склад и торговая точка ВАРЗИД",
            mapLink: "Открыть большую карту в Google Maps",
            items: [
                {name: "Мука", price: 250},
                {name: "Пшеница", price: 350},
                {name: "Ячмень", price: 300},
                {name: "Кукуруза", price: 320},
                {name: "Корм для животных", price: 280},
                {name: "Тыква", price: 150},
                {name: "Селитра", price: 400},
                {name: "Карбамид", price: 420},
                {name: "Овощи (несколько видов)", price: 100},
                {name: "Семена (несколько видов)", price: 500},
                {name: "Птица", price: 60}
            ]
        },
        uz: {
            subtitle: "Qishloq xo'jaligi mahsulotlari va ozuqa Farkhor",
            goodsTitle: "Mahsulotlar ro'yxati:",
            cartTitle: "🛒 Savatcha",
            emptyCart: "Savatcha bo'sh",
            total: "Jami: ",
            addBtn: "Savatga qo'shish",
            alertMsg: "⚠️ Farkhor shaharchasida dostavka. Qishloq va boshqa tumanlarga faqat xaridor dostavka pulini o'zi to'lasagina yetkaziladi!",
            mapTitle: "Joylashuvimiz (Farkhor)",
            mapDesc: "VARZID ombori va savdo nuqtasi",
            mapLink: "Google Maps'da katta xaritani ochish",
            items: [
                {name: "Un", price: 250},
                {name: "Bug'doy", price: 350},
                {name: "Arpa", price: 300},
                {name: "Makkajo'xori", price: 320},
                {name: "Ozuqa (chorva uchun)", price: 280},
                {name: "Qovoq", price: 150},
                {name: "Selitra", price: 400},
                {name: "Karbamid", price: 420},
                {name: "Sabzavotlar (bir nechta tur)", price: 100},
                {name: "Urug'lar (bir nechta tur)", price: 500},
                {name: "Parranda", price: 60}
            ]
        }
    };

    let cart = [];

    function changeLanguage() {
        const lang = document.getElementById('langSelect').value;
        const t = translations[lang];
        
        document.getElementById('subtitle').innerText = t.subtitle;
        document.getElementById('goodsTitle').innerText = t.goodsTitle;
        document.getElementById('cartTitle').innerText = t.cartTitle;
        document.getElementById('alertText').innerText = t.alertMsg;
        document.getElementById('mapTitle').innerText = t.mapTitle;
        document.getElementById('mapDesc').innerText = t.mapDesc;
        document.getElementById('mapLink').innerText = t.mapLink;

        const listContainer = document.getElementById('goodsList');
        listContainer.innerHTML = "";
        
        t.items.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'item-row';
            row.innerHTML = `
                <span><b>${item.name}</b> (${item.price} сомонӣ)</span>
                <button onclick="addToCart(${index})">${t.addBtn}</button>
            `;
            listContainer.appendChild(row);
        });
        updateCartDisplay();
    }

    function addToCart(index) {
        const lang = document.getElementById('langSelect').value;
        const item = translations[lang].items[index];
        cart.push(item);
        updateCartDisplay();
    }

    function updateCartDisplay() {
        const lang = document.getElementById('langSelect').value;
        const t = translations[lang];
        const cartList = document.getElementById('cartItems');
        cartList.innerHTML = "";

        if (cart.length === 0) {
            cartList.innerHTML = `<li>${t.emptyCart}</li>`;
            document.getElementById('totalText').innerText = t.total + "0 сомонӣ";
            return;
        }

        let total = 0;
        cart.forEach((cartItem, i) => {
            total += cartItem.price;
            const li = document.createElement('li');
            li.innerText = `${i + 1}. ${cartItem.name} — ${cartItem.price} сомонӣ`;
            cartList.appendChild(li);
        });

        document.getElementById('totalText').innerText = t.total + total + " сомонӣ";
    }

    function toggleTheme() {
        const body = document.body;
        if (body.getAttribute('data-theme') === 'dark') {
            body.setAttribute('data-theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
        }
    }

    changeLanguage();
</script>

</body>
</html>
