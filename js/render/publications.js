import { publications, publicationTagLabels } from '../data/publications.js';

export const PAGE_SIZE = 6;

export const filterItems = [
  { key: 'wszystkie', label: 'Wszystkie' },
  { key: 'cyfryzacja', label: publicationTagLabels.cyfryzacja },
  { key: 'energetyka', label: publicationTagLabels.energetyka },
  { key: 'rozwoj-lokalny', label: publicationTagLabels['rozwoj-lokalny'] },
];

export function getFilteredPublications(activeFilter = 'wszystkie') {
  if (activeFilter === 'wszystkie') {
    return publications;
  }

  return publications.filter((publication) => publication.tag === activeFilter);
}

export function publicationCardHtml(publication) {
  return `
    <a class="publications-page-card is-${publication.tag}" href="/publikacje/${publication.id}.html">
      <div class="publications-page-card__body">
        <p class="publications-page-card__title">📄 ${publication.title}</p>
        <p class="publications-page-card__meta">
          ${publication.authors.join(', ')} · ${publication.date}
        </p>
        <p class="publications-page-card__description">${publication.description}</p>
        <p class="publications-page-card__tag">${publicationTagLabels[publication.tag]}</p>
      </div>
      <span class="publications-page-card__action" aria-hidden="true">→</span>
    </a>
  `;
}

export function filtersHtml(activeFilter = 'wszystkie') {
  return filterItems
    .map((item) => {
      const isActive = activeFilter === item.key;

      return `
        <button
          type="button"
          class="publications-page-filter is-${item.key} ${isActive ? 'is-active' : ''}"
          data-filter="${item.key}"
          role="tab"
          aria-selected="${isActive}"
        >
          ${item.label}
        </button>
      `;
    })
    .join('');
}

export function gridHtml(activeFilter = 'wszystkie', visibleCount = PAGE_SIZE) {
  const filtered = getFilteredPublications(activeFilter);
  return filtered.slice(0, visibleCount).map(publicationCardHtml).join('');
}
