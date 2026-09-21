import { initShell } from '../app.js';
import { getFeaturedPublications, offerListHtml, publicationsTrackHtml } from '../render/local-development.js';

const featuredPublications = getFeaturedPublications();

let activePublication = 0;

function renderOfferList() {
  const list = document.getElementById('local-offer-list');
  list.innerHTML = offerListHtml();

  list.querySelectorAll('.subpage-offer-item').forEach((item) => {
    const trigger = item.querySelector('.subpage-offer-trigger');
    const indicator = item.querySelector('.subpage-offer-indicator');

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(isOpen));
      indicator.textContent = isOpen ? '−' : '+';
    });
  });
}

function renderPublicationsTrack() {
  document.getElementById('local-publications-track').innerHTML = publicationsTrackHtml(featuredPublications);
}

function updateCarousel() {
  const track = document.getElementById('local-publications-track');
  const prevButton = document.getElementById('local-carousel-prev');
  const nextButton = document.getElementById('local-carousel-next');

  track.style.transform = `translateX(-${activePublication * 100}%)`;
  prevButton.disabled = activePublication === 0;
  nextButton.disabled = activePublication === featuredPublications.length - 1;
}

function initCarousel() {
  if (!featuredPublications.length) {
    return;
  }

  renderPublicationsTrack();
  updateCarousel();

  const prevButton = document.getElementById('local-carousel-prev');
  const nextButton = document.getElementById('local-carousel-next');

  prevButton.addEventListener('click', () => {
    activePublication = Math.max(0, activePublication - 1);
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    activePublication = Math.min(featuredPublications.length - 1, activePublication + 1);
    updateCarousel();
  });

  window.setInterval(() => {
    if (activePublication === featuredPublications.length - 1) {
      return;
    }
    activePublication += 1;
    updateCarousel();
  }, 5000);
}

await initShell({ topbarClass: 'energy-topbar' });
renderOfferList();
initCarousel();
