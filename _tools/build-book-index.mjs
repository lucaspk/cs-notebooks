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
  const seen = new Set();
  const numbers = new Set();
  for (const row of mapped) {
    if (!/^\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.slug) || !row.slug.startsWith(row.num + '-') || seen.has(row.slug) || numbers.has(row.num)) throw new Error('MAPEAMENTO inválido: ' + row.slug);
    seen.add(row.slug); numbers.add(row.num);
  }
  const editorial = new Set();
  for (const row of metadata) {
    if (!Array.isArray(row) || row.length !== 5 || row.some(v => typeof v !== 'string')) throw new Error('Metadados exigem cinco strings por linha');
    if (editorial.has(row[1])) throw new Error('Metadados duplicados: ' + row[1]);
    editorial.add(row[1]);
    const canonical = mapped.find(item => item.slug === row[1]);
    if (!canonical || canonical.num !== row[0]) throw new Error('Metadados divergem do MAPEAMENTO: ' + row[1]);
  }
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
