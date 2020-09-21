const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');

// push each slide based on their index
slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
});

let counter = 0; // for pushing slides later

prevBtn.addEventListener('click', () => {
    counter--;
    carousel();
});
nextBtn.addEventListener('click', () => {
    counter++;
    carousel();
});

function carousel() {
    if (counter === slides.length) counter = 0;
    if (counter < 0) counter = slides.length - 1;

    //buttons();

    slides.forEach((slide) => {
        slide.style.transform = `translateX(-${counter * 100}%)`;
    });
}

//prevBtn.style.display = 'none';
function buttons() {
    // nextBtn
    // ternary isn't working
    if (counter < slides.length - 1) {
        nextBtn.style.display = 'block';
    } else nextBtn.style.display = 'none';

    // prevBtn
    if (counter > 0) {
        prevBtn.style.display = 'block';
    } else prevBtn.style.display = 'none';
}
