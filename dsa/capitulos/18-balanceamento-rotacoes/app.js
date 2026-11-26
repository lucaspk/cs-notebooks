(function(){
'use strict';
const M=DsaLab;
PlaygroundComponents.mount('#chapter-lab', {
  "id": "dsa-trees",
  "title": "Faça uma rotação local",
  "description": "Compare caminhos, filhos e percurso em ordem. Não há política automática de balanceamento.",
  "fields": [
    {
      "id": "values",
      "label": "Números separados por vírgula (até 32)",
      "type": "text",
      "value": "4,2,6,1,3"
    },
    {
      "id": "pivot",
      "label": "Chave do pivô",
      "value": 4,
      "min": -1000000,
      "max": 1000000,
      "step": 1
    },
    {
      "id": "direction",
      "label": "Direção",
      "type": "select",
      "value": "right",
      "options": [
        {
          "value": "right",
          "label": "Direita"
        },
        {
          "value": "left",
          "label": "Esquerda"
        }
      ]
    }
  ],
  "columns": [
    "Fase / caminho",
    "Chave",
    "Filho esquerdo",
    "Filho direito"
  ],
evaluate(s){const r=M.rotate(DsaFoundations.numbers(s.values),s.pivot,s.direction);return [...r.before.map(x=>['Antes '+x[0],...x.slice(1)]),...r.after.map(x=>['Depois '+x[0],...x.slice(1)]),['Altura',r.beforeHeight,'→',r.height],['Em ordem antes',r.order.join(', '),'',''],['Em ordem depois',r.result.join(', '),'','']];}
});
})();
