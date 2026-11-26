'use strict';
PlaygroundComponents.mount('#lab-host', {
 id:'explore', title:"Ordem do ciclo TDD", description:"Eventos aceitos: red green refactor. Green exige um teste que tenha falhado antes.",
 fields:[{"id": "events", "label": "Sequência de eventos", "type": "text", "value": "red green"}],
 evaluate: s => {
 const events=s.events.trim().split(/\s+/).filter(Boolean), r=VerificationExplore.tdd(events);
 return r.valid?'Estado: '+r.phase+'. Traço: '+(r.trace.join(' → ')||'nenhum evento')+'.':r.error+'. Último estado válido: '+r.phase+'.';
}
});
