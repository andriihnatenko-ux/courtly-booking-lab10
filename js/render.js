/* Courtly Booking — venue cards */

import { formatPrice } from './format.js';

function createCard(venue) {
  return `
    <article class="venue-card">
      <img class="venue-card__image" src="${venue.image}" alt="${venue.imageAlt}"
           width="800" height="600" loading="lazy">
      <div class="venue-card__body">
        <div class="venue-card__meta">
          <span class="chip">${venue.sport}</span>
          <span class="rating"><span aria-hidden="true">★</span> ${venue.rating.toFixed(1)}</span>
        </div>
        <h3 class="venue-card__title">${venue.name}</h3>
        <p class="venue-card__city">${venue.city}</p>
        <p class="venue-card__text">${venue.description}</p>
        <div class="venue-card__footer">
          <p class="price">від <strong>${formatPrice(venue.pricePerHour)}</strong>/год</p>
          <button class="button button--primary venue-card__book" type="button" data-id="${venue.id}">
            Забронювати<span class="visually-hidden"> ${venue.name}</span>
          </button>
        </div>
      </div>
    </article>`;
}

export function renderResults(container, venues) {
  container.innerHTML = venues.map(createCard).join('');
}
