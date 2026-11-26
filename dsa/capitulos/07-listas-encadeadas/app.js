(function(){
'use strict';
const M=DsaLab;
PlaygroundComponents.mount('#chapter-lab', {
id:'dsa-structure',
title:"Religue os nós",
description:"Cada mudança reconstrói a lista original. Compare identidades e ligações antes/depois; os avanços contam só a localização da posição.",
fields:[{"id": "values", "label": "Valores da lista separados por vírgula", "type": "text", "value": "10, 20, 30"}, {"id": "operation", "label": "Operação", "type": "select", "value": "insert", "options": [{"value": "insert", "label": "Inserir antes do índice"}, {"value": "remove", "label": "Remover no índice"}]}, {"id": "position", "label": "Índice começando em zero", "value": 1, "min": 0, "max": 64, "step": 1}, {"id": "newvalue", "label": "Novo valor (somente inserção)", "value": 15}],
columns:["Momento", "Nó / etapa", "Valor / ação", "next"],
evaluate(s){const r=M.linked(DsaFoundations.numbers(s.values),s.operation,s.position,s.newvalue); return [...r.before.map(row=>['Antes',...row]),...r.trace.map((text,i)=>['Operação',i+1,text,'']),...r.after.map(row=>['Depois',...row]),['Resumo','Avanços: '+r.steps,JSON.stringify(r.result),'']];}
});
})();
