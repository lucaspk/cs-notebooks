'use strict';
PlaygroundComponents.mount('#lab-host', {
 id:'explore', title:"Ordenar sem perder elementos", description:"A propriedade exige ordem não decrescente E a mesma quantidade de cada valor.",
 fields:[{"id": "nums", "label": "Números", "type": "text", "value": "3 1 1 2"}, {"id": "implementation", "label": "Implementação", "type": "select", "value": "correct", "options": [{"value": "correct", "label": "Ordenação correta"}, {"value": "drop", "label": "Bug: elimina repetições"}, {"value": "reverse", "label": "Bug: ordem decrescente"}]}],
 evaluate: s => {
 const r=VerificationExplore.sortCase(s.nums,s.implementation);
 return 'Saída: ['+r.output.join(', ')+']. Ordenada: '+(r.ordered?'sim':'não')+'; multiconjunto preservado: '+(r.preserved?'sim':'não')+'. '+(r.passed?'PROPRIEDADES PASSARAM':'CONTRAEXEMPLO ENCONTRADO');
}
});
