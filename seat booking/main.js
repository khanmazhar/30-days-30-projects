const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const resetButton = document.getElementById('button');

populateUI();

let ticketPrice = +movieSelect.value;

//Set Movie Data
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatCount = selectedSeats.length;

    count.innerText = selectedSeatCount;
    total.innerText = selectedSeatCount * ticketPrice;
}

//Get data from local storage and populate input
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    console.log(selectedSeats);

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

//Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

//seat select event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");

        updateSelectedCount();
    }
})

updateSelectedCount();

resetButton.addEventListener('click', (e) => {
    count.innerText = 0;
    total.innerText = 0;
    movieSelect.value = '10';
    localStorage.removeItem('selectedMovieIndex');
    localStorage.removeItem('selectedMoviePrice');
    localStorage.removeItem('selectedSeats');
    seats.forEach((e) => e.classList.remove('selected'));
})