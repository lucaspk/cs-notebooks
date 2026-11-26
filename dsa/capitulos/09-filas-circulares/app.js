(function(){
'use strict';
const M=DsaLab;
PlaygroundComponents.mount('#chapter-lab', {
id:'dsa-structure',
title:"Reutilize as posições por módulo",
description:"Comandos separados por vírgula: +10 insere, - retira, +-5 insere negativo. Inserção cheia e retirada vazia são rejeitadas sem alterar o estado.",
fields:[{"id": "capacity", "label": "Capacidade fixa", "value": 3, "min": 1, "max": 16, "step": 1}, {"id": "commands", "label": "Comandos na ordem de execução", "type": "text", "value": "+10,+20,+30,-,+40"}],
columns:["Passo", "Ação", "head", "tail", "size", "Buffer físico (null = livre)"],
evaluate(s){const r=M.queue(s.capacity,s.commands); return [...r.trace,['Fim','Ordem FIFO: '+JSON.stringify(r.result),r.head,r.tail,r.size,'Retirados: '+JSON.stringify(r.removed)]];}
});
})();
