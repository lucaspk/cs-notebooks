(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-53-pattern-dp-linear",
  "title": "Compare escolhas, restrições e resultados",
  "description": "Cada execução reconstrói o modelo. Leia as hipóteses antes de comparar estratégias; índices começam em zero.",
  "fields": [
    {
      "id": "values",
      "label": "Valores em sequência linear (escolha vazia permitida)",
      "type": "text",
      "value": "2,7,9,3,1"
    }
  ],
  "columns": [
    "Prefixo i / método",
    "Pular / soma",
    "Pegar / índices",
    "Ótimo / contador"
  ],
evaluate(s){const r=M.nonAdjacent(s.values);return [...r.trace,['Tabulação',r.best,r.selected.join(', ')||'vazio','soma / índices'],['Memoização',r.memoBest,r.computed+' estados novos',r.calls+' chamadas totais']];}
});})();
