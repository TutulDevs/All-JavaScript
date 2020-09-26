const header = document.querySelector('header');

//vanilla

window.addEventListener('scroll', () => {
    const scrollPos = this.scrollY;

    if (header.offsetHeight >= scrollPos) {
        header.style.backgroundSize = `${100 + scrollPos}% ${100 + scrollPos}%`;
        console.log(window.scrollY, header.offsetHeight);
    }
});

// Kentaro's code with jQuery
/*
$(window).scroll(function () {
    var scrollPos = $(this).scrollTop();
    $('.hero-back').css({
        'background-size': 150 + scrollPos + '%',
    });
});
*/
