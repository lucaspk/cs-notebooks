(function(){
'use strict';
const M=DsaLab;
PlaygroundComponents.mount('#chapter-lab', {
  "id": "dsa-ordering",
  "title": "Particione e compare pivôs",
  "description": "Lomuto com ≤. Índice central não é mediana. A tabela mostra cada partição antes de ordenar seus lados.",
  "fields": [
    {
      "id": "values",
      "label": "Números separados por vírgula (até 32)",
      "type": "text",
      "value": "1,2,3,4"
    },
    {
      "id": "policy",
      "label": "Escolha de pivô",
      "type": "select",
      "value": "last",
      "options": [
        {
          "value": "last",
          "label": "Último índice"
        },
        {
          "value": "middle",
          "label": "Índice central"
        }
      ]
    }
  ],
  "columns": [
    "Intervalo inclusivo",
    "Pivô",
    "Posição final",
    "Estado / métrica"
  ],
evaluate(s){const a=DsaFoundations.numbers(s.values);const r=M.quick(a,s.policy);return [...r.trace,['Final','',r.comparisons+' comparações',M.label(r.result)],['Resumo',r.swaps+' trocas','Profundidade: '+r.maxDepth,'Somente trocas entre índices distintos']];}
});
})();
