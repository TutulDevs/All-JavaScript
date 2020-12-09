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



////////////////////////        Reveal
// All sections
const contents = document.querySelectorAll('.content');

// The Callback
const revealSection = (entries, observer) => {
    const [entry] = entries;

    // IF the entry is not intersecting, return nothing
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('hidden');

    // IF it's done once, stop observing & slow my app
    observer.unobserve(entry.target);
};

// The Observer
const observeContent = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.25
});

// Setting Observe
contents.forEach(content => {
    observeContent.observe(content);
    content.classList.add('hidden');
});


///////////////////////     Lazy Load Image
// All the lazy images
const imgs = document.querySelectorAll('img[data-src]');


// The Callback
const lazyToActive = (entries, observer) => {
    const [entry] = entries;

    // IF the image is not being intersecting, return nothing
    if (!entry.isIntersecting) return;

    // change src
    entry.target.src = entry.target.dataset.src;

    // remove the blur on load
    entry.target.addEventListener('load',
        ()=> entry.target.classList.remove('lazy'));
};

// New API
const lazyImg = new IntersectionObserver(lazyToActive, {
    root: null,
    threshold: 0.15
});


// Observing
imgs.forEach(img => lazyImg.observe(img));