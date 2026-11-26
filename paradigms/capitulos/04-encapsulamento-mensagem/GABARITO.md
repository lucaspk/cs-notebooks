# Gabarito — Encapsulamento

## Pré-teste

pretest-oo: Sim. Esconder o estado e oferecer operações validadas reduz caminhos que violam o contrato.

## Exemplo trabalhado

worked-04: Saldo inicial 20; sacar 5 retorna 15. Tentar sacar 30 depois é rejeitado e mantém 15. A rejeição precisa preservar o estado anterior, não apenas mostrar uma mensagem. Exigir explicação do mecanismo: Encapsular é oferecer operações que preservem regras sobre o estado. A conta do lab mantém saldo privado; depositar e sacar são mensagens. Invariante: saldo finito e não negativo. O contrato exige valores positivos, e saque não pode superar o saldo.

## Previsão

predict-withdraw: O saque falha sem mudar 20; o depósito leva a 25. Aceitar hipótese inicial diferente se explicitada antes da execução; após observar, exigir correção fundamentada.

## Comparar

compare-model: Inicial −1 é inválido; depósito 0 é inválido pelo contrato; sacar exatamente o saldo é válido e deixa 0.

## Múltipla escolha

Correta: D.

A: Ainda viola o invariante.

B: Uma falha não autoriza destruir saldo.

C: Rejeição não deve gerar dinheiro.

D: A operação inválida deve preservar o estado.

mc-why-yes: ligar a escolha ao caso e à definição, com a razão da alternativa correta acima.

mc-why-not: descartar todas as demais pelas razões específicas acima; não aceitar apenas “está errada”.

## Transferência

design-transfer: Quantidade positiva e finita/integral conforme unidade, disponibilidade suficiente, atualização atômica do saldo de estoque e preservação do estado em rejeição.

## Checkpoint

checkpoint-msg: usar dados do exemplo: Saldo inicial 20; sacar 5 retorna 15. Tentar sacar 30 depois é rejeitado e mantém 15. A rejeição precisa preservar o estado anterior, não apenas mostrar uma mensagem. Explicar a regra: Encapsular é oferecer operações que preservem regras sobre o estado. A conta do lab mantém saldo privado; depositar e sacar são mensagens. Invariante: saldo finito e não negativo. O contrato exige valores positivos, e saque não pode superar o saldo.

checkpoint-limit: Estado privado não resolve sozinho concorrência nem autorização. O exemplo é local, sem banco, múltiplas threads ou transação distribuída.

## Critérios de correção

Resposta completa liga regra, dados e conclusão e respeita os limites. Resposta parcial identifica o resultado mas não explica o mecanismo ou omite condição relevante. Revisar se contradiz a definição ou extrapola a simulação para uma garantia geral.
