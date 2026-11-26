'use strict';
PlaygroundComponents.mount('#lab-host', {
 id:'explore', title:"Alcançabilidade em grafo dirigido", description:"Digite arestas como a>b. Uma aresta a>b não cria automaticamente b>a.",
 fields:[{"id": "edges", "label": "Arestas", "type": "text", "value": "a>b b>c"}, {"id": "from", "label": "Origem", "type": "text", "value": "a"}, {"id": "to", "label": "Destino", "type": "text", "value": "c"}],
 evaluate: s => {
 const r=MathLab.graph(s.edges,s.from.trim(),s.to.trim());
 return (r.reachable?'Existe caminho dirigido.':'Não existe caminho dirigido.')+' Vértices: '+r.vertices.join(', ')+'. Arestas informadas: '+r.edges+'.';
}
});
