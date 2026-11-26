(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-fixedWindow",
  "title": "Rastreie o padrão",
  "description": "Altere a sequência e o parâmetro. Índices começam em zero; leia o contrato e acompanhe cada decisão.",
  "fields": [
    {
      "id": "values",
      "label": "Sequência de inteiros, separada por vírgulas",
      "type": "text",
      "value": "2,1,5,1,3,2"
    },
    {
      "id": "k",
      "label": "Tamanho k",
      "value": 3,
      "min": 1,
      "max": 64,
      "step": 1
    }
  ],
  "columns": [
    "Início",
    "Fim",
    "Soma",
    "Melhor soma"
  ],
evaluate(s){const r=M.fixedWindow(s.values,s.k);return [...r.trace,['Melhor',r.start,r.end,r.best]];}
});})();
