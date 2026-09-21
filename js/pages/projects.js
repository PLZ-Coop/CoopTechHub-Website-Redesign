import { initShell } from '../app.js';
import { filtersHtml, gridHtml } from '../render/projects.js';

let activeFilter = 'wszystkie';

function renderFilters() {
  const filtersEl = document.getElementById('projects-page-filters');

  filtersEl.innerHTML = filtersHtml(activeFilter);

  filtersEl.querySelectorAll('.projects-page-filter').forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      renderFilters();
      renderGrid();
    });
  });
}

function renderGrid() {
  document.getElementById('projects-page-grid').innerHTML = gridHtml(activeFilter);
}

await initShell({ topbarClass: 'energy-topbar' });
renderFilters();
renderGrid();
