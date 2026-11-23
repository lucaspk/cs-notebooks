Minha ideia é parar de estudar só teoria e não aprender nada. 

Cognitive overload. Leio um monte de coisa e a cabeça não fica com espaço na working memory para pensar e entrar no modo difuso e conectar coisas.

Acabo perdendo a motivação porque parece que aquele estudo não gera resultado, pois a retenção fica prejudicada.

Quero ir por um caminho diferente de tudo que fiz até hoje. Inverter os papeis. 

Mais prática do que teoria. Pouquinho de teoria e muita prática e assim vou.

Cada livro do playground (por tema) segue o mesmo molde de capítulo descrito abaixo. O README de cada tema guarda o roteiro de conteúdo; este arquivo guarda o **molde pedagógico** comum.

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

Cada livro em `playground/<tema>/` mantém:

- `index.html` — sumário
- `styles.css` — aparência do livro e classes de prática (`.practice-*`)
- `practice.js` — persistência das respostas abertas e MC (`localStorage` por capítulo)
- `capitulos/README.md` — convenções técnicas do tema (ordem HTML, atributos, checklist ao publicar)
- `capitulos/TEMPLATE.html` — esqueleto de nova página
- `capitulos/NN-slug/` — capítulo (`index.html` + `app.js` / `model.js` / testes, quando houver)
- `README.md` — roteiro temático e ordem didática **daquele** assunto

O molde pedagógico **não se repete** integralmente em cada README de tema; basta referenciar este arquivo.

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