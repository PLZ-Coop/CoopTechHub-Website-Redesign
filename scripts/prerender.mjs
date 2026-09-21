import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { newsGridHtml, logosSectionHtml, publicationsTrackHtml, publicationsHighlightsHtml } from '../js/render/home.js';
import { featuredPostHtml, postsGridHtml } from '../js/render/blog.js';
import { filtersHtml as projectFiltersHtml, gridHtml as projectsGridHtml } from '../js/render/projects.js';
import { filtersHtml as publicationFiltersHtml, gridHtml as publicationsGridHtml } from '../js/render/publications.js';
import { teamGridHtml } from '../js/render/team.js';
import { offerListHtml as digitalOfferListHtml } from '../js/render/digitalization.js';
import { processListHtml, publicationTrackHtml as energyPublicationTrackHtml } from '../js/render/energy.js';
import {
  offerListHtml as localOfferListHtml,
  publicationsTrackHtml as localPublicationsTrackHtml,
} from '../js/render/local-development.js';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');

const header = readFileSync(join(rootDir, 'partials/header.html'), 'utf8').trim();
const footer = readFileSync(join(rootDir, 'partials/footer.html'), 'utf8').trim();

function listHtmlFiles(dir) {
  return readdirSync(join(rootDir, dir), { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => join(dir, entry.name));
}

const allHtmlFiles = [
  ...readdirSync(rootDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => entry.name),
  ...listHtmlFiles('nasze-projekty'),
  ...listHtmlFiles('publikacje'),
  ...listHtmlFiles('aktualnosci'),
];

function inlinePartials(html) {
  return html
    .replace(/<div data-include="\/partials\/header\.html"><\/div>/, header)
    .replace(/<div data-include="\/partials\/footer\.html"><\/div>/, footer);
}

function fillContainer(html, id, innerHtml) {
  const pattern = new RegExp(`(<([a-z]+)[^>]*\\bid="${id}"[^>]*>)([\\s\\S]*?)(<\\/\\2>)`);

  if (!pattern.test(html)) {
    throw new Error(`Container #${id} not found`);
  }

  return html.replace(pattern, (match, openTag, _tag, _inner, closeTag) => `${openTag}\n${innerHtml}\n${closeTag}`);
}

const containerFillers = {
  'index.html': (html) =>
    [
      ['news-grid', newsGridHtml()],
      ['logos-section', logosSectionHtml()],
      ['publications-track', publicationsTrackHtml()],
      ['publications-highlights', publicationsHighlightsHtml()],
    ].reduce((acc, [id, content]) => fillContainer(acc, id, content), html),
  'blog.html': (html) =>
    [
      ['blog-featured-post', featuredPostHtml()],
      ['blog-page-grid', postsGridHtml()],
    ].reduce((acc, [id, content]) => fillContainer(acc, id, content), html),
  'nasze-projekty.html': (html) =>
    [
      ['projects-page-filters', projectFiltersHtml('wszystkie')],
      ['projects-page-grid', projectsGridHtml('wszystkie')],
    ].reduce((acc, [id, content]) => fillContainer(acc, id, content), html),
  'publikacje.html': (html) =>
    [
      ['publications-page-filters', publicationFiltersHtml('wszystkie')],
      ['publications-page-grid', publicationsGridHtml('wszystkie')],
    ].reduce((acc, [id, content]) => fillContainer(acc, id, content), html),
  'zespol.html': (html) => fillContainer(html, 'team-grid', teamGridHtml()),
  'cyfryzacja.html': (html) => fillContainer(html, 'digital-offer-list', digitalOfferListHtml()),
  'spoldzielnie-energetyczne.html': (html) =>
    [
      ['energy-process-list', processListHtml()],
      ['energy-publication-track', energyPublicationTrackHtml()],
    ].reduce((acc, [id, content]) => fillContainer(acc, id, content), html),
  'rozwoj-lokalny.html': (html) =>
    [
      ['local-offer-list', localOfferListHtml()],
      ['local-publications-track', localPublicationsTrackHtml()],
    ].reduce((acc, [id, content]) => fillContainer(acc, id, content), html),
};

let changed = 0;

for (const relPath of allHtmlFiles) {
  const filePath = join(rootDir, relPath);
  const original = readFileSync(filePath, 'utf8');

  if (!original.includes('data-include')) {
    continue;
  }

  let html = inlinePartials(original);

  const fill = containerFillers[relPath];
  if (fill) {
    html = fill(html);
  }

  if (html !== original) {
    writeFileSync(filePath, html);
    changed += 1;
  }
}

console.log(`Prerendered ${changed} file(s).`);
