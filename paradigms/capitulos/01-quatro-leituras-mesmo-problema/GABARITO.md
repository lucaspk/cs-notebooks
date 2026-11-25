# Gabarito — cap. 01 (quatro leituras)

## As quatro leituras

1. **Imperativo:** loop explícito com variável `total` que muda.
2. **Dobragem explícita:** define a regra `total = total + item` para combinar estado e próximo elemento.
3. **`Reduce`:** delega a combinação ao método `reduce`, usando valor inicial e função combinadora.
4. **Pipeline:** representa a mesma combinação como uma sequência de operações sobre o valor acumulado.

## Pré-teste

| # | Campo | Essência |
| --- | --- | --- |
| 1 | `pretest-paradigm` | Paradigma = estilo de organizar programa (não é linguagem nem editor). |
| 2 | `pretest-same` | Mesmo problema pode ter várias leituras; o resultado numérico pode coincidir. |

## Previsão (`predict-same-sum`)

Lista `1 2 3 4`: os quatro estilos devem dar **10** com passos parecidos (um passo por elemento + início).

## Comparar

| Campo | Essência |
| --- | --- |
| `compare-steps` | Imperativo e reduce costumam ter o mesmo número de passos neste modelo; diferença é *como* se expressa o acumulador (loop explícito vs função de ordem superior). |
| `compare-style` | Estilo não muda resultado aqui; muda legibilidade, composição e risco ao mudar o código. |

## MC (`mc-ch01`)

**Correta: B** — paradigma descreve organização do programa; trocar for por reduce não muda a soma neste lab.

## Checkpoint

| # | Campo | Essência |
| --- | --- | --- |
| 1 | `checkpoint-paradigm` | Imperativo: passos e estado mutável; funcional leve: encadear transformações / fold. |
| 2 | `checkpoint-why` | Ler labs de outros livros exige reconhecer estilo (mutação vs imutável, OO vs funções). |
| 3 | `checkpoint-result` | Quatro leituras, **um** resultado quando a operação é a mesma. |