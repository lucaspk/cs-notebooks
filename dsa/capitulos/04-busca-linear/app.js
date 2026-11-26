(function(){
'use strict';
const M = DsaLab;
PlaygroundComponents.mount('#chapter-lab', {
id: 'dsa-demo',
title: 'Examine até encontrar',
description: 'O rastro encerra na primeira ocorrência. Índice −1 significa ausência.',
fields: [{id:'values',label:'Valores separados por vírgula (vazio permitido)',type:'text',value:'4, 9, 4, 2'},{id:'target',label:'Alvo numérico',value:2}],
columns: ['Etapa / origem','Valor / destino','Acumulador / ação'],
evaluate(s){
const r=M.linear(M.numbers(s.values),s.target);
return [['Resumo','Índice: '+r.index,'Igualdades: '+r.comparisons],...r.trace];
}
});
})();
