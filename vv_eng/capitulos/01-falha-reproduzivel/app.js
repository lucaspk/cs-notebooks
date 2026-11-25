'use strict';
const evidence = [
  ['sintoma', 'Sintoma', 'Qual falha foi percebida?'],
  ['passos', 'Passos', 'Como repetir a sequência de ações?'],
  ['esperado', 'Resultado esperado', 'O que deveria acontecer?'],
  ['observado', 'Resultado observado', 'O que aconteceu de fato?'],
  ['ambiente', 'Ambiente', 'Em qual versão e configuração?'],
];
PlaygroundLab.mountToggles('#lab-host', {
  markup: '<fieldset class="evidence-options"><legend>Informações disponíveis</legend><div class="evidence-grid">' +
    evidence.map(([key, title, hint]) => `<label class="evidence-option"><input data-k="${key}" type="checkbox"><span><strong>${title}</strong><small>${hint}</small></span></label>`).join('') +
    '</div></fieldset><div class="evidence-result" role="status" aria-live="polite"><span class="evidence-result-label">Cobertura do relato</span><p id="out"></p><p>Cada item acrescenta contexto; a qualidade das informações também importa.</p></div>',
  readState: () => Object.fromEntries(
    [...document.querySelectorAll('[data-k]')].filter(el => el.checked).map(el => [el.dataset.k, 1])
  ),
  render: state => VvLab.score(state) + ' de 5 informações presentes',
});
