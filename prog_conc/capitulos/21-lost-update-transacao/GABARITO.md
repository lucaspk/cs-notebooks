# Gabarito — 21-lost-update-transacao

Autocorreção. Sincronizar: `node ../../_tools/sync-chapter-gabarito.mjs prog_conc`.

## Objetivo

Objetivo deste capítulo: mostrar duas transações que leem o mesmo saldo, somam em paralelo e a última confirmação apaga o incremento da primeira.

## Pré-teste e previsões

Pergunta: O que você espera que aconteça no roteiro?
| pretest-1 | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

Pergunta: Qual anomalia aparece? Em qual passo?
| predict-1 | Conferir após executar o experimento; previsão errada antes do lab é esperada. |

## Demais campos

**compare-1** — Compare os dois modos/isolamentos do seletor.

Separar o que é invariante (trabalho, invariante, protocolo) do que muda (tempo, ordem, visibilidade, anomalia).

**mc-why** — Por que escolhi essa opção?

Justificar a letra correta da MC e refutar cada alternativa em uma linha.

**tradeoff-1** — Custo de prevenir esta anomalia (locks, aborts, latência)…

Proposta mínima coerente com o objetivo; citar trade-off explícito.

**context-1** — Onde isso aparece em API/ORM/banco que você usa?

Proposta mínima coerente com o objetivo; citar trade-off explícito.

**design-1** — Qual nível ou trava você escolheria para este caso?

Proposta mínima coerente com o objetivo; citar trade-off explícito.

## Checkpoint

Pergunta: Defina a anomalia em uma frase e como o lab a mostrou.
| checkpoint-1 | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

## MC (mc-ch21)

B. Atualização perdida em transações.

| Letra | Por que não |
| --- | --- |
| A | rejeitar — Termo errado — não envolve transações. |
| B | **correta** — Descrição correta da anomalia / nível. |
| C | rejeitar — Confunde com condição de corrida em memória. |
| D | rejeitar — Confunde com deadlock. |
