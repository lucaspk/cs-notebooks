(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-graphs",
  "title": "Acompanhe chamadas e retornos",
  "description": "Cada execução reconstrói o grafo. IDs em ordem crescente; ∅ indica ausência. Consulte o contrato e os limites do capítulo.",
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
      "value": "0 1,0 2,1 2"
    },
    {
      "id": "direction",
      "label": "Direção",
      "type": "select",
      "value": "yes",
      "options": [
        {
          "value": "yes",
          "label": "Dirigido"
        },
        {
          "value": "no",
          "label": "Não dirigido"
        }
      ]
    }
  ],
  "columns": [
    "Evento / vértice",
    "ID / descoberta",
    "Tempo / término",
    "Pilha / pai"
  ],
evaluate(s){const r=M.dfs(s.n,s.edges,s.direction==='yes');return [...r.trace,...r.discovery.map((d,u)=>['Resultado '+u,d,r.finish[u],'pai: '+(r.parent[u]===null?'∅':r.parent[u])]),['Entradas examinadas',r.scans,'','']];}
});})();
