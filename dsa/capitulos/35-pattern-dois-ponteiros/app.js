(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-twoPointers",
  "title": "Rastreie o padrão",
  "description": "Altere a sequência e o parâmetro. Índices começam em zero; leia o contrato e acompanhe cada decisão.",
  "fields": [
    {
      "id": "values",
      "label": "Sequência de inteiros, separada por vírgulas",
      "type": "text",
      "value": "1,2,4,7,11"
    },
    {
      "id": "target",
      "label": "Alvo da soma",
      "value": 9,
      "min": -1000000,
      "max": 1000000,
      "step": 1
    }
  ],
  "columns": [
    "Esquerda",
    "Direita",
    "Soma",
    "Decisão"
  ],
evaluate(s){const r=M.twoPointers(s.values,s.target);return [...r.trace,['Resposta',r.pair===null?'ausência':r.pair.join(', '),'índices ordenados','']];}
});})();
