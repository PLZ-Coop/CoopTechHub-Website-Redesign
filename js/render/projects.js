import { projectTagLabels, projects } from '../data/projects.js';
import { getArticle } from '../data/articles.js';

export const filterItems = [
  { key: 'wszystkie', label: 'Wszystkie' },
  { key: 'cyfryzacja', label: projectTagLabels.cyfryzacja },
  { key: 'energetyka', label: projectTagLabels.energetyka },
  { key: 'rozwoj-lokalny', label: projectTagLabels['rozwoj-lokalny'] },
];

export function filtersHtml(activeFilter = 'wszystkie') {
  return filterItems
    .map((item) => {
      const isActive = activeFilter === item.key;

      return `
        <button
          type="button"
          class="projects-page-filter is-${item.key} ${isActive ? 'is-active' : ''}"
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

export function projectCardHtml(project) {
  const localArticle = getArticle('projekt', project.id);
  const href = localArticle ? `/nasze-projekty/${project.id}.html` : project.url;

  return `
    <a
      class="projects-page-card is-${project.tag}"
      href="${href}"
      ${localArticle ? '' : 'target="_blank" rel="noopener noreferrer"'}
    >
      <div class="projects-page-card-image">
        <img src="${project.image}" alt="" aria-hidden="true" />
      </div>

      <div class="projects-page-card-body">
        <p class="projects-page-card-tag">${projectTagLabels[project.tag]}</p>
        <h3>${project.title}</h3>
        <p class="projects-page-card-description">${project.description}</p>
        <span class="projects-page-card-link">
          więcej <span aria-hidden="true">→</span>
        </span>
      </div>
    </a>
  `;
}

export function gridHtml(activeFilter = 'wszystkie') {
  const filteredProjects =
    activeFilter === 'wszystkie' ? projects : projects.filter((project) => project.tag === activeFilter);

  return filteredProjects.map(projectCardHtml).join('');
}
