#!/usr/bin/env node
/** Uso do agente — humano não precisa rodar manualmente salvo debug. */
import { maintainAll } from './gabarito-lib.mjs';
import { refreshWorkboard } from './workboard-lib.mjs';

const results = maintainAll({ strict: true });
for (const r of results) {
  console.log(`${r.book}: gabarito sincronizado em ${r.synced} capítulo(s)`);
}
refreshWorkboard();
console.log(`OK — ${results.length} livro(s); WORKBOARD atualizado.`);