const $ = x => document.querySelector(x);
const section1 = $('#section1');
const nav = $('.nav');
const goTop = $('#top');

// Height of the nav
const navHeight = nav.getBoundingClientRect().bottom + 'px';

// Callback
const stickyNav = function(entries) {

    // if isIntersecting isn't true, show sticky or hide
    // entries[0] meaning the first value from the threshold
    if (!entries[0].isIntersecting) {
        nav.classList.add('sticky');
        goTop.style.transform = 'scale(1)';
    } else {
        nav.classList.remove('sticky');
        goTop.style.transform = 'scale(0)';
    }
};

// a callback & some options
const observeSection1 = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}` //based on getBounding Client
});


// observe the element
observeSection1.observe(section1);