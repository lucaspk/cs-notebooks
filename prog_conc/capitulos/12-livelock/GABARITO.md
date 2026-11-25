# Gabarito — 12-livelock

Autocorreção. Sincronizar: `node ../../_tools/sync-chapter-gabarito.mjs prog_conc`.

## Objetivo

Objetivo: distinguir livelock de deadlock — há atividade, mas não progresso útil — e ver uma regra que quebra o ciclo social.

## Pré-teste e previsões

Pergunta: Duas pessoas no corredor cedem eternamente — deadlock ou livelock?
| pretest | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

Pergunta: Cedências no painel educado vs progresso no pragmático.
| predict | Conferir após executar o experimento; previsão errada antes do lab é esperada. |

## Demais campos

**mc-why-yes** — ver bloco no capítulo

Justificar a letra correta da MC e refutar cada alternativa em uma linha.

**mc-why-not** — ver bloco no capítulo

Justificar a letra correta da MC e refutar cada alternativa em uma linha.

## Checkpoint

Pergunta: Checkpoint
| checkpoint | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

## MC (mc-ch12)

B.

| Letra | Por que não |
| --- | --- |
| A | rejeitar — Livelock: nenhuma thread muda de estado. |
| B | **correta** — Livelock: mudanças de estado sem concluir trabalho. |
| C | rejeitar — Igual a deadlock. |
| D | rejeitar — Só em sistemas distribuídos. |
