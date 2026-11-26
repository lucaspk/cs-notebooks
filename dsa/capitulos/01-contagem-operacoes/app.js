(function(){
'use strict';
const M = DsaLab;
PlaygroundComponents.mount('#chapter-lab', {
id: 'dsa-demo',
title: 'Conte a execução da soma',
description: 'Cada linha registra uma adição. Duas somas independentes repetem o trabalho; reutilizar o total evita a segunda varredura.',
fields: [{id:'values',label:'Valores separados por vírgula (vazio permitido)',type:'text',value:'3, 1, 4'}],
columns: ['Etapa / origem','Valor / destino','Acumulador / ação'],
evaluate(s){
const r = M.sum(M.numbers(s.values));
return [['Resumo', 'Soma: '+r.total, 'Leituras: '+r.reads+'; adições: '+r.additions], ...r.trace.map(([i,v,total])=>['Índice '+i,'Valor '+v,'Acumulador '+total])];
}
});
})();
