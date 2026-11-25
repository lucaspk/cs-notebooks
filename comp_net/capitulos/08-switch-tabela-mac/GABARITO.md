# Gabarito — cap. 08 (switch e tabela MAC)

## Pré-teste

| # | Campo | Essência |
| --- | --- | --- |
| 1 | `pretest-hub` | Hub repetia em tudo; switch aprende e filtra unicast conhecido. |
| 2 | `pretest-learn` | Aprende MAC **origem** na **porta de ingresso**. |

## Previsão (`predict-first`)

1º quadro A→B: **flood** (B ainda desconhecido na tabela).

## Previsão (`predict-third`)

3º quadro A→B (após B responder): **unicast** só porta 2.

## Comparar

| Campo | Essência |
| --- | --- |
| `compare-arp-flood` | ARP request desconhecido → flood até aprender. |
| `compare-router` | Switch L2; roteador L3 — não confundir domínios. |

## MC (`mc-ch08`)

**Correta: C** — destino MAC conhecido na tabela → encaminha só aquela porta.

## Checkpoint

| # | Campo | Essência |
| --- | --- | --- |
| 1 | `checkpoint-flood-when` | MAC destino ausente ou broadcast. |
| 2 | `checkpoint-unicast-when` | Entrada existente para destino. |
| 3 | `checkpoint-storm` | Loops L2 podem amplificar flood — cap. 27. |