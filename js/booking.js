/* Courtly Booking — booking dialog and "My bookings" */

import { formatDate, formatPrice } from './format.js';

const dialog = document.getElementById('booking-dialog');
const form = document.getElementById('booking-form');
const timeSelect = document.getElementById('booking-time');
const hoursSelect = document.getElementById('booking-hours');

const bookingsDialog = document.getElementById('bookings-dialog');
const bookingsList = document.getElementById('bookings-list');
const bookingsEmpty = document.getElementById('bookings-empty');
const bookingsCount = document.getElementById('bookings-count');

const bookings = [];
let current = null;

function field(name) {
  return dialog.querySelector(`[data-field="${name}"]`);
}

function updateTotal() {
  const hours = Number(hoursSelect.value);
  field('total').textContent = formatPrice(current.venue.pricePerHour * hours);
}

export function openBooking(venue, date) {
  current = { venue, date };
  form.reset();

  field('name').textContent = venue.name;
  field('place').textContent = `${venue.city} · ${venue.sport}`;
  field('date').textContent = formatDate(date);
  updateTotal();

  dialog.showModal();
}

function renderBookingCount() {
  bookingsCount.textContent = bookings.length;
}

function renderBookingsList() {
  bookingsList.innerHTML = bookings
    .map((booking) => `
      <li class="bookings-list__item">
        <strong>${booking.venue.name}</strong>
        <span>${formatDate(booking.date)}, ${booking.time} · ${booking.duration}</span>
        <span class="bookings-list__total">${formatPrice(booking.total)}</span>
      </li>`)
    .join('');
  bookingsEmpty.hidden = bookings.length > 0;
}

function confirmBooking(event) {
  event.preventDefault();
  const hours = Number(hoursSelect.value);

  bookings.push({
    venue: current.venue,
    date: current.date,
    time: timeSelect.value,
    duration: hoursSelect.selectedOptions[0].textContent,
    total: current.venue.pricePerHour * hours,
  });

  renderBookingsCount();
  renderBookingsList();
  dialog.close();
}

hoursSelect.addEventListener('change', updateTotal);
form.addEventListener('submit', confirmBooking);
dialog.querySelector('[data-action="cancel"]').addEventListener('click', () => dialog.close());

document.querySelector('.bookings-toggle').addEventListener('click', () => bookingsDialog.showModal());
bookingsDialog.querySelector('[data-action="close"]').addEventListener('click', () => bookingsDialog.close());
