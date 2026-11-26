(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-52-pattern-greedy",
  "title": "Compare escolhas, restrições e resultados",
  "description": "Cada execução reconstrói o modelo. Leia as hipóteses antes de comparar estratégias; índices começam em zero.",
  "fields": [
    {
      "id": "intervals",
      "label": "Atividades início fim (semiabertas), por vírgula",
      "type": "text",
      "value": "0 3,3 6,2 4"
    }
  ],
  "columns": [
    "Evento / estratégia",
    "ID / selecionados",
    "Início / quantidade",
    "Fim / detalhe"
  ],
evaluate(s){const r=M.schedule(s.intervals);return [...r.intervals.map(x=>['Atividade',x.id,x.start,x.end]),...r.trace,['Menor término',r.selected.join(', '),r.selected.length+' atividades','greedy certificado'],['Menor duração',r.shortest.join(', '),r.shortest.length+' atividades','heurística sem garantia']];}
});})();
