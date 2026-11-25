# GitHub Copilot / Codex (cloud) — cs-notebooks

Este repositório é um playground **estático** de capítulos interativos (HTML/JS, sem build no deploy).

Antes de propor mudanças em `capitulos/`:

1. Leia `WORKBOARD.md` — não altere slugs reivindicados por outro agente.
2. Siga `AGENTS.md` — `GABARITO.md` obrigatório; rode `node _tools/finalize-chapter.mjs` e `node _tools/refresh-workboard.mjs`.
3. Molde pedagógico em `README.md` (pré-teste, previsão, lab, MC com justificativa dupla, checkpoint).
4. Capítulo modelo: `comp_net/capitulos/07-arp-primeiro-salto/`.

O estudante **não** executa comandos Node; manutenção é responsabilidade do agente.