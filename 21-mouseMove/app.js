const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');

const walk = 25; // how far the shadow goes

function shadow(e) {
    const { offsetWidth: width, offsetHeight: height } = hero;
    let { offsetX: x, offsetY: y } = e;

    // IF hero !== hero
    if (this !== e.target) {
        x = x + e.target.offsetLeft;
        y = y + e.target.offsetTop;
    }

    // walk is 100. so xWalk will be -50 || 50
    // (x / width * walk) - (walk / 2)
    const xWalk = Math.round((x / width) * walk - walk / 2);
    const yWalk = Math.round((y / height) * walk - walk / 2);

    //console.log(x, y, xWalk, yWalk);

    text.style.textShadow = `
        ${xWalk}px ${yWalk}px 0 hsl(${xWalk * 5}, 80%, 50%),
        ${xWalk + 5}px ${yWalk + 5}px 0 hsl(${yWalk * 10}, 80%, 70%)`;
}

hero.addEventListener('mousemove', shadow);
