# Gabarito — cap. 02 (quatro fontes de atraso)

## Pré-teste

| # | Campo | Essência |
| --- | --- | --- |
| 1 | `pretest-rtt` | RTT ≈ tempo ida + volta (eco, ACK, resposta); não é só “velocidade do Wi‑Fi”. |
| 2 | `pretest-bandwidth` | Mais Mbps não reduz propagação (distância/velocidade do sinal); pode reduzir transmissão (L/R). |

## Previsão (`predict-dominant`)

Cenário padrão do lab (≈5000 km, 10 Mbps, pacote 1200 B, fila 0): **propagação** domina na ida.

## Comparar

| Campo | Essência |
| --- | --- |
| `compare-local` | Fila ou processamento podem dominar com distância curta e enlace rápido. |
| `compare-satellite` | Propagação domina em enlace geo (milhares de km). |

## MC (`mc-ch02`)

**Correta: C** — propagação limitada por distância; upload 1 Gbps não divide RTT transcontinental pela metade.

## Checkpoint

| # | Campo | Essência |
| --- | --- | --- |
| 1 | `checkpoint-four` | Propagação, transmissão, fila, processamento. |
| 2 | `checkpoint-symptom` | Lentidão pode ser fila/DNS/servidor — medir componentes antes de culpar só o Wi‑Fi. |
| 3 | `checkpoint-rtt` | RTT soma ida e volta nos quatro termos (simétrico neste modelo). |