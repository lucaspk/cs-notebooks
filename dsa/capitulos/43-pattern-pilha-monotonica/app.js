(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-43-pattern-pilha-monotonica",
  "title": "Rastreie decisões e estado",
  "description": "Cada execução reconstrói a entrada. IDs e posições começam em zero; null indica ausência de nó ou resposta.",
  "fields": [
    {
      "id": "values",
      "label": "Valores na ordem da sequência",
      "type": "text",
      "value": "2,1,2,4,3"
    }
  ],
  "columns": [
    "Evento",
    "Índice",
    "Maior / valor",
    "Pilha / detalhe"
  ],
evaluate(s){const r=M.nextGreater(s.values);return [...r.trace,...r.answer.map((j,i)=>['Resposta de '+i,j===null?'ausência':j,j===null?'—':r.a[j],'índice / valor']),['Contadores',r.pushes+' pushes',r.pops+' pops','não são todas as comparações']];}
});})();
