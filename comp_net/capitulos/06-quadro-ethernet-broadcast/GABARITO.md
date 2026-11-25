# Gabarito — cap. 06 (Ethernet e broadcast)

## Pré-teste

| # | Campo | Essência |
| --- | --- | --- |
| 1 | `pretest-mac` | MAC identifica interface na LAN; não é roteamento global. |
| 2 | `pretest-broadcast` | Broadcast L2 chega a todos no mesmo domínio de broadcast (mesmo segmento). |

## Previsão (`predict-recv`)

Unicast A→B: **1** receptor (B). Broadcast de A: **2** (B e C).

## Comparar

| Campo | Essência |
| --- | --- |
| `compare-ip` | IP roteia entre redes; MAC vale no enlace local. |
| `compare-wifi` | Wi‑Fi ainda é LAN L2 — broadcast existe (com moderação). |

## MC (`mc-ch06`)

**Correta: B** — quadro com destino broadcast é recebido por todas as NICs do segmento (exceto emissor não “se escuta” neste modelo).

## Checkpoint

| # | Campo | Essência |
| --- | --- | --- |
| 1 | `checkpoint-broadcast-mac` | `ff:ff:ff:ff:ff:ff` (ou equivalente). |
| 2 | `checkpoint-why-arp` | Precisa achar MAC na LAN antes de unicast IP local — gancho cap. 07. |
| 3 | `checkpoint-router` | Roteador **não** propaga broadcast IPv4 arbitrário para a Internet inteira. |