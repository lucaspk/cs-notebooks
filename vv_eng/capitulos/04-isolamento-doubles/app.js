'use strict';
PlaygroundComponents.mount('#lab-host', {
 id:'explore', title:"Dependência controlada ou externa", description:"Banco e indisponibilidade são simulados: nenhum serviço externo é acessado.",
 fields:[{"id": "dependency", "label": "Dependência", "type": "select", "value": "double", "options": [{"value": "double", "label": "Double determinístico"}, {"value": "real", "label": "Banco externo simulado"}]}, {"id": "offline", "label": "Banco externo indisponível", "type": "checkbox", "value": true}],
 evaluate: s => s.dependency==='double' ? 'Double devolve saldo 10; o teste unitário passa mesmo sem banco. Não valida o contrato real do banco.' : s.offline ? 'Falha de conexão simulada: não é evidência de bug na regra de saldo.' : 'Integração simulada disponível: saldo 10. Ainda é preciso conferir esquema e consultas reais.'
});
