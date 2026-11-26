(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-41-pattern-rapido-lento",
  "title": "Rastreie decisões e estado",
  "description": "Cada execução reconstrói a entrada. IDs e posições começam em zero; null indica ausência de nó ou resposta.",
  "fields": [
    {
      "id": "values",
      "label": "Valores dos nós (IDs seguem a ordem inicial)",
      "type": "text",
      "value": "10,20,30,40,50"
    },
    {
      "id": "entry",
      "label": "Cauda aponta ao ID (−1 = null)",
      "value": 2,
      "min": -1,
      "max": 63,
      "step": 1
    }
  ],
  "columns": [
    "Fase / nó",
    "Lento / valor",
    "Rápido / próximo",
    "Detalhe"
  ],
evaluate(s){const r=M.floyd(s.values,s.entry);return [...r.trace,...r.next.map((v,i)=>['Link ID '+i,r.a[i],v===null?'null':v,'valor / próximo']),['Resultado',r.cycleEntry===null?'sem ciclo':'entrada '+r.cycleEntry,r.meeting===null?'sem encontro':'encontro '+r.meeting,r.middle===null?'sem meio':'meio '+r.middle]];}
});})();
