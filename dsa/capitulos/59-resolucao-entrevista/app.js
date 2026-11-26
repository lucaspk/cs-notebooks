(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-59-resolucao-entrevista",
  "title": "Investigue contratos, transições e contraexemplos",
  "description": "Registre sua previsão antes de executar. Cada execução recria o modelo; índices começam em zero.",
  "fields": [
    {
      "id": "values",
      "label": "Entrada adicional livre",
      "type": "text",
      "value": "-2,5,1"
    },
    {
      "id": "target",
      "label": "Soma alvo",
      "value": 3,
      "min": -1000000,
      "max": 1000000,
      "step": 1
    },
    {
      "id": "variant",
      "label": "Implementação a inspecionar",
      "type": "select",
      "value": "correct",
      "options": [
        {
          "value": "correct",
          "label": "Consulta antes de inserir"
        },
        {
          "value": "insert-first",
          "label": "Insere antes da consulta"
        }
      ]
    }
  ],
  "columns": [
    "Vetor (última linha: entrada livre)",
    "Alvo",
    "Par retornado",
    "Verificação de propriedades"
  ],
evaluate(s){const r=M.interview(s.values,s.target,s.variant);return [...r.trace,['Entrada livre','par retornado',JSON.stringify(r.pair),'veja última verificação acima']];}
});})();
