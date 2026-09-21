import { blogPosts, featuredPost } from '../data/posts.js';

export const PAGE_SIZE = 9;

export function featuredPostHtml() {
  return `
    <p class="blog-page-hero-eyebrow">Wyróżniony wpis</p>
    <h1>${featuredPost.title}</h1>
    <p>${featuredPost.description}</p>
    <a class="blog-page-card-link" href="${featuredPost.url}">
      czytaj wpis <span aria-hidden="true">→</span>
    </a>
  `;
}

export function postCardHtml(post) {
  return `
    <a class="blog-page-card" href="${post.url}">
      <p class="blog-page-card-date">${post.date}</p>
      <h3>${post.title}</h3>
      <p>${post.description}</p>
      <span class="blog-page-card-link">
        czytaj wpis <span aria-hidden="true">→</span>
      </span>
    </a>
  `;
}

export function getVisiblePosts(visibleCount = PAGE_SIZE) {
  const rest = blogPosts.filter((post) => post.id !== featuredPost.id);
  return {
    visible: rest.slice(0, visibleCount),
    hasMore: visibleCount < rest.length,
  };
}

export function postsGridHtml(visibleCount = PAGE_SIZE) {
  return getVisiblePosts(visibleCount).visible.map(postCardHtml).join('');
}
