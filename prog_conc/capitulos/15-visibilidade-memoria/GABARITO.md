# Gabarito — 15-visibilidade-memoria

Autocorreção. Sincronizar: `node ../../_tools/sync-chapter-gabarito.mjs prog_conc`.

## Objetivo

Objetivo: separar atomicidade de visibilidade — publicar ready antes de data ser visível pode enganar o leitor.

## Pré-teste e previsões

Pergunta: Pré-teste
| pretest | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

Pergunta: Previsão
| predict | Conferir após executar o experimento; previsão errada antes do lab é esperada. |

## Demais campos

**mc-why-yes** — ver bloco no capítulo

Justificar a letra correta da MC e refutar cada alternativa em uma linha.

**mc-why-not** — ver bloco no capítulo

Justificar a letra correta da MC e refutar cada alternativa em uma linha.

## Checkpoint

Pergunta: Checkpoint
| checkpoint | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

## MC (mc-ch15)

B. Modelo de memória exige release/acquire para publicar.

| Letra | Por que não |
| --- | --- |
| A | rejeitar — Mutex garante apenas ordenação, nunca visibilidade. |
| B | **correta** — Sem sincronização, leituras podem ver valores defasados. |
| C | rejeitar — volatile torna qualquer programa race-free. |
| D | rejeitar — Data race é sinônimo de condição de corrida lógica. |
