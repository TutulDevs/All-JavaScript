// Elements
const qs = (selector) => document.querySelector(selector);

const noteForm = qs('.noteForm');
const noteList = qs('.noteList');

const notes = JSON.parse(localStorage.getItem('notes')) || [];

// function
function addNotes(e) {
    e.preventDefault();

    const title = this.querySelector('.title').value;
    const note = this.querySelector('.note').value;

    const noteItem = {
        title,
        note,
    };

    notes.unshift(noteItem);

    populateUI(notes, noteList);
    localStorage.setItem('notes', JSON.stringify(notes));

    this.reset();
}

function populateUI(arr = [], list) {
    list.innerHTML = arr
        .map((el, i) => {
            return `
            <li data-index=${i} class="note">
                <div class="card-tools">
                    <span data-index=${i} title="Delete" class="close">❌</span>
                </div>
                <h2>
                    ${el.title}
                </h2>
                <p>
                    ${el.note}
                </p>
            </li>
        `;
        })
        .join(''); // w/o join, you'll see the , of the array
}

function deleteNote(e) {
    const [el, index] = [e.target, e.target.dataset.index];

    if (el.classList.contains('close')) {
        notes.splice(index, 1);

        populateUI(notes, noteList);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}

// event
noteForm.addEventListener('submit', addNotes);
noteList.addEventListener('click', deleteNote);

// on page load
populateUI(notes, noteList);

/////////////////////////////////////////////////////////

const openModal = qs('.openModal');
const modal = qs('.modal');

openModal.onclick = function () {
    modal.style.display = 'block';
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};
