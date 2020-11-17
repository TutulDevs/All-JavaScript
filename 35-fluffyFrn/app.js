const btns = document.querySelectorAll('.btn');
const cards = document.querySelectorAll('.card');

function filter () {

    // get the btn Text in case insensetive way
    // this = button that got clicked
    let btnName = this.innerText.toLowerCase();

    cards.forEach(card => {

        // get the dataset, lowercase if needed
        const tag = card.dataset.tag;

        // store the tag & the all for all the el
        const names = [tag, 'all'];

        // IF btn name = names , show || hide
        names.includes(btnName) ?
        card.style.display = 'grid':
        card.style.display = 'none';

    }); // end of cards
}

// Event
btns.forEach(btn => btn.addEventListener('click', filter));