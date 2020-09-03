// DOM
const hourHand = document.querySelector('[data-hour-hand]');
const minHand = document.querySelector('[data-minute-hand]');
const secHand = document.querySelector('[data-second-hand]');

// SET CLOCK
function setClock() {
    // Time
    const now = new Date();
    const secondRatio = now.getSeconds() / 60;
    const minRatio = (secondRatio + now.getMinutes()) / 60;
    const hourRatio = (minRatio + now.getHours()) / 12;

    // set the rotation
    setRotation(secHand, secondRatio);
    setRotation(minHand, minRatio);
    setRotation(hourHand, hourRatio);
}

// ROTATION
function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360);
}

setClock();
setInterval(setClock, 1000);
