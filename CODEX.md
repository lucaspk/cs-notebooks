# Codex — cs-notebooks

**Leia nesta ordem antes de criar ou editar capítulos:**

1. [WORKBOARD.md](WORKBOARD.md) — reivindicações ativas, próxima onda, diário, tabela de publicação (parte auto: não editar).
2. [AGENTS.md](AGENTS.md) — protocolo completo (finalize-chapter, GABARITO, testes, multi-agente).
3. [README.md § Molde pedagógico](README.md#molde-pedagógico-todos-os-livros-e-capítulos) — blocos de cada página.
4. [LIVROS.md](LIVROS.md) — slugs, fases, dependências.

**Checklist rápida**

- Reivindicar slug em WORKBOARD → implementar → `GABARITO.md` → `node _tools/finalize-chapter.mjs <livro> <slug>` → `node --test` → `node _tools/refresh-workboard.mjs` → diário → remover reivindicação.
- Tom de referência: `comp_net/capitulos/07-arp-primeiro-salto/`.
- `model.js`: IIFE no browser, **sem** `require()` no load; export só para `node --test`.
- O **usuário não roda** CLI nem sincroniza gabarito no HTML.