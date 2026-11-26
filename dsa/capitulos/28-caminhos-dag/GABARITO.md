# Gabarito — Caminhos mínimos em DAG

## Pré-teste

pretest: Não. É preciso somar pesos; uma rota mais longa em arestas pode custar menos.

## Exemplo trabalhado

worked-observation: Todos os predecessores de 2 já foram processados. Nenhuma aresta de um vértice posterior pode retornar para 2 num DAG com essa ordem.

## Previsão

predict: Origem 0: [0,2,−2,1], pais [∅,0,1,2]. Origem 2: [∅,∅,0,3], pais [∅,∅,∅,2].

## Comparação

compare: Sem ciclo: [0,2,5,8], pai2=0. Com 3→1 fecha ciclo 1→2→3→1, rejeitado independentemente da soma dos pesos.

## Transferência

design-transfer: A estrutura ser DAG. Ordene topologicamente e relaxe pesos inclusive negativos; se houver ciclos, a justificativa desaparece.

## Checkpoint

checkpoint-explain: Atualiza por candidato menor apenas se origem da aresta alcançável. ∅ não é zero. Vértices anteriores à origem podem ser inalcançáveis e são pulados; precedência ainda certifica processamento correto. Custo total O(V+E).

## Limites

checkpoint-limit: Somente dirigido acíclico, sem multiarestas, pesos inteiros limitados. Validação e topológica incluem componentes desconectados. Sem reconstrução visual completa de caminhos; pais e distâncias permitem verificá-los. Snapshots não integram a análise linear.

## Múltipla escolha e justificativa dupla

Correta: D.

A: Aceita pesos distintos inclusive negativos.

B: IDs não expressam custo.

C: Pesos negativos participam da soma normalmente.

D: Ausência de retorno impede melhorias de predecessores ainda não processados.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
