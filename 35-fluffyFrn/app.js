const btns = document.querySelectorAll('.btn');
const cards = document.querySelectorAll('.card');

/*
1. Store the clicked button's %data text in a variable.
2. Loop through the cards/ boxes/ images.
3. Store the image's %data text into  a variable.
4. If the button's %data text matches the image's %data text or the %data text 'all', show those images. Otherwise hide them.
*/

// Function ES6

function filter () {
    cards.forEach(card => {
        [card.dataset.tag, 'all'].includes(this.dataset.tag) ?
        card.style.display = 'grid':
        card.style.display = 'none';
    });
}


// Event    ES6
btns.forEach(btn => btn.addEventListener('click', filter));


/*
// FN ES5
function filter () {
    const btnTag = this.dataset.tag;

    for (let i = 0; i < cards.length; i++) {
        cards[i];
        const cardTag = cards[i].dataset.tag;

        if (btnTag == cardTag || btnTag == 'all') {
            cards[i].style.display = 'block';
        } else {
            cards[i].style.display = 'none';
        }
    }
}

// Event    ES5
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', filter);
}
*/