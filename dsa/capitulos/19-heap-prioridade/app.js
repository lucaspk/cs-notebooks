(function(){
'use strict';
const M=DsaLab;
PlaygroundComponents.mount('#chapter-lab', {
  "id": "dsa-trees",
  "title": "Construa e retire prioridades",
  "description": "Min-heap por inserções repetidas. Rastros de trocas podem mostrar estados intermediários ainda em reparo.",
  "fields": [
    {
      "id": "values",
      "label": "Números separados por vírgula (até 32)",
      "type": "text",
      "value": "5,2,4,1"
    },
    {
      "id": "extract",
      "label": "Quantidade de retiradas",
      "value": 2,
      "min": 0,
      "max": 32,
      "step": 1
    }
  ],
  "columns": [
    "Evento",
    "Valor / índices",
    "Vetor / resultado"
  ],
evaluate(s){const r=M.heap(DsaFoundations.numbers(s.values),s.extract);return [...r.trace,['Final',r.comparisons+' comparações',r.result.join(', ')||'∅'],['Retirados','',r.removed.join(', ')||'∅']];}
});
})();
