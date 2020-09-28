const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault();

    // text for the item
    const text = this.querySelector('[name="item"]').value;
    const item = {
        text, // ES6 shorthand | text = text ,
        done: false,
    };

    items.push(item); //push item to items array

    populateList(items, itemsList); // populate the UI

    localStorage.setItem('items', JSON.stringify(items));

    this.reset(); // form element's default method
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates
        .map((plate, i) => {
            return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${
                plate.done ? 'checked' : ''
            }/>
                <label for="item${i}">${plate.text}</label>
            </li>
        `;
        })
        .join(''); // w/o join, you'll see the , of the array
}

// example of Event Delegation
function toggleDone(e) {
    if (!e.target.matches('input')) return; // skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;

    items[index].done = !items[index].done; // flip to the opposite // true to false

    localStorage.setItem('items', JSON.stringify(items)); // put in lS

    populateList(items, itemsList); // populate List again
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);
