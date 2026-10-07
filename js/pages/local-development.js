import { initShell } from '../app.js';
import { getFeaturedPublications } from '../render/local-development.js';

const featuredPublications = getFeaturedPublications();

let activePublication = 0;

function bindOfferList() {
  const list = document.getElementById('local-offer-list');

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
bindOfferList();
initCarousel();
