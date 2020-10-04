const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
const reset = document.querySelector('.reset');

let mins = document.querySelector('.mins');
let secs = document.querySelector('.secs');

let startTimer;

start.addEventListener('click', () => {
    if (startTimer === undefined) {
        startTimer = setInterval(timer, 1000);
    } else alert('Timer is running already!');
});

function timer() {
    // timer start
    if (secs.innerText != 0) {
        secs.innerText--;
    } else if (mins.innerText != 0 && secs.innerText == 0) {
        secs.innerText = 59;
        mins.innerText--;
    }

    // when one cycle is complete
    if (mins.innerText == 0 && secs.innerText == 0) {
        mins.innerText = 25;
        secs.innerText = '00';
    }
}

//////////  Stop
stop.addEventListener('click', function () {
    stopInterval();
    startTimer = undefined;
});

//Stop Timer Function
function stopInterval() {
    clearInterval(startTimer);
}

/////////////  Reset
reset.addEventListener('click', function () {
    mins.innerText = 25;
    secs.innerText = '00';

    stopInterval();
    startTimer = undefined;
});
