#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function validateChapter(dir) {
  const file = path.join(dir, 'index.html');
  const html = fs.readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  const issues = [];
  const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)].map(m => [m[1], m[2] ?? m[3] ?? m[4]]));
  const tags = [...html.matchAll(/<[^>]+>/g)];
  const ids = new Set();
  const labels = new Set(tags.filter(m => /^<label\b/i.test(m[0])).map(m => attrs(m[0]).for));
  let labelDepth = 0;
  let main;
  for (const [tag] of tags) {
    const a = attrs(tag);
    if (a.id) {
      if (ids.has(a.id)) issues.push('ID duplicado: ' + a.id);
      ids.add(a.id);
    }
    if (/^<main\b/i.test(tag)) main = a;
    if (/^<label\b/i.test(tag)) labelDepth++;
    if (/^<\/label/i.test(tag)) labelDepth--;
    if (/^<(input|select|textarea)\b/i.test(tag) && a.type !== 'hidden' &&
        !labelDepth && !labels.has(a.id) && !a['aria-label'] && !a['aria-labelledby']) {
      issues.push('Campo sem rótulo: ' + (a.id || a['data-practice-field'] || tag));
    }
    for (const resource of [a.src, /\.(css|html?)(?:#.*)?$/.test(a.href || '') ? a.href : null]) {
      if (!resource || /^(https?:|data:|\/\/)/.test(resource)) continue;
      const target = path.resolve(dir, resource.split('#')[0]);
      if (!fs.existsSync(target)) issues.push('Recurso ou navegação inexistente: ' + resource);
    }
    if (a['aria-labelledby']) {
      for (const id of a['aria-labelledby'].split(/\s+/)) {
        if (!new RegExp('id=["\x27]' + id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '["\x27]').test(html)) issues.push('Rótulo inexistente: ' + id);
      }
    }
    if (/^<input\b/i.test(tag) && a.type === 'radio' && a.name !== main?.['data-practice-mc']) issues.push('Radio diverge de data-practice-mc: ' + a.name);
  }
  if (!main?.['data-chapter-id']) issues.push('main sem data-chapter-id');
  if (/{{[^}]+}}|\bTODO\b|\bPREENCHER\b|Alternativa incorreta típica|Ver modelo no lab|Outra distração/.test(html)) issues.push('Placeholder pendente');
  const gab = path.join(dir, 'GABARITO.md');
  if (!fs.existsSync(gab)) issues.push('GABARITO.md ausente');
  else if (/PREENCHER|{{[^}]+}}|\bTODO\b/.test(fs.readFileSync(gab, 'utf8'))) issues.push('Gabarito com placeholder pendente');
  const spec = path.join(dir, 'chapter.json');
  if (fs.existsSync(spec) && JSON.parse(fs.readFileSync(spec, 'utf8')).status !== 'ready') issues.push('chapter.json precisa de status ready após revisão pedagógica');
  return [...new Set(issues)];
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const dir = path.resolve(process.argv[2] || '.');
  const issues = validateChapter(dir);
  if (issues.length) { console.error(issues.join('\n')); process.exitCode = 1; }
  else console.log('OK — capítulo validado');
}
