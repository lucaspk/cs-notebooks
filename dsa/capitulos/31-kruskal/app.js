(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-networks",
  "title": "Ordene, una e rejeite ciclos",
  "description": "Cada execução reconstrói o modelo. Leia as hipóteses de direção, pesos e capacidades no capítulo.",
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
      "label": "Arestas u v peso (ou capacidade), por vírgula",
      "type": "text",
      "value": "0 1 2,0 2 2,1 2 1,1 3 4,2 3 5"
    }
  ],
  "columns": [
    "Evento / métrica",
    "Aresta / origem",
    "Peso / quantidade",
    "Estado / detalhe"
  ],
evaluate(s){const r=M.kruskal(s.n,s.edges);return [...r.trace,...r.selected.map(([u,v,w])=>['Selecionada',u+' — '+v,w,'']),['Resumo',r.total,r.components+' componentes',r.selected.length+' arestas']];}
});})();
