// Helper Functions
const initials = str => str.split(' ').splice(0, 2).map(w=> w[0].toUpperCase()).join('');
const numSlice = n => `${String(n).slice(0, 5)}-${String(n).slice(5, 8)}-${String(n).slice(8, 11)}`;
const $ = x => document.querySelector(x);


// Elements
const contacts = $('.contacts');


// The Array of Users   parse(localStorage.getItem('users') ) ||
let users = JSON.parse(localStorage.getItem('users')) || [{
    name: 'John Doe',
    number: '01512121212',
    imgUrl: '#',
    email: 'johndoe@john.org',
    address: '',
},
    {
        name: 'Adit Son',
        number: '0151987212',
        imgUrl: 'https://placekitten.com/100/100',
        email: '',
        address: 'Lorem St. Ipsum',
    },
];


// The Functions

// a. add Contact
function addContact (e) {
    e.preventDefault();

    // values
    const name = this.querySelector('.fname').value;
    const number = this.querySelector('.num').value;
    const imgUrl = this.querySelector('.url').value;
    const email = this.querySelector('.email').value;
    const address = this.querySelector('.address').value;


    // Store the values in an Obj
    const obj = {
        name,
        number,
        imgUrl,
        email,
        address,
    };

    // Push the Obj in the Array
    users.push(obj);

    // Display UI & keep in localStorage
    displayUI(contacts, users);
    localStorage.setItem('users', JSON.stringify(users));

    // Reset & Hide the form
    this.reset();
    document.body.classList.toggle('toggleForm');
}

// b. delete Contact
function deleteContact(e) {
    const el = e.target;
    const id = e.target.dataset.id;

    if (el.classList.contains('delete')) {
        // splice the data from the Array
        users.splice(id, 1);

        // Update the Array on display & localStorage
        displayUI(contacts, users);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// c. UI
function displayUI(container, arr) {
    container.innerHTML = arr.sort((a, b) => a.name < b.name ? -1: 1).map((el, i) => {
        return `<div class="contact" data-id="${i}" >
        <div class="imgBox" style="background:${'#' + Math.random().toString(15).substr(-6)};">
        <div class="initial">${initials(el.name)}</div>
        <img onerror="this.style.display='none'" src="${el.imgUrl}" alt="${el.name}" />
        </div>
        <div class="info">
        <h3 class="name">${el.name}</h3>
        <p class="number">${numSlice(el.number)}</p>
        <div class="info-hidden">
        <p class="email">${el.email}</p>
        <p class="address">${el.address}</p>
        <button class="delete" data-id="${i}">Delete</button>
        </div>
        </div>
        </div><!-- // Contact -->
        `;

    })
    .join('');
}

// d. Search Filter
function filter(e) {
    // the query in case insensitive
    let query = e.target.value.toLowerCase();

    const contactAll = document.querySelectorAll('.contact');

    contactAll.forEach(contact => {
        let text = contact.lastElementChild.innerText.trim().toLowerCase();

        text.indexOf(query) != -1 ?
        contact.style.display = 'grid': contact.style.display = 'none';
    });
}



// Display On Load
displayUI(contacts, users);


// Events


// Toggle form
$('.toggle').addEventListener('click',
    ()=> document.body.classList.toggle('toggleForm'));


// Add Contact
$('.formBox').addEventListener('submit', addContact);

// Delete Contact
contacts.addEventListener('click', deleteContact);

// Search Filter
$('.search').addEventListener('keyup', filter);



// Sort the Array
//users.sort((a, b) => a.name < b.name ? -1: 1);