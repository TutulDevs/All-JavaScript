const endpoint =
    'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const form = document.querySelector('.search-form');
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
const defaultItems = suggestions.innerHTML;

const cities = [];

const numFormat = new Intl.NumberFormat('en-US');

fetch(endpoint)
    .then((response) => response.json())
    .then((data) => cities.push(...data));

///////////////////////////////
// helped from https://tfrommen.github.io/JavaScript30/06%20-%20Type%20Ahead/
function highlight(text, input) {
    return text.replace(
        new RegExp(input, 'gi'),
        (match) => `<span class="hl">${match}</span>`
    );
}

function itemizeCity({ city, state, population }, input) {
    return `<li>
                <span>${highlight(city, input)}, ${highlight(
        state,
        input
    )}</span>
                <span class="population">${numFormat.format(population)}</span>
            </li>`;
}

// Find the matching words
function matchesCity({ city, state }, input) {
    const regex = new RegExp(input, 'i');

    return regex.test(city) || regex.test(state);
}

function handleInput() {
    const input = this.value;

    if (input) {
        suggestions.innerHTML = cities
            .filter((city) => matchesCity(city, input))
            .map((city) => itemizeCity(city, input))
            .join('');

        return;
    }

    suggestions.innerHTML = defaultItems;
}

form.addEventListener('submit', (e) => e.preventDefault());
searchInput.addEventListener('input', handleInput);

/*

// WES' Solution

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function findMatches(wordToMatch, cities) {
    return cities.filter((place) => {
        // we figure if city or state matches with the searched
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}

function handleInput() {
    // get the data from findMatches
    const matchArray = findMatches(this.value, cities);

    const markup = matchArray
        .map((place) => {
            const regex = new RegExp(this.value, 'gi');
            const cityName = place.city.replace(
                regex,
                `<span class="hl">${this.value}</span>`
            );
            const stateName = place.state.replace(
                regex,
                `<span class="hl">${this.value}</span>`
            );

            return `
            <li>
                <span  class="name"> ${cityName}, ${stateName}</span>
                <span class="population">${numberWithCommas(
                    place.population
                )}</span>
            </li>
        `;
        })
        .join('');

    suggestions.innerHTML = markup;
}

*/
