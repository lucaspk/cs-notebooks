(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-40-pattern-busca-resposta",
  "title": "Rastreie decisões e estado",
  "description": "Cada execução reconstrói a entrada. IDs e posições começam em zero; null indica ausência de nó ou resposta.",
  "fields": [
    {
      "id": "values",
      "label": "Pesos positivos na ordem de transporte",
      "type": "text",
      "value": "1,2,3,4,5"
    },
    {
      "id": "days",
      "label": "Máximo de dias D",
      "value": 3,
      "min": 1,
      "max": 64,
      "step": 1
    }
  ],
  "columns": [
    "Limite inferior",
    "Limite superior",
    "Candidato",
    "Viabilidade / plano"
  ],
evaluate(s){const r=M.shipping(s.values,s.days);return [...r.trace,['Capacidade mínima',r.capacity,'cargas por dia',r.loads.join(', ')]];}
});})();
