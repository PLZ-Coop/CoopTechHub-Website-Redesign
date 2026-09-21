import { initShell } from '../app.js';
import { PAGE_SIZE, filtersHtml, gridHtml, getFilteredPublications } from '../render/publications.js';

let activeFilter = 'wszystkie';
let visibleCount = PAGE_SIZE;
let observer = null;

function renderFilters() {
  const container = document.getElementById('publications-page-filters');
  container.innerHTML = filtersHtml(activeFilter);

  container.querySelectorAll('.publications-page-filter').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.getAttribute('data-filter');

      if (key === activeFilter) {
        return;
      }

      activeFilter = key;
      visibleCount = PAGE_SIZE;
      renderFilters();
      renderGrid();
    });
  });
}

function renderGrid() {
  const filtered = getFilteredPublications(activeFilter);
  const hasMore = visibleCount < filtered.length;

  const grid = document.getElementById('publications-page-grid');
  grid.innerHTML = gridHtml(activeFilter, visibleCount);

  const sentinel = document.getElementById('publications-page-load-more');

  if (observer) {
    observer.disconnect();
    observer = null;
  }

  if (!hasMore) {
    sentinel.hidden = true;
    return;
  }

  sentinel.hidden = false;

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        visibleCount += PAGE_SIZE;
        renderGrid();
      }
    },
    { rootMargin: '400px' },
  );

  observer.observe(sentinel);
}

await initShell({ topbarClass: 'energy-topbar' });
renderFilters();
renderGrid();
