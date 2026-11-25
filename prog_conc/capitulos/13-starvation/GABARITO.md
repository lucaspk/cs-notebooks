# Gabarito — 13-starvation

Autocorreção. Sincronizar: `node ../../_tools/sync-chapter-gabarito.mjs prog_conc`.

## Objetivo

Objetivo: ver uma tarefa de baixa prioridade nunca receber CPU sob escalonamento enviesado e comparar com justiça mínima.

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

## MC (mc-ch13)

B. Progresso individual falha apesar do sistema seguir.

| Letra | Por que não |
| --- | --- |
| A | rejeitar — Starvation = deadlock. |
| B | **correta** — Starvation = tarefa pronta que nunca é escalonada. |
| C | rejeitar — Lock-free garante ausência de starvation. |
| D | rejeitar — Só com prioridades explícitas no código. |
