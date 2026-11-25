import fs from 'node:fs';
import path from 'node:path';

export function chapterPublished(root, slug) {
  return fs.existsSync(path.join(root, 'capitulos', slug, 'index.html'));
}

export function renderChapterListItem(root, [num, slug, eyebrow, title, blurb]) {
  const eye = eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : '';
  const inner = `<span class="chapter-number" aria-hidden="true">${num}</span><span class="chapter-description">${eye}<strong>${title}</strong><span>${blurb}</span></span>`;
  if (chapterPublished(root, slug)) {
    return `        <li><a class="chapter-link" href="capitulos/${slug}/index.html">${inner}<span class="chapter-arrow" aria-hidden="true">→</span></a></li>`;
  }
  return `        <li><span class="chapter-link is-planned" aria-disabled="true">${inner}<span class="planned-label">em breve</span></span></li>`;
}