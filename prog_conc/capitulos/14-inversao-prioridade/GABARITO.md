# Gabarito — 14-inversao-prioridade

Autocorreção. Sincronizar: `node ../../_tools/sync-chapter-gabarito.mjs prog_conc`.

## Objetivo

Objetivo: reconhecer quando uma tarefa alta fica bloqueada atrás de uma baixa que segura um recurso — e o efeito de mitigação.

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

## MC (mc-ch14)

B. Cadeia H→L com preempção por M.

| Letra | Por que não |
| --- | --- |
| A | rejeitar — Inversão = H sempre executa antes de L. |
| B | **correta** — H bloqueada enquanto L segura recurso e M interpõe. |
| C | rejeitar — Só em RTOS. |
| D | rejeitar — Igual a deadlock. |
