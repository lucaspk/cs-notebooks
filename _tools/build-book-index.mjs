#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chapterPublished, renderChapterListItem } from './index-items.mjs';
import { syncBookGabarito } from './gabarito-lib.mjs';

export function readChapterMap(root) {
  return [...fs.readFileSync(path.join(root, 'capitulos/MAPEAMENTO.md'), 'utf8')
    .matchAll(/^\|\s*(\d{2})\s*\|\s*`([^`]+)`\s*\|\s*([^|]+)\|/gm)]
    .map(([, num, slug, title]) => ({ num, slug, title: title.trim() }));
}
export function buildBookIndex(bookRoot) {
  const root = bookRoot instanceof URL ? fileURLToPath(bookRoot) : path.resolve(bookRoot);
  const metadata = JSON.parse(fs.readFileSync(path.join(root, 'capitulos/index-metadata.json'), 'utf8'));
  const mapped = readChapterMap(root);
  const chapters = mapped.map(({ num, slug, title }) =>
    metadata.find(row => row[1] === slug) || [num, slug, '', title, '']);
  const publishedCount = chapters.filter(([, slug]) => chapterPublished(root, slug)).length;
  const values = {
    items: chapters.map(row => renderChapterListItem(root, row)).join('\n'),
    publishedCount, plannedCount: chapters.length,
  };
  const template = fs.readFileSync(path.join(root, 'capitulos/index-template.html'), 'utf8');
  fs.writeFileSync(path.join(root, 'index.html'), template.replace(/{{(items|publishedCount|plannedCount)}}/g, (_, key) => values[key]));
  syncBookGabarito(path.basename(root), { repo: path.dirname(root) });
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const slug = process.argv[process.argv.indexOf('--slug') + 1];
  if (!process.argv.includes('--slug') || !/^[a-z][a-z0-9_]*$/.test(slug)) throw new Error('Use --slug <livro>');
  buildBookIndex(new URL('../' + slug + '/', import.meta.url));
}
