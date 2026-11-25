# Gabarito — cap. 02 (mutação vs valor)

## Pré-teste

| # | Campo | Essência |
| --- | --- | --- |
| 1 | `pretest-alias` | Duas variáveis podem apontar para o mesmo objeto/array. |
| 2 | `pretest-copy` | Cópia rasa ainda pode compartilhar arrays internos se não clonar. |

## Previsão (`predict-b`)

Modo mutação + delta 5: o array de B ganha o mesmo item que A — **surpresa por aliasing** (total numérico de B pode ficar desatualizado se for cópia rasa).

## Comparar (`compare-fp`)

Imutabilidade (novo valor) evita efeito colateral oculto; mutação é mais rápida mas exige disciplina.

## MC (`mc-ch02`)

**Correta: C** — referência compartilhada faz B ver a mutação em A.

## Checkpoint

| # | Campo | Essência |
| --- | --- | --- |
| 1 | `checkpoint-value` | Valor novo vs lugar mutado no heap. |
| 2 | `checkpoint-risk` | Paradigma funcional puxa cópia/transformação; imperativo assume mutação local. |