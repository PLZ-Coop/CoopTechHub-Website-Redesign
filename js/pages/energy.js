import { initShell } from '../app.js';
import { processListHtml, publicationTrackHtml } from '../render/energy.js';

function renderProcessSteps() {
  const list = document.getElementById('energy-process-list');
  list.innerHTML = processListHtml();

  list.querySelectorAll('.subpage-offer-item').forEach((step) => {
    const trigger = step.querySelector('.subpage-offer-trigger');
    const indicator = step.querySelector('.subpage-offer-indicator');

    trigger.addEventListener('click', () => {
      const isOpen = step.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(isOpen));
      indicator.textContent = isOpen ? '−' : '+';
    });
  });
}

function renderPublication() {
  document.getElementById('energy-publication-track').innerHTML = publicationTrackHtml();
}

await initShell({ topbarClass: 'energy-topbar' });
renderProcessSteps();
renderPublication();
