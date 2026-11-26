(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-44-pattern-fila-monotonica",
  "title": "Rastreie candidatos e invariantes",
  "description": "Cada execução reconstrói o modelo. Leia a sequência de eventos; índices e IDs começam em zero.",
  "fields": [
    {
      "id": "values",
      "label": "Sequência de valores",
      "type": "text",
      "value": "1,3,-1,-3,5,3,6,7"
    },
    {
      "id": "k",
      "label": "Tamanho da janela k",
      "value": 3,
      "min": 1,
      "max": 64,
      "step": 1
    }
  ],
  "columns": [
    "Evento",
    "Índice / máximo",
    "Novo índice",
    "Detalhe"
  ],
evaluate(s){const r=M.windowMax(s.values,s.k);return [...r.trace,...r.answer.map((v,i)=>['Janela '+i+'..'+(i+Number(s.k)-1),v,r.indices[i],'máximo / índice']),['Contadores',r.pushes+' entradas',r.pops+' saídas','cada índice sai no máximo uma vez']];}
});})();
