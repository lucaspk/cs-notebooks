# Gabarito — cap. 07 (07-concorrencia-mensagem-estado)

## Pré-teste

| # | Campo | Essência |
| --- | --- | --- |
| 1 | `pretest-race` | Reconhecer o fenômeno antes de escolher uma solução. |

## Exemplo trabalhado (`worked-07`)

Com três turnos, o modelo compartilha contador no primeiro caso e serializa mensagens no segundo.

## Previsão (`predict-race`)

Aceitar uma previsão que use a regra central, não apenas copiar o resultado mostrado.

## Comparar

| Campo | Essência |
| --- | --- |
| `compare-model` | Locks protegem memória compartilhada; atores/filas isolam estado. |
| `compare-limit` | Indicar o limite da abstração ou o cenário onde ela deixa de ajudar. |

## MC (`mc-ch07`)

**Correta: C** — Mensagens isolam estado; locks protegem compartilhado.

**Justificativa negativa:** Trocar paradigma não elimina a necessidade de sincronização conceitual.

## Checkpoint

| # | Campo | Essência |
| --- | --- |
| 1 | `checkpoint-progconc` | Explicar a regra central com suas palavras e dar um limite ou contraexemplo. |
