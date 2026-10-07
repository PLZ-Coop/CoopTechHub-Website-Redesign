import { initShell, initPublicationsCarousel } from '../app.js';

await initShell();
initPublicationsCarousel(document.getElementById('publications-carousel'));
