# Programação concorrente — playground

Abra `index.html` no navegador para acessar o sumário do livro interativo. Cada capítulo tem sua própria página. Não precisa instalar dependências ou iniciar um servidor.

## Organização do livro

- `index.html`: sumário com os **29 capítulos** (regenerar com `node capitulos/_tools/build-index.mjs`).
- `capitulos/MAPEAMENTO.md`: tabela canônica slug ↔ roteiro didático.
- `capitulos/01-concorrente-paralelo/index.html`: página do primeiro experimento.
- Cada capítulo tem uma pasta em `capitulos/`, com seu HTML, sua lógica de interação e seus modelos de simulação.
- `styles.css`: aparência compartilhada do livro. Estilos específicos de um capítulo podem ficar em sua própria pasta.
- `practice.js`: salva respostas dos capítulos no `localStorage` (ver `capitulos/README.md`).
- `capitulos/README.md` e `capitulos/TEMPLATE.html`: convenções e esqueleto para novos capítulos.

Cada página deve ter um objetivo pequeno, um experimento interativo e pouca teoria, recolhida quando possível. A navegação leva de volta ao sumário; anterior e próximo apontarão para capítulos já disponíveis conforme o livro crescer.

Os tipos de prática e a sequência sugerida estão no [molde pedagógico do playground](../README.md#molde-pedagógico-todos-os-livros-e-capítulos). Ao publicar, siga o checklist do molde e o guia em `capitulos/README.md`.

## Capítulos publicados

| Cap. | Slug | Objetivo (uma frase) | Mix de prática |
| --- | --- | --- | --- |
| 01 | `01-concorrente-paralelo` | Distinguir concorrência e paralelismo; prever efeito de núcleos e alternância no tempo total | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 02 | `02-execucao-sequencial` | Prever tempo total quando cada tarefa roda até o fim antes da próxima | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 03 | `03-threads-nucleos` | Relacionar threads, fila de prontas, núcleos e preempção | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 04 | `04-espera-io` | Distinguir tarefa em CPU, bloqueada e pronta após I/O | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 05 | `05-interleavings` | Encontrar interleavings que quebram invariantes e distinguir safety de liveness | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 06 | `06-contador-perdido` | Produzir lost update dividindo ler/calcular/gravar | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 07 | `07-toctou` | Mostrar corrida entre checagem e uso de recurso | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 08 | `08-mutex-atomicidade` | Corrigir contador com mutex e comparar com incremento atômico | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 09 | `09-semaforos` | Limitar concorrência com semáforo versus exclusão mútua | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 10 | `10-produtor-consumidor` | Coordenar fila limitada entre produtor e consumidor | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 11 | `11-deadlock` | Criar deadlock por ordem de locks e estratégia de prevenção | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 12 | `12-livelock` | Distinguir livelock de falta de progresso útil | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 13 | `13-starvation` | Observar inanição e efeito de justiça no escalonamento | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 14 | `14-inversao-prioridade` | Ver tarefa alta bloqueada por recurso de prioridade baixa | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 15 | `15-visibilidade-memoria` | Garantir publicação e visibilidade entre threads | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 16 | `16-ciclo-vida-tarefas` | Pools, erros, cancelamento e timeout sem confundir espera com cancelamento | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 17 | `17-dirty-read` | Ler alteração não confirmada de outra transação | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 18 | `18-dirty-write` | Escrever por cima de transação ainda aberta | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 19 | `19-leitura-nao-repetivel` | Reler registro e ver mudança após commit alheio | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 20 | `20-leitura-fantasma` | Consulta repetida com conjunto de linhas diferente | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 21 | `21-lost-update-transacao` | Perder atualização entre duas transações serializadas mal | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 22 | `22-read-skew` | Ler fatos relacionados de instantes incompatíveis | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 23 | `23-write-skew` | Transações que passam sozinhas mas violam regra global | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 24 | `24-isolamento-niveis` | Mapear nível de isolamento às anomalias permitidas | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 25 | `25-contencao-desempenho` | Medir espera em lock quente e efeito de fragmentar locks | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 26 | `26-amdahl-false-sharing` | Calcular teto de Amdahl e tráfego de false sharing | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 27 | `27-cas-lock-free` | Comparar corrida, mutex e CAS; nuance lock-free | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 28 | `28-aba-linearizabilidade` | Detectar ABA e papel de versão na linearizabilidade | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |
| 29 | `29-servicos-mensagens` | Idempotência, ordem e LWW com mensagens imperfeitas | pré-teste, previsão, lab, comparar/MC, checkpoint; teoria em `<details>` |

Testes automatizados: `cd capitulos && node --test $(find . -name 'model.test.js' | sort | tr '\n' ' ')` (49 testes no total).

### Conformidade — capítulo 01

Checklist do [molde pedagógico](../README.md#checklist-antes-de-publicar-um-capítulo):

- [x] Objetivo de aprendizagem em uma frase
- [x] Níveis de Bloom alvo (comentário HTML no `index.html`)
- [x] Mix de práticas e ordem alinhados ao molde
- [x] Pré-teste e previsão antes do lab
- [x] Atividade que força descartar alternativas (MC + justificativa)
- [x] Exemplo trabalhado antes do lab
- [x] Design mínimo
- [x] Checkpoint final
- [x] `node --test capitulos/01-concorrente-paralelo/model.test.js`

Uma etapa da ordem didática pode render vários capítulos. Deadlock, livelock, dirty read e phantom read, por exemplo, terão páginas separadas. O roteiro completo permanece neste README; cada página apresenta apenas o assunto daquele experimento.

## Experimento 01: concorrente e paralelo

A página segue o [molde pedagógico](../README.md#molde-pedagógico-todos-os-livros-e-capítulos). Respostas persistem via `practice.js` (`localStorage`, chave `playground_prog_conc__01-concorrente-paralelo`).

No laboratório:

1. Clique em **Um passo** e veja quais tarefas avançam em cada cenário.
2. Execute até o fim e compare os tempos para concluir o mesmo trabalho.
3. Mude a alternância para **3 blocos**. Antes de executar, registre a previsão no formulário.
4. Mude o trabalho por tarefa e experimente de novo.

O cenário de um núcleo mostra concorrência por alternância. O de dois núcleos mostra paralelismo, que também é concorrência. A simulação usa tarefas de cálculo independentes e ignora o custo de alternar entre tarefas. Não cria threads ou núcleos reais: representa a execução para você explorar o conceito.

Cada passo avança uma unidade de tempo nos dois cenários. Os blocos destacados mostram o intervalo que acabou de ser executado. Depois de concluído, o núcleo fica livre. Ao pausar, a visualização mantém o último passo.

Para verificar a lógica do experimento:

```sh
node --test capitulos/01-concorrente-paralelo/model.test.js
```

## Ordem didática sugerida

Este é o roteiro dos próximos experimentos. Capítulos **01–08** estão publicados (sequência didática 1–6 do roteiro).

Avançar com **um cenário pequeno por vez**: prever o resultado, executar passo a passo, mudar uma condição e explicar o que aconteceu. Os problemas abaixo são um mapa para consultar conforme aparecerem nos experimentos.

### Sequência de experimentos

1. **Execução sequencial, concorrente e paralela.** Comparar as mesmas tarefas executando uma depois da outra, por alternância e simultaneamente. Observar quem avança e quando o trabalho termina.

2. **Processos, threads, núcleos e escalonamento.** Distinguir o programa, seus fluxos de execução e o recurso físico que os executa. Comparar 1 núcleo com 2 threads e 2 núcleos com 4 threads; visualizar fila de prontas, preempção e troca de contexto. Começar com threads de software sem SMT/Hyper-Threading; explorar threads de hardware depois.

3. **Processamento e espera por I/O.** Fazer uma tarefa esperar pela rede enquanto outra trabalha. Distinguir pronta, executando e bloqueada; comparar execução bloqueante com assíncrona. Observar que pode haver concorrência com uma única thread, como em um event loop.

4. **Interleavings, não determinismo e invariantes.** Escolher a ordem dos passos de duas tarefas e encontrar resultados diferentes. Definir uma regra que sempre deveria valer. Introduzir segurança (*safety*: nada incorreto acontece) e progresso (*liveness*: o trabalho consegue avançar).

5. **Estado compartilhado e condições de corrida.** Duas tarefas incrementam o mesmo contador. Separar ler, calcular e escrever para produzir uma atualização perdida. Depois, disputar a última vaga disponível para explorar TOCTOU.

6. **Seção crítica, exclusão mútua e atomicidade.** Corrigir o contador com um mutex e comparar com um incremento atômico. Explorar semáforos e a diferença entre limitar acessos e proteger uma operação composta. Um conjunto de operações individualmente seguras pode precisar de coordenação adicional.

7. **Comunicação e coordenação.** Construir um produtor e um consumidor com uma fila limitada. Experimentar espera por condição, sinalização, passagem de mensagens, `join` e barreiras, uma ferramenta por cenário. Observar notificações perdidas e a necessidade de verificar novamente a condição ao acordar.

8. **Problemas de progresso.** Usar dois recursos adquiridos em ordens opostas para criar um deadlock; depois, mudar a regra para evitá-lo. Criar cenários separados para livelock, starvation e inversão de prioridade. Comparar ordem de aquisição, justiça e tentativas com espera variável.

9. **Visibilidade e ordenação da memória.** Uma thread publica um resultado e outra observa um sinal de “pronto”. Explorar *happens-before*, publicação segura e diferenças entre atomicidade, visibilidade e ordenação. A visualização precisa representar um modelo de memória explícito; a ordem da animação sozinha não demonstra o comportamento do hardware.

10. **Ciclo de vida das tarefas.** Introduzir pools, futures/promises, erros, cancelamento e timeouts. Fazer uma tarefa falhar enquanto outras continuam e garantir a liberação de recursos. Um timeout de quem espera não significa que a tarefa foi cancelada. Explorar também a espera por tarefas que não conseguem iniciar em um pool ocupado.

11. **Transações e isolamento.** Representar duas sessões de banco de dados, com `commit`, `rollback` e versões dos dados. Explorar uma anomalia por vez: dirty read, dirty write, non-repeatable read, phantom read, lost update, read skew e write skew. Depois, comparar locks, MVCC, isolamento por snapshot e serializabilidade. As garantias dependem do banco e do nível de isolamento.

12. **Desempenho e limites da concorrência.** Medir contenção, custo de troca de contexto, excesso de threads e filas crescendo. Introduzir backpressure, granularidade dos locks, false sharing e a parte sequencial do trabalho, com a lei de Amdahl. Testar quando adicionar threads deixa de ajudar.

13. **Algoritmos sem locks — aprofundamento.** Depois de entender atomics e memória, explorar compare-and-swap (CAS), ABA, linearizabilidade e recuperação segura de memória. Distinguir *lock-free* (garantia de progresso do sistema) de *wait-free* (garantia por operação em um número limitado de passos), sem assumir que ausência de locks elimina starvation.

14. **Concorrência entre serviços — extensão opcional.** Adicionar mensagens atrasadas, duplicadas e fora de ordem. Experimentar idempotência, retries e respostas antigas sobrescrevendo resultados novos. Essa etapa acrescenta falhas de comunicação ao que já foi aprendido.

### Problemas de estado compartilhado e memória

As distinções de acesso concorrente e visibilidade podem ser consultadas no [detector de data races do Go](https://go.dev/doc/articles/race_detector) e no [modelo de memória do Java](https://docs.oracle.com/javase/specs/jls/se25/html/jls-17.html).

| Problema | O que observar no experimento |
| --- | --- |
| **Race condition — condição de corrida** | A correção depende da ordem ou do momento relativo das operações. Não exige execução paralela. |
| **Data race — corrida de dados** | Acessos conflitantes à mesma posição de memória, pelo menos um de escrita, sem a sincronização exigida pelo modelo de memória. É diferente de uma condição de corrida na lógica do programa. |
| **Lost update — atualização perdida** | Duas tarefas leem o mesmo valor inicial; uma escrita sobrescreve o efeito da outra. |
| **TOCTOU — time-of-check to time-of-use** | A condição verificada muda antes de ser usada: duas tarefas veem a última vaga livre e ambas tentam ocupá-la. |
| **Violação de atomicidade** | Outra tarefa interfere no meio de uma sequência que precisava ser indivisível. |
| **Violação de ordem** | Uma operação ocorre antes de uma dependência necessária, como usar algo antes da inicialização. |
| **Falha de visibilidade / leitura desatualizada** | Uma thread não tem garantia de observar uma atualização feita por outra. |
| **Torn read — leitura fragmentada** | Uma leitura sem garantia de atomicidade mistura partes de valores diferentes, observando uma atualização incompleta. |
| **Publicação insegura** | Outra thread recebe acesso a um objeto sem garantia de observar sua inicialização completa. |

**TOCTOU** é a abreviação de *time-of-check to time-of-use*: a corrida entre verificar e usar um recurso, conforme a [definição do MITRE](https://cwe.mitre.org/data/definitions/367.html).

### Problemas de coordenação e progresso

As diferenças entre bloqueio e falta de progresso aparecem nos exemplos de [deadlock](https://docs.oracle.com/javase/tutorial/essential/concurrency/deadlock.html), [starvation e livelock](https://docs.oracle.com/javase/tutorial/essential/concurrency/starvelive.html). A [documentação do kernel Linux](https://www.kernel.org/doc/html/latest/locking/rt-mutex-design.html) explica inversão de prioridade, e os [blocos de espera do Java](https://docs.oracle.com/javase/tutorial/essential/concurrency/guardmeth.html) ilustram a verificação da condição ao acordar.

| Problema ou fenômeno | O que observar no experimento |
| --- | --- |
| **Deadlock** | Tarefas ficam bloqueadas por dependências que impedem seu avanço; por exemplo, cada uma segura um recurso que a outra precisa. |
| **Livelock** | Tarefas continuam reagindo umas às outras e mudando de estado, mas não concluem trabalho útil. |
| **Starvation — inanição** | Uma tarefa é continuamente preterida e não obtém tempo ou recursos para avançar. |
| **Inversão de prioridade** | Uma tarefa prioritária espera um recurso de outra menos prioritária, que ainda pode ser preterida por tarefas intermediárias. |
| **Lost wakeup — notificação perdida** | Uma notificação ocorre antes de a espera estar corretamente estabelecida; a tarefa acaba dormindo sem receber outro aviso. |
| **Spurious wakeup — despertar espúrio** | A espera retorna sem a condição desejada estar satisfeita. Pode ser permitido pela API; o erro é prosseguir sem verificar a condição. |
| **Deadlock por esgotamento do pool** | Todos os workers aguardam tarefas que precisam desses mesmos workers para começar. |
| **Espera ativa excessiva** | Uma tarefa consome processamento verificando repetidamente uma condição, em vez de realizar trabalho útil ou bloquear. |
| **Corridas no cancelamento e encerramento** | Cancelar ou fechar um recurso disputa com tarefas ainda em execução, produzindo efeitos tardios ou uso de recursos já fechados. |

### Anomalias de transações

Esses nomes descrevem interações entre transações. Uma escrita ainda não confirmada e uma leitura desatualizada em memória são situações diferentes. As definições básicas estão na [documentação de isolamento do PostgreSQL](https://www.postgresql.org/docs/current/transaction-iso.html); dirty write, read skew e write skew também são tratados em [A Critique of ANSI SQL Isolation Levels](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-95-51.pdf).

| Anomalia | O que observar no experimento |
| --- | --- |
| **Dirty read — leitura suja** | Ler uma alteração de outra transação antes de seu `commit`; ela pode sofrer `rollback`. |
| **Dirty write — escrita suja** | Sobrescrever uma alteração de outra transação que ainda não foi confirmada. |
| **Non-repeatable read — leitura não repetível** | Reler um registro e encontrar um valor diferente ou sua remoção após outra transação confirmar mudanças. |
| **Phantom read — leitura fantasma** | Repetir uma consulta e encontrar um conjunto diferente de registros que satisfazem o filtro após mudanças confirmadas por outra transação. |
| **Lost update — atualização perdida** | Uma transação grava um cálculo baseado em um valor antigo e apaga o efeito de outra atualização. |
| **Read skew — leitura inconsistente** | Ler dados relacionados de momentos incompatíveis, como saldos antes e depois de uma transferência. |
| **Write skew** | Transações leem uma condição compartilhada e alteram registros diferentes, quebrando juntas uma regra que cada uma julgou respeitar. |
| **Anomalia de serialização** | Transações confirmadas produzem um resultado incompatível com qualquer ordem de execução uma por vez. |

Evitar uma anomalia não garante evitar todas as outras. A serializabilidade diz respeito ao efeito das transações confirmadas; o banco pode abortar uma tentativa, exigindo retry. Os cenários devem indicar quais garantias estão sendo simuladas, como mostra a [comparação dos níveis de isolamento do PostgreSQL](https://www.postgresql.org/docs/current/transaction-iso.html#XACT-SERIALIZABLE).

### Problemas de desempenho e tópicos avançados

| Problema | O que observar no experimento |
| --- | --- |
| **Contenção** | Muitas tarefas disputam o mesmo recurso e passam tempo esperando. |
| **Lock convoy — comboio de locks** | Uma sequência de tarefas fica enfileirada atrás de um lock, com custos sucessivos de espera e retomada. |
| **Oversubscription — excesso de threads executáveis** | Mais threads prontas do que capacidade disponível aumentam disputas e trocas de contexto; mais threads não garantem mais desempenho. |
| **False sharing — falso compartilhamento** | Núcleos alteram dados distintos que ocupam a mesma linha de cache, gerando tráfego de coerência e reduzindo desempenho. |
| **Sobrecarga de filas / ausência de backpressure** | Produtores geram trabalho mais rápido do que consumidores conseguem processar, aumentando fila, memória e latência. |
| **Thundering herd — despertar em massa** | Muitas tarefas acordam para disputar um recurso que poucas poderão usar. |
| **ABA** | Um valor muda de A para B e volta para A; um CAS que compara apenas o valor não detecta a mudança intermediária relevante. |
| **Recuperação insegura de memória** | Uma tarefa libera um objeto que outra ainda pode acessar, causando uso após liberação em ambientes com gerenciamento manual de memória. |
| **Resultados fora de ordem / efeitos duplicados** | Uma resposta antiga substitui uma nova, ou uma repetição de pedido aplica o mesmo efeito duas vezes. Pode ocorrer com tarefas assíncronas e também entre serviços. |

Para os tópicos avançados, a [documentação de false sharing do Linux](https://docs.kernel.org/kernel-hacking/false-sharing.html) mostra o papel da linha de cache. A [referência com versão do Java](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/atomic/AtomicStampedReference.html) oferece um exemplo de comparação atômica com uma marca adicional para distinguir mudanças intermediárias.

### Como avançar

Antes de acrescentar o próximo cenário, conseguir responder:

1. Quem pode executar agora e quem precisa esperar?
2. Qual estado é compartilhado e qual regra precisa continuar verdadeira?
3. Qual ordem de passos produz o problema?
4. Qual coordenação evita o problema e o que ela custa?

Não é necessário responder sobre locks ou transações no primeiro experimento. As perguntas ganham conteúdo conforme cada conceito aparece.
