# Gabarito — cap. 01 (pontos extremos e serviço)

Autocorreção / autor. **Não** linkar do `index.html`.

Campos `data-practice-field` entre parênteses para achar suas respostas no `localStorage`.

## Pré-teste

| # | Sim/não + essência |
| --- | --- |
| 1 (`pretest-meaning`) | **Não.** A rede entrega bytes; não interpreta idioma, JSON, HTTP, etc. |
| 2 (`pretest-intact`) | **Não.** Entrega correta ≠ semântica correta na app (ex.: `Olá` num parser JSON). |

Aceitar respostas que separem **serviço de rede** (entrega) de **camada de aplicação** (significado).

## Teaser URL

- **História (`teaser-url-story`):** incompleta é ok no pré-19; deve mencionar resolução de nome e/ou conexão e troca de dados; não precisa ordem perfeita.
- **Caixas:** marcar DNS, TCP, TLS, HTTP; **não** marcar “roteador valida JSON”.
- **`teaser-why-not-router`:** roteador decide por endereço (L3/L2), não pelo payload da aplicação.

## Exemplo trabalhado

Confirmar: mesmos bytes em todos os modos B; só o parser em B muda o resultado.

## Previsão no experimento (`predict-wire`)

**Só “N bytes opacos”** (ou equivalente) no passo do enlace — não texto legível no fio.

## Previsão JSON (`predict-json`)

**Erro / falha** em B com mensagem `Olá` e modo JSON (entrega pode estar ok).

## Comparar

| Campo | Essência |
| --- | --- |
| `compare-same` | Mesma mensagem de A, mesmos bytes no enlace, mesmos passos de entrega. |
| `compare-diff` | Resultado em B (ok vs erro), interpretação na aplicação. |

## MC (`mc-ch01`)

**Correta: B.** Gabarito narrativo no HTML (`details.model-answer`).

## Contexto (`context-debug`)

**Corpo / Content-Type / aplicação primeiro** se entrega e bytes batem; TLS/Wi‑Fi depois se suspeita de transporte; não “JSON no roteador”.

## Design (`design-guarantees`)

| Camada | Garantia típica |
| --- | --- |
| Rede (neste cap.) | Entregar datagramas/fluxo entre hosts (best effort ou confiável — conforme protocolo futuro). |
| App P2P | Formato, ordem lógica, presença online, criptografia ponta a ponta se quiser — **não** exigir que o fio “entenda” chat. |

## Checkpoint

Alinhado ao pré-teste:

| # | Campo | Essência |
| --- | --- | --- |
| 1 | `checkpoint-meaning` | **Não** interpreta conteúdo. |
| 2 | `checkpoint-router` | **Não** valida JSON (nem HTTP, etc.). |
| 3 | `checkpoint-def` | Extremos = apps; meio = serviço de transporte de bytes opacos. |

Ganho esperado: pré-teste mais vago → checkpoint com vocabulário do lab.