let qs = selector => document.querySelector(selector);
const keys = Array.from(document.querySelectorAll('.key'));

const playSound = e => {
    const audio = qs(`audio[data-key="${e.keyCode}"]`);

    if (!audio) return; // IF !audio return nothing // not working tho

    audio.play();
    audio.currentTime = 0;

    const key = qs(`.key[data-key="${e.keyCode}"]`);
    key.classList.add('playing');
};

// This is more accurate
keys.forEach(el => el.addEventListener('click', () => {
    const kc = el.dataset.key;

    const audio = qs(`audio[data-key="${kc}"]`);
    audio.play();
    audio.currentTime = 0;

    const key = qs(`.key[data-key="${kc}"]`);
    key.classList.add('playing');
}));

let removeTransition = e => {
    if(e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

window.addEventListener('keydown', playSound);
keys.forEach(el => el.addEventListener('transitionend', removeTransition)); 

///////////////     Volume Controller

qs('.vol-range').addEventListener('input', (e) => {

    let value = Number(e.target.value);
    const audio = Array.from(document.querySelectorAll('audio'));

    audio.forEach(el => {        
        if (value == 1) {
            el.volume = 0.1;
        }else if (value == 2) {
            el.volume = 0.2;
        }else if (value == 3) {
            el.volume = 0.3;
        }else if (value == 4) {
            el.volume = 0.4;
        }else if (value == 5) {
            el.volume = 0.5;
        }else if (value == 6) {
            el.volume = 0.6;
        }else if (value == 7) {
            el.volume = 0.7;
        }else if (value == 8) {
            el.volume = 0.8;
        }else if (value == 9) {
            el.volume = 0.9;
        }else if (value == 10) {
            el.volume = 1.0;
        };
    }); 

});



/* 
// Less accurate click event
const clickToPlay = (e) => {
    const kc = e.path[1].dataset.key;
    console.log(e.path[1]);

    const audio = qs(`audio[data-key="${kc}"]`);
    audio.play();
    audio.currentTime = 0;

    const key = qs(`.key[data-key="${kc}"]`);
    key.classList.add('playing');
}
keys.forEach(el => el.addEventListener('click', clickToPlay));
*/
