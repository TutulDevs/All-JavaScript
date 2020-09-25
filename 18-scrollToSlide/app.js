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

const sliderImages = document.querySelectorAll('.slide-in');

// for each image, when it's peeking 50% then we reveal that image
function checkSlide(e) {
    sliderImages.forEach((sliderImage) => {
        // lotsa math to figure out when it's peeking

        // ((scY + inHe) - img.hei) / 2 // halfway of the image
        const slideInAt =
            window.scrollY + window.innerHeight - sliderImage.height / 2;

        // bottom of the image
        const imageBottom = sliderImage.offsetTop + sliderImage.height;

        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;
        // log these vars & scroll the page to understand

        if (isHalfShown && isNotScrolledPast) {
            sliderImage.classList.add('active');
        } else {
            sliderImage.classList.remove('active');
        }
    });
}

// running checkSlide fn many times is bad for performance
// so debounce will run the checkSlide once every 20ms
window.addEventListener('scroll', debounce(checkSlide));
