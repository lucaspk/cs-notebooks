(function(){
'use strict';
const M=DsaLab;
PlaygroundComponents.mount('#chapter-lab', {
  "id": "dsa-ordering",
  "title": "Intercale as metades",
  "description": "Intervalos [lo,hi) excluem hi. Buffer único reutilizado; escritas contam ida ao buffer e volta.",
  "fields": [
    {
      "id": "values",
      "label": "Números separados por vírgula (até 32)",
      "type": "text",
      "value": "3,1,2,1"
    }
  ],
  "columns": [
    "Intervalo",
    "Meio",
    "Comparações acumuladas",
    "Resultado / métrica"
  ],
evaluate(s){const a=DsaFoundations.numbers(s.values);const r=M.merge(a);return [...r.trace,['Final','',r.comparisons,M.label(r.result)],['Memória',r.auxSlots+' posições','Profundidade: '+r.maxDepth,'Escritas: '+r.writes]];}
});
})();
