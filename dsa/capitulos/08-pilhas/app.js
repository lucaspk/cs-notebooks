(function(){
'use strict';
const M=DsaLab;
PlaygroundComponents.mount('#chapter-lab', {
id:'dsa-structure',
title:"Confira o topo antes de fechar",
description:"Use (), [] e {}. Outros caracteres são ignorados. O rastro para na primeira incompatibilidade; vazio é uma entrada válida.",
fields:[{"id": "text", "label": "Texto com delimitadores (até 128 caracteres)", "type": "text", "value": "([x])"}],
columns:["Índice", "Caractere", "Operação", "Pilha: base → topo"],
evaluate(s){const r=M.delimiters(s.text); return [...r.trace,['Fim',r.valid?'Válida':'Inválida',r.error||'Todos os pares fechados',r.stack.join(' ')||'∅']];}
});
})();
