# Gabarito — 02-execucao-sequencial

Autocorreção. Sincronizar: `node ../../_tools/sync-chapter-gabarito.mjs prog_conc`.

## Objetivo

Objetivo deste capítulo: ver o modo mais simples — uma tarefa vai até o fim antes da próxima começar — e prever tempos de término sem alternância.

## Pré-teste e previsões

Pergunta: Com A=4 e B=4 blocos, em que instante B começa a executar?
| pretest-start-b | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

Pergunta: Com os padrões do laboratório (A=6, B=4), qual o tempo total?
| predict-duration | Conferir após executar o experimento; previsão errada antes do lab é esperada. |

## Demais campos

**compare-ch01** — Alternância vs fila: quem espera mais?

Separar o que é invariante (trabalho, invariante, protocolo) do que muda (tempo, ordem, visibilidade, anomalia).

**mc-why** — ver bloco no capítulo

Justificar a letra correta da MC e refutar cada alternativa em uma linha.

## Checkpoint

Pergunta: Quando B começa, em uma frase?
| checkpoint-1 | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

## MC (mc-ch02)

B. Fila estrita. A não é alternância; D é falso — costuma ser igual ou maior em CPU-bound puro.

| Letra | Por que não |
| --- | --- |
| A | rejeitar — Sequencial é o mesmo que concorrente com alternância 1. |
| B | **correta** — B só executa depois que A atinge 100% do trabalho. |
| C | rejeitar — O tempo total é sempre menor que no capítulo 01. |
