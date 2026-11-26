# Capítulos — estruturas de dados e algoritmos

Guia alinhado ao [molde pedagógico](../../README.md#molde-pedagógico-todos-os-livros-e-capítulos).

- `data-chapter-id` = slug da pasta; `localStorage`: `playground_dsa__<slug>`
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


## Geração completa e publicação
O caminho preferido para capítulo novo é:
`node _tools/scaffold-chapter.mjs <livro> <NN-slug> "Título" [checklist|calculation|table|stepper]`
Registre antes o slug no MAPEAMENTO. O comando nunca sobrescreve uma pasta existente.
Ele cria index.html, chapter.json, GABARITO.md, model.js, model.test.cjs, app.js e lab-configs.js.
O capítulo nasce como draft e fica indisponível no índice. Adapte o domínio de demonstração, substitua PREENCHER por conteúdo curado, complete os critérios e marque status ready somente depois de revisar.
A navegação aponta para vizinhos publicados, com fallback ao sumário. Atualize os vizinhos quando publicar uma nova página.
finalize-chapter chama validate-chapter antes de publicar: IDs repetidos, rótulos, caminhos locais, placeholders, radio/data-practice-mc e estado do rascunho.
A análise é estática: valida o HTML fonte e o gabarito; campos gerados dinamicamente seguem as garantias dos componentes. Não verifica aparência, contraste ou todos os casos de HTML arbitrário.
Metadados do índice não podem duplicar slug/número nem referenciar capítulo ausente no mapa. Títulos editoriais podem diferir do título curto canônico.
Use _shared/lab-components.js após lab-kit e antes de app.js. PlaygroundComponents.mount monta campos, resultado, tabela ou stepper; evaluate mantém as regras no modelo.
Referências completas: _template-livro/lab-examples/. Testes de autoria: node --test _tools/authoring.test.mjs.
Por preferência do usuário, não adicionar testes reais de navegador.
