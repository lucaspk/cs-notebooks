(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-prefixHash",
  "title": "Rastreie o padrão",
  "description": "Altere a sequência e o parâmetro. Índices começam em zero; leia o contrato e acompanhe cada decisão.",
  "fields": [
    {
      "id": "values",
      "label": "Sequência de inteiros, separada por vírgulas",
      "type": "text",
      "value": "1,-1,0"
    },
    {
      "id": "target",
      "label": "Alvo exato",
      "value": 0,
      "min": -1000000,
      "max": 1000000,
      "step": 1
    }
  ],
  "columns": [
    "Índice",
    "Prefixo atual",
    "Prefixo procurado",
    "Encontros / acumulado"
  ],
evaluate(s){const r=M.prefixHash(s.values,s.target);return [...r.trace,['Resposta',r.count,'intervalos não vazios','']];}
});})();
