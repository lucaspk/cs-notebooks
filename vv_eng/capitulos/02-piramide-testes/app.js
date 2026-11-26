'use strict';
PlaygroundComponents.mount('#lab-host', {
 id:'explore', title:"Composição da suíte", description:"Custo ilustrativo por teste: unitário 1, integração 5, ponta a ponta 20. Não é uma meta universal.",
 fields:[{"id": "u", "label": "Unitários", "type": "number", "value": 5, "min": 0, "step": 1}, {"id": "i", "label": "Integração", "type": "number", "value": 3, "min": 0, "step": 1}, {"id": "e", "label": "Ponta a ponta", "type": "number", "value": 20, "min": 0, "step": 1}],
 evaluate: s => {
 const r=VerificationExplore.counts(s.u,s.i,s.e);
 return r.total?'Total: '+r.total+'; proporções U/I/E: '+r.percentages.join('% / ')+'%. Custo relativo: '+r.cost+'.':'Suíte vazia: nenhuma cobertura demonstrada.';
}
});
