let audio = new Audio('click.mp3');
audio.play();
const mountain = document.getElementById('mountain');
const scoreDisplay = document.getElementById('score');
const promoInput = document.getElementById('promoInput');
const promoBtn = document.getElementById('promoBtn');
const autoBtn = document.getElementById('buyAutoClick');
const autoDisplay = document.getElementById('autoSpeed');
const drillBtn = document.getElementById('buySuperDrill');

let count = Number(localStorage.getItem('energy')) || 0;
let autoPower = Number(localStorage.getItem('autoPower')) || 0;

scoreDisplay.innerText = count;
autoDisplay.innerText = autoPower;

function checkGold() {
    if (count >= 50) {
        mountain.style.filter = "sepia(1) saturate(10) hue-rotate(10deg)";
    }
}
setInterval(() => {
    if (autoPower > 0) {
        count += autoPower;
        scoreDisplay.innerText = count;
        localStorage.setItem('energy', count);
        checkGold();
    }
}, 1000);

checkGold();

mountain.onclick = () => {
    const randomHue = Math.floor(Math.random() * 360);
    mountain.style.filter = `sepia(1) saturate(10) hue-rotate(${randomHue}deg)`;
    count++;
    scoreDisplay.innerText = count;
    localStorage.setItem('energy', count);
    checkGold();
    mountain.style.transform = "scale(1.2)";
    setTimeout(() => mountain.style.transform = "scale(1)", 100);
};

promoBtn.onclick = () => {
    let alreadyUsed = localStorage.getItem('promoUsed');
    if (promoInput.value.toUpperCase() === "HACKER") {
        if (alreadyUsed === "true") {
            alert("Этот код можно использовать только один раз!");
        } else {
            count += 1000;
            scoreDisplay.innerText = count;
            localStorage.setItem('energy', count);
            localStorage.setItem('promoUsed', 'true');
            checkGold();
            alert("Код принят! +1000 энергии ⚡");
        }
        promoInput.value = "";
    } else {
        alert("Неверный код!");
    }
};

autoBtn.onclick = () => {
    if (count >= 500) {
        count -= 500;
        autoPower += 1;
        updateUI();
        alert("Кирка куплена!");
    } else {
        alert("Нужно 500 энергии!");
    }
};

drillBtn.onclick = () => {
    if (count >= 5000) {
        count -= 5000;
        autoPower += 50;
        updateUI();
        alert("СУПЕР-БУР запущен! 🚀");
    } else {
        alert("Нужно 5000 энергии!");
    }
};

function updateUI() {
    scoreDisplay.innerText = count;
    autoDisplay.innerText = autoPower;
    localStorage.setItem('energy', count);
    localStorage.setItem('autoPower', autoPower);
}