'use strict';
PlaygroundComponents.mount('#lab-host', {
 id:'explore', title:"Arrange → Act → Assert", description:"O modelo deposita um valor no saldo. Uma asserção errada deve falhar.",
 fields:[{"id": "start", "label": "Saldo inicial", "type": "number", "value": 10}, {"id": "amount", "label": "Depósito", "type": "number", "value": 5}, {"id": "expected", "label": "Saldo esperado", "type": "number", "value": 15}],
 evaluate: s => {
 const r=VerificationExplore.aaaCase(s.start,s.amount,s.expected);
 return 'Arrange: '+r.arrange+'; Act: '+r.act+'; Assert: '+r.assert+'. Obtido: '+r.actual+'. '+(r.passed?'PASSOU':'FALHOU');
}
});
