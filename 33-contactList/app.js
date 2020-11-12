// The people
const people = [{
    name: 'John Doe',
    url: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
},
    {
        name: 'Jonas Schmedtmann',
        url: '#'
    },
    {
        name: 'Alex Xander',
        url: 'https://placekitten.com/100/100'
    },
    {
        name: 'Peter File Norton',
        url: '#'
    },
    {
        name: 'Callum',
        url: '#'
    },
    {
        name: 'Carla Sandison',
        url: 'https://placekitten.com/80/80'
    },
    {
        name: 'Mr. You',
        url: 'https://placekitten.com/90/90'
    },
];
// UI function
function populateUI(peopleList, arr = []) {
    peopleList.innerHTML = arr.map((people, i) => {
        return `
        <section data-index="${i}">
        <div class="img-box">
        <img src="${people.url}" alt="${people.name}" title="${people.name}"/>
        </div>
        <h2 class="name">${people.name}</h2>
        </section>
        `
    }).join('')
}

// Initials
function initials(name) {
    return name.split(' ').map(n => n[0]).splice(0, 2).join('');
}
//console.log(initials('John Doe Superstar'))    // JD


// Get the result in the UI
const list = document.querySelector('.list');
populateUI(list, people);


// select images w/o URL
const images = document.querySelectorAll('img[src="#"]');
images.forEach(img => img.parentElement.textContent = initials(img.alt));