# Gabarito — Condução de uma resolução de entrevista

## Pré-teste

pretest: São necessários dois índices distintos; i<j exclui auto-reutilização.

## Exemplo trabalhado

worked-observation: [0,0] soma 6 em [3], mas usa a mesma posição duas vezes. A validade envolve também contrato dos índices e existência de duas posições.

## Previsão

predict: O caso [3],6 retorna [0,0] e falha; [3,3],6 também encontra [0,0] já no primeiro elemento. Consultar antes de inserir corrige o invariante.

## Comparação

compare: Entrada negativa pode passar retornando [0,1] nas duas variantes; vazio dá ausência. Os casos fixos ainda revelam auto-reutilização. Evidência positiva isolada não prova correção geral.

## Transferência

design-transfer: Não. Deve preservar multiplicidades/índices e continuar emitindo; saída pode ter Θ(n²) pares. Renegocie custos e formato antes de adaptar a implementação.

## Checkpoint

checkpoint-explain: Esclarecer contrato e escala; apresentar referência, otimização e invariante; escrever consulta antes de inserir; testar vazio, singleton, repetidos, negativos e ausência com propriedades. O(n) esperado/O(n) algoritmo, verificador independente O(n²); justificar limites e adaptar à mudança de objetivo.

## Limites

checkpoint-limit: Lab inspeciona candidatos predefinidos, não executa código arbitrário nem simula um entrevistador. Respostas textuais são autoavaliação, sem nota automática de competência. Até 64 inteiros limitados; hash esperado; teste de referência quadrático fora do custo da solução. Não avalia todas as habilidades de entrevista.

## Múltipla escolha e justificativa dupla

Correta: C.

A: Também são necessários índices válidos, distintos e na ordem acordada.

B: Cobertura finita não garante todos os estados.

C: Os critérios guiam implementação e casos extremos relevantes.

D: Apresente a solução direta e otimize conforme restrições, explicando custo e correção.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
