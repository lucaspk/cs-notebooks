'use strict';
PlaygroundComponents.mount('#lab-host', {
 id:'explore', title:"União e interseção", description:"Use números separados por espaço. Repetições representam o mesmo elemento.",
 fields:[{"id": "a", "label": "Conjunto A", "type": "text", "value": "1 2 3"}, {"id": "b", "label": "Conjunto B", "type": "text", "value": "2 3 4"}],
 evaluate: s => {
 const r=MathLab.setOps(MathLab.numbers(s.a),MathLab.numbers(s.b));
 return 'A ∪ B = {'+r.union.join(', ')+'}; A ∩ B = {'+r.inter.join(', ')+'}';
}
});
