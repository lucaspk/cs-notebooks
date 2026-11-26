(function(){
'use strict';
const M=DsaLab;
PlaygroundComponents.mount('#chapter-lab', {
  "id": "dsa-ordering",
  "title": "Acompanhe entrada e retorno",
  "description": "A chamada-base conta na profundidade. O valor só fica disponível ao retornar; limite de 32 itens.",
  "fields": [
    {
      "id": "values",
      "label": "Números separados por vírgula (até 32)",
      "type": "text",
      "value": "4,-1,2"
    }
  ],
  "columns": [
    "Evento",
    "i",
    "Profundidade",
    "Retorno / estado"
  ],
evaluate(s){const a=DsaFoundations.numbers(s.values);const r=M.recursive(a);return [...r.trace,['Resumo',r.calls+' chamadas',r.depth,'Soma: '+r.result]];}
});
})();
