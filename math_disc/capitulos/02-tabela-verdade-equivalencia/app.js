'use strict';
PlaygroundComponents.mount('#lab-host', {
 id:'explore', title:"Compare expressão por expressão", description:"A esquerda é sempre p → q. Uma única linha diferente refuta a equivalência.",
 fields:[{"id": "expression", "label": "Expressão da direita", "type": "select", "value": "rewrite", "options": [{"value": "rewrite", "label": "¬p ∨ q"}, {"value": "converse", "label": "q → p (recíproca)"}, {"value": "contra", "label": "¬q → ¬p (contrapositiva)"}]}],
 columns:["p", "q", "p → q", "Direita", "Comparação"],
 evaluate: s => MathLab.equivalent(s.expression)
});
