# Gabarito — cap. 07 (ARP e primeiro salto)

## Pré-teste

| # | Campo | Essência |
| --- | --- | --- |
| 1 | `pretest-arp-why` | Camada Ethernet precisa MAC; IP sozinho não basta na LAN. |
| 2 | `pretest-arp-who` | ARP mapeia IP → MAC na mesma sub-rede (resolvers locais). |

## Previsão (`predict-arp-type`)

Primeira vez A→10.0.0.2: **request broadcast** + **reply unicast**.

## Exemplo trabalhado (`worked-cache`)

Segunda consulta ao mesmo IP: cache hit, sem broadcast.

## Comparar

| Campo | Essência |
| --- | --- |
| `compare-dns` | DNS: nome→IP (app/camada alta); ARP: IP→MAC (L2 adjacente). |
| `compare-remote` | IP fora da sub-rede: ARP do gateway, não do servidor remoto. |

## MC (`mc-ch07`)

**Correta: A** — ARP request em broadcast; resposta unicast ao solicitante.

## Checkpoint

| # | Campo | Essência |
| --- | --- | --- |
| 1 | `checkpoint-packet` | ARP é mensagem própria antes do quadro IP de dados. |
| 2 | `checkpoint-security` | ARP spoofing existe — confiança LAN não é garantia absoluta. |
| 3 | `checkpoint-switch` | Switch flood de ARP no cap. 08. |