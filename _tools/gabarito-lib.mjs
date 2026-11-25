import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function mdToSimpleHtml(md) {
  const lines = md.split('\n');
  let html = '';
  for (const line of lines) {
    if (line.startsWith('# ')) continue;
    if (line.startsWith('## ')) {
      html += `<h4>${escapeHtml(line.slice(3))}</h4>\n`;
      continue;
    }
    if (line.startsWith('|')) {
      if (line.includes('---')) continue;
      const cells = line.split('|').map((c) => c.trim()).filter(Boolean);
      if (cells.length >= 2) {
        html += `<p><strong>${inlineMd(cells[0])}</strong> ${inlineMd(cells.slice(1).join(' — '))}</p>\n`;
      }
      continue;
    }
    if (line.startsWith('- ')) {
      html += `<p>${inlineMd(line.slice(2))}</p>\n`;
      continue;
    }
    if (line.trim() === '') continue;
    if (!line.startsWith('Autocorreção') && !line.startsWith('Campos `data-practice-field`')) {
      html += `<p>${inlineMd(line)}</p>\n`;
    }
  }
  return html.trim();
}

function inlineMd(s) {
  return escapeHtml(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>');
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function fallbackBody(html) {
  const fields = [...new Set([...html.matchAll(/data-practice-field="([^"]+)"/g)].map((m) => m[1]))];
  const mcBlocks = [...html.matchAll(
    /<details class="model-answer"[^>]*>[\s\S]*?<div class="theory-content">([\s\S]*?)<\/div>/g,
  )].map((m) => m[1].trim());
  const objective = (html.match(/<p class="chapter-objective">([\s\S]*?)<\/p>/) || [])[1]
    ?.replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const rows = fields.map((f) => {
    let hint = 'Alinhado ao objetivo do capítulo e ao que o lab ou o exemplo mostrar.';
    if (/pretest|checkpoint/i.test(f)) {
      hint = '<strong>Sim/não</strong> (quando couber) + uma frase; use o lab para calibrar.';
    }
    if (/predict/i.test(f)) hint = 'Compare com o resultado do experimento após executar.';
    if (/mc-why/i.test(f)) hint = 'Justifique a MC escolhida e descarte as outras com critério do capítulo.';
    return `<dt><code>${f}</code></dt><dd>${hint}</dd>`;
  });

  let inner = '';
  if (objective) inner += `<p class="gabarito-objective">${objective}</p>`;
  inner += `<dl>${rows.join('')}</dl>`;
  if (mcBlocks.length) {
    inner += `<h4>MC (resumo)</h4>${mcBlocks.map((b) => `<p>${b}</p>`).join('')}`;
  }
  return inner;
}

function buildBlock(html, chapterDir) {
  const mdPath = path.join(chapterDir, 'GABARITO.md');
  const body = fs.existsSync(mdPath) ? mdToSimpleHtml(fs.readFileSync(mdPath, 'utf8')) : fallbackBody(html);
  return `    <details class="chapter-gabarito">
      <summary>Gabarito <span aria-hidden="true">+</span></summary>
      <div class="gabarito-content">
${body.split('\n').map((l) => (l ? `        ${l}` : l)).join('\n')}
      </div>
    </details>`;
}

function upsertGabarito(html, block) {
  const re = /<details class="chapter-gabarito">[\s\S]*?<\/details>\s*/;
  if (re.test(html)) return html.replace(re, `${block}\n`);
  const markers = ['<details class="theory">', '<nav class="chapter-bottom-navigation">'];
  for (const m of markers) {
    if (html.includes(m)) return html.replace(m, `${block}\n\n    ${m}`);
  }
  return html.replace('  </main>', `    ${block}\n  </main>`);
}

/** @returns {number} capítulos cujo index.html mudou */
export function syncBookGabarito(bookSlug, { repo = repoRoot } = {}) {
  const capitulosDir = path.join(repo, bookSlug, 'capitulos');
  if (!fs.existsSync(capitulosDir)) return 0;
  let count = 0;
  for (const name of fs.readdirSync(capitulosDir)) {
    const chapterDir = path.join(capitulosDir, name);
    const indexPath = path.join(chapterDir, 'index.html');
    if (!fs.existsSync(indexPath) || name.startsWith('_')) continue;
    if (syncChapterDir(chapterDir)) count += 1;
  }
  return count;
}

/** @returns {boolean} index foi reescrito */
export function syncChapterDir(chapterDir) {
  const indexPath = path.join(chapterDir, 'index.html');
  if (!fs.existsSync(indexPath)) return false;
  const html = fs.readFileSync(indexPath, 'utf8');
  const block = buildBlock(html, chapterDir);
  const next = upsertGabarito(html, block);
  if (next === html) return false;
  fs.writeFileSync(indexPath, next);
  return true;
}

export function listPublishedChapters(bookSlug, { repo = repoRoot } = {}) {
  const capitulosDir = path.join(repo, bookSlug, 'capitulos');
  if (!fs.existsSync(capitulosDir)) return [];
  return fs
    .readdirSync(capitulosDir)
    .filter((name) => {
      if (name.startsWith('_')) return false;
      return fs.existsSync(path.join(capitulosDir, name, 'index.html'));
    });
}

/** Capítulos publicados sem GABARITO.md útil (agente deve preencher). */
export function findPedagogyIssues(bookSlug, { repo = repoRoot } = {}) {
  const issues = [];
  const genericText = [
    'Alternativa incorreta típica',
    'Resposta alinhada ao lab',
    'Outra distração',
    'Ver modelo no lab',
    'Avaliar conectivos',
    'Checklist de evidência',
  ];
  const forwardReference = /\b(os quatro|quatro estilos|ambos|as opções|os dois modelos|os modos)\b/i;

  for (const slug of listPublishedChapters(bookSlug, { repo })) {
    const chapterDir = path.join(repo, bookSlug, 'capitulos', slug);
    const indexPath = path.join(chapterDir, 'index.html');
    const html = fs.readFileSync(indexPath, 'utf8');
    for (const text of genericText) {
      if (html.includes(text)) issues.push(`${slug}: placeholder pedagógico não curado: “${text}”`);
    }

    const gabPath = path.join(chapterDir, 'GABARITO.md');
    if (fs.existsSync(gabPath)) {
      const gab = fs.readFileSync(gabPath, 'utf8');
      for (const text of genericText) {
        if (gab.includes(text)) issues.push(`${slug}: gabarito ainda usa placeholder: “${text}”`);
      }
    }

    const predictions = [...html.matchAll(/<section[^>]*aria-labelledby="[^"]*predict[^\"]*"[^>]*>([\s\S]*?)<\/section>/gi)].map((m) => m[0]);
    for (const section of predictions) {
      if (!forwardReference.test(section)) continue;
      const sectionIndex = html.indexOf(section);
      const before = html.slice(0, sectionIndex);
      const contextWasIntroduced = /worked-title|four-reads-title|contextual|exemplo trabalhado|quais são os/i.test(before);
      if (!contextWasIntroduced) issues.push(`${slug}: previsão usa referente coletivo antes de apresentar o contexto (“${section.match(forwardReference)?.[0]}”)`);
    }
  }
  return issues;
}

export function findMissingGabarito(bookSlug, { repo = repoRoot, minBytes = 120 } = {}) {
  const missing = [];
  for (const slug of listPublishedChapters(bookSlug, { repo })) {
    const md = path.join(repo, bookSlug, 'capitulos', slug, 'GABARITO.md');
    if (!fs.existsSync(md) || fs.statSync(md).size < minBytes) missing.push(slug);
  }
  return missing;
}

export function runBuildIndex(bookSlug, { repo = repoRoot } = {}) {
  const script = path.join(repo, bookSlug, 'capitulos', '_tools', 'build-index.mjs');
  if (!fs.existsSync(script)) return false;
  execSync(`node "${script}"`, { cwd: repo, stdio: 'inherit' });
  return true;
}

/**
 * Sumário + gabarito no HTML + validação. Uso do agente ao fechar um livro/capítulo.
 * @returns {{ synced: number, missing: string[] }}
 */
export function maintainBook(bookSlug, { repo = repoRoot, strict = true } = {}) {
  const bookRoot = path.join(repo, bookSlug);
  if (!fs.existsSync(bookRoot)) throw new Error(`Livro não encontrado: ${bookSlug}`);
  runBuildIndex(bookSlug, { repo });
  const synced = syncBookGabarito(bookSlug, { repo });
  const missing = findMissingGabarito(bookSlug, { repo });
  const pedagogy = findPedagogyIssues(bookSlug, { repo });
  if (strict && (missing.length || pedagogy.length)) {
    const details = [];
    if (missing.length) details.push(`GABARITO.md ausente ou incompleto: ${missing.join(', ')}`);
    if (pedagogy.length) details.push(`Qualidade pedagógica: ${pedagogy.join(' | ')}`);
    const err = new Error(details.join('\n'));
    err.missing = missing;
    err.pedagogy = pedagogy;
    throw err;
  }
  return { synced, missing, pedagogy };
}

export function discoverBooks({ repo = repoRoot } = {}) {
  return fs.readdirSync(repo).filter((name) => {
    const p = path.join(repo, name, 'capitulos', '_tools', 'build-index.mjs');
    return fs.existsSync(p) && !name.startsWith('_');
  });
}

export function maintainAll({ repo = repoRoot, strict = true } = {}) {
  const results = [];
  for (const book of discoverBooks({ repo })) {
    try {
      results.push({ book, ...maintainBook(book, { repo, strict }) });
    } catch (e) {
      if (strict) throw e;
      results.push({ book, error: e.message, missing: e.missing || [] });
    }
  }
  return results;
}