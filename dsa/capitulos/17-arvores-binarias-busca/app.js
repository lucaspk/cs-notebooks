(function(){
'use strict';
const M=DsaLab;
PlaygroundComponents.mount('#chapter-lab', {
  "id": "dsa-trees",
  "title": "Siga as ligações da BST",
  "description": "Duplicatas ignoradas. Cada execução reconstrói a árvore. Contador exclui construção e caminhada extra do sucessor.",
  "fields": [
    {
      "id": "values",
      "label": "Números separados por vírgula (até 32)",
      "type": "text",
      "value": "4,2,6,1,3,5,7"
    },
    {
      "id": "target",
      "label": "Chave alvo",
      "value": 4,
      "min": -1000000,
      "max": 1000000,
      "step": 1
    },
    {
      "id": "operation",
      "label": "Operação",
      "type": "select",
      "value": "remove",
      "options": [
        {
          "value": "remove",
          "label": "Remover"
        },
        {
          "value": "search",
          "label": "Buscar"
        },
        {
          "value": "insert",
          "label": "Inserir"
        }
      ]
    }
  ],
  "columns": [
    "Fase / caminho",
    "Chave",
    "Esquerda / decisão",
    "Direita / resultado"
  ],
evaluate(s){const r=M.bst(DsaFoundations.numbers(s.values),s.target,s.operation);return [...r.before.map(x=>['Antes '+x[0],...x.slice(1)]),...r.trace.map(x=>['Percurso',x[0],x[1],'']),...r.after.map(x=>['Depois '+x[0],...x.slice(1)]),['Resumo',r.comparisons+' decisões','Altura: '+r.height,r.result.join(', ')||'∅']];}
});
})();
