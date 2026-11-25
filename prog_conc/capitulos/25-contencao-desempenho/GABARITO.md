# Gabarito — 25-contencao-desempenho

Autocorreção. Sincronizar: `node ../../_tools/sync-chapter-gabarito.mjs prog_conc`.

## Objetivo

Objetivo deste capítulo: medir quando coordenação (um lock compartilhado, muitas threads) consome o ganho de paralelismo — e quando fragmentar locks ou reduzir threads ajuda.

## Pré-teste e previsões

Pergunta: Dobrar o número de workers em um lock global sempre dobra o throughput?
| pretest-oversub | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

Pergunta: Contenção é só “estar em paralelo”?
| pretest-definition | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

Pergunta: Com 6 workers , lock único e 2 núcleos , o tempo total será maior que com 2 workers ? A espera acumulada?
| predict-workers | Conferir após executar o experimento; previsão errada antes do lab é esperada. |

## Demais campos

**context-http** — App com lock global em caminho quente, CPU ociosa em espera. Ação mais direta para testar primeiro? Comprar mais núcleos sem mudar o código. Medir espera no lock; tentar granularidade menor ou menos threads no lock. Remover o lock e confiar na ordem natural das threads. Aumentar só o número de threads para reduzir fila. Ver resposta sugerida + B. Mais threads atrás de um lock raramente resolve; núcleos extras não eliminam serialização no lock quente. Prós, contras e limites Melhor opção por contexto Fila HTTP: 200 workers, 8 núcleos, lock global em sessão. O que priorizar?

Proposta mínima coerente com o objetivo; citar trade-off explícito.

**design-shard** — Proponha um lock por partição de usuário vs lock global — trade-off em uma frase cada.

Proposta mínima coerente com o objetivo; citar trade-off explícito.

**compare-sharded** — Lock único vs fragmentado: o que muda na fila e na duração?

Separar o que é invariante (trabalho, invariante, protocolo) do que muda (tempo, ordem, visibilidade, anomalia).

**mc-why-yes** — Por que essa opção?

Justificar a letra correta da MC e refutar cada alternativa em uma linha.

**mc-why-not** — Por que não as outras?

Justificar a letra correta da MC e refutar cada alternativa em uma linha.

**tradeoff-threads** — Mais threads: ajuda quando? não ajuda quando?

Proposta mínima coerente com o objetivo; citar trade-off explícito.

## Checkpoint

Pergunta: Contenção em uma frase neste experimento.
| checkpoint-contention | **Sim/não** quando a pergunta pedir; uma frase que cite evidência do lab ou o objetivo do capítulo. |

## MC (mc-ch25)

B. Mais threads atrás de um lock raramente resolve; núcleos extras não eliminam serialização no lock quente.

| Letra | Por que não |
| --- | --- |
| A | rejeitar — Comprar mais núcleos sem mudar o código. |
| B | **correta** — Medir espera no lock; tentar granularidade menor ou menos threads no lock. |
| C | rejeitar — Remover o lock e confiar na ordem natural das threads. |
| D | rejeitar — Aumentar só o número de threads para reduzir fila. |
