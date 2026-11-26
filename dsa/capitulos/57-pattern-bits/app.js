(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-57-pattern-bits",
  "title": "Investigue contratos, transições e contraexemplos",
  "description": "Registre sua previsão antes de executar. Cada execução recria o modelo; índices começam em zero.",
  "fields": [
    {
      "id": "values",
      "label": "IDs de conjunto entre 0 e 30",
      "type": "text",
      "value": "1,3,3"
    },
    {
      "id": "bit",
      "label": "ID a consultar / alternar / remover",
      "value": 3,
      "min": 0,
      "max": 30,
      "step": 1
    }
  ],
  "columns": [
    "ID / operação",
    "Máscara decimal / resultado",
    "Máscara binária / presença",
    "XOR de valores / detalhe"
  ],
evaluate(s){const r=M.bits(s.values,s.bit);return [...r.trace,['Consulta',s.bit,r.has?'presente':'ausente',''],['Alternar',r.toggled,r.toggled.toString(2),'XOR com bit'],['Remover',r.removed,r.removed.toString(2),'AND com complemento']];}
});})();
