const qs = (selector) => document.querySelector(selector);

// DOM
const secondHand = qs('.second-hand');
const minuteHand = qs('.min-hand');
const hourHand = qs('.hour-hand');
hourHand.style.background = 'red';

function setDate() {
    // TIME
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const seconds = now.getSeconds();

    // set degrees
    const secondsDegrees = (seconds / 60) * 360 + 90;
    // 1 second = 6 deg, 60 sec = 360 deg
    const minuteDegrees = (minute / 60) * 360 + 90;
    const hourDegrees = (hour / 12) * 360 + 90;

    console.log(hour);
    console.log(hourDegrees);

    // style change
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000);
