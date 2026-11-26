(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-39-pattern-intervalos",
  "title": "Rastreie decisões e estado",
  "description": "Cada execução reconstrói a entrada. IDs e posições começam em zero; null indica ausência de nó ou resposta.",
  "fields": [
    {
      "id": "intervals",
      "label": "Intervalos início fim, separados por vírgulas",
      "type": "text",
      "value": "1 3,3 5,8 10,2 4"
    },
    {
      "id": "mode",
      "label": "Convenção de extremos",
      "type": "select",
      "value": "closed",
      "options": [
        {
          "value": "closed",
          "label": "Fechados [l,r]"
        },
        {
          "value": "half-open",
          "label": "Semiabertos [l,r)"
        }
      ]
    }
  ],
  "columns": [
    "Evento",
    "Início",
    "Fim",
    "Estado / convenção"
  ],
evaluate(s){const r=M.mergeIntervals(s.intervals,s.mode);return [...r.trace,...r.merged.map(([l,h])=>['Bloco final',l,h,s.mode==='closed'?'[l,r]':'[l,r)'])];}
});})();
