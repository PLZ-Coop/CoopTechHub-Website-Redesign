import { initShell } from '../app.js';
import { PAGE_SIZE, featuredPostHtml, postsGridHtml, getVisiblePosts } from '../render/blog.js';

let visibleCount = PAGE_SIZE;
let observer = null;

function renderFeaturedPost() {
  document.getElementById('blog-featured-post').innerHTML = featuredPostHtml();
}

function renderPosts() {
  const { hasMore } = getVisiblePosts(visibleCount);

  const grid = document.getElementById('blog-page-grid');
  grid.innerHTML = postsGridHtml(visibleCount);

  const sentinel = document.getElementById('blog-page-load-more');

  if (observer) {
    observer.disconnect();
    observer = null;
  }

  if (!sentinel) {
    return;
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
        renderPosts();
      }
    },
    { rootMargin: '400px' },
  );

  observer.observe(sentinel);
}

await initShell({ topbarClass: 'energy-topbar' });
renderFeaturedPost();
renderPosts();
