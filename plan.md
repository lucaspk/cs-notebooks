# Plano — deduplicação shared (`_shared/`, `lab-kit`, partials)

**Status:** Infra das fases 1–5 e revisão estrutural dos 61 capítulos concluídas. Em 2026-11-26: scaffold completo, componentes de laboratório, validação estática, consistência de metadados e quatro referências implementados. Testes reais de navegador excluídos por solicitação do usuário. Sem PR/push nesta sessão.
**Público:** agente que mantém a infraestrutura
**Contexto:** análise 80/20 de duplicação em ~60 capítulos e 5 livros — ver conversa que originou este arquivo.

## Objetivo

Reduzir cópias de `practice.js`, CSS, wiring de labs e esqueleto HTML **sem** quebrar o site estático (`file://`, GitHub Pages, sem bundler no browser). Livros e capítulos **novos** devem nascer já no padrão; capítulos **publicados** só migram em PRs explícitos e incrementais (não reescrita em massa).

## O que já está centralizado (não refatorar “de novo”)

| Área | Onde |
| --- | --- |
| Gabarito HTML a partir de markdown | `_tools/gabarito-lib.mjs`, `finalize-chapter.mjs`, `maintain-book.mjs` |
| Molde pedagógico | [README.md § Molde](README.md#molde-pedagógico-todos-os-livros-e-capítulos) |
| Novo livro | `_template-livro/`, `_tools/new-livro.mjs` |
| Persistência de campos/MC | `_shared/practice.js`; cinco pilotos migrados, scripts locais antigos mantidos durante transição |

## Restrições (obrigatórias)

Ler [AGENTS.md](AGENTS.md) e [WORKBOARD.md](WORKBOARD.md) antes de codar.

1. **Sem build obrigatório no visitante** — só `<script src="…">` e CSS; nada de Webpack/Vite no deploy.
2. **Sem `require()` no carregamento do browser** — `model.js` continua IIFE + `module.exports` para Node (`node --test`).
3. **Não reescrever em massa** capítulos publicados só para padronizar (regra do quadro).
4. **GABARITO.md** permanece fonte; não duplicar critérios em JS.
5. Após mudanças que toquem livros: rodar testes do livro afetado + `node _tools/refresh-workboard.mjs` se aplicável.

## Diagnóstico resumido

| Duplicação | Escala aproximada | Notas |
| --- | --- | --- |
| `practice.js` | 6 arquivos (~69–89 linhas) | Diff ≈ prefixo `playground_<slug>__` + `bindPredictionHints` + migração legacy só em `prog_conc` |
| `styles.css` | 5 arquivos | `prog_conc`, `math_disc`, `vv_eng` idênticos; `comp_net` +~3,6 KB (rede); `paradigms` +~4 KB |
| Mini-lab em `app.js` | 16+ caps (fase 0) | `#lab-host` + `innerHTML` + toggles + `onchange` |
| Step-lab em `app.js` | ~40 caps | `$`, `step`/`reset`, `render()`, DOM ← `snapshot` |
| Blocos HTML | dezenas de `index.html` | Checkpoint, MC (`choice-list`), nav, `observation` |
| `build-index.mjs` | 6 cópias por livro | Pequenas diferenças entre livros |
| `lib/` vs `model.js` | subutilizado | Ex.: `math_disc/lib/discrete.js` vs `evalConnective` copiado no cap. 01; `comp_net/lib/queue.js` só referenciado explicitamente no cap. 03 |

## Arquitetura alvo

```
cs-notebooks/
  _shared/
    practice.js      # persistência localStorage + MC + bindPredictionHints
    playground.css   # base visual (hoje ~20 KB comum)
    lab-kit.js       # helpers de wiring (toggles, stepper, $)
  comp_net/
    styles-overlay.css   # opcional: só classes específicas de rede
  _template-livro/       # aponta para _shared; não copia practice.js inteiro
  _template-livro/partials/   # snippets HTML (checkpoint, mc, nav)
  _tools/
    build-book-index.mjs      # unificado; wrappers finos por livro se necessário
```

### `practice.js` compartilhado

- **Entrada:** `<main data-chapter-id="…" data-book-slug="prog_conc" data-practice-mc="mc-ch01">` (ou inferir `book-slug` do primeiro segmento do path da URL quando `data-book-slug` ausente — útil em migração gradual).
- **Chave de storage:** `playground_${bookSlug}__${chapterId}` (compatível com chaves atuais).
- **Incluir** `bindPredictionHints()` em todos os livros (já existe em `vv_eng`/`prog_conc`; unificar comportamento).
- **Migrar** `migrateLegacyStore()` de `prog_conc` para o shared (só roda no capítulo `01-concorrente-paralelo`).
- **HTML dos capítulos:** trocar `../../practice.js` por `../../../_shared/practice.js` (ajustar profundidade) **ou** manter symlink/cópia gerada por `maintain-book` — preferir path relativo único documentado no template.

### CSS compartilhado

- Extrair o CSS comum (hash idêntico em três livros) para `_shared/playground.css`.
- Cada livro: `<link href="../../_shared/playground.css">` + opcional `../../styles.css` ou `styles-overlay.css` com delta.
- `index.html` raiz do hub: hoje usa `prog_conc/styles.css` — passar a `_shared/playground.css`.
- `new-livro.mjs`: copiar/gerar overlay mínimo, não duplicar os 20 KB inteiros.

### `lab-kit.js`

API mínima sugerida (nomes ajustáveis; manter global `PlaygroundLab` ou `window.PlaygroundLab`):

```javascript
// Utilitário
PlaygroundLab.$ = (id) => document.getElementById(id);

// Caps finos (fase 0): checkboxes, selects, inputs simples
PlaygroundLab.mountToggles(hostSel, {
  markup: '...', // ou builder declarativo fields: [{ id, type, label }]
  readState: () => ({ ... }),
  render: (state) => string | void, // atualiza #out
  onInit?: () => void,
});

// Caps ouro: simulação por passos
PlaygroundLab.mountStepper({
  stepId, resetId, clockId?, // ids dos controles já no HTML
  getPlan: () => plan,
  snapshot: (plan, time) => view,
  paint: (view) => void,      // atualiza DOM a partir de view
  onReset?: () => void,
});
```

- **Não** colocar lógica de domínio no kit — só wiring DOM.
- Domínio permanece em `model.js` / `lib/`.

### Partials HTML (build-time / autoragem)

Arquivos em `_template-livro/partials/`:

| Partial | Uso |
| --- | --- |
| `checkpoint.html` | Seção checkpoint padrão (2 textareas) |
| `mc-block.html` | Radios + justificativa dupla + `model-answer` placeholder |
| `chapter-nav.html` | Nav topo/rodapé (placeholders `{{prev}}`, `{{next}}`, `{{title}}`) |
| `observation.html` | `aside.observation` esqueleto |

**Implementação:** pode ser só documentação + snippets copiados pelo agente ao criar capítulo, **ou** função em `_tools/scaffold-chapter.mjs` que injeta partials — fase 2 opcional.

### `build-index.mjs` unificado

- `_tools/build-book-index.mjs --slug comp_net` lê `capitulos/MAPEAMENTO.md` + metadados do README do livro.
- Substituir corpo duplicado nos 6 `capitulos/_tools/build-index.mjs` por `import` + reexport ou script de 3 linhas.

### Padrão `lib/` (livros novos)

1. Funções puras em `<slug>/lib/*.js` + `node --test`.
2. `model.js` fino: reexporta API no global (`XxxLab`) e `module.exports` para testes do capítulo quando fizer sentido.
3. Browser: `<script src="../../lib/foo.js" defer>` antes de `model.js` **quando** a lógica for compartilhada entre caps (padrão já usado em `comp_net/capitulos/03-perda-fila-esgotada`).

Documentar no `lib/README.md` do livro e uma linha em [AGENTS.md](AGENTS.md) após fase 5.

## Implementação em fases

Cada fase = PR revisável; testes verdes antes de merge.

### Fase 1 — `_shared/practice.js` (prioridade máxima, baixo risco)

**Escopo**

- Criar `_shared/practice.js`.
- Atualizar `_template-livro/` e `_tools/new-livro.mjs` para referenciar shared (não duplicar arquivo no novo livro).
- Piloto: **um** capítulo por livro com path novo para shared + confirmar localStorage e MC (sugestão: `vv_eng/capitulos/01-falha-reproduzivel`, `comp_net/capitulos/01-pontos-extremos-servico`).
- Manter `/<livro>/practice.js` como reexport de uma linha apontando para shared **ou** deprecar com comentário — decisão do implementador; preferir reexport 2 linhas para não quebrar 50+ HTML de uma vez.

**Critérios de aceite**

- [x] Novo livro via `new-livro.mjs` não contém cópia completa de `practice.js`.
- [ ] Piloto: campos e MC persistem após reload.
- [ ] `prog_conc` cap. 01: migração legacy ainda funciona se testada manualmente.

### Fase 2 — `_shared/playground.css`

**Escopo**

- Extrair CSS comum; overlays em `comp_net/` e `paradigms/` se necessário.
- Atualizar hub `index.html`, `_template-livro`, `new-livro.mjs`.
- Piloto: mesmo conjunto de caps que fase 1 + abrir no browser (visual inalterado).

**Critérios de aceite**

- [ ] Três livros “base” referenciam shared sem regressão visual óbvia.
- [ ] `comp_net` mantém tabelas/listas de rede (classes específicas preservadas).

### Fase 3 — `_shared/lab-kit.js` + 2 caps piloto

**Escopo**

- Implementar `mountToggles` e `mountStepper`.
- Refatorar **1 cap fino** (ex.: `vv_eng/capitulos/01-falha-reproduzivel` ou `math_disc/01-proposicoes-conectivos`) e **1 cap ouro** (ex.: `comp_net/capitulos/07-arp-primeiro-salto` — só extrair stepper/toolbar, não o DOM rico).
- Adicionar `<script src="…/_shared/lab-kit.js">` no template antes de `app.js`.
- Documentar padrão em `_template-livro/capitulos/README.md` ou snippet no TEMPLATE.

**Critérios de aceite**

- [x] `node --test` dos dois caps piloto verdes.
- [x] `app.js` piloto reduzido essencialmente a config + chamadas ao kit.
- [ ] Comportamento do lab idêntico ao antes (smoke manual).

### Fase 4 — partials + scaffold (opcional mas alto valor para caps novos)

**Escopo**

- Criar `partials/` e, se couber, `_tools/scaffold-chapter.mjs` (args: livro, slug, título).
- Não migrar caps antigos em massa.

**Critérios de aceite**

- [ ] Agente consegue gerar capítulo 01 mínimo a partir do scaffold alinhado ao [molde](README.md#molde-pedagógico-todos-os-livros-e-capítulos).
- [x] `finalize-chapter` continua passando.

### Fase 5 — `build-book-index.mjs` + política `lib/`

**Escopo**

- Unificar gerador de sumário.
- Atualizar [AGENTS.md](AGENTS.md) com `data-book-slug`, paths `_shared`, uso de `lab-kit` e `lib/` first.
- Entrada no **Diário** do WORKBOARD ao concluir.

**Critérios de aceite**

- [x] `node` rebuild de índice para os 5 livros sem diff inesperado (ou diff só de links se intencional).
- [x] README/AGENTS apontam para `plan.md` como referência de infra.

## Migração gradual dos capítulos existentes

| Ação | Quando |
| --- | --- |
| Capítulo **novo** | Obrigatório: `_shared` + `lab-kit` se aplicável + partials |
| Capítulo **em edição** (reivindicado no WORKBOARD) | Migrar scripts/CSS se o agente já estiver no arquivo |
| Capítulo estável publicado | Só se houver ticket/onda explícita (ex.: “enriquecimento fase 0”) |

**Reexports temporários** (`/<livro>/practice.js` → reexport) são aceitáveis até todos os `index.html` apontarem para `_shared`.

## Testes

```bash
# Por livro (ajustar glob)
node --test comp_net/lib/*.test.js comp_net/capitulos/*/model.test.js
node --test prog_conc/capitulos/*/model.test.js
node --test paradigms/capitulos/*/model.test.js math_disc/capitulos/*/model.test.js vv_eng/capitulos/*/model.test.js

# Manutenção após tocar gabaritos/índices
node _tools/maintain-book.mjs <slug>
node _tools/refresh-workboard.mjs
```

Smoke browser: abrir capítulo piloto via `file://` (com `local-links.js` se necessário) e via Pages se disponível.

## Referências no repositório

| Referência | Caminho |
| --- | --- |
| Capítulo ouro (densidade) | `comp_net/capitulos/07-arp-primeiro-salto/` |
| Mini-lab típico | `vv_eng/capitulos/01-falha-reproduzivel/app.js` |
| Lib compartilhada (rede) | `comp_net/lib/queue.js`, cap. `03-perda-fila-esgotada` |
| Lib subutilizada (discreta) | `math_disc/lib/discrete.js` vs `capitulos/01-…/model.js` |
| `practice.js` canônico completo | `prog_conc/practice.js` (inclui legacy + hints) |

## Handoff para o agente implementador

1. Reivindicar linha no [WORKBOARD.md](WORKBOARD.md): livro `infra` ou `_shared`, slugs `fase-1-practice` etc.
2. Implementar **Fase 1** primeiro; só então Fase 2.
3. Não misturar enriquecimento pedagógico de capítulo com refactor de infra no mesmo PR grande.
4. Ao fechar cada fase: testes, breve nota no **Diário** do WORKBOARD, remover reivindicação.
5. Marcar seções deste `plan.md` com data/PR quando cada fase concluir (editar **Status** no topo).

## Fora de escopo (explícito)

- Bundler, ES modules no browser, framework de componentes no cliente.
- Reescrita pedagógica de todos os caps da fase 0.
- Unificar todos os `model.js` em um único módulo por livro (só evitar cópia via `lib/` quando a função já existir).

---

*Documento gerado para handoff entre agentes. Origem: auditoria 80/20 de duplicação em `cs-notebooks`.*
## Entrega — 2026-11-25
- Fase 1: shared practice e pilotos cap. 01 dos cinco livros; scripts antigos preservados para migração gradual.
- Fase 2: base completa em _shared/playground.css; styles.css locais são imports + deltas. Novos livros copiam apenas o import.
- Fase 3: lab-kit e pilotos vv_eng/01 e comp_net/07; testes exercitam os controles, cache e reset.
- Fase 4: quatro partials documentados para autoria manual; scaffold executável opcional não necessário.
- Fase 5: gerador único com wrappers de três linhas. MAPEAMENTO define sequência; index-metadata.json guarda textos editoriais; index-template.html preserva layouts existentes. README de cada livro continua fonte pedagógica; metadados visuais explícitos evitam extrair informações de prosa livre.
- Correção adicional: sincronização de gabarito idempotente, sem acumular indentação.
- Verificação: maintain-all, testes dos cinco livros e shared, teste de rebuild idêntico e resolução de recursos, geração de livro temporário (removido depois).
- Smoke visual via file:// tentado, mas o Chrome encerrou antes de produzir DOM. Não foi validado no Pages.

## Revisão geral de laboratórios — 2026-11-25

Revisão de código e estrutura dos 61 capítulos publicados, autorizada pelo usuário. Esta revisão não equivale a inspeção visual em navegador.

| Livro | Capítulos revisados | Resultado |
| --- | --- | --- |
| comp_net | 01–08 (8) | Layouts próprios preservados; margens compartilhadas para métricas e tabelas, rodapé de controles ajustado |
| prog_conc | 01–29 (29) | Toolbar/comparações preservadas; métricas, listas e logs diretos recebem margens compartilhadas |
| paradigms | 01–08 (8) | Cap. 01 preservado; caps. 02–08 recebem espaçamento de compact-lab para controles soltos |
| math_disc | 01–09 (9) | Nove mini-labs com cabeçalho, padding, controles e resultado; exemplos fixos apresentam a entrada |
| vv_eng | 01–07 (7) | Cap. 01 com cartões de evidência; outros seis com mini-lab compartilhado, campos rotulados e saída destacada |

### Concluído e verificado
- [x] CSS compartilhado de mini-lab: entradas, checkboxes, saída e adaptação móvel.
- [x] Removida instrução para alterar controles nos exemplos que não possuem controles.
- [x] Rótulos de campos em pirâmide, AAA, invariantes, conectivos e indução.
- [x] Resultado dos mini-labs anunciado por role=status/aria-live.
- [x] Manutenção dos cinco livros e 107 testes automatizados verdes.
- [x] Geração de livro sem cópia de practice.js, rebuild idêntico de índices e testes de controles dos pilotos (entrega anterior).

### Pendências e limites
- [ ] Inspeção visual em navegador, desktop e móvel, cobrindo mini-lab, compact-lab, redes, concorrência e laboratório de evidências. Chrome encerrou no ambiente na tentativa anterior.
- [ ] Smoke file:// com persistência real após reload; testes atuais usam DOM/storage simulados.
- [ ] Smoke no GitHub Pages após publicação.
- [ ] Commit/PR/push, quando solicitado.
- Migração dos scripts practice.js e wiring de todos os capítulos é gradual; só cinco pilotos de persistência e dois de lab-kit foram migrados. Não é requisito migrar todo o acervo para concluir a infraestrutura.
- Snippets manuais e scaffold executável entregues; veja atualização de 2026-11-26.
- Débito histórico de labs fixos: resolvido na onda de enriquecimento da Fase 0 em 2026-11-26; ver entrega abaixo.


## Geração futura — entrega 2026-11-26
- [x] Scaffold completo: HTML, chapter.json, gabarito, modelo, teste e app com quatro tipos de lab.
- [x] Proteção contra sobrescrita; draft bloqueia publicação; conteúdo e domínio exigem revisão antes de status ready.
- [x] Componentes com layout: campos rotulados, seleções, resultados, tabela com caption e simulação por passos.
- [x] Validação estática integrada a finalize-chapter: IDs, rótulos, recursos/navegação locais, placeholders em HTML e gabarito, radios e status.
- [x] Índices rejeitam números/slugs duplicados no mapa e metadados inválidos, duplicados ou divergentes.
- [x] Quatro referências completas em _template-livro/lab-examples, copiadas para livros novos.
- [x] Testes Node para geração dos quatro tipos, recusa de sobrescrita, bloqueio de draft, validação, metadados e escape dos componentes.

### Decisões e limites atuais
Testes reais de navegador estão fora do escopo por solicitação explícita do usuário em 2026-11-26. As pendências históricas de smoke acima não são tarefas de automação a executar nesta entrega.
O scaffold gera conteúdo pedagógico de rascunho, não inventa um capítulo pronto sobre um tema arbitrário. A publicação exige conteúdo curado e adaptação do modelo de referência.
Validação estrita roda no capítulo passado a finalize-chapter. maintain-all continua verificando o acervo com as regras anteriores para não bloquear toda manutenção por rótulos legados; capítulos antigos podem precisar de correção ao serem finalizados individualmente.
Migração de todo o acervo para componentes segue gradual. Não houve reescrita dos capítulos publicados nesta entrega.

Validação final desta entrega: 114 testes Node verdes; maintain-all e git diff --check verdes.


## Enriquecimento da Fase 0 — 2026-11-26
Concluídos os 24 capítulos: matemática discreta 9/9, V&V 7/7 e paradigmas 8/8.
- Conceitos e exemplos corretos antes de previsões; exercícios específicos, alternativas plausíveis, transferência e critérios completos nos gabaritos.
- Matemática: domínio/predicado, conjuntos, relações com domínio explícito, soma/indução, prova por selos com quatro bases, grafo dirigido e contagem com/sem repetição. Entradas manipuláveis; contagens grandes usam BigInt para exatidão.
- V&V: custo ilustrativo de suíte, Arrange/Act/Assert executado, dependências simuladas, ordem TDD e propriedades de ordenação que distinguem ordem de preservação.
- Paradigmas: laboratório rico de soma preservado; comparação de ordem de funções, composição com dependência substituível, validação de conta, conversão explícita e escalonamento com incremento perdido.
- Persistência compartilhada nos 24; lógica matemática reutilizada via lib; apps novos usam componentes. Gabarito somente no collapse final.
- Validação final: 138 testes Node, maintain-all e validação estática dos 24 capítulos verdes. Nenhum teste real de navegador.
Limites conscientes: banco, threads e checagem estática real não são executados; ranking de paradigma e custos de testes são heurísticos didáticos. Testes de propriedades usam casos escolhidos, sem gerador automático. Esses limites constam nas páginas e no WORKBOARD.
