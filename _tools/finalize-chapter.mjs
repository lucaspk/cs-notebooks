#!/usr/bin/env node
/**
 * Depois de editar index.html (+ GABARITO.md), o agente roda:
 *   node _tools/finalize-chapter.mjs prog_conc 01-me-slug
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { maintainBook, syncChapterDir } from './gabarito-lib.mjs';
import fs from 'node:fs';
import { validateChapter } from './validate-chapter.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [book, slug] = process.argv.slice(2);
if (!book || !slug) {
  console.error('Uso: node _tools/finalize-chapter.mjs <livro> <pasta-do-capítulo>');
  process.exit(1);
}

const chapterDir = path.join(repoRoot, book, 'capitulos', slug);
const gab = path.join(chapterDir, 'GABARITO.md');
if (!fs.existsSync(gab) || fs.statSync(gab).size < 120) {
  console.error(`Crie GABARITO.md completo em ${chapterDir} antes de finalizar.`);
  process.exit(1);
}

const issues = validateChapter(chapterDir);
if (issues.length) { console.error(issues.join('\n')); process.exit(1); }
syncChapterDir(chapterDir);
maintainBook(book, { repo: repoRoot, strict: true });
console.log(`Finalizado: ${book}/${slug}`);