(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-46-pattern-dois-heaps",
  "title": "Rastreie candidatos e invariantes",
  "description": "Cada execução reconstrói o modelo. Leia a sequência de eventos; índices e IDs começam em zero.",
  "fields": [
    {
      "id": "values",
      "label": "Fluxo para medianas dos prefixos",
      "type": "text",
      "value": "5,1,9,2"
    }
  ],
  "columns": [
    "Índice",
    "Valor",
    "Max-heap inferior | min-heap superior",
    "Mediana"
  ],
evaluate(s){const r=M.medians(s.values);return [...r.trace,['Resumo',r.answer.join(', '),'medianas por prefixo','']];}
});})();
