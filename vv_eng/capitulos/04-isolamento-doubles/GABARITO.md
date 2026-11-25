# Gabarito — cap. 04 (04-isolamento-doubles)

## Pré-teste

| # | Campo | Essência |
| --- | --- | --- |
| 1 | `pretest-1` | Escolha fake/stub/mock pela finalidade do teste. |
| 2 | `pretest-example` | O estudante deve dar um exemplo ou contraexemplo ligado à definição. |

## Exemplo trabalhado (`worked-observation`)

Leia o exemplo e marque a regra aplicada; não copie o resultado sem explicar o mecanismo.

## Previsão (`predict-1`)

Antes do lab, aceitar uma previsão que indique a regra central: O double deve espelhar a interface ou o comportamento real?

## Comparar

| Campo | Essência |
| --- | --- |
| `compare-case` | Fronteira: O double deve espelhar a interface ou o comportamento real? |
| `compare-limit` | Teste com mock conta chamadas ou só resultado?: Integração ainda é necessária para validar contrato real. |

## MC (`mc-ch01`)

**Correta: D** — Doubles substituem dependências lentas ou instáveis sem testar a dependência real no mesmo unitário.

Distratores: A confunde intuição com definição; C ignora condições; D elimina o domínio ou a forma da regra.

## Checkpoint

| # | Campo | Essência |
| --- | --- |
| 1 | `checkpoint-1` | Explicar a regra central com linguagem própria. |
| 2 | `checkpoint-counter` | Dar um limite ou contraexemplo coerente. |
