# Capítulos — programação concorrente

Guia para criar `capitulos/NN-slug/` alinhado ao [molde pedagógico do playground](../../README.md#molde-pedagógico-todos-os-livros-e-capítulos).

## Arquivos por capítulo

| Arquivo | Obrigatório | Função |
| --- | --- | --- |
| `index.html` | sim | Objetivo, blocos de prática, laboratório (se houver), teoria em `<details>`, navegação |
| `app.js` | se houver lab | Interação e renderização |
| `model.js` | se houver lógica testável | Funções puras (sem DOM) |
| `model.test.js` | recomendado com `model.js` | `node --test capitulos/NN-slug/model.test.js` |
| `GABARITO.md` | sim (capítulo publicado) | Agente: `node _tools/finalize-chapter.mjs prog_conc NN-slug` — ver [AGENTS.md](../../AGENTS.md) |

Compartilhados do livro (não copiar por capítulo):

- `../styles.css` — estilos globais e classes `.practice-*`
- `../practice.js` — persistência de `[data-practice-field]` e MC (`data-practice-mc` no `<main>`)

## Atributos no `<main>`

```html
<main data-chapter-id="NN-slug" data-practice-mc="mc-chNN">
```

- `data-chapter-id`: pasta do capítulo; chave do `localStorage`
- `data-practice-mc`: atributo `name` do grupo de rádio da MC (opcional se não houver MC)

## Ordem das seções no HTML

1. Cabeçalho, navegação (sumário · título do capítulo)
2. Intro (`h1` do capítulo, não o slogan do livro)
3. `p.chapter-objective`
4. Pré-teste → exemplo trabalhado (se necessário) → previsão(ões) **antes** do lab
5. `section.lab` (experimento)
6. `aside.observation` (dica viva do lab)
7. Previsões adicionais ligadas a controles (`data-prediction-watch` / `data-prediction-hint`)
8. Comparar cenários → MC + justificativa → prós/contras → contexto → design mínimo (omitir o que não couber; documentar no README do livro)
9. Checkpoint
10. Teoria em `<details>` → navegação inferior

Controles que pedem previsão antes de reexecutar:

```html
<select id="quantum" data-prediction-watch data-prediction-hint="prediction-quantum-hint">…</select>
<p id="prediction-quantum-hint" class="practice-hint" hidden>…</p>
```

## Esqueleto

Copie e renomeie `TEMPLATE.html` para `NN-slug/index.html`.

## Ao publicar

Atualize:

1. `capitulos/MAPEAMENTO.md` — linha canônica do capítulo
2. `node _tools/finalize-chapter.mjs prog_conc NN-slug` (ou `node _tools/maintain-book.mjs prog_conc`) — regenera `prog_conc/index.html`
3. Navegação anterior/próximo no HTML do capítulo
4. Teste: `node --test capitulos/NN-slug/model.test.js`