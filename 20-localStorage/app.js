const form = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault();

    const text = this.querySelector('[name="item"]').value;

    const item = {
        text, // ES6 shorthand | text = text ,
        done: false,
    };

    items.push(item);

    populateUI(items, itemsList);

    localStorage.setItem('items', JSON.stringify(items));

    this.reset(); // reset the from
}

function populateUI(plates = [], platesList) {
    platesList.innerHTML = plates
        .map((plate, i) => {
            return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${
                plate.done ? 'checked' : ''
            }/>
                <label for="item${i}">${plate.text}</label>
                <span data-index=${i} title="Close" class="close"> 💩 </span>
            </li>
        `;
        })
        .join(''); // w/o join, you'll see the , of the array
}

function toggleDone(e) {
    const el = e.target;
    const index = el.dataset.index;

    // toggle the check of checkbox
    if (el.matches('input')) {
        items[index].done = !items[index].done; // flip to the opposite // true to false

        localStorage.setItem('items', JSON.stringify(items));
        populateUI(items, itemsList);
    }

    // remove item
    if (el.classList.contains('close')) {
        items.splice(index, 1);

        localStorage.setItem('items', JSON.stringify(items));
        populateUI(items, itemsList);
    }
}

form.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

// this will be invoked on page load. items will search for item in the array or return an empty array
populateUI(items, itemsList);

// Logics
/*
 1. we add item & put them in localStorage
 2. on page load, we check IF the array has something in the localStorage
    a. IF there, populateList
    b. or start a new array from the empty array []
*/
