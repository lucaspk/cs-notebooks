import fs from 'node:fs';
import path from 'node:path';

export function chapterPublished(root, slug) {
  const dir = path.join(root, 'capitulos', slug);
  const spec = path.join(dir, 'chapter.json');
  if (fs.existsSync(spec) && JSON.parse(fs.readFileSync(spec, 'utf8')).status !== 'ready') return false;
  return fs.existsSync(path.join(dir, 'index.html'));
}

export function renderChapterListItem(root, [num, slug, eyebrow, title, blurb]) {
  const eye = eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : '';
  const inner = `<span class="chapter-number" aria-hidden="true">${num}</span><span class="chapter-description">${eye}<strong>${title}</strong><span>${blurb}</span></span>`;
  if (chapterPublished(root, slug)) {
    return `        <li><a class="chapter-link" href="capitulos/${slug}/index.html">${inner}<span class="chapter-arrow" aria-hidden="true">→</span></a></li>`;
  }
  return `        <li><span class="chapter-link is-planned" aria-disabled="true">${inner}<span class="planned-label">em breve</span></span></li>`;
}