(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-48-pattern-arvores-subproblemas",
  "title": "Rastreie candidatos e invariantes",
  "description": "Cada execução reconstrói o modelo. Leia a sequência de eventos; índices e IDs começam em zero.",
  "fields": [
    {
      "id": "tree",
      "label": "Posições da árvore (filhos 2i+1, 2i+2; ausente null)",
      "type": "text",
      "value": "1,2,3,4,5,null,null"
    }
  ],
  "columns": [
    "Nó / evento",
    "Altura esquerda",
    "Altura direita",
    "Retorno / melhor"
  ],
evaluate(s){const r=M.diameter(s.tree);return [...r.nodes.map((v,i)=>['Posição',i,v===null?'null':v,'filhos '+(2*i+1)+', '+(2*i+2)]),...r.trace,['Resumo',r.height+' nós de altura',r.diameter+' arestas de diâmetro',r.visited+' nós visitados']];}
});})();
