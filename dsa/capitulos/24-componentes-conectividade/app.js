(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-graphs",
  "title": "Compare alcance e grupos",
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
      "value": "0 1,1 2"
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
    "Tipo",
    "Origem / grupo",
    "IDs alcançados / membros"
  ],
evaluate(s){const r=M.components(s.n,s.edges,s.direction==='yes');return [...r.reachable.map((a,u)=>['Alcance',u,a.map((yes,v)=>yes?v:null).filter(v=>v!==null).join(', ')]),...r.groups.map((a,i)=>[s.direction==='yes'?'Grupo forte':'Componente',i,a.join(', ')]),['Total',r.count,'grupos']];}
});})();
