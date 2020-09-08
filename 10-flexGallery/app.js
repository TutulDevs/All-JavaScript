const panels = document.querySelectorAll('.panel');

//console.log(panels);

function togglePanel(e) {
    this.classList.toggle('open');
}

function toggleFlex(e) {
    //console.log(e);
    if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active');
    }
}

panels.forEach((el) => el.addEventListener('click', togglePanel));
panels.forEach((el) => el.addEventListener('transitionend', toggleFlex));
