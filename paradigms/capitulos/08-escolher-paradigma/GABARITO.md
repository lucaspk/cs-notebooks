# Gabarito — Escolher paradigma

## Pré-teste

pretest-dogma: Não. É uma hipótese de decisão; requisitos, restrições, custos e experiência precisam validar os critérios e pesos.

## Exemplo trabalhado

worked-08: Com mudança=3, equipe=3, risco=5 e expressividade=3, o modelo sugere mensagens/atores (5 pontos). Com risco=1, o imperativo local sobe a 8 pontos. O efeito vem dos pesos definidos, não de uma medição do projeto. Exigir explicação do mecanismo: Escolher paradigma exige identificar mudança esperada, capacidade da equipe, risco de concorrência e expressividade das transformações. O lab atribui notas de 1 a 5 a esses critérios e usa pesos didáticos para sugerir alternativas. Uma nota maior expressa uma preferência do modelo, não uma verdade universal.

## Previsão

predict-choice: O topo muda de mensagens/atores (5) para imperativo local (8), conforme a heurística. Aceitar hipótese inicial diferente se explicitada antes da execução; após observar, exigir correção fundamentada.

## Comparar

compare-model: O modelo dá poucos pontos extras a OO; os pesos limitam a influência desse critério. O resultado revela a regra de pontuação, não prova que OO é inadequado.

## Múltipla escolha

Correta: A.

A: A recomendação deve ser confrontada com evidência do contexto.

B: Pesos ilustrativos não demonstram superioridade universal.

C: Capacidade e manutenção da equipe são restrições relevantes.

D: Arquitetura ainda exige entender invariantes e dependências.

mc-why-yes: ligar a escolha ao caso e à definição, com a razão da alternativa correta acima.

mc-why-not: descartar todas as demais pelas razões específicas acima; não aceitar apenas “está errada”.

## Transferência

design-transfer: Cálculo puro favorece função testável e composição de valores; custo de adaptação se houver muitos efeitos. Coordenação pode favorecer dono único/mensagens; custos de fila, latência e falhas. Aceitar alternativas justificadas por requisitos.

## Checkpoint

checkpoint-next: usar dados do exemplo: Com mudança=3, equipe=3, risco=5 e expressividade=3, o modelo sugere mensagens/atores (5 pontos). Com risco=1, o imperativo local sobe a 8 pontos. O efeito vem dos pesos definidos, não de uma medição do projeto. Explicar a regra: Escolher paradigma exige identificar mudança esperada, capacidade da equipe, risco de concorrência e expressividade das transformações. O lab atribui notas de 1 a 5 a esses critérios e usa pesos didáticos para sugerir alternativas. Uma nota maior expressa uma preferência do modelo, não uma verdade universal.

checkpoint-limit: O ranking omite orçamento, legado e requisitos específicos. Empates são possíveis; a ordem de exibição não deve ser interpretada como diferença de qualidade.

## Critérios de correção

Resposta completa liga regra, dados e conclusão e respeita os limites. Resposta parcial identifica o resultado mas não explica o mecanismo ou omite condição relevante. Revisar se contradiz a definição ou extrapola a simulação para uma garantia geral.
