# {{TITLE}} — playground

Abra `index.html` no navegador para o sumário. Cada capítulo terá sua própria página. Sem servidor nem build (mesmo molde de `prog_conc/` e `comp_net/`).

**Status:** roteiro em elaboração; nenhum capítulo publicado ainda.

## Organização

- `index.html` — sumário (`node capitulos/_tools/build-index.mjs` após editar a lista de capítulos no script).
- `capitulos/MAPEAMENTO.md` — slugs canônicos.
- `capitulos/README.md`, `capitulos/TEMPLATE.html` — convenções do livro.
- `styles.css`, `practice.js` — compartilhados.
- `lib/` — opcional; funções puras reutilizáveis entre capítulos (`lib/README.md`).
- Molde pedagógico: [playground/README.md](../README.md#molde-pedagógico-todos-os-livros-e-capítulos).

## Próximos passos

1. Definir **ordem didática** e tabela de capítulos planejados (objetivo em uma frase + mix de prática) neste README.
2. Preencher `capitulos/MAPEAMENTO.md`.
3. Implementar capítulo **01** (capítulo ouro) + `node --test`.
4. Atualizar `build-index.mjs` e regenerar o sumário.

## Capítulos planejados

| Cap. | Slug | Objetivo (uma frase) | Mix de prática |
| --- | --- | --- | --- |
| 01 | `01-exemplo` | … | pré-teste, previsão, lab, MC, checkpoint |

## Ordem didática sugerida

1. …