'use strict';
PlaygroundComponents.mount('#lab-host', {
 id:'explore', title:"Uma saída para cada entrada", description:"Declare o domínio e pares como 1:a. Saídas iguais para entradas diferentes são permitidas.",
 fields:[{"id": "domain", "label": "Domínio", "type": "text", "value": "1 2"}, {"id": "pairs", "label": "Pares da relação", "type": "text", "value": "1:a 2:a"}],
 evaluate: s => {
 const r=MathLab.relation(s.pairs,s.domain);
 return (r.valid?'É função neste domínio.':'Não é função neste domínio.')+' Unicidade: '+(r.unique?'sim':'não')+'. Entradas sem saída: '+(r.missing.join(', ')||'nenhuma')+'.';
}
});
