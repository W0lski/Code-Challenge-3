// Define the URL for fetching film data
const filmAPI = 'http://localhost:3000/films';

// Initialize variables to store current film details and film list
let currentFilm = {};
let filmList = [];

// Fetch the details of a specific film with ID 5 and display its details
fetch(`${filmAPI}/5`)
  .then(response => response.json())
  .then(showFilmDetails);

// Fetch all films and render the side navigation with film titles
fetch(filmAPI)
  .then(response => response.json())
  .then(renderSideNav);

// Add event listener to the 'Buy Ticket' button
el('buy-ticket').addEventListener('click', handleBuyTicket);

// Function to handle buying a ticket for the current film
function handleBuyTicket() {
  const currentTickets = parseInt(el('ticket-num').textContent);
  
  // If tickets are available, decrement ticket count and update UI
  if (currentFilm.capacity > currentFilm.tickets_sold) {
    currentFilm.tickets_sold += 1;
    el('ticket-num').textContent = currentTickets - 1;
  } 
  
  // If tickets are sold out, update button text
  if (currentFilm.capacity === currentFilm.tickets_sold) {
    el('buy-ticket').textContent = "SOLD OUT";
  }
}

// Function to display film details on the page
function showFilmDetails(film) {
  currentFilm = film;
  el('poster').src = currentFilm.poster;
  el('title').textContent = currentFilm.title;
  el('runtime').textContent = `${currentFilm.runtime} minutes`;
  el('film-info').textContent = currentFilm.description;
  el('showtime').textContent = currentFilm.showtime;
  el('ticket-num').textContent = remainingTickets(currentFilm);
}

// Function to calculate remaining tickets for a film
function remainingTickets(film) {
  return film.capacity - film.tickets_sold;
}

// Function to render the side navigation with film titles
function renderSideNav(films) {
  el('films').innerHTML = '';
  films.forEach(addTitleToNav);
}

// Function to add a film title to the side navigation
function addTitleToNav(film) {
  const item = document.createElement('li');
  item.textContent = film.title;
  item.classList.add('currentFilm', 'item');
  el('films').appendChild(item);

  // Add event listener to fetch film details when a film title is clicked
  item.addEventListener('click', () => fetchFilmInfo(film.id));
}

// Function to fetch film details by ID and display them
function fetchFilmInfo(id) {
  fetch(`${filmAPI}/${id}`)
    .then(res => res.json())
    .then(newFilm => {
      // Reset the "SOLD OUT" button
      el('buy-ticket').textContent = "BUY TICKET";
      // Display details of the new film
      showFilmDetails(newFilm);
    });
}

// Helper function to get DOM elements by ID
function el(id) {
  return document.getElementById(id);
}

