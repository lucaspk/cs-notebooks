#!/usr/bin/env node
/**
 * Esqueleto automático só (não substitui gabarito curado).
 * Preferir GABARITO.md manual + node _tools/sync-chapter-gabarito.mjs <livro>
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bookSlug = process.argv[2] || 'prog_conc';
const capitulosDir = path.join(root, bookSlug, 'capitulos');

function stripHtml(s) {
  return s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractFields(html) {
  const fields = [];
  const re = /<p class="practice-prompt">([\s\S]*?)<\/p>\s*<textarea[^>]*data-practice-field="([^"]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    fields.push({ prompt: stripHtml(m[1]), id: m[2] });
  }
  const re2 = /<textarea[^>]*data-practice-field="([^"]+)"[^>]*placeholder="([^"]*)"/g;
  while ((m = re2.exec(html)) !== null) {
    if (!fields.some((f) => f.id === m[1])) {
      fields.push({ prompt: m[2] || m[1], id: m[1] });
    }
  }
  const re3 = /<h2>([^<]+)<\/h2>\s*<textarea[^>]*data-practice-field="([^"]+)"/g;
  while ((m = re3.exec(html)) !== null) {
    if (!fields.some((f) => f.id === m[2])) {
      fields.push({ prompt: m[1], id: m[2] });
    }
  }
  const re4 = /<textarea class="practice-field" data-practice-field="([^"]+)"[^>]*>/g;
  while ((m = re4.exec(html)) !== null) {
    if (!fields.some((f) => f.id === m[1])) fields.push({ prompt: m[1], id: m[1] });
  }
  return fields;
}

function extractMc(html) {
  const name = (html.match(/name="(mc-ch[^"]+)"/) || [])[1];
  if (!name) return null;
  const options = [...html.matchAll(
    new RegExp(`<input type="radio" name="${name}" value="([^"]+)"[^>]*>\\s*([^<]+)`, 'g'),
  )].map((x) => ({ value: x[1], label: stripHtml(x[2]) }));
  const answers = [...html.matchAll(/<details class="model-answer"[\s\S]*?<div class="theory-content">([\s\S]*?)<\/div>/g)]
    .map((x) => stripHtml(x[1]));
  const correct = answers[0]?.match(/^([A-D])\b|^\*\*([A-D])\./);
  return { name, options, answers, correctLetter: correct?.[1] || correct?.[2] };
}

function hintForField(id, prompt, objective) {
  const p = `${prompt} ${id}`.toLowerCase();
  if (/pretest|checkpoint/.test(id)) {
    return '**Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo.';
  }
  if (/predict|previs/.test(id)) {
    return 'Conferir após executar o experimento; previsão errada antes do lab é esperada.';
  }
  if (/mc-why/.test(id)) {
    return 'Justificar a letra correta da MC e refutar cada alternativa em uma linha.';
  }
  if (/compare/.test(id)) {
    return 'Separar o que é invariante (trabalho, invariante, protocolo) do que muda (tempo, ordem, visibilidade, anomalia).';
  }
  if (/design|tradeoff|context/.test(id)) {
    return 'Proposta mínima coerente com o objetivo; citar trade-off explícito.';
  }
  if (/sim ou não|mesmo tempo|terminam|deadlock|sempre|nunca|retry|duplica/i.test(p)) {
    return 'Responder **sim** ou **não** + motivo em uma frase alinhada ao lab.';
  }
  return `Essência alinhada a: ${objective.slice(0, 120)}… Use o lab como prova.`;
}

function buildMd(slug, html) {
  const objective = stripHtml((html.match(/<p class="chapter-objective">([\s\S]*?)<\/p>/) || [])[1] || '');
  const fields = extractFields(html);
  const mc = extractMc(html);

  let md = `# Gabarito — ${slug}\n\nAutocorreção. Sincronizar: \`node ../../_tools/sync-chapter-gabarito.mjs ${bookSlug}\`.\n\n`;
  md += `## Objetivo\n\n${objective}\n\n`;

  const bySection = { 'Pré-teste / previsão inicial': [], Outros: [], Checkpoint: [] };
  for (const f of fields) {
    const row = `| ${f.id} | ${hintForField(f.id, f.prompt, objective)} |`;
    const promptLine = f.prompt.length > 3 && f.prompt !== f.id ? `Pergunta: ${f.prompt}` : '';
    const full = promptLine ? `${promptLine}\n${row}` : row;
    if (/pretest|^pretest/.test(f.id) || /pré-teste/i.test(f.prompt)) {
      bySection['Pré-teste / previsão inicial'].push(full);
    } else if (/checkpoint/.test(f.id)) bySection.Checkpoint.push(full);
    else if (/predict/i.test(f.id)) bySection['Pré-teste / previsão inicial'].push(full);
    else bySection.Outros.push(`**${f.id}** — ${f.prompt !== f.id ? f.prompt : 'ver bloco no capítulo'}\n\n${hintForField(f.id, f.prompt, objective)}`);
  }

  if (bySection['Pré-teste / previsão inicial'].length) {
    md += `## Pré-teste e previsões\n\n`;
    for (const block of bySection['Pré-teste / previsão inicial']) md += `${block}\n\n`;
  }
  if (bySection.Outros.length) {
    md += `## Demais campos\n\n`;
    for (const block of bySection.Outros) md += `${block}\n\n`;
  }
  if (bySection.Checkpoint.length) {
    md += `## Checkpoint\n\n`;
    for (const block of bySection.Checkpoint) md += `${block}\n\n`;
  }

  if (mc?.answers.length) {
    md += `## MC (${mc.name})\n\n`;
    md += `${mc.answers.join('\n\n')}\n\n`;
    if (mc.options.length) {
      md += `| Letra | Por que não |\n| --- | --- |\n`;
      for (const o of mc.options) {
        const mark = mc.answers[0]?.includes(`**${o.value.toUpperCase()}`) || mc.answers[0]?.startsWith(o.value.toUpperCase()) ? '**correta**' : 'rejeitar';
        md += `| ${o.value.toUpperCase()} | ${mark} — ${o.label.slice(0, 80)} |\n`;
      }
    }
  }

  return md;
}

let n = 0;
for (const name of fs.readdirSync(capitulosDir)) {
  const dir = path.join(capitulosDir, name);
  const indexPath = path.join(dir, 'index.html');
  if (!fs.existsSync(indexPath) || name.startsWith('_')) continue;
  const html = fs.readFileSync(indexPath, 'utf8');
  const out = buildMd(name, html);
  fs.writeFileSync(path.join(dir, 'GABARITO.md'), out);
  n++;
  console.log('GABARITO.md:', name);
}
console.log(`Gerados: ${n}`);