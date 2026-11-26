(function(){'use strict';const M=DsaLab;const show=x=>x===null?'∅':x===-Infinity?'−∞':x;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-routes",
  "title": "Duas cores ou ciclo ímpar",
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
      "value": "0 1,1 2,2 3,3 0"
    }
  ],
  "columns": [
    "Evento / métrica",
    "Vértice / rodada",
    "Custo / estado",
    "Pai / detalhe"
  ],
evaluate(s){const r=M.bipartite(s.n,s.edges);return [...r.trace,...r.color.map((c,u)=>['Cor final',u,c===null?'∅':c,'']),['Resultado',r.ok?'Bipartido':'Conflito','',r.witness.join(' → ')||'sem ciclo ímpar']];}
});})();
