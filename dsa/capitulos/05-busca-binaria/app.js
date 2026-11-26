(function(){
'use strict';
const M = DsaLab;
PlaygroundComponents.mount('#chapter-lab', {
id: 'dsa-demo',
title: 'Reduza o intervalo candidato',
description: 'Linhas mostram o intervalo antes da sondagem. Duplicatas podem devolver qualquer ocorrência. A validação de ordem não entra no contador.',
fields: [{id:'values',label:'Valores ordenados, separados por vírgula (vazio permitido)',type:'text',value:'2, 4, 6, 8, 10, 12, 14'},{id:'target',label:'Alvo numérico',value:12}],
columns: ['lo','hi','mid','Valor central','Decisão'],
evaluate(s){
const r=M.binary(M.numbers(s.values),s.target);
return [['Índice: '+r.index,'Sondagens: '+r.probes,'','',''],...r.trace];
}
});
})();
