'use strict';
PlaygroundComponents.mount('#lab-host', {
 id:'explore', title:"Da soma ao próximo caso", description:"Compare a soma acumulada e a fórmula. Conferir casos não substitui a prova.",
 fields:[{"id": "n", "label": "Limite n (0 a 50)", "type": "number", "value": 4, "min": 0, "max": 50, "step": 1}],
 evaluate: s => {
 const r=MathLab.induction(s.n);
 return 'Soma = '+r.sum+'; fórmula = '+r.formula+'\nTraço: '+(r.trace.join(' | ')||'soma vazia: 0')+'\nS(n)+(n+1) = '+r.step+'; fórmula para n+1 = '+r.next;
}
});
