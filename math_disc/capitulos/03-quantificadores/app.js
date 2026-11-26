'use strict';
PlaygroundComponents.mount('#lab-host', {
 id:'explore', title:"Domínio e predicado", description:"Predicado: x > limite. Apague o domínio para examinar o conjunto vazio.",
 fields:[{"id": "domain", "label": "Domínio (números separados por espaço)", "type": "text", "value": "1 2 3 4"}, {"id": "limit", "label": "Limite", "type": "number", "value": 0}],
 evaluate: s => {
 const a=MathLab.numbers(s.domain), pass=a.filter(x=>x>s.limit), fail=a.filter(x=>x<=s.limit);
 const r=MathLab.forallExists(a,x=>x>s.limit);
 return '∀: '+(r.all?'V':'F')+'; ∃: '+(r.exists?'V':'F')+'\nTestemunhas: '+(pass.join(', ')||'nenhuma')+'\nContraexemplos: '+(fail.join(', ')||'nenhum')+(a.length?'':'\nDomínio vazio: universal verdadeiro por vacuidade; existencial falso.');
}
});
