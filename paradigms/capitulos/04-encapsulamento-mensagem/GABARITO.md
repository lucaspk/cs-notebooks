# Gabarito — cap. 04 (04-encapsulamento-mensagem)

## Pré-teste

| # | Campo | Essência |
| --- | --- | --- |
| 1 | `pretest-invariant` | Reconhecer o fenômeno antes de escolher uma solução. |

## Exemplo trabalhado (`worked-04`)

<code>deposit</code> aceita uma entrada válida e muda o saldo; <code>withdraw</code> rejeita operação que viola o limite.

## Previsão (`predict-saldo`)

Aceitar uma previsão que use a regra central, não apenas copiar o resultado mostrado.

## Comparar

| Campo | Essência |
| --- | --- |
| `compare-model` | Alteração direta do campo contra método de domínio. |
| `compare-limit` | Indicar o limite da abstração ou o cenário onde ela deixa de ajudar. |

## MC (`mc-ch04`)

**Correta: A** — A mensagem define uma operação que valida antes de alterar o estado.

**Justificativa negativa:** Campos privados não substituem regras de domínio.

## Checkpoint

| # | Campo | Essência |
| --- | --- |
| 1 | `checkpoint-enc` | Explicar a regra central com suas palavras e dar um limite ou contraexemplo. |
