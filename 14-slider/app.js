const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');

// push each slide on left based on index
slides.forEach((el, index) => (el.style.left = `${index * 100}%`));

// set a flag variable
let counter = 0;

prevBtn.addEventListener('click', () => {
    counter--;
    carousel();
});
nextBtn.addEventListener('click', () => {
    counter++;
    carousel();
});

function carousel() {
    // IF counter reaches the last slide, counter = 0
    if (counter === slides.length) counter = 0;

    // IF counter < 0, go to the last slide
    if (counter < 0) counter = slides.length - 1;

    // update transform property on each click based on counter value
    slides.forEach(
        (el) => (el.style.transform = `translateX(-${counter * 100}%)`)
    );

    // show / hide buttons
    buttonHide();
}

prevBtn.style.display = 'none';
function buttonHide() {
    // nextBtn
    // IF it isn't the last slide, show nextBtn, else hide
    if (counter < slides.length - 1) {
        nextBtn.style.display = 'block';
    } else nextBtn.style.display = 'none';

    // prevBtn
    // IF it's not the 1st slide, show prevBtn, else hide
    if (counter > 0) {
        prevBtn.style.display = 'block';
    } else prevBtn.style.display = 'none';
}
