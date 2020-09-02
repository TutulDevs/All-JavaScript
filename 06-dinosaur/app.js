const character = document.getElementById('character');
const block = document.getElementById('block');

function jump() {
    if (character.classList != 'animate') {
        character.classList.add('animate');
    }

    setTimeout(function () {
        character.classList.remove('animate');
    }, 500);
}

const checkDead = setInterval(function () {
    const charTop = parseInt(
        window.getComputedStyle(character).getPropertyValue('top')
    );
    const blockLeft = parseInt(
        window.getComputedStyle(block).getPropertyValue('left')
    );

    if (blockLeft < 20 && blockLeft > 0 && charTop >= 13) {
        alert('lose');

        block.style.animation = 'none';
        block.style.display = 'none';
    }
}, 10);
