(function(){
'use strict';
const M = DsaLab;
PlaygroundComponents.mount('#chapter-lab', {
id: 'dsa-demo',
title: 'Abra espaço sem perder valores',
description: 'Cada mudança recalcula uma única operação sobre o vetor original. Nas linhas de deslocamento, as colunas indicam origem, destino e valor.',
fields: [{id:'values',label:'Vetor original, separado por vírgula',type:'text',value:'10, 20, 30'},{id:'operation',label:'Operação',type:'select',value:'insert',options:[{value:'read',label:'Ler posição'},{value:'insert',label:'Inserir preservando ordem'},{value:'remove',label:'Remover preservando ordem'}]},{id:'position',label:'Índice (começa em zero)',value:1,min:0,max:64,step:1},{id:'newvalue',label:'Novo valor (usado somente na inserção)',value:15}],
columns: ['Etapa / origem','Valor / destino','Acumulador / ação'],
evaluate(s){
const r=M.vector(M.numbers(s.values),s.operation,s.position,s.newvalue);
return [['Resultado',JSON.stringify(r.result),'Valor lido/removido: '+(r.value === undefined ? 'não se aplica' : r.value)],['Contagem','Deslocamentos: '+r.moves,'Escritas de posições: '+r.writes],...r.trace.map(row=>[row[0],row[1],row[2]])];
}
});
})();
