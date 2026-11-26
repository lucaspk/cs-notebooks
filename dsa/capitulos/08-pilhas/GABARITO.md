# Gabarito — Pilhas

## Pré-teste

pretest: [ deve fechar antes de (. Contagem não verifica tipo e ordem: ([)] tem quantidades iguais e é inválida.

## Exemplo trabalhado

worked-observation: Isso violaria LIFO e aceitaria cruzamento de pares. O fechamento deve corresponder à abertura mais recente ainda pendente.

## Previsão

predict: (() deixa uma abertura ( no fim. )( falha no primeiro caractere porque não existe abertura no topo; não continua até compensar a contagem.

## Comparação

compare: ([x]) é válida; ([)] falha no índice 2 com [ no topo. Vazia é válida: nenhuma abertura pendente ou fechamento indevido. O rastro da inválida para na primeira falha.

## Transferência

design-transfer: A última ação deve ser desfeita primeiro. É preciso guardar dados para revertê-la, como conteúdo removido e posição; o contrato muda se existirem ações não reversíveis ou mudanças externas.

## Checkpoint

checkpoint-explain: Cada caractere é visitado uma vez e cada delimitador gera no máximo um push/pop: O(m) operações abstratas. Espaço O(d), profundidade máxima, até O(m). Pode rejeitar antes do fim. Push em vetor dinâmico pode ser amortizado, não latência constante garantida.

## Limites

checkpoint-limit: O verificador ignora caracteres que não são delimitadores, inclusive aspas: não interpreta strings, comentários ou sintaxe JavaScript. Usa até 128 caracteres. O contador descreve operações abstratas; cópias de rastros e exibição ficam fora da análise.

## Múltipla escolha e justificativa dupla

Correta: D.

A: Fecha [ antes de (, respeitando o topo.

B: Os três níveis fecham em ordem inversa.

C: Não há obrigação de conter um par; vazia satisfaz o contrato.

D: O primeiro fechamento ) encontra [ no topo.

mc-why-yes: ligar a regra ao caso, usando a justificativa da alternativa correta.

mc-why-not: rejeitar cada uma das três restantes com as razões específicas acima.

## Critérios

Completa: explicita hipótese, mecanismo, dados e conclusão; distingue contador de resultado e respeita o contrato. Parcial: resultado correto sem justificar uma etapa ou sem declarar condição necessária. Revisar: contradição com o rastro, extrapolação para segundos ou garantia sem pré-condição. Na previsão, registrar a hipótese antes de executar; corrigir uma previsão inicial é válido se a comparação explicar a evidência.
