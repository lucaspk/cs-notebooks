# Capítulos — redes de computadores

Guia para criar `capitulos/NN-slug/` alinhado ao [molde pedagógico do playground](../../README.md#molde-pedagógico-todos-os-livros-e-capítulos).

## Arquivos por capítulo

| Arquivo | Obrigatório | Função |
| --- | --- | --- |
| `index.html` | sim | Objetivo, blocos de prática, laboratório (se houver), teoria em `<details>`, navegação |
| `app.js` | se houver lab | Interação e renderização |
| `model.js` | se houver lógica testável | Funções puras (sem DOM) |
| `model.test.js` | recomendado com `model.js` | `node --test capitulos/NN-slug/model.test.js` |
| `GABARITO.md` | sim (capítulo publicado) | Agente: `node _tools/finalize-chapter.mjs comp_net NN-slug` — ver [AGENTS.md](../../AGENTS.md) |

Compartilhados do livro:

- `../styles.css` — estilos globais (inclui `.net-*` para topologia)
- `../practice.js` — `localStorage` com chave `playground_comp_net__<slug>`
- `../lib/` — fila e topologia reutilizáveis (ver `lib/README.md`)

## Atributos no `<main>`

```html
<main data-chapter-id="01-pontos-extremos-servico" data-practice-mc="mc-ch01">
```

## Esqueleto

Copie `TEMPLATE.html` para `NN-slug/index.html`.

## Ao publicar

1. `capitulos/MAPEAMENTO.md`
2. `node _tools/finalize-chapter.mjs comp_net NN-slug` (ou `node _tools/maintain-book.mjs comp_net`)
3. Navegação anterior/próximo
4. `node --test capitulos/NN-slug/model.test.js`
5. Checklist do [molde](../../README.md#checklist-antes-de-publicar-um-capítulo)