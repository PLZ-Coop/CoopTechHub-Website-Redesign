import { initShell } from '../app.js';
import { offerListHtml } from '../render/digitalization.js';

function renderOfferItems() {
  const list = document.getElementById('digital-offer-list');
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

await initShell({ topbarClass: 'energy-topbar' });
renderOfferItems();
