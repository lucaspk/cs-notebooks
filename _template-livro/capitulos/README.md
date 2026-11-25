# Capítulos — {{TITLE_LOWER}}

Guia alinhado ao [molde pedagógico](../../README.md#molde-pedagógico-todos-os-livros-e-capítulos).

- `data-chapter-id` = slug da pasta; `localStorage`: `playground_{{SLUG}}__<slug>`
- Um fenômeno por capítulo; `model.js` testável com `node --test`
- Copie `TEMPLATE.html` → `NN-slug/index.html`
- Ao publicar: MAPEAMENTO, `build-index.mjs`, navegação, testes, checklist do molde
## Infra compartilhada
Veja ../../plan.md no repositório e os snippets ../partials/ no livro gerado.
Use main com data-book-slug e data-chapter-id. Carregue ../../../_shared/practice.js com defer.
styles.css importa a base compartilhada; acrescente apenas estilos próprios do livro.
Carregue ../../../_shared/lab-kit.js antes de app.js (ambos defer), após as dependências de domínio:
- mountToggles(host, { markup, readState, render, onInit }): render recebe o estado; pode atualizar DOM ou retornar texto para #out. destroy remove o listener.
- mountStepper({ stepId, resetId, clockId, getPlan, snapshot, paint, onReset }): retorna render(), reset(runHook=true), destroy(). snapshot deve indicar done. reset(false) reinicia o relógio mantendo o plano preparado pelo capítulo.
Não coloque lógica de domínio no kit.
O sumário lê MAPEAMENTO.md; index-metadata.json contém eyebrow, título e descrição opcionais. index-template.html preserva a apresentação do livro. O wrapper build-index.mjs apenas chama o gerador comum.
