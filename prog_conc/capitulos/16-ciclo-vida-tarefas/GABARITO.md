# Gabarito — 16-ciclo-vida-tarefas

Autocorreção. Sincronizar: `node ../../_tools/sync-chapter-gabarito.mjs prog_conc`.

## Objetivo

Objetivo: acompanhar pool, fila, falha, timeout e cancelamento — distinguir quem parou de esperar de quem foi abortado.

## Pré-teste e previsões

Pergunta: Timeout do cliente = tarefa cancelada?
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

## MC (mc-ch16)

B e C são cenários realistas; A é falso.

| Letra | Por que não |
| --- | --- |
| A | rejeitar — Timeout sempre cancela a tarefa no worker. |
| B | **correta** — Quem espera pode desistir sem a tarefa saber. |
| C | rejeitar — Pool cheio + tarefas dependentes pode deadlockar o pool. |
| D | rejeitar — Future.get nunca lança exceção. |
