(function(){'use strict';const M=DsaLab;const show=x=>x===null?'∅':x===-Infinity?'−∞':x;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-routes",
  "title": "Relaxe na ordem topológica",
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
      "value": "0 1 2,0 2 5,1 2 -4,2 3 3"
    },
    {
      "id": "source",
      "label": "Vértice de origem",
      "value": 0,
      "min": 0,
      "max": 11,
      "step": 1
    }
  ],
  "columns": [
    "Evento / métrica",
    "Vértice / rodada",
    "Custo / estado",
    "Pai / detalhe"
  ],
evaluate(s){const r=M.dag(s.n,s.edges,s.source);return [['Ordem',r.order.join(', '),'',''],...r.trace,...r.distance.map((d,u)=>['Distância / pai',u,show(d),show(r.parent[u])])];}
});})();
