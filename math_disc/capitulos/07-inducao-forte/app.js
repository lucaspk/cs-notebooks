'use strict';
PlaygroundComponents.mount('#lab-host', {
 id:'explore', title:"Indução forte com selos de 4 e 5", description:"Todo valor inteiro a partir de 12 pode ser formado. As bases são 12, 13, 14 e 15.",
 fields:[{"id": "n", "label": "Valor (0 a 100)", "type": "number", "value": 16, "min": 0, "max": 100, "step": 1}],
 evaluate: s => {
 const r=MathLab.postage(s.n);
 if(!r.stamps)return 'Fora da afirmação n ≥ 12. Não concluir impossibilidade: 8 também pode ser formado.';
 return r.stamps[0]+' selos de 4 + '+r.stamps[1]+' selos de 5 = '+r.n+'\nDependências: '+r.trace.join(' → ');
}
});
