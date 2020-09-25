//  not made by me or wes
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

const images = document.querySelectorAll('.slide-in');

// for each image, when it's peeking 50% then we reveal that image
function checkSlide() {
    images.forEach((img) => {
        // ((scY + inHe) - img.hei) / 2 // halfway of the image
        const slideInAt = window.scrollY + window.innerHeight - img.height / 2;
        const imgBottom = img.offsetTop + img.height;

        const halfShown = slideInAt > img.offsetTop;
        const notScrolledPast = window.scrollY < imgBottom;
        // log these vars & scroll the page to understand

        halfShown && notScrolledPast
            ? img.classList.add('active')
            : img.classList.remove('active');
    });
}

// running checkSlide fn many times is bad for performance
// so debounce will run the checkSlide once every 20ms
window.addEventListener('scroll', debounce(checkSlide));
