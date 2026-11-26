# Gabarito — Reversão de listas

## Pré-teste

pretest: Salve o próximo original antes de reescrever a ligação.

## Exemplo trabalhado

worked-observation: Ao sobrescrever next[cur], perde-se o link para a parte ainda não processada. O salvo mantém o caminho original e permite avançar sem perder nós.

## Previsão

predict: Segmento: 1→4,2→1,3→2,0→3; cabeça continua 0. Reversão inteira produz cabeça 4 e ordem 4,3,2,1,0, com 0→null.

## Comparação

compare: Um único nó mantém links/ordem. Duplicatas não confundem identidades. Duas reversões inteiras restauram valores na ordem original; cada execução recria IDs, portanto essa experiência sozinha não prova identidade entre execuções. Os testes também verificam links de cada resultado.

## Transferência

design-transfer: Não. Em lista encadeada precisa percorrer até a fronteira, O(left), depois inverter k nós. Os IDs indexáveis são representação didática; não conferem acesso aleatório à lista real.

## Checkpoint

checkpoint-explain: Reconhecer mutação de links e preservar identidade; salvar antes de reescrever, prev inicia no sufixo, reconectar anterior ou cabeça. O(k) para inverter com fronteiras conhecidas e O(n) para localizar/exibir, O(1) estado sem cópias/rastro. Pilha alternativa O(k). Exige 0≤left≤right<n.

## Limites

checkpoint-limit: Lista não vazia, acíclica, até 64 valores. Parâmetros são posições na cadeia inicial; IDs não são valores. Lab usa vetor next para visualizar ligações, copia entrada e percorre saída; não promete espaço total constante para a interface nem reversão de ciclos.

## Múltipla escolha e justificativa dupla

Correta: D.

A: Perde o acesso à cadeia restante.

B: A operação altera ligações, mantendo valores e IDs.

C: Quando left=0, a nova cabeça é o antigo right.

D: Invariante cobre trecho processado, restante e fronteiras.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
