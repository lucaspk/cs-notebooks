(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-45-pattern-top-k",
  "title": "Rastreie candidatos e invariantes",
  "description": "Cada execução reconstrói o modelo. Leia a sequência de eventos; índices e IDs começam em zero.",
  "fields": [
    {
      "id": "values",
      "label": "Fluxo de valores com multiplicidade",
      "type": "text",
      "value": "3,1,5,2,5,4"
    },
    {
      "id": "k",
      "label": "Quantidade k de maiores",
      "value": 3,
      "min": 1,
      "max": 64,
      "step": 1
    }
  ],
  "columns": [
    "Índice / evento",
    "Valor / saída",
    "Decisão",
    "Heap mínimo"
  ],
evaluate(s){const r=M.topK(s.values,s.k);return [...r.trace,['Heap final',r.result.join(', '),'não ordenado',''],['Saída ordenada',r.sorted.join(', '),'custo adicional','']];}
});})();
