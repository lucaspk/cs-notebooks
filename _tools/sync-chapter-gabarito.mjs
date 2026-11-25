#!/usr/bin/env node
import { syncBookGabarito } from './gabarito-lib.mjs';

const bookSlug = process.argv[2];
if (!bookSlug) {
  console.error('Uso: node _tools/sync-chapter-gabarito.mjs <prog_conc|comp_net>');
  process.exit(1);
}
const n = syncBookGabarito(bookSlug);
console.log(`Atualizados: ${n} capítulo(s) em ${bookSlug}`);