const game = document.getElementById('game');
const rocket = document.getElementById('rocket');
const car = document.getElementById('car');
const showAlert = document.querySelector('h2');

function jump() {
    if (rocket.classList != 'animate') {
        rocket.classList.add('animate');
    }

    setTimeout(function () {
        rocket.classList.remove('animate');
    }, 750);

    const checkDead = setInterval(function () {
        const rocketBottom = rocket.computedStyleMap().get('bottom').value;
        const carRight = car.computedStyleMap().get('right').value;

        if (carRight > 85 && carRight < 90 && rocketBottom < 40) {
            showAlert.style.color = '#d84315';
            showAlert.textContent = '😐 Tap to play again...';
            car.style.animation = 'none';
        }
    }, 25);
}

// Initializer
game.addEventListener('click', () => {
    window.addEventListener('click', jump);

    window.addEventListener('keypress', (e) =>
        e.keyCode === 32 ? jump() : ''
    );

    showAlert.style.color = '#4CAF50';
    showAlert.textContent = 'Playing...';
    car.style.display = 'block';
    car.style.animation = 'car 4s linear infinite';
});

/*
1. get the dom
2. call the event
3. add the animation if it doesn't have already
4.remove the animation if it has the class after the animation time (750ms)

5. Check every 10 ms if the two element are on top of each other 
6. get bottom position of 🚀 and right position of 🚕

7. put the event in another listener to initiate them

*/
