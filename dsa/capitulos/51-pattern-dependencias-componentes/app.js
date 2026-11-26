(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-51-pattern-dependencias-componentes",
  "title": "Compare escolhas, restrições e resultados",
  "description": "Cada execução reconstrói o modelo. Leia as hipóteses antes de comparar estratégias; índices começam em zero.",
  "fields": [
    {
      "id": "n",
      "label": "Quantidade de IDs (0..n−1)",
      "value": 4,
      "min": 1,
      "max": 12,
      "step": 1
    },
    {
      "id": "edges",
      "label": "Ligações u v, separadas por vírgulas",
      "type": "text",
      "value": "0 1,1 2,0 2"
    },
    {
      "id": "mode",
      "label": "Pergunta e interpretação",
      "type": "select",
      "value": "dependencies",
      "options": [
        {
          "value": "dependencies",
          "label": "Precedência dirigida: ordem de execução"
        },
        {
          "value": "components",
          "label": "Conexão não dirigida: componentes"
        }
      ]
    }
  ],
  "columns": [
    "Evento",
    "ID / estado",
    "ID / ordem",
    "Detalhe"
  ],
evaluate(s){const r=M.dependencies(s.n,s.edges,s.mode);if(r.mode==='dependencies')return [...r.trace,['Resultado',r.ok?'ordem completa':'ciclo: prefixo apenas',r.order.join(', '),'bloqueados: '+r.blocked.join(', ')]];return [...r.trace,...r.labels.map((v,i)=>['Classe',i,v,'raiz representativa']),['Resultado',r.count+' componentes','','']];}
});})();
