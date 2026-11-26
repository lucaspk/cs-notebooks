(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-variableWindow",
  "title": "Rastreie o padrão",
  "description": "Altere a sequência e o parâmetro. Índices começam em zero; leia o contrato e acompanhe cada decisão.",
  "fields": [
    {
      "id": "values",
      "label": "Sequência de inteiros, separada por vírgulas",
      "type": "text",
      "value": "2,3,1,2,4,3"
    },
    {
      "id": "target",
      "label": "Limiar T positivo",
      "value": 7,
      "min": 1,
      "max": 1000000,
      "step": 1
    }
  ],
  "columns": [
    "Evento",
    "Início",
    "Fim",
    "Soma / comprimento"
  ],
evaluate(s){const r=M.variableWindow(s.values,s.target);return [...r.trace,['Melhor',r.best===null?'ausência':r.best.start,r.best===null?'—':r.best.end,r.best===null?'—':r.best.length+' elementos']];}
});})();
