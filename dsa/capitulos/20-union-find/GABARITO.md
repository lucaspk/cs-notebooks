# Gabarito — Union-Find

## Pré-teste

pretest: Sim, na relação de conectividade não dirigida: componentes agrupam elementos ligados por cadeias de uniões.

## Exemplo trabalhado

worked-observation: 3 já alcançava a raiz 0. A compressão encurta a rota dentro do mesmo conjunto, sem juntar raízes diferentes.

## Previsão

predict: As três uniões iniciais usam raízes diretamente, zero passos. Com compressão: 2+1=3; sem: 2+2=4. Um componente em ambos.

## Comparação

compare: Após os dois finds: pais comprimidos [0,0,0,0] contra [0,0,0,2]. União redundante mantém um componente; consulta verdadeira. Passos acumulados após ambos comandos: sete com compressão e dez sem.

## Transferência

design-transfer: Adições e consultas combinam com Union-Find. Remoção pode separar um componente; parent não guarda o grafo completo nem desfaz automaticamente. É preciso outra estratégia, reconstrução ou algoritmo específico.

## Checkpoint

checkpoint-explain: Raízes iguais: nenhum conjunto é fundido. Tamanho só é consultado em raízes válidas para ligar menor a maior. Amortizado descreve custo total de uma sequência, não média probabilística nem cada find constante.

## Limites

checkpoint-limit: Até 16 elementos, IDs 0..n−1 e 64 comandos. Todos começam isolados a cada execução. size de não raízes pode estar desatualizado. α(n) é a inversa de Ackermann, cresce extremamente devagar; o lab ilustra mecanismos, não prova esse limite. Sem rollback, deleções ou grafos dirigidos.

## Múltipla escolha e justificativa dupla

Correta: D.

A: Tamanho nos nós que deixaram de ser raiz pode ficar antigo.

B: Só encurta caminhos até uma raiz já alcançada.

C: Estrutura básica não fornece caminhos mínimos nem remoção de arestas.

D: União atualiza a raiz sobrevivente e find não altera a partição.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
