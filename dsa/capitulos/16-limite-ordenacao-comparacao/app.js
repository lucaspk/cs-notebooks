(function(){
'use strict';
const M=DsaLab;
PlaygroundComponents.mount('#chapter-lab', {
  "id": "dsa-trees",
  "title": "Quantas decisões são necessárias?",
  "description": "Chaves distintas e comparação binária: limite inferior de pior caso, sem construir algoritmo ótimo.",
  "fields": [
    {
      "id": "n",
      "label": "Quantidade de chaves distintas",
      "value": 4,
      "min": 0,
      "max": 100,
      "step": 1
    }
  ],
  "columns": [
    "n",
    "Permutações n!",
    "Limite inferior h",
    "Capacidade 2^h"
  ],
evaluate(s){const r=M.bound(s.n);return [[s.n,r.permutations,r.comparisons,r.leaves]];}
});
})();
