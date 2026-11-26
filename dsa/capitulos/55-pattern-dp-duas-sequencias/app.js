(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-55-pattern-dp-duas-sequencias",
  "title": "Investigue contratos, transições e contraexemplos",
  "description": "Registre sua previsão antes de executar. Cada execução recria o modelo; índices começam em zero.",
  "fields": [
    {
      "id": "first",
      "label": "Primeira sequência (até 24 pontos de código)",
      "type": "text",
      "value": "abc"
    },
    {
      "id": "second",
      "label": "Segunda sequência (até 24 pontos de código)",
      "type": "text",
      "value": "ac"
    }
  ],
  "columns": [
    "Prefixo i",
    "Prefixo j / tamanho",
    "Transição / testemunha",
    "Valor"
  ],
evaluate(s){const r=M.lcs(s.first,s.second);return [...r.trace,['LCS',r.length,r.sequence||'vazia','uma testemunha ótima']];}
});})();
