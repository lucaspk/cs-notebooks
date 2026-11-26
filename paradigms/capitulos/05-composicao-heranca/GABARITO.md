# Gabarito — Composição vs herança

## Pré-teste

pretest-override: Não. A organização de dependências, pontos de extensão e contratos pode ser diferente.

## Exemplo trabalhado

worked-05: Com mensagem teste e codificador simples, ambos produzem [LOG] teste. Trocar apenas o codificador composto para maiúsculas produz [LOG] TESTE nesse caminho; a subclasse simples permanece [LOG] teste. Exigir explicação do mecanismo: Herança define uma especialização que deve respeitar o contrato do tipo base; composição guarda uma dependência e delega parte do trabalho. No lab, a subclasse usa super.encode; o wrapper composto recebe um codificador selecionável. Reutilização de texto não basta para decidir uma relação de subtipagem.

## Previsão

predict-log: Herança: [LOG] teste. Composição: [LOG] TESTE. A dependência delegada mudou sem editar a classe base. Aceitar hipótese inicial diferente se explicitada antes da execução; após observar, exigir correção fundamentada.

## Comparar

compare-model: Alterar ou acrescentar uma especialização, ou desenhar outro ponto de extensão. A composição já expõe a troca da dependência.

## Múltipla escolha

Correta: B.

A: Pode multiplicar subclasses para combinações independentes.

B: Separa e permite substituir a responsabilidade variável.

C: Duplica comportamento comum e dificulta manutenção.

D: Nome não representa relacionamento ou custo de mudança.

mc-why-yes: ligar a escolha ao caso e à definição, com a razão da alternativa correta acima.

mc-why-not: descartar todas as demais pelas razões específicas acima; não aceitar apenas “está errada”.

## Transferência

design-transfer: Quando há relação de subtipagem com substituibilidade: a especialização deve cumprir pré/pós-condições do contrato base. A string final não demonstra isso sozinha.

## Checkpoint

checkpoint-pick: usar dados do exemplo: Com mensagem teste e codificador simples, ambos produzem [LOG] teste. Trocar apenas o codificador composto para maiúsculas produz [LOG] TESTE nesse caminho; a subclasse simples permanece [LOG] teste. Explicar a regra: Herança define uma especialização que deve respeitar o contrato do tipo base; composição guarda uma dependência e delega parte do trabalho. No lab, a subclasse usa super.encode; o wrapper composto recebe um codificador selecionável. Reutilização de texto não basta para decidir uma relação de subtipagem.

checkpoint-limit: O exemplo é deliberadamente pequeno. Composição também tem custo de indireção e configuração; herança não é proibida nem automaticamente inferior.

## Critérios de correção

Resposta completa liga regra, dados e conclusão e respeita os limites. Resposta parcial identifica o resultado mas não explica o mecanismo ou omite condição relevante. Revisar se contradiz a definição ou extrapola a simulação para uma garantia geral.
