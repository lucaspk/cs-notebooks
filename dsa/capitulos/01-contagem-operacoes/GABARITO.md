# Gabarito — Contagem de operações

## Pré-teste

pretest: Não. Duração depende de máquina, execução e implementação. O tamanho permite contar operações sob um algoritmo e modelo definidos.

## Exemplo trabalhado

worked-observation: O laço percorre posições, não unidades do valor. Continua havendo três elementos, três leituras e três adições; o total muda para 300.

## Previsão

predict: Soma 8, quatro leituras e quatro adições. O algoritmo não trata zero como exceção.

## Comparação

compare: Quatro e zero adições, respectivamente. Duas varreduras de quatro elementos fazem oito adições; calcular uma vez e reutilizar exige quatro, sem contar o armazenamento e os acessos ao resultado.

## Transferência

design-transfer: Recalcular três vezes executa 60 adições; uma soma reutilizada executa 20. É preciso guardar o resultado e invalidá-lo quando a entrada mudar; não se promete uma duração em segundos.

## Checkpoint

checkpoint-explain: A(n)=n: uma adição por iteração e uma iteração por elemento; para n=0, nenhuma. Leituras também são n, mas uma contagem combinada explicitamente definida seria 2n.

## Limites

checkpoint-limit: Contagem de operações não mede segundos. Números usam ponto flutuante JavaScript: somas podem arredondar e valores extremos podem exceder o intervalo. A lista tem limite didático de 64 elementos.

## Múltipla escolha e justificativa dupla

Correta: B.

A: Confunde resultado numérico com trabalho.

B: Cada uma das quatro iterações executa uma adição.

C: Os índices 0, 1, 2 e 3 são quatro posições.

D: Leituras e adições são categorias separadas neste modelo.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
