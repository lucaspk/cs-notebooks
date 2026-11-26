(function(){
'use strict';
const M=DsaLab;
PlaygroundComponents.mount('#chapter-lab', {
id:'dsa-structure',
title:"Veja o pico e o total",
description:"Cada linha é uma inserção no fim, começando vazio com capacidade 1. Mudar a política reinicia toda a sequência.",
fields:[{"id": "count", "label": "Quantidade de inserções", "value": 5, "min": 0, "max": 64, "step": 1}, {"id": "policy", "label": "Crescimento ao encher", "type": "select", "value": "double", "options": [{"value": "double", "label": "Duplicar capacidade"}, {"value": "increment", "label": "Aumentar uma posição"}]}],
columns:["Inserção", "Capacidade antes", "Capacidade depois", "Cópias", "Custo da inserção", "Total acumulado"],
evaluate(s){const r=M.dynamic(s.count,s.policy); return [...r.trace,['Resumo','Tamanho: '+r.size,'Capacidade: '+r.capacity,'Cópias: '+r.copies,'Média: '+r.amortized.toFixed(3),'Total: '+r.writes]];}
});
})();
