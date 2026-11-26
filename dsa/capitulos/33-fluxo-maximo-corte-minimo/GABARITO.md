# Gabarito — Fluxo máximo e corte mínimo

## Pré-teste

pretest: Não. Pode ser necessário redistribuir o que já foi enviado para abrir espaço a outra rota.

## Exemplo trabalhado

worked-observation: Pode existir outro caminho residual ou possibilidade de cancelar parte do fluxo e redistribuir. A prova final exige ausência de caminho residual s→t e corte com capacidade igual ao valor.

## Previsão

predict: Gargalos 2,2,1; valor 5 e corte de saída de 0 com capacidade 5. Com 2→3 de capacidade 1, valor máximo 3, certificado pelo corte que entra em 3: 1→3(2) e 2→3(1).

## Comparação

compare: Primeiro caminho 0→1→3→5. Segundo 0→2→3→1→4→5 usa reversa 3→1 para cancelar fluxo em 1→3, redistribuindo via 1→4. Valor dois; fluxo final em 1→3 é zero. Sem ligações a 5, valor e capacidade do corte são zero, apesar de outras capacidades positivas.

## Transferência

design-transfer: Não. O objetivo aqui é quantidade transportada, não preço. Fluxo de custo mínimo exige modelar custos e outro algoritmo; capacidades zero não são descontos.

## Checkpoint

checkpoint-explain: Cada fluxo original fica entre zero e capacidade; intermediários conservam e s/t têm saldos opostos. Reversa cancela fluxo na aresta pareada, inclusive quando existe outra aresta física oposta. Não haver caminho residual certifica máximo global; apenas não conseguir aumentar uma escolha específica não basta. Valor igual à capacidade de corte confirma otimalidade.

## Limites

checkpoint-limit: Até 12 IDs e 64 arestas, capacidades inteiras 0..1000000, s diferente de t. Sem laços nem multiarestas; arestas originais opostas são permitidas e mantidas separadas. Sem custos, múltiplas fontes ou limites inferiores. Ordem da BFS desempata por destino e índice de entrada; fluxo e corte ótimos podem não ser únicos. Rastro guarda aumentos, não todas as filas intermediárias.

## Múltipla escolha e justificativa dupla

Correta: A.

A: Viabilidade dá valor alcançado; corte dá limite superior igual.

B: Pode haver caminhos alternativos residuais.

C: Arestas internas ou de retorno não compõem necessariamente um corte.

D: Cancelamentos podem ser essenciais; reversas fazem parte da rede residual.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
