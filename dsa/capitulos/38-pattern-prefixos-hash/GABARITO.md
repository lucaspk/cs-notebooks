# Gabarito — Somas prefixadas e hash

## Pré-teste

pretest: Primeiro defina a resposta e enumere candidatos válidos. Depois identifique o estado reutilizável: valores anteriores, extremos ou agregado de um intervalo. A otimização precisa preservar todos os candidatos possíveis.

## Exemplo trabalhado

worked-observation: Há dois prefixos zero anteriores, correspondentes a dois inícios distintos. Presença daria apenas um, frequência acrescenta dois.

## Previsão

predict: Contribuições 0,1,2, total 3. Três zeros contribuem 1,2,3 e totalizam 6 intervalos não vazios.

## Comparação

compare: Vazio conta 0. [3] conta 1 graças ao prefixo inicial zero. [1,2,1] conta 2: [0,1] e [1,2]. Inserir antes da consulta adicionaria vazios para alvo zero.

## Transferência

design-transfer: Não. Armazene listas de índices por prefixo para reconstruir saídas; emitir z intervalos exige Ω(z) tempo, com z possivelmente n(n+1)/2. O contador agrega sem emitir cada resposta.

## Checkpoint

checkpoint-explain: Reconhecer soma exata e contagem com negativos/zeros. Invariante: Map contém frequências de todos os prefixos estritamente anteriores. Zero inicial inclui início 0; consultar antes de incrementar exclui vazio. O(n) esperado e O(n) espaço, força bruta O(n²). Vazio retorna zero; três zeros têm seis intervalos.

## Limites

checkpoint-limit: Até 64 inteiros limitados e alvo limitado; prefixos até ±64000000 e contagem até 2080 são exatos em Number. Em entradas sem esses limites, verificar overflow/precisão. Hash tem custo esperado abstrato. Retorna contagem e rastro, sem listar todos os intervalos.

## Múltipla escolha e justificativa dupla

Correta: B.

A: Prefixos repetidos representam diferentes inícios.

B: Mantém i<j+1 e exclui intervalos vazios.

C: É preciso o prefixo anterior à primeira posição, P[0]=0.

D: A identidade algébrica vale também com negativos.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
