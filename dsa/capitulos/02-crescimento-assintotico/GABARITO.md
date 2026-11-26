# Gabarito — Crescimento assintótico

## Pré-teste

pretest: Não: para n=1, A faz 3 e B faz 1. A comparação depende do tamanho e das constantes.

## Exemplo trabalhado

worked-observation: 1, 2, 4 e 16. Dois laços completos de quatro iterações produzem 4×4 execuções do corpo interno.

## Previsão

predict: 1, 5, 32, 1024. Razões 1, 5/4, 2 e 4; o logarítmico soma um, não dobra.

## Comparação

compare: floor(log₂7)=2 e floor(log₂8)=3. A potência de dois cruza um degrau. Em n=2: 6 contra 4; em n=8: 24 contra 64. Classe assintótica não ordena todos os tamanhos.

## Transferência

design-transfer: Pares: 10000→40000; varredura: 100→200. Assumir trabalho constante por par/registro e não inferir segundos a partir da contagem.

## Checkpoint

checkpoint-explain: Sim, o termo linear domina e constantes não mudam a ordem para n grande. Não exige custo exato n; O(n) informa um limite superior, e Θ(n) informa a ordem ajustada.

## Limites

checkpoint-limit: São funções didáticas de contagem, não benchmarks. O lab aceita n de 1 até 1048576; valores calculados permanecem inteiros exatos. O limite assintótico descreve crescimento além de exemplos finitos, por argumento sobre a regra.

## Múltipla escolha e justificativa dupla

Correta: C.

A: Dobrar a entrada não dobra o número de divisões sucessivas.

B: Uma divisão adicional é necessária.

C: Uma divisão remove o fator dois acrescentado.

D: Confunde o modelo logarítmico com os dois laços aninhados.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
