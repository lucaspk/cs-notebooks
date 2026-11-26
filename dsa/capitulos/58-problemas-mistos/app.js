(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-58-problemas-mistos",
  "title": "Investigue contratos, transições e contraexemplos",
  "description": "Registre sua previsão antes de executar. Cada execução recria o modelo; índices começam em zero.",
  "fields": [
    {
      "id": "values",
      "label": "Vetor inteiro (negativos e zeros permitidos)",
      "type": "text",
      "value": "0,0"
    },
    {
      "id": "target",
      "label": "Soma exata",
      "value": 0,
      "min": -1000000,
      "max": 1000000,
      "step": 1
    },
    {
      "id": "strategy",
      "label": "Escolha após registrar sua proposta",
      "type": "select",
      "value": "brute",
      "options": [
        {
          "value": "brute",
          "label": "Enumerar início e fim"
        },
        {
          "value": "prefix",
          "label": "Contar frequências de prefixos"
        },
        {
          "value": "window",
          "label": "Contrair se soma exceder alvo (experimental)"
        }
      ]
    }
  ],
  "columns": [
    "Início / fim / método",
    "Fim / prefixo / total",
    "Soma / contribuições / passos",
    "Contagem / validade"
  ],
evaluate(s){const r=M.mixed(s.values,s.target,s.strategy);return [...r.trace,['Resultado',r.count+' intervalos',r.operations+' passos',r.certified?'estratégia válida para o contrato':'sem garantia: busque contraexemplo']];}
});})();
