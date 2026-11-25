import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { discoverBooks, listPublishedChapters, findMissingGabarito } from './gabarito-lib.mjs';
import { chapterPublished } from './index-items.mjs';

const defaultRepo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const GOLD_DEFAULTS = {
  prog_conc: '01-me-introducao ou capítulo vizinho publicado',
  comp_net: '07-arp-primeiro-salto',
  paradigms: '01-quatro-leituras-mesmo-problema',
  math_disc: 'comp_net/02-atraso-quatro-fontes (densidade); math 01 a enrichment',
  vv_eng: 'comp_net/02-atraso-quatro-fontes (densidade); vv 01 a enrichment',
};

export function parsePlannedSlugs(bookSlug, { repo = defaultRepo } = {}) {
  const script = path.join(repo, bookSlug, 'capitulos', '_tools', 'build-index.mjs');
  if (!fs.existsSync(script)) return [];
  const src = fs.readFileSync(script, 'utf8');
  const slugs = [];
  const re = /\[\s*'(\d{2})'\s*,\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    slugs.push({ num: m[1], slug: m[2] });
  }
  return slugs;
}

export function bookPublicationStats(bookSlug, { repo = defaultRepo } = {}) {
  const planned = parsePlannedSlugs(bookSlug, { repo });
  const published = listPublishedChapters(bookSlug, { repo });
  const plannedSlugs = new Set(planned.map((p) => p.slug));
  const publishedSet = new Set(published);
  const next = planned.filter((p) => !publishedSet.has(p.slug)).slice(0, 5);
  const orphan = published.filter((s) => plannedSlugs.size > 0 && !plannedSlugs.has(s));
  const missingGabarito = findMissingGabarito(bookSlug, { repo, minBytes: 120 });
  const unpublishedWithoutPage = planned.filter((p) => !chapterPublished(path.join(repo, bookSlug), p.slug));
  return {
    bookSlug,
    plannedTotal: planned.length,
    publishedCount: published.length,
    publishedSlugs: published.sort(),
    nextSlugs: next.map((p) => p.slug),
    orphanSlugs: orphan,
    missingGabarito,
    planned,
  };
}

export function renderAutoSection({ repo = defaultRepo } = {}) {
  const books = discoverBooks({ repo }).sort();
  const lines = [
    '## Publicação (gerado automaticamente)',
    '',
    `_Atualizado: ${new Date().toISOString().slice(0, 19).replace('T', ' ')} UTC · comando: \`node _tools/refresh-workboard.mjs\`_`,
    '',
    '| Livro | Publicados | No roteiro | Próximo(s) slug | Gabarito OK | Observação |',
    '| --- | --- | --- | --- | --- | --- |',
  ];

  for (const book of books) {
    const s = bookPublicationStats(book, { repo });
    const gab = s.missingGabarito.length ? `faltam: ${s.missingGabarito.join(', ')}` : 'sim';
    const obs = s.orphanSlugs.length ? `fora do sumário: ${s.orphanSlugs.join(', ')}` : '—';
    const next = s.nextSlugs.length ? s.nextSlugs.join(', ') : '—';
    lines.push(
      `| \`${book}\` | ${s.publishedCount} | ${s.plannedTotal || '?'} | ${next} | ${gab} | ${obs} |`
    );
  }

  lines.push('', '### Slugs publicados por livro', '');
  for (const book of books) {
    const s = bookPublicationStats(book, { repo });
    if (!s.publishedSlugs.length) {
      lines.push(`- **${book}:** (nenhum)`);
      continue;
    }
    lines.push(`- **${book}:** ${s.publishedSlugs.join(', ')}`);
  }

  return lines.join('\n');
}

const MANUAL_START = '<!-- workboard:manual:start -->';
const MANUAL_END = '<!-- workboard:manual:end -->';
const AUTO_START = '<!-- workboard:auto:start -->';
const AUTO_END = '<!-- workboard:auto:end -->';

export const WORKBOARD_MANUAL_TEMPLATE = `${MANUAL_START}
## Coordenação entre agentes

1. **Antes de codar:** leia este arquivo inteiro, \`git status\`, e [AGENTS.md](AGENTS.md).
2. **Reivindicar:** adicione uma linha em **Reivindicações ativas** (livro + slugs). Não toque slugs de outra reivindicação ativa.
3. **Durante:** um fenômeno por capítulo; siga o molde em [README.md](README.md#molde-pedagógico-todos-os-livros-e-capítulos).
4. **Ao terminar:** \`finalize-chapter\` + testes → \`node _tools/refresh-workboard.mjs\` → linha no **Diário** → remova a reivindicação.

### Reivindicações ativas

| Agente / ferramenta | Livro | Slug(s) | Desde (UTC) | Notas |
| --- | --- | --- | --- | --- |
| *(nenhuma)* | — | — | — | — |

### Próxima onda sugerida (edite ao priorizar)

| Prioridade | Livro | Slug(s) | Copiar tom de | Notas |
| --- | --- | --- | --- | --- |
| 1 | \`comp_net\` | \`09-sub-rede-roteador\`, \`10-tabela-roteamento-lpm\`, \`11-caminho-pacote-hop\` | \`07-arp-primeiro-salto\` | L3 após LAN L2 |
| 2 | \`dsa\` | *(livro ainda não criado)* | \`comp_net/01\` | Criar com \`new-livro.mjs\` antes |
| 3 | \`math_disc\` / \`vv_eng\` | ondas de **enriquecimento** (mesmos slugs) | \`comp_net/02\` | Fase 0 publicada mas labs enxutos |

### Débito de qualidade (não bloqueia, mas evite copiar o mínimo)

| Livro | Situação |
| --- | --- |
| \`paradigms\` | Caps 01–02 mais completos; 03–08 podem ganhar observation, MC dupla, más navegação |
| \`math_disc\`, \`vv_eng\` | Molde completo; densidade pedida = padrão \`comp_net\` |

### Diário (prepend — mais recente no topo)

| Quando (UTC) | Quem | Resumo |
| --- | --- | --- |
| 2026-11-25 | Cursor (Composer) | Fase 0: \`paradigms\` 8/8, \`math_disc\` 9/9, \`vv_eng\` 7/7; \`comp_net\` já estava 8/31 |
${MANUAL_END}
`;

export function readWorkboardPath({ repo = defaultRepo } = {}) {
  return path.join(repo, 'WORKBOARD.md');
}

export function refreshWorkboard({ repo = defaultRepo } = {}) {
  const wbPath = readWorkboardPath({ repo });
  let content = fs.existsSync(wbPath) ? fs.readFileSync(wbPath, 'utf8') : '';

  if (!content.includes(MANUAL_START)) {
    content = `# WORKBOARD — cs-notebooks\n\n**Quadro compartilhado entre agentes** (Cursor, Codex, etc.). Humanos podem editar reivindicações e prioridades.\n\n${WORKBOARD_MANUAL_TEMPLATE}\n\n${AUTO_START}\n${AUTO_END}\n`;
  }

  const auto = renderAutoSection({ repo });
  const autoRe = new RegExp(`${escapeRe(AUTO_START)}[\\s\\S]*?${escapeRe(AUTO_END)}`);
  if (!autoRe.test(content)) {
    content = `${content.trim()}\n\n${AUTO_START}\n${auto}\n${AUTO_END}\n`;
  } else {
    content = content.replace(autoRe, `${AUTO_START}\n${auto}\n${AUTO_END}`);
  }

  fs.writeFileSync(wbPath, content);
  return wbPath;
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function goldChapterFor(book) {
  return GOLD_DEFAULTS[book] || 'primeiro capítulo publicado do livro';
}