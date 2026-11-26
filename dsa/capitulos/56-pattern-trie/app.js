(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-56-pattern-trie",
  "title": "Investigue contratos, transições e contraexemplos",
  "description": "Registre sua previsão antes de executar. Cada execução recria o modelo; índices começam em zero.",
  "fields": [
    {
      "id": "words",
      "label": "Palavras a-z, separadas por vírgulas (até 32)",
      "type": "text",
      "value": "casa,caso,cas"
    },
    {
      "id": "query",
      "label": "Consulta a-z (vazia permitida)",
      "type": "text",
      "value": "ca"
    }
  ],
  "columns": [
    "Nó / resultado",
    "Letra / estado",
    "Próximo / pergunta",
    "Detalhe"
  ],
evaluate(s){const r=M.trie(s.words,s.query);return [...r.trace,['Prefixo',r.prefix?'existe':'ausente','Palavra',r.word?'inserida':'não inserida'],['Estrutura',r.nodes+' nós','inclui raiz','duplicatas compartilham caminho']];}
});})();
