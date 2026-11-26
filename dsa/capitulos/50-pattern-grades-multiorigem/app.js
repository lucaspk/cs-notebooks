(function(){'use strict';const M=DsaLab;PlaygroundComponents.mount('#chapter-lab',{
  "id": "dsa-50-pattern-grades-multiorigem",
  "title": "Compare escolhas, restrições e resultados",
  "description": "Cada execução reconstrói o modelo. Leia as hipóteses antes de comparar estratégias; índices começam em zero.",
  "fields": [
    {
      "id": "grid",
      "label": "Grade: 0 livre, 1 parede, 2 fonte; linhas por ponto e vírgula",
      "type": "text",
      "value": "2 0 0;0 1 0;0 0 2"
    }
  ],
  "columns": [
    "Evento / célula",
    "Linha / tipo",
    "Coluna / distância",
    "Distância / pai"
  ],
evaluate(s){const r=M.gridBfs(s.grid);return [...r.trace,...r.grid.flatMap((row,i)=>row.map((v,j)=>['Célula '+i+','+j,v===1?'parede':v===2?'fonte':'livre',r.dist[i][j]===null?'inalcançável / sem distância':r.dist[i][j],r.parent[i][j]===null?'sem pai':r.parent[i][j].join(', ')])),['Resumo',r.scans+' direções examinadas','quatro por célula alcançada','']];}
});})();
