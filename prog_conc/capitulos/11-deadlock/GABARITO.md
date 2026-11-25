# Gabarito — 11-deadlock

Autocorreção. Sincronizar: `node ../../_tools/sync-chapter-gabarito.mjs prog_conc`.

## Objetivo

Objetivo: reconhecer deadlock por ordem oposta de aquisição de dois recursos e prever como uma ordem global evita o ciclo.

## Pré-teste e previsões

Pergunta: Em qual passo o painel Ordem oposta trava?
| predict-step | Conferir após executar o experimento; previsão errada antes do lab é esperada. |

Pergunta: A segura R1 e quer R2; B segura R2 e quer R1 — o que acontece?
| pretest | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

## Demais campos

**design-order** — Ordem global de locks na sua API.

Proposta mínima coerente com o objetivo; citar trade-off explícito.

**compare** — Comparar

Separar o que é invariante (trabalho, invariante, protocolo) do que muda (tempo, ordem, visibilidade, anomalia).

**mc-why-yes** — ver bloco no capítulo

Justificar a letra correta da MC e refutar cada alternativa em uma linha.

**mc-why-not** — ver bloco no capítulo

Justificar a letra correta da MC e refutar cada alternativa em uma linha.

## Checkpoint

Pergunta: Checkpoint
| checkpoint | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

## MC (mc-ch11)

B. Espera circular com posse mútua.

| Letra | Por que não |
| --- | --- |
| A | rejeitar — Deadlock = CPU a 100% sem trabalho útil. |
| B | **correta** — Deadlock = ciclo de espera por recursos já segurados. |
| C | rejeitar — Basta adicionar threads para resolver. |
| D | rejeitar — Só ocorre com mais de dois recursos. |
