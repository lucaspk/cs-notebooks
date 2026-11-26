(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-graphs",
  "title": "Compare matriz e listas",
  "description": "Cada execução reconstrói o grafo. IDs em ordem crescente; ∅ indica ausência. Consulte o contrato e os limites do capítulo.",
  "fields": [
    {
      "id": "n",
      "label": "Quantidade de vértices (IDs 0..n−1)",
      "value": 3,
      "min": 1,
      "max": 12,
      "step": 1
    },
    {
      "id": "edges",
      "label": "Arestas u v ou u v peso, separadas por vírgula",
      "type": "text",
      "value": "0 1 0,1 2 5"
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
    "Representação",
    "Origem / métrica",
    "Conteúdo"
  ],
evaluate(s){const r=M.representation(s.n,s.edges,s.direction==='yes');return [...r.adj.map((a,u)=>['Lista',u,a.map(e=>e.to+' (peso '+e.weight+')').join(', ')||'∅']),...r.matrix.map((a,u)=>['Matriz: colunas 0..n−1',u,a.map(x=>x===null?'∅':x).join(' | ')]),['Contagens',r.edges.length+' arestas',r.entries+' entradas de lista; '+r.cells+' células']];}
});})();
