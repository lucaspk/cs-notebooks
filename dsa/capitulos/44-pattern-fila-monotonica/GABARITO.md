# Gabarito — Fila monotônica

## Pré-teste

pretest: Soma é aditiva; após remover o máximo não sabemos qual candidato restante é o maior.

## Exemplo trabalhado

worked-observation: Índices identificam quando cada candidato expira e permitem desempatar duplicatas. Valores sozinhos não determinam a idade do candidato.

## Previsão

predict: Exemplo: [3,3,5,5,6,7]. Com duplicatas, máximos [3,3], índices [1,2], pois o empate conserva o mais recente.

## Comparação

compare: k=1 devolve cada valor. k=n devolve um máximo global, com índice mais recente em empate. Em sequência decrescente não há dominância no fundo, e a fila pode ter k elementos; expiração limita a ocupação.

## Transferência

design-transfer: Inverta a comparação para manter valores crescentes e a frente mínima, mantendo regras de expiração. Em fluxo, armazene índice/valor no deque; não precisa guardar todo o histórico.

## Checkpoint

checkpoint-explain: Reconhecer extremos por janela, não soma. Invariantes: índices crescentes válidos e valores decrescentes; dominância segura e expiração na frente. O(n) amortizado, O(k) estado, saída O(n), força bruta O(nk). Empates conservam mais recente; negativos válidos.

## Limites

checkpoint-limit: Até 64 inteiros limitados; janela válida exige entrada não vazia. Não calcula mediana ou soma. Rastro linear de eventos separado da análise, entradas e saída ficam na memória da interface.

## Múltipla escolha e justificativa dupla

Correta: B.

A: Após remoção, falta saber o segundo melhor candidato.

B: É pelo menos tão grande e permanece válido por mais tempo.

C: Já estão fora e nunca voltam a entrar.

D: Shift pode deslocar todos os elementos; o lab usa buffer circular.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
