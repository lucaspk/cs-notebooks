(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-graphs",
  "title": "Explore camadas com FIFO",
  "description": "Cada execução reconstrói o grafo. IDs em ordem crescente; ∅ indica ausência. Consulte o contrato e os limites do capítulo.",
  "fields": [
    {
      "id": "n",
      "label": "Quantidade de vértices (IDs 0..n−1)",
      "value": 5,
      "min": 1,
      "max": 12,
      "step": 1
    },
    {
      "id": "edges",
      "label": "Arestas u v ou u v peso, separadas por vírgula",
      "type": "text",
      "value": "0 1,0 2,1 3,2 3"
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
    },
    {
      "id": "source",
      "label": "Vértice de origem",
      "value": 0,
      "min": 0,
      "max": 12,
      "step": 1
    },
    {
      "id": "target",
      "label": "Vértice de destino",
      "value": 3,
      "min": 0,
      "max": 12,
      "step": 1
    }
  ],
  "columns": [
    "Evento / vértice",
    "ID / distância",
    "Camada / pai",
    "Fila / caminho"
  ],
evaluate(s){const r=M.bfs(s.n,s.edges,s.direction==='yes',s.source,s.target);return [...r.trace,...r.distance.map((d,u)=>['Resultado',u,d===null?'∅':d,'pai: '+(r.parent[u]===null?'∅':r.parent[u])]),['Destino',s.target,r.distance[s.target]===null?'∅':r.distance[s.target],r.path.join(' → ')||'inalcançável'],['Entradas examinadas',r.scans,'','']];}
});})();
