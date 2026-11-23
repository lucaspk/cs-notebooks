#!/usr/bin/env node
/**
 * Novo livro interativo a partir de _template-livro/
 *
 *   node _tools/new-livro.mjs --slug db_sys --title "Bancos de dados" --brand "bancos de dados"
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const templateRoot = path.join(repoRoot, '_template-livro');

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : null;
}

const slug = arg('slug');
const title = arg('title');
const brand = arg('brand') || title;

if (!slug || !/^[a-z][a-z0-9_]*$/.test(slug)) {
  console.error('Uso: node _tools/new-livro.mjs --slug my_book --title "Título" [--brand "nome no cabeçalho"]');
  process.exit(1);
}
if (!title) {
  console.error('Informe --title');
  process.exit(1);
}

const dest = path.join(repoRoot, slug);
if (fs.existsSync(dest)) {
  console.error(`Já existe: ${dest}`);
  process.exit(1);
}

function replaceAll(text) {
  return text
    .replaceAll('{{SLUG}}', slug)
    .replaceAll('{{TITLE}}', title)
    .replaceAll('{{TITLE_LOWER}}', title.toLowerCase())
    .replaceAll('{{BRAND}}', brand);
}

function copyTree(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const from = path.join(src, name);
    const to = path.join(dst, name);
    const st = fs.statSync(from);
    if (st.isDirectory()) copyTree(from, to);
    else {
      const raw = fs.readFileSync(from, 'utf8');
      const ext = path.extname(name);
      const out = ext === '.mjs' || ext === '.md' || ext === '.js' || ext === '.html' ? replaceAll(raw) : raw;
      fs.writeFileSync(to, out);
    }
  }
}

copyTree(templateRoot, dest);

const stylesSrc = path.join(repoRoot, 'prog_conc', 'styles.css');
if (fs.existsSync(stylesSrc)) {
  fs.copyFileSync(stylesSrc, path.join(dest, 'styles.css'));
}

const buildScript = path.join(dest, 'capitulos', '_tools', 'build-index.mjs');
if (fs.existsSync(buildScript)) {
  execSync(`node "${buildScript}"`, { stdio: 'inherit' });
}

console.log(`\nLivro criado: ${dest}/`);
console.log('Próximo: editar README + MAPEAMENTO, depois capítulo 01.');