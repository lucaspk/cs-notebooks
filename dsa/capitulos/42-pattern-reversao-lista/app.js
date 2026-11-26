(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-42-pattern-reversao-lista",
  "title": "Rastreie decisões e estado",
  "description": "Cada execução reconstrói a entrada. IDs e posições começam em zero; null indica ausência de nó ou resposta.",
  "fields": [
    {
      "id": "values",
      "label": "Valores da lista acíclica",
      "type": "text",
      "value": "10,20,30,40,50"
    },
    {
      "id": "left",
      "label": "Posição inicial inclusiva",
      "value": 1,
      "min": 0,
      "max": 63,
      "step": 1
    },
    {
      "id": "right",
      "label": "Posição final inclusiva",
      "value": 3,
      "min": 0,
      "max": 63,
      "step": 1
    }
  ],
  "columns": [
    "Nó / evento",
    "Próximo salvo / ID",
    "Novo próximo / valores",
    "Detalhe"
  ],
evaluate(s){const r=M.reverseSegment(s.values,s.left,s.right);return [...r.trace,...r.next.map((v,i)=>['Link final',i,v===null?'null':v,'valor '+r.a[i]]),['Ordem final',r.order.join(', '),r.values.join(', '),'cabeça '+r.head]];}
});})();
