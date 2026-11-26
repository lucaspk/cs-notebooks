# Gabarito — Funções de primeira classe

## Pré-teste

pretest-hof: Sim. Esse uso exemplifica primeira classe e uma função de ordem superior que recebe outra função.

## Exemplo trabalhado

worked-03: Em [1,−2,3], double→inc produz [3,−3,7]. Já inc→double produz [4,−2,8]. Selecionar as mesmas funções não garante equivalência quando a ordem muda. Exigir explicação do mecanismo: Função de primeira classe pode ser guardada em variável, passada como argumento e retornada. map aplica uma transformação a cada item; filter seleciona itens. Aqui double(x)=2x, inc(x)=x+1 e abs(x)=|x|. Um pipeline aplica as funções selecionadas em sequência.

## Previsão

predict-pipeline: inc→double produz [4,−2,8]. Sem inversão, double→inc produz [3,−3,7]. Aceitar hipótese inicial diferente se explicitada antes da execução; após observar, exigir correção fundamentada.

## Comparar

compare-model: inc→abs dá 1; abs→inc dá 3. Transformações não comutam em geral.

## Múltipla escolha

Correta: B.

A: map transforma e preserva quantidade de itens neste caso.

B: A álgebra mostra a diferença entre as duas composições.

C: Função de primeira classe pode ser argumento.

D: O exemplo é um contraexemplo à comutatividade.

mc-why-yes: ligar a escolha ao caso e à definição, com a razão da alternativa correta acima.

mc-why-not: descartar todas as demais pelas razões específicas acima; não aceitar apenas “está errada”.

## Transferência

design-transfer: Não. map(abs) transforma negativos em positivos e mantém quantidade; filter(x>0) remove os não positivos, mantendo os valores selecionados.

## Checkpoint

checkpoint-read: usar dados do exemplo: Em [1,−2,3], double→inc produz [3,−3,7]. Já inc→double produz [4,−2,8]. Selecionar as mesmas funções não garante equivalência quando a ordem muda. Explicar a regra: Função de primeira classe pode ser guardada em variável, passada como argumento e retornada. map aplica uma transformação a cada item; filter seleciona itens. Aqui double(x)=2x, inc(x)=x+1 e abs(x)=|x|. Um pipeline aplica as funções selecionadas em sequência.

checkpoint-limit: O lab não executa funções arbitrárias digitadas: só operações conhecidas. Ele mostra composição, não uma garantia de ausência de efeitos colaterais em qualquer função.

## Critérios de correção

Resposta completa liga regra, dados e conclusão e respeita os limites. Resposta parcial identifica o resultado mas não explica o mecanismo ou omite condição relevante. Revisar se contradiz a definição ou extrapola a simulação para uma garantia geral.
