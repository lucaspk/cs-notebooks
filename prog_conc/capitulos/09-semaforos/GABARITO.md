# Gabarito — 09-semaforos

Autocorreção. Sincronizar: `node ../../_tools/sync-chapter-gabarito.mjs prog_conc`.

## Objetivo

Objetivo deste capítulo: distinguir semáforo de mutex — limitar quantas tarefas entram num recurso ao mesmo tempo (não só “uma por vez”) — e prever fila versus pico de ocupação.

## Pré-teste e previsões

Pergunta: 1. Semáforo com contagem 2 e 4 tarefas: quantas podem estar dentro do recurso no mesmo instante?
| pretest-peak | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

Pergunta: 2. Mutex é um semáforo especial?
| pretest-mutex | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

Pergunta: No painel Com semáforo (2) , quantas tarefas estão dentro no passo 1? E no painel Sem limite ?
| predict-inside | Conferir após executar o experimento; previsão errada antes do lab é esperada. |

## Demais campos

**compare-same** — O que permanece igual nos dois painéis?

Separar o que é invariante (trabalho, invariante, protocolo) do que muda (tempo, ordem, visibilidade, anomalia).

**compare-diff** — O que muda no pico dentro do recurso?

Separar o que é invariante (trabalho, invariante, protocolo) do que muda (tempo, ordem, visibilidade, anomalia).

**mc-why-yes** — Piscina com 30 vagas , semáforo (30) . O que ele garante? Atomicidade de operações compostas em qualquer ordem. No máximo 30 banhistas ao mesmo tempo na piscina. Ordem FIFO estrita entre todas as threads do processo. Que nunca haverá fila de espera. Por que escolhi essa opção?

Justificar a letra correta da MC e refutar cada alternativa em uma linha.

**mc-why-not** — Por que não as outras?

Justificar a letra correta da MC e refutar cada alternativa em uma linha.

**tradeoff-case** — Caso em que semáforo (3) é melhor que mutex:

Proposta mínima coerente com o objetivo; citar trade-off explícito.

**design-count** — API com acquire() / release() para garagem de 5 vagas e 20 carros: o que o contador representa?

Proposta mínima coerente com o objetivo; citar trade-off explícito.

## Checkpoint

Pergunta: Semáforo (1) vs mutex em uma frase.
| checkpoint-1 | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

Pergunta: Quando aparece fila neste experimento?
| checkpoint-2 | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

## MC (mc-ch09)

B. Contador de vagas. Não A: composto precisa de mutex ou coordenação extra. Não C/D: semáforo não define justiça global nem elimina fila.

| Letra | Por que não |
| --- | --- |
| A | rejeitar — Atomicidade de operações compostas em qualquer ordem. |
| B | **correta** — No máximo 30 banhistas ao mesmo tempo na piscina. |
| C | rejeitar — Ordem FIFO estrita entre todas as threads do processo. |
| D | rejeitar — Que nunca haverá fila de espera. |
