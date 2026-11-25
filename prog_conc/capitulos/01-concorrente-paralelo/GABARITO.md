# Gabarito — 01-concorrente-paralelo

Autocorreção. Sincronizar: `node ../../_tools/sync-chapter-gabarito.mjs prog_conc`.

## Objetivo

Objetivo deste capítulo: distinguir concorrência de paralelismo no mesmo trabalho, e prever como núcleos e alternância afetam o tempo total — sem confundir “duas tarefas existem” com “duas tarefas executam ao mesmo tempo”.

## Pré-teste e previsões

Pergunta: 1. Mesmo trabalho em cada painel: com 1 núcleo , as duas tarefas terminam no mesmo tempo que com 2 núcleos ?
| pretest-time | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

Pergunta: 2. Se duas tarefas rodam em paralelo, elas também estão em concorrência?
| pretest-parallel | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

Pergunta: Quantas tarefas avançam no painel Concorrente ? E no Paralelo ?
| predict-first-step | Conferir após executar o experimento; previsão errada antes do lab é esperada. |

Pergunta: Com 6 blocos por tarefa, mude a alternância para 3 blocos . O tempo total no painel de 1 núcleo muda em relação a alternar a cada 1 bloco?
| predict-quantum | Conferir após executar o experimento; previsão errada antes do lab é esperada. |

## Demais campos

**compare-same** — O que é igual nos dois painéis?

Separar o que é invariante (trabalho, invariante, protocolo) do que muda (tempo, ordem, visibilidade, anomalia).

**compare-diff** — O que muda a cada passo?

Separar o que é invariante (trabalho, invariante, protocolo) do que muda (tempo, ordem, visibilidade, anomalia).

**compare-times** — Tempos finais: anote t do concorrente e do paralelo.

Separar o que é invariante (trabalho, invariante, protocolo) do que muda (tempo, ordem, visibilidade, anomalia).

**mc-why-yes** — Servidor com 1 núcleo , duas tarefas de CPU independentes e do mesmo tamanho. Qual afirmação é a mais precisa? Não há concorrência; só uma tarefa existe de cada vez no sistema. Há concorrência, mas não paralelismo neste hardware. Há paralelismo porque as duas tarefas estão definidas no programa. O tempo total é o mesmo que com 2 núcleos, porque o trabalho é idêntico. Por que escolhi essa opção?

Justificar a letra correta da MC e refutar cada alternativa em uma linha.

**mc-why-not** — Por que não cada uma das outras?

Justificar a letra correta da MC e refutar cada alternativa em uma linha.

**tradeoff-case** — Um caso em que 1 núcleo concorrente ainda vale a pena antes de pedir mais núcleos:

Proposta mínima coerente com o objetivo; citar trade-off explícito.

**context-three-tasks** — Três tarefas de CPU independentes , mesmo tamanho, em uma máquina com 2 núcleos . O que você espera?

Proposta mínima coerente com o objetivo; citar trade-off explícito.

**design-quantum** — Na simulação: 6 blocos por tarefa, 1 núcleo . Qual configuração de alternância produz tempo total 12 ? Justifique com o que você viu na linha do tempo.

Proposta mínima coerente com o objetivo; citar trade-off explícito.

## Checkpoint

Pergunta: 1. Mesmo trabalho: 1 núcleo vs 2 núcleos — tempo final?
| checkpoint-time | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

Pergunta: 2. Paralelismo implica concorrência?
| checkpoint-parallel | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

Pergunta: 3. Em uma frase: defina concorrência e paralelismo como neste experimento .
| checkpoint-definitions | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

## MC (mc-ch01)

B. As duas tarefas avançam no mesmo período (concorrência), mas o núcleo único executa uma por vez — sem paralelismo. Não A: concorrência não exige execução simultânea. Não C: paralelismo é sobre execução ao mesmo tempo, não sobre quantas tarefas o código declara. Não D: o trabalho é o mesmo, mas o tempo total costuma dobrar com um núcleo neste modelo.

Dois núcleos executam duas tarefas em paralelo no início; a terceira espera. O tempo total fica entre o de 1 núcleo (tudo serializado) e o de 3 núcleos ideais (todas juntas). Ainda há concorrência; o paralelismo é limitado pelo número de núcleos.

1, 2 ou 3 blocos por alternância levam a 12 unidades com duas tarefas iguais de 6 blocos — a ordem dos fatias muda, mas a soma do trabalho não. Confirme rodando cada opção na simulação.

| Letra | Por que não |
| --- | --- |
| A | rejeitar — Não há concorrência; só uma tarefa existe de cada vez no sistema. |
| B | **correta** — Há concorrência, mas não paralelismo |
| C | rejeitar — Há paralelismo porque as duas tarefas estão definidas no programa. |
| D | rejeitar — O tempo total é o mesmo que com 2 núcleos, porque o trabalho é idêntico. |
