Minha ideia é parar de estudar só teoria e não aprender nada. 

Cognitive overload. Leio um monte de coisa e a cabeça não fica com espaço na working memory para pensar e entrar no modo difuso e conectar coisas.

Acabo perdendo a motivação porque parece que aquele estudo não gera resultado, pois a retenção fica prejudicada.

Quero ir por um caminho diferente de tudo que fiz até hoje. Inverter os papeis. 

Mais prática do que teoria. Pouquinho de teoria e muita prática e assim vou.

Cada livro do repositório (por tema) segue o mesmo molde de capítulo descrito abaixo. O **README do livro** guarda o roteiro daquele assunto; este arquivo guarda o **molde pedagógico** comum e o **mapa de fundamentos**. Catálogo de livros, slugs e scaffolding: [LIVROS.md](LIVROS.md).

**Livros hoje:** [prog_conc/](prog_conc/README.md) (concorrência, 29 caps.) · [comp_net/](comp_net/README.md) (redes, em progresso). Sumário geral: abra [index.html](index.html) no navegador.

**Novo livro:** `node _tools/new-livro.mjs --slug <pasta> --title "Título" --brand "nome no cabeçalho"` (esqueleto em [`_template-livro/`](_template-livro/)).

---

## Mapa de fundamentos (CS & Software Engineering)

Base sólida como rocha: prática guiada por experimento, não enciclopédia. A ordem abaixo não é ordem de leitura obrigatória — é **cobertura** que o playground pretende atingir ao longo do tempo. Itens com livro já existente ou planejado em [LIVROS.md](LIVROS.md).

### Núcleo computacional

| Área | O que você deve conseguir fazer (evidência) | Livro / slug |
| --- | --- | --- |
| **Estruturas de dados e algoritmos** | Escolher estrutura e complexidade; **grafos** (representação, busca, caminhos, árvores geradoras, ordenação topológica, fluxo intro); prever custo e trade-offs | `dsa` (planejado) |
| **Matemática discreta e lógica** | Lógica, conjuntos, relações, indução; grafos como objeto matemático (vocabulário) — algoritmos de grafo ficam em `dsa` | `math_disc` (planejado) |
| **Teoria da computação** | Saber o que é decidível; reduzir problemas; intuição P/NP sem dogma | `th_cs` (planejado) |
| **Arquitetura de computadores** | Explicar cache miss, pipeline e memória virtual em cenários concretos | `arch_cpu` (planejado) |
| **Sistemas operacionais** | Processo vs thread, escalonamento, FS, syscalls, por que I/O bloqueia | `os_kern` (planejado) |
| **Compiladores** | Seguir token → AST → IR; ligar erro de sintaxe a fase do compilador | `compilers` (planejado) |
| **Paradigmas de linguagens** | Escolher estilo (imperativo, FP, OO, concorrente) por expressividade e risco | `paradigms` (planejado) |

### Sistemas, dados e rede

| Área | O que você deve conseguir fazer (evidência) | Livro / slug |
| --- | --- | --- |
| **Redes de computadores** | Decompor latência; seguir pacote; TCP/UDP/DNS/TLS sem misturar camadas | **`comp_net`** |
| **Programação concorrente** | Prever interleaving; locks, filas, transações, progresso | **`prog_conc`** |
| **Bancos de dados** | Consultas, índices, planos, isolamento, WAL, consistência local | `db_sys` (planejado) |
| **Sistemas distribuídos** | Falha parcial, réplicas, ordenação, semântica de entrega | `dist_sys` (planejado) |
| **Microserviços e fronteiras** | Onde dividir; acoplamento temporal; dados não são “detalhe de infra” | `dist_ops` ou capítulos em `dist_sys` |
| **Observability** | Sintoma → sinal (log/métrica/trace); SLO vs causa raiz | `dist_ops` |
| **Resiliência** | Timeout, retry, idempotência, circuit breaker — com custo explícito | `dist_res` |
| **Consistência e consenso** | Linearizável vs eventual; quorum; eleição de líder (intuição operacional) | `dist_cons` |
| **Performance** | Medir, filas, Little, tail latency; não otimizar no escuro | `perf_eng` (planejado) |

### Engenharia, segurança e qualidade

| Área | O que você deve conseguir fazer (evidência) | Livro / slug |
| --- | --- | --- |
| **Engenharia de software** | Requisitos, design, débito técnico, mudança segura, APIs | `soft_eng` (planejado) |
| **Verificação e validação** | Pirâmide de testes, contratos, propriedades, revisão útil | `vv_eng` (planejado) |
| **Segurança** | Ameaça → controle; authn/z; superfície de ataque em apps reais | `sec_eng` (planejado) |

### Transversal (capítulos ou “aprofundar” em vários livros)

- **Versionamento e CI** — revisão, automação, reprodutibilidade  
- **Leitura de especificações** — RFC, docs oficiais, contratos de API  
- **Ética e responsabilidade** — dados, disponibilidade, incidentes  
- **Comunicação técnica** — explicar trade-off por escrito (MC + justificativa já treinam isso)

Áreas que costumam ser esquecidas mas sustentam o resto: **discreta** antes de teoria pesada; **arquitetura** antes de otimizar código; **OS/rede** antes de diagnosticar produção; **concorrência + DB** antes de distribuído; **V&V** em paralelo a todo livro, não só no fim.

### Ordem sugerida entre livros (com dependências)

Não é trilha única obrigatória — é a sequência que **menos quebra working memory** e **menos obriga a adivinhar** em livros posteriores. Detalhe, trilhas alternativas e diagrama: [LIVROS.md § Ordem canônica](LIVROS.md#ordem-canônica-de-estudo).

| Fase | Ordem | Livros (slug) | Depende de (recomendado) | Por que nesta posição |
| --- | --- | --- | --- | --- |
| **0 — Ferramentas mentais** | 0a | `vv_eng` (intro: testes, falhas reproduzíveis) | — | Prática em **todo** livro; começar cedo evita “só ler capítulo” |
| | 0b | `math_disc` | — | Lógica, conjuntos, indução; vocabulário de grafos **sem** algoritmos pesados |
| | 0c | `paradigms` | — | Pode ser cedo ou após `dsa`; ajuda a ler código dos labs |
| **1 — Dados, custo e grafos** | 1 | **`dsa`** | `math_disc` (0b) útil | Complexidade e estruturas em tudo; **inclui teoria dos grafos aplicada** (ver abaixo) |
| **2 — Máquina e execução** | 2a | `arch_cpu` | `dsa` (1) | Cache/pipeline explicam performance real |
| | 2b | `compilers` | `dsa`, `paradigms` | Ligam sintaxe a comportamento |
| | 3 | `os_kern` | `arch_cpu` (2a) | Processos, VM, I/O — base para concorrência e diagnóstico |
| **3 — Comunicação e paralelismo local** | 4a | **`prog_conc`** | `os_kern` (3) | Threads e estado compartilhado assentam em SO |
| | 4b | **`comp_net`** | `dsa` (grafos úteis em rotas), `os_kern` leve | Rede em produção pede SO + latência; **paralelo** com 4a após ~cap. de threads em `os_kern` |
| **4 — Dados e desempenho** | 5 | `db_sys` | `prog_conc`, `dsa` | Isolamento ecoa transações de `prog_conc`; índices ecoam estruturas |
| | 6 | `perf_eng` | `dsa`, `arch_cpu`, `comp_net`, `db_sys` parcial | Filas, Little, tail — juntam modelos de vários livros |
| **5 — Distribuído** | 7 | `dist_sys` | `comp_net`, `prog_conc`, `db_sys` | Falha parcial + rede + concorrência + persistência |
| | 7b | `dist_res` → `dist_cons` → `dist_ops` | `dist_sys` (7) | Resiliência, consenso e operação **depois** do núcleo distribuído |
| **6 — Produção e teoria** | 8a | `sec_eng` | `comp_net`, `dist_*`, `db_sys` | Ameaças reais cruzam rede, dados e auth |
| | 8b | `soft_eng` | `paradigms`, `vv_eng` | Design e mudança sustentável (contínuo) |
| | 8c | `th_cs` | `math_disc`, `dsa` | Autômatos/NP ficam mais leves com indução e complexidade |

**Já publicado / em andamento:** você pode seguir **`prog_conc`** e **`comp_net`** agora; quando bater em limite (threads, fila, isolamento), volte à fase 2–3 acima ou leve em paralelo os caps. de `os_kern` / `dsa` conforme a lacuna.

**Paralelos seguros (se a base da fase já estiver ok):**

- `prog_conc` ∥ `comp_net` (após noções de processo/socket)
- `compilers` ∥ `arch_cpu`
- `soft_eng` + `vv_eng` ∥ qualquer fase (leitura transversal)

**`dsa` e teoria dos grafos:** um único livro `dsa` cobre o bloco **algorítmico** de grafos (não só “mais um capítulo de árvore”). Escopo previsto no [LIVROS.md](LIVROS.md#escopo-dsa-inclui-teoria-dos-grafos). Em `math_disc` ficam definições e argumentos discretos; **busca, caminhos, árvores geradoras, ordenação topológica, fluxos intro** ficam em `dsa`.

---

## Molde pedagógico (todos os livros e capítulos)

### Objetivo

Cada capítulo deve caber na working memory: um objetivo pequeno, um experimento quando fizer sentido, teoria só o necessário (recolhida por padrão). A prática não decora resposta — exige **escolher, justificar e descartar alternativas** na hora.

### Taxonomia de Bloom × tipos de prática

| Tipo de prática | Níveis de Bloom (principal) | O que o estudante faz | Quando usar |
| --- | --- | --- | --- |
| **Pré-teste / pré-ativação** | Lembrar, Compreender | Responde (ou tenta) *antes* da teoria mínima ou do experimento; compara com a resposta depois | Início do capítulo ou de um bloco novo; calibra o que já sabe e o que vai buscar |
| **Previsão no experimento** | Compreender, Aplicar | Antes de executar, prevê o resultado; depois explica a diferença entre previsão e observação | Sempre que houver simulação ou demonstração interativa |
| **Exemplo trabalhado** | Compreender, Aplicar | Acompanha um raciocínio ou cenário já resolvido passo a passo (sem esconder o “por quê”) | Conceito novo ou passo que costuma gerar bloqueio; reduz carga antes do exercício solo |
| **Múltipla escolha + justificativa dupla** | Compreender, Analisar | Escolhe a opção **e** explica por que é essa **e** por que cada alternativa errada não serve | Consolidar distinções finas (termos, sintomas, garantias); evitar “chute com cara de certo” |
| **Comparar cenários** | Analisar | Mesma ideia, duas (ou mais) condições: o que muda, o que permanece, qual invariante quebrou | Depois do experimento ou do exemplo trabalhado |
| **Prós, contras e limites** | Analisar, Avaliar | Lista vantagens, custos e “não use quando…” de uma abordagem **e** das alternativas citadas | Escolha de ferramenta, padrão, nível de isolamento, API, etc. |
| **Melhor opção por contexto** | Avaliar | Dado um caso (requisitos, restrições), defende a melhor opção e o que sacrificaria | Quando o capítulo apresenta mais de uma solução válida |
| **Design / aplicação mínima** | Aplicar, Criar | Propõe ou ajusta algo pequeno (ordem de locks, invariante, desenho de fila, critério de retry…) usando só o que o capítulo cobriu | Quando couber sem puxar pré-requisito de capítulo futuro; pode ser “no papel” ou no próprio playground |

Nem todo capítulo precisa de **todos** os tipos. Escolher o mix pelo **objetivo de aprendizagem** daquele capítulo (uma frase explícita no início da página).

### Sequência sugerida (flexível)

Ordem típica que respeita carga cognitiva e o efeito do exemplo trabalhado:

1. **Pré-teste** (opcional se o tema for totalmente novo — ainda assim pode ser “o que você acha que vai acontecer?”).
2. **Teoria mínima** (recolhida) só se o experimento exigir um termo ou regra.
3. **Previsão → experimento** (passo a passo).
4. **Exemplo trabalhado** (se o solo ainda estiver pesado).
5. **Comparar cenários** e/ou **prós e contras**.
6. **Múltipla escolha com justificativa dupla** (fechamento ou checkpoint).
7. **Design / aplicação mínima** (quando aplicável).

Capítulos mais avançados podem encurtar o exemplo trabalhado e puxar mais **avaliação** e **design**; capítulos introdutórios fazem o contrário.

### Regras de qualidade (para quem escreve o capítulo)

1. **Objetivo único** — Uma habilidade verificável por capítulo (ex.: “distinguir concorrente de paralelo no mesmo workload”).
2. **Justificativa obrigatória** — Em MC, a interface ou o texto pede: “por que esta” e “por que não cada uma das outras” (mesmo que em campos curtos).
3. **Alternativas plausíveis** — Erradas devem ser erros reais de iniciante, não absurdos.
4. **Sem vazar a resposta no experimento** — O interativo mostra evidência; a conclusão o estudante articula.
5. **Checkpoint** — No fim, 2–4 perguntas alinhadas ao objetivo (podem repetir formato de pré-teste para ver ganho).
6. **Teoria recolhida** — Definições e links longos em `<details>` ou seção “aprofundar”, não no fluxo principal.

### Checklist antes de publicar um capítulo

- [ ] Objetivo de aprendizagem em uma frase
- [ ] Níveis de Bloom alvo indicados (para o autor; não precisa aparecer na UI)
- [ ] Mix de práticas escolhido e na ordem razoável
- [ ] Pré-teste ou previsão no início
- [ ] Pelo menos uma atividade que force **descartar** alternativas (MC justificada, comparação ou “melhor por contexto”)
- [ ] Exemplo trabalhado ou experimento guiado antes do exercício mais difícil
- [ ] Design/aplicação mínima **ou** motivo documentado de não caber neste capítulo
- [ ] Checkpoint final

### Onde isso aparece na estrutura de arquivos

Cada livro na raiz do repositório (`<slug>/`, ex. `prog_conc/`, `comp_net/`) mantém:

- `index.html` — sumário
- `styles.css` — aparência do livro e classes de prática (`.practice-*`)
- `practice.js` — persistência (`localStorage`: `playground_<slug>__<chapter-id>`)
- `capitulos/README.md` — convenções do livro
- `capitulos/TEMPLATE.html` — esqueleto de capítulo
- `capitulos/MAPEAMENTO.md` — slugs canônicos
- `capitulos/_tools/build-index.mjs` — gerador do sumário
- `capitulos/NN-slug/` — capítulo (`index.html` + `app.js` / `model.js` / `model.test.js`)
- `lib/` — opcional; módulos puros compartilhados entre capítulos
- `README.md` — roteiro e ordem didática **daquele** assunto

Novo livro: [`_template-livro/`](_template-livro/) e [`_tools/new-livro.mjs`](_tools/new-livro.mjs). Detalhes e roadmap: [LIVROS.md](LIVROS.md).

O molde pedagógico **não se repete** em cada README de livro; basta referenciar **este** arquivo.

### Ordem HTML padrão de um capítulo

1. Objetivo em uma frase (`p.chapter-objective`)
2. Pré-teste
3. Teoria mínima só se indispensável antes do lab (senão `<details>` no fim)
4. Exemplo trabalhado (capítulos introdutórios)
5. Previsão → laboratório interativo
6. Dica viva do experimento (`aside.observation`)
7. Previsões extras ligadas a controles do lab
8. Comparar → MC + justificativa dupla → prós/contras → contexto → design mínimo (só o que fizer sentido)
9. Checkpoint
10. Teoria / aprofundar recolhidos

No `<main>`: `data-chapter-id="NN-slug"` e, se houver MC, `data-practice-mc="mc-chNN"`.