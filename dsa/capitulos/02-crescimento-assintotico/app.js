(function(){
'use strict';
const M = DsaLab;
PlaygroundComponents.mount('#chapter-lab', {
id: 'dsa-demo',
title: 'Compare n com o dobro',
description: 'Contadores exatos de modelos distintos, sem cronômetro. O contador logarítmico conta divisões até 1.',
fields: [{id:'size',label:'Tamanho n (a tabela também mostra 2n)',value:8,min:1,max:524288,step:1}],
columns: ['Contador','n','2n'],
evaluate(s){
const a=M.growth(s.size), b=M.growth(s.size*2);
return ['constant','logarithmic','linear','quadratic'].map((key,i)=>[['Constante: 1','Divisões: floor(log₂ n)','Linear: n','Quadrático: n²'][i],a[key],b[key]]);
}
});
})();
