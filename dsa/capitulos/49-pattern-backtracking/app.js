(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-49-pattern-backtracking",
  "title": "Compare escolhas, restrições e resultados",
  "description": "Cada execução reconstrói o modelo. Leia as hipóteses antes de comparar estratégias; índices começam em zero.",
  "fields": [
    {
      "id": "values",
      "label": "Valores positivos (até 12; índices são escolhas distintas)",
      "type": "text",
      "value": "2,3,5"
    },
    {
      "id": "target",
      "label": "Soma alvo",
      "value": 5,
      "min": 0,
      "max": 1000000,
      "step": 1
    },
    {
      "id": "prune",
      "label": "Aplicar podas demonstradas",
      "type": "checkbox",
      "value": true
    }
  ],
  "columns": [
    "Evento",
    "Índice / solução",
    "Soma / valores",
    "Estado"
  ],
evaluate(s){const r=M.subsets(s.values,s.target,s.prune);return [...r.trace,...r.matches.map(p=>['Solução',p.join(', ')||'vazio',p.map(i=>r.a[i]).join(' + ')||'0','índices / valores']),['Resumo',r.matches.length+' soluções',r.calls+' chamadas',r.pruned+' podas']];}
});})();
