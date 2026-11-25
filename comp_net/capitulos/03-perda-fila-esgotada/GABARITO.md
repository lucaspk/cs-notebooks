# Gabarito — cap. 03 (perda e fila esgotada)

## Pré-teste

| # | Campo | Essência |
| --- | --- | --- |
| 1 | `pretest-udp` | UDP não garante entrega; perda pode ocorrer na rede. |
| 2 | `pretest-wifi` | Perda também vem de fila cheia, policer, servidor — não só meio sem fio. |

## Previsão (`predict-loss`)

Cenário inicial (40 pacotes, rajada 5, fila 4, saída 2/rodada, BER 0%): **fila** deve dominar descartes.

## Comparar

| Campo | Essência |
| --- | --- |
| `compare-tcp` | TCP retransmite — usuário vê atraso, nem sempre “perda visível”. |
| `compare-queue-vs-ber` | Contadores diferentes: `droppedQueue` vs `droppedLink`; investigar fila antes de culpar só o ar. |

## MC (`mc-ch03`)

**Correta: B** — fila esgotada descarta mesmo em enlace “limpo”; BER é outro contador.

## Checkpoint

| # | Campo | Essência |
| --- | --- | --- |
| 1 | `checkpoint-measure` | Taxa entregue / taxa descarte / fila final — não só “deu ruim”. |
| 2 | `checkpoint-two-causes` | Fila cheia (congestionamento local) vs erro no enlace. |
| 3 | `checkpoint-tie-delay` | Fila cheia aumenta atraso (cap. 02); perda aqui é consequência de overflow. |