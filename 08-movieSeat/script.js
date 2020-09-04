let qs = (el) => document.querySelector(el);

// Get the DOM
const container = qs('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = qs('#count');
const total = qs('#total');
const movieSelect = qs('#movie');

// Populate the UI
populateUI();

let ticketPrice = +movieSelect.value;
// + converts to Number // later mutation  // should be after populate()

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update the price & seat
const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // get the indexes of the seats -> selected
    // copy selected seats into a new array
    // map through the array
    // return a new array of indexes
    const seatsIndex = [...selectedSeats].map((seat) =>
        [...seats].indexOf(seat)
    );
    //console.log(seatsIndex);

    // localStorage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    // Change Values
    const selectedSeatsCount = selectedSeats.length;
    count.textContent = selectedSeatsCount;
    total.textContent = selectedSeatsCount * ticketPrice;

    setMovieData(movieSelect.selectedIndex, movieSelect.value);
};

// get data from local and populate ui;
function populateUI() {
    // getting the selected seats from the local
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Event Listener for Select options of movie
movieSelect.addEventListener('change', (e) => {
    // update ticket price based on selected seats
    ticketPrice = +e.target.value;

    // keep the options in localStorage
    setMovieData(e.target.selectedIndex, e.target.value);

    // update
    updateSelectedCount();
});

// Event Listener for Seat Selection
container.addEventListener('click', (e) => {
    // check if the target has seat class
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');

        // update the seat & price count
        updateSelectedCount();
    }
});

// initiate on page load
updateSelectedCount();
