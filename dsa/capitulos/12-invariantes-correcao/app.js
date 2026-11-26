(function(){
'use strict';
const M=DsaLab;
PlaygroundComponents.mount('#chapter-lab', {
  "id": "dsa-ordering",
  "title": "Verifique as fronteiras do laço",
  "description": "Compare a versão correta com falhas deliberadas. Um rastro verde não é prova para todas as entradas.",
  "fields": [
    {
      "id": "values",
      "label": "Números separados por vírgula (até 32)",
      "type": "text",
      "value": "2,3"
    },
    {
      "id": "mode",
      "label": "Versão do laço",
      "type": "select",
      "value": "correct",
      "options": [
        {
          "value": "correct",
          "label": "Correta"
        },
        {
          "value": "bad-init",
          "label": "Acumulador inicial 1"
        },
        {
          "value": "skip",
          "label": "Pular último item"
        }
      ]
    }
  ],
  "columns": [
    "Fronteira",
    "i",
    "Acumulador",
    "Prefixo esperado",
    "n−i",
    "Invariante"
  ],
evaluate(s){const a=DsaFoundations.numbers(s.values);return M.invariant(a,s.mode).trace;}
});
})();
