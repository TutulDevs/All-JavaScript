///*
const panels = Array.from(document.querySelectorAll('.panel'));

function togglePanel(e) {
    panels.forEach((el) => el.classList.remove('open'));

    if (!this.className.includes('open')) {
        this.classList.toggle('open');
    }
}

function toggleFlex(e) {
    if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active');
    }
}

panels.forEach((el) => {
    el.addEventListener('click', togglePanel);
    el.addEventListener('transitionend', toggleFlex);
});
//*/
