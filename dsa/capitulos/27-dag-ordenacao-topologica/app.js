(function(){'use strict';const M=DsaLab;const show=x=>x===null?'∅':x===-Infinity?'−∞':x;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-routes",
  "title": "Libere dependências com Kahn",
  "description": "Cada execução reconstrói o grafo. ∅ indica ausência e −∞ custo sem limite inferior. Veja as hipóteses e limites do capítulo.",
  "fields": [
    {
      "id": "n",
      "label": "Quantidade de vértices (IDs 0..n−1)",
      "value": 4,
      "min": 1,
      "max": 12,
      "step": 1
    },
    {
      "id": "edges",
      "label": "Arestas u v ou u v peso, separadas por vírgula",
      "type": "text",
      "value": "0 2,1 2,2 3"
    }
  ],
  "columns": [
    "Evento / métrica",
    "Vértice / rodada",
    "Custo / estado",
    "Pai / detalhe"
  ],
evaluate(s){const r=M.topological(s.n,s.edges);return [...r.trace,['Resultado',r.ok?'Ordem completa':'Somente prefixo',r.order.join(', ')||'∅','bloqueados: '+(r.blocked.join(', ')||'∅')]];}
});})();
