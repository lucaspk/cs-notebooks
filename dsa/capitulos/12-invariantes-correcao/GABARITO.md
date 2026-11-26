# Gabarito — Invariantes e correção

## Pré-teste

pretest: Não. Exemplos ajudam a refutar, mas não cobrem todo domínio. Uma afirmação precisa relacionar o estado atual com a parte da entrada já processada.

## Exemplo trabalhado

worked-observation: O acumulador já inclui o novo item, mas i ainda descreve o prefixo antigo. O invariante foi definido para a fronteira, depois das duas instruções.

## Previsão

predict: Inicial 1 viola já em i=0: esperado 0. Pular último preserva (0,0) e (1,2), falha em i=2 com acc=2 em vez de 5.

## Comparação

compare: Correta preserva todas. Inicial 1 falha desde a inicialização nas três. Pular último falha em [2,3], mas passa em [2,0] e vazia: omitir zero não muda soma; na vazia não há iteração. Passar um caso não prova a versão.

## Transferência

design-transfer: acc deve ser a quantidade de positivos em a[0..i), com 0≤i≤n. Começa em zero; incrementa acc somente se a[i]>0 e avança i. No fim i=n, cobre todos. Medida n−i prova término.

## Checkpoint

checkpoint-explain: Uma violação fornece contraexemplo para a variante. Verificações verdes demonstram apenas aquele rastro; a prova usa inicialização e passo para qualquer estado admissível, mais saída e término.

## Limites

checkpoint-limit: O lab usa até 32 números e compara somas com a mesma ordem de adição JavaScript. A análise matemática supõe adição exata ou a mesma semântica operacional; não afirma associatividade de floats. Recalcular prefixos e gerar rastros é instrumentação O(n²), fora do laço estudado O(n).

## Múltipla escolha e justificativa dupla

Correta: C.

A: Quantidade finita de exemplos não cobre o domínio.

B: Um laço infinito pode preservar uma afirmação.

C: Correção parcial exige pós-condição; correção total acrescenta término.

D: É preciso declarar os pontos onde se exige a afirmação.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
