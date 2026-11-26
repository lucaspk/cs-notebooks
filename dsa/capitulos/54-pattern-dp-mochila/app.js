(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-54-pattern-dp-mochila",
  "title": "Investigue contratos, transições e contraexemplos",
  "description": "Registre sua previsão antes de executar. Cada execução recria o modelo; índices começam em zero.",
  "fields": [
    {
      "id": "values",
      "label": "Pesos positivos (até 16)",
      "type": "text",
      "value": "3"
    },
    {
      "id": "target",
      "label": "Soma exata alvo",
      "value": 6,
      "min": 0,
      "max": 128,
      "step": 1
    },
    {
      "id": "reuse",
      "label": "Permitir reutilização (atualização crescente)",
      "type": "checkbox",
      "value": false
    }
  ],
  "columns": [
    "Item ID",
    "Soma",
    "Origem alcançável",
    "Estado antes → depois"
  ],
evaluate(s){const r=M.subset(s.values,s.target,s.reuse);return [...r.trace,['Resposta',s.target,r.possible?'possível':'impossível',s.reuse?'reutilização':'uso único']];}
});})();
