'use strict';
PlaygroundComponents.mount('#lab-host', {
 id:'explore', title:"Verdade por regra", description:"Marque V para p e q; desmarcado significa F.",
 fields:[{"id": "p", "label": "p", "type": "checkbox", "value": true}, {"id": "q", "label": "q", "type": "checkbox", "value": false}, {"id": "op", "label": "Conectivo", "type": "select", "value": "IMP", "options": [{"value": "AND", "label": "AND — e"}, {"value": "OR", "label": "OR — ou inclusivo"}, {"value": "IMP", "label": "IMP — se p, então q"}]}],
 evaluate: s => MathLab.evalConnective(s.p,s.q,s.op) ? 'Resultado: V' : 'Resultado: F'
});
