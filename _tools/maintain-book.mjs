#!/usr/bin/env node
import { maintainBook } from './gabarito-lib.mjs';

const book = process.argv[2];
if (!book) {
  console.error('Uso: node _tools/maintain-book.mjs <prog_conc|comp_net|…>');
  process.exit(1);
}
const { synced, missing } = maintainBook(book, { strict: true });
console.log(`OK ${book}: ${synced} index de capítulo(s) atualizado(s).`);
if (missing.length) console.warn('Ainda incompletos:', missing.join(', '));