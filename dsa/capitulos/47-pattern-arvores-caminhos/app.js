(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-47-pattern-arvores-caminhos",
  "title": "Rastreie candidatos e invariantes",
  "description": "Cada execução reconstrói o modelo. Leia a sequência de eventos; índices e IDs começam em zero.",
  "fields": [
    {
      "id": "tree",
      "label": "Posições da árvore (filhos 2i+1, 2i+2; ausente null)",
      "type": "text",
      "value": "5,4,8,11,null,13,4"
    },
    {
      "id": "target",
      "label": "Soma alvo raiz→folha",
      "value": 20,
      "min": -1000000,
      "max": 1000000,
      "step": 1
    }
  ],
  "columns": [
    "Evento",
    "ID / caminho",
    "Soma / valores",
    "Estado"
  ],
evaluate(s){const r=M.paths(s.tree,s.target);return [...r.nodes.map((v,i)=>['Posição',i,v===null?'null':v,'filhos '+(2*i+1)+', '+(2*i+2)]),...r.trace,...r.matches.map(p=>['Caminho válido',p.join(' → '),p.map(i=>r.nodes[i]).join(' + '),'raiz→folha']),['Resumo',r.matches.length+' caminhos',r.visited+' nós visitados','']];}
});})();
