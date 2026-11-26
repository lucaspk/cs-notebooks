(function(){
'use strict';
const M=DsaLab;
PlaygroundComponents.mount('#chapter-lab', {
  "id": "dsa-trees",
  "title": "Una conjuntos e comprima caminhos",
  "description": "União por tamanho; empate conserva raiz do primeiro argumento. Passos contam arestas percorridas por find.",
  "fields": [
    {
      "id": "n",
      "label": "Quantidade de elementos",
      "value": 4,
      "min": 1,
      "max": 16,
      "step": 1
    },
    {
      "id": "commands",
      "label": "Comandos u a b, q a b ou f a, separados por vírgula",
      "type": "text",
      "value": "u 0 1,u 2 3,u 0 2,f 3,f 3"
    },
    {
      "id": "compress",
      "label": "Compressão",
      "type": "select",
      "value": "yes",
      "options": [
        {
          "value": "yes",
          "label": "Ligada"
        },
        {
          "value": "no",
          "label": "Desligada"
        }
      ]
    }
  ],
  "columns": [
    "Comando",
    "Resposta",
    "Pais por ID",
    "Componentes",
    "Passos acumulados"
  ],
evaluate(s){const r=M.unionFind(s.n,s.commands,s.compress==='yes');return [...r.trace,['Final','',r.parent.join(', '),r.components,r.steps]];}
});
})();
