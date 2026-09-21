import { initShell, initPublicationsCarousel } from '../app.js';
import { newsGridHtml, logosSectionHtml, publicationsTrackHtml, publicationsHighlightsHtml } from '../render/home.js';

function renderNews() {
  document.getElementById('news-grid').innerHTML = newsGridHtml();
}

function renderLogos() {
  document.getElementById('logos-section').innerHTML = logosSectionHtml();
}

function renderPublications() {
  document.getElementById('publications-track').innerHTML = publicationsTrackHtml();
  document.getElementById('publications-highlights').innerHTML = publicationsHighlightsHtml();

  initPublicationsCarousel(document.getElementById('publications-carousel'));
}

await initShell();
renderNews();
renderLogos();
renderPublications();
