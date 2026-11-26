# Gabarito — Pirâmide de testes

## Pré-teste

pretest-1: Não. Não cobre necessariamente banco, configuração, rede e integração da interface com a regra.

## Exemplo trabalhado

worked-observation: Suíte com 5 unitários, 3 de integração e 20 ponta a ponta: no modelo, custo=5·1+3·5+20·20=420 unidades. O peso 20 é ilustrativo, não uma medição do seu projeto. Exigir explicação do mecanismo: Um teste unitário exercita uma unidade com dependências controladas; integração verifica colaboração entre componentes; ponta a ponta atravessa um fluxo amplo. A pirâmide sugere concentrar verificações rápidas na base e usar fluxos amplos para riscos que exigem integração real.

## Previsão

predict-1: Total passa de 28 para 10; custo de 420 para 60. Isso não prova que a cobertura de riscos permaneceu igual. Aceitar hipótese inicial diferente se explicitada antes da execução; após observar, exigir correção fundamentada.

## Comparar

compare-case: Custos relativos: 75 e 420. A primeira concentra verificações na base; quantidade sozinha não mede qualidade das asserções nem cobertura dos riscos.

## Múltipla escolha

Correta: C.

A: Repetição manual custa tempo e dificulta regressões.

B: Fluxos amplos são caros para muitas combinações de regra pura.

C: Concentra combinações locais sem abandonar a verificação da integração.

D: Níveis diferem em dependências, custo e localização de falhas.

mc-why-yes: ligar a escolha ao caso e à definição, com a razão da alternativa correta acima.

mc-why-not: descartar todas as demais pelas razões específicas acima; não aceitar apenas “está errada”.

## Transferência

design-transfer: Mapear riscos e asserções removidos para testes menores ou fluxos amplos mantidos; medir a suíte real e verificar que cenários essenciais continuam cobertos.

## Checkpoint

checkpoint-1: usar dados do exemplo: Suíte com 5 unitários, 3 de integração e 20 ponta a ponta: no modelo, custo=5·1+3·5+20·20=420 unidades. O peso 20 é ilustrativo, não uma medição do seu projeto. Explicar a regra: Um teste unitário exercita uma unidade com dependências controladas; integração verifica colaboração entre componentes; ponta a ponta atravessa um fluxo amplo. A pirâmide sugere concentrar verificações rápidas na base e usar fluxos amplos para riscos que exigem integração real.

checkpoint-limit: Os custos e percentuais são um cenário de decisão. Não existe proporção universal, e uma suíte vazia não é barata “com cobertura”: ela não oferece essa evidência.

## Critérios de correção

Resposta completa liga regra, dados e conclusão e respeita os limites. Resposta parcial identifica o resultado mas não explica o mecanismo ou omite condição relevante. Revisar se contradiz a definição ou extrapola a simulação para uma garantia geral.
