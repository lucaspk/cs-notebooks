# Gabarito — cap. 04 (throughput e gargalo)

## Pré-teste

| # | Campo | Essência |
| --- | --- | --- |
| 1 | `pretest-throughput` | Taxa útil efetiva fim a fim (não pico de um trecho só). |
| 2 | `pretest-upgrade` | Melhorar enlace que já não era gargalo muda pouco o tempo total. |

## Exemplo trabalhado (`worked-tube`)

Três elos 1000 / 10 / 1000 Mbps → gargalo **10 Mbps** no meio.

## Previsão (`predict-bottleneck`)

Padrão 100 / 5 / 100 → **B→C (5 Mbps)**.

## MC (`mc-ch04`)

**Correta: A** — gargalo no meio; upgrade no último km não altera fim a fim.

## Design (`design-video`)

Apontar gargalo (uplink cliente, Wi‑Fi, peering, servidor origem) — não só “comprar mais bandwidth” num elo já rápido.

## Checkpoint

| # | Campo | Essência |
| --- | --- | --- |
| 1 | `checkpoint-formula` | tempo ≈ tamanho / taxa do elo mais lento (modelo tubo). |
| 2 | `checkpoint-vs-rtt` | Throughput ≠ RTT (cap. 02): arquivo grande mede vazão, não eco. |
| 3 | `checkpoint-parallel` | Várias conexões TCP podem encher elos — gargalo ainda existe. |