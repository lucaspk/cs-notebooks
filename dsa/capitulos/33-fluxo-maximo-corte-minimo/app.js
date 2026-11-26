(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-networks",
  "title": "Aumente e certifique pelo corte",
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
      "value": "0 1 3,0 2 2,1 2 1,1 3 2,2 3 3"
    },
    {
      "id": "source",
      "label": "Origem s",
      "value": 0,
      "min": 0,
      "max": 11,
      "step": 1
    },
    {
      "id": "sink",
      "label": "Destino t",
      "value": 3,
      "min": 0,
      "max": 11,
      "step": 1
    }
  ],
  "columns": [
    "Evento / métrica",
    "Aresta / origem",
    "Peso / quantidade",
    "Estado / detalhe"
  ],
evaluate(s){const r=M.maxFlow(s.n,s.edges,s.source,s.sink);return [...r.trace,...r.flow.map(e=>['Fluxo original',e.from+' → '+e.to,e.flow,'capacidade '+e.capacity]),['Corte S / T',r.sourceSide.join(', '),r.sinkSide.join(', '),''],...r.cut.map(e=>['Aresta do corte',e.from+' → '+e.to,e.capacity,'S → T']),['Certificado','fluxo '+r.value,'corte '+r.cutCapacity,r.value===r.cutCapacity?'iguais':'divergência']];}
});})();
