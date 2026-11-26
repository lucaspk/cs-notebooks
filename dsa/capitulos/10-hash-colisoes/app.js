(function(){
'use strict';
const M=DsaLab;
PlaygroundComponents.mount('#chapter-lab', {
id:'dsa-structure',
title:"Observe as cadeias por bucket",
description:"Chaves inteiras seguras; duplicatas não entram novamente. Colisões contam inserções distintas em bucket ocupado, não pares. A busca compara só a cadeia do alvo.",
fields:[{"id": "keys", "label": "Chaves inteiras separadas por vírgula", "type": "text", "value": "1,5,9,5"}, {"id": "buckets", "label": "Quantidade de buckets", "value": 4, "min": 1, "max": 16, "step": 1}, {"id": "target", "label": "Chave procurada", "value": 13, "step": 1}],
columns:["Fase / chave", "Bucket", "Evento", "Cadeia / resultado"],
evaluate(s){const r=M.hash(DsaFoundations.numbers(s.keys),s.buckets,s.target); return [...r.trace,...r.table.map((chain,i)=>['Tabela',i,'',chain.join(' → ')||'∅']),['Carga',r.load,'Chaves distintas: '+r.size,'Colisões: '+r.collisions],['Busca',r.index,r.found?'Encontrada':'Ausente','Comparações: '+r.comparisons]];}
});
})();
