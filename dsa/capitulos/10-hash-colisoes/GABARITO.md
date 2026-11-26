# Gabarito — Hash e colisões

## Pré-teste

pretest: Não. O índice tem menos possibilidades que o domínio; é preciso comparar a chave completa.

## Exemplo trabalhado

worked-observation: O bucket 2 está vazio: nenhuma chave é comparada. O contador do lab exclui cálculo de hash e acesso ao bucket; zero igualdades não significa ausência de trabalho.

## Previsão

predict: Tamanho 3, carga 0,75, duas colisões de inserção, três comparações e ausente. O segundo 5 é duplicata e não incrementa tamanho ou colisões.

## Comparação

compare: m=4: três comparações, duas colisões; m=5: buckets 1,0,4, uma comparação, zero colisões. -1,3,7 vão ao bucket 3 com normalização. Para qualquer m, múltiplos separados por m podem colidir; uma amostra melhor não é garantia universal.

## Transferência

design-transfer: Carga n/m não revela concentração: chaves adversas podem cair no mesmo bucket. Avaliar distribuição, maior cadeia e estratégia de hash/redimensionamento; não prometer proteção de produção com a função resto do lab.

## Checkpoint

checkpoint-explain: Bucket vazio: zero comparações de chaves; cadeia inteira: n. Ambas calculam hash. Duplicatas são ignoradas no conjunto e não aumentam α; colisões contam inserções distintas em bucket já ocupado, não pares de chaves.

## Limites

checkpoint-limit: Função resto deliberadamente simples, sem aleatorização, redimensionamento, remoção, valores associados ou segurança contra ataques. Até 64 chaves inteiras seguras e 16 buckets. Construção, verificação de duplicatas, snapshots e parsing não entram no contador da consulta; custo esperado exige hipóteses adicionais.

## Múltipla escolha e justificativa dupla

Correta: D.

A: Cadeias permitem mais chaves que buckets.

B: Chaves diferentes podem ter o mesmo resto.

C: Uma distribuição adversa pode concentrar tudo.

D: O pior caso pode virar busca linear numa única cadeia.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
