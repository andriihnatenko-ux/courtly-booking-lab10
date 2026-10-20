/* Courtly Booking — venues API (mock) */

const DATA_URL = 'data/venues.json';

// Mock of GET /api/venues. The production API answers slower for Kyiv,
// where the catalogue is largest, so the mock does the same.
const LATENCY = { 'Київ': 1200 };
const DEFAULT_LATENCY = 400;
const POPULAR_COUNT = 6;

let catalogue;

async function loadCatalogue() {
  if (!catalogue) {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`Не вдалося завантажити ${DATA_URL}: ${response.status}`);
    }
    catalogue = await response.json();
  }
  return catalogue;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Venues matching every given filter, best-rated first.
 * An empty `city` or `sport` means "any".
 */
export async function fetchVenues({ city = '', sport = '', popular = false } = {}) {
  const venues = await loadCatalogue();
  await wait(LATENCY[city] ?? DEFAULT_LATENCY);

  const result = venues
    .filter((venue) => !city || venue.city === city)
    .filter((venue) => !sport || venue.sport === sport)
    .sort((a, b) => b.rating - a.rating);

  return popular ? result.slice(0, POPULAR_COUNT) : result;
}
