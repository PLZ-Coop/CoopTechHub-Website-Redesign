import { initShell } from '../app.js';

function bindProcessSteps() {
  const list = document.getElementById('energy-process-list');

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

await initShell({ topbarClass: 'energy-topbar' });
bindProcessSteps();
