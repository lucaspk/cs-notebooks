'use strict';
PlaygroundComponents.mount('#lab-host', {
 id:'explore', title:"Conte pelas escolhas disponíveis", description:"Com repetição: a^n. Sem repetição: a × (a−1) × …; comprimento zero conta uma palavra vazia.",
 fields:[{"id": "length", "label": "Posições (0 a 12)", "type": "number", "value": 3, "min": 0, "max": 12, "step": 1}, {"id": "alphabet", "label": "Símbolos (0 a 36)", "type": "number", "value": 4, "min": 0, "max": 36, "step": 1}, {"id": "repeat", "label": "Permitir repetição", "type": "checkbox", "value": true}],
 evaluate: s => 'Quantidade: '+MathLab.count(s.length,s.alphabet,s.repeat).toLocaleString('pt-BR')
});
