# Gabarito — Trie e prefixos

## Pré-teste

pretest: Não; existência de caminho não implica marcador terminal.

## Exemplo trabalhado

worked-observation: cas é palavra completa e também prefixo de casa e caso. Precisa de marcador independente dos filhos.

## Previsão

predict: ca: prefixo sim/palavra não; cas: ambos sim; cat: ambos não.

## Comparação

compare: Duplicata não muda nós nem terminal. Vazio encontra raiz e não palavra. Sem palavras a raiz continua existindo; qualquer consulta não vazia falha.

## Transferência

design-transfer: Isso só localiza o espaço de candidatos. É preciso enumerar ou manter rankings atualizáveis; custo de saída e política de popularidade não estão incluídos na consulta booleana.

## Checkpoint

checkpoint-explain: Compartilhamento por símbolo, terminal independente de filhos; O(S) construção/memória e O(q) consulta esperada. Comparar varredura e hash de palavra inteira, tratar duplicatas e raiz. Separar prefixo existente de palavra completa.

## Limites

checkpoint-limit: Até 32 palavras a-z de 1..16 letras, consulta 0..16. Sem remoção, sugestões, ranking ou Unicode. Transições Map têm custo esperado; não promete representação compacta em memória. Rastro registra só consulta; contagem de nós inclui raiz.

## Múltipla escolha e justificativa dupla

Correta: C.

A: Representa prefixo; somente terminal indica palavra.

B: Exige varredura ou índice adicional de prefixos.

C: cas pode terminar e continuar em casa.

D: Inserção reutiliza arestas já existentes.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
