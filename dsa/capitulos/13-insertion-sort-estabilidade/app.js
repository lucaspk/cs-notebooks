(function(){
'use strict';
const M=DsaLab;
PlaygroundComponents.mount('#chapter-lab', {
  "id": "dsa-ordering",
  "title": "Observe o prefixo e os empates",
  "description": "Identidade #índice acompanha cada registro. Comparações são entre chaves; deslocamentos excluem a escrita final.",
  "fields": [
    {
      "id": "values",
      "label": "Números separados por vírgula (até 32)",
      "type": "text",
      "value": "2,2,1"
    },
    {
      "id": "ties",
      "label": "Critério de deslocamento",
      "type": "select",
      "value": "stable",
      "options": [
        {
          "value": "stable",
          "label": "Maior (estável)"
        },
        {
          "value": "reverse",
          "label": "Maior ou igual (contraste)"
        }
      ]
    }
  ],
  "columns": [
    "Iteração i",
    "Chave retirada",
    "Deslocamentos",
    "Estado com identidades"
  ],
evaluate(s){const a=DsaFoundations.numbers(s.values);const r=M.insertion(a,s.ties);return [...r.trace,['Total',r.comparisons+' comparações',r.moves,M.label(r.result)]];}
});
})();
