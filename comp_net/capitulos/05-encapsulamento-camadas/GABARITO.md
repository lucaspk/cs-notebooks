# Gabarito — cap. 05 (encapsulamento)

## Pré-teste

| # | Campo | Essência |
| --- | --- | --- |
| 1 | `pretest-router-tcp` | Roteador típico não termina TCP — encaminha IP; TCP nos hosts. |
| 2 | `pretest-osi-box` | Camada lógica ≠ caixa física; um dispositivo implementa várias funções. |

## Previsão (`predict-strip`)

No passo do roteador: despacha enlace (Ethernet), relê IP, reaplica enlace no próximo hop.

## Comparar

| Campo | Essência |
| --- | --- |
| `compare-switch` | Switch L2 manipula Ethernet/MAC, não olha URL. |
| `compare-payload` | Payload HTTP permanece opaco para IP (cap. 01). |

## MC (`mc-ch05`)

**Correta: C** — roteador encaminha IP; não monta sessão TCP nem interpreta JSON.

## Checkpoint

| # | Campo | Essência |
| --- | --- | --- |
| 1 | `checkpoint-order` | App → transporte → rede → enlace na saída do host. |
| 2 | `checkpoint-router` | Só troca cabeçalho de enlace no hop L3→L2. |
| 3 | `checkpoint-device` | Função (camada) vs fabricante/dispositivo. |