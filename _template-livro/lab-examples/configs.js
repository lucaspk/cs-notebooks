(function (root) {
  'use strict';
  root.referenceConfig = function (kind, id) {
    const fields = [
      { id: id + '-quantity', label: 'Quantidade', value: 3, min: 0 },
      { id: id + '-price', label: 'Preço unitário', value: 4, min: 0, step: 0.5 },
    ];
    const values = state => ({ quantity: state[id + '-quantity'], price: state[id + '-price'] });
    if (kind === 'checklist') return {
      id, title: 'Evidências disponíveis', description: 'Selecione os dados presentes no relato.',
      fields: [
        { id: id + '-input', type: 'checkbox', label: 'Entrada conhecida', value: false },
        { id: id + '-environment', type: 'checkbox', label: 'Ambiente conhecido', value: false },
      ],
      evaluate: state => root.ReferenceLab.count(state) + ' de 2 evidências',
    };
    if (kind === 'calculation' || kind === 'table') return {
      id, title: 'Quantidade × preço', description: 'Exemplo: 3 unidades a 4 resultam em 12. Altere uma entrada por vez.',
      fields,
      ...(kind === 'table' ? { columns: ['Quantidade', 'Preço unitário', 'Total'], evaluate: state => root.ReferenceLab.rows(values(state)) }
        : { evaluate: state => 'Total: ' + root.ReferenceLab.total(values(state)) }),
    };
    if (kind === 'stepper') return {
      id, title: 'Do dado ao resultado', description: 'Avance para acompanhar entrada, operação e saída.',
      stepper: {
        getPlan: () => ['Entrada: 3 unidades a 4', 'Operação: 3 × 4', 'Saída: 12'],
        snapshot: root.ReferenceLab.snapshot,
        describe: view => view.steps.join(' → ') || 'Pronto para começar.',
      },
    };
    throw new Error('Tipo desconhecido: ' + kind);
  };
})(typeof window !== 'undefined' ? window : globalThis);
