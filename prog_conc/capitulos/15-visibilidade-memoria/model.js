(function (root) {
  'use strict';

  /**
   * Modelo explícito de duas variáveis compartilhadas: data e ready.
   * unsafe: reordenamento permite ver ready=1 com data ainda 0.
   * safe: publicação com barreira de memória.
   */
  function createVisibilitySchedule(safe) {
    const steps = [];
    const memory = { data: 0, ready: 0 };
    const readerView = { data: null, ready: 0 };

    if (!safe) {
      steps.push({ phase: 'writer', memory: { ...memory }, reader: { ...readerView }, note: 'Escritor: data := 42 (não visível ainda).' });
      memory.data = 42;
      steps.push({ phase: 'writer', memory: { ...memory }, reader: { ...readerView }, note: 'Reordenamento: ready := 1 antes da visibilidade de data.' });
      readerView.ready = 1;
      memory.ready = 1;
      steps.push({ phase: 'reader', memory: { ...memory }, reader: { data: 0, ready: 1 }, note: 'Leitor vê ready=1 mas data ainda 0.', bug: true });
      readerView.data = 0;
      steps.push({ phase: 'writer', memory: { ...memory }, reader: { ...readerView }, note: 'Finalmente data torna-se visível.', bug: true });
      readerView.data = 42;
    } else {
      steps.push({ phase: 'writer', memory: { ...memory }, reader: { ...readerView }, note: 'Escritor: data := 42.' });
      memory.data = 42;
      steps.push({ phase: 'writer', memory: { ...memory }, reader: { ...readerView }, note: 'Barreira: flush de data.' });
      steps.push({ phase: 'writer', memory: { ...memory }, reader: { ...readerView }, note: 'ready := 1 (happens-before para o leitor).' });
      memory.ready = 1;
      steps.push({ phase: 'reader', memory: { ...memory }, reader: { data: 42, ready: 1 }, note: 'Leitor vê par consistente.', bug: false });
    }

    return { steps, duration: steps.length, safe: Boolean(safe), hasBug: steps.some((s) => s.bug) };
  }

  function snapshot(schedule, time) {
    const elapsed = Math.max(0, Math.min(Math.floor(time), schedule.steps.length));
    const step = elapsed > 0 ? schedule.steps[elapsed - 1] : null;
    return {
      memory: step?.memory ?? { data: 0, ready: 0 },
      reader: step?.reader ?? { data: null, ready: 0 },
      note: step?.note ?? 'Pronto para o primeiro passo.',
      bug: step?.bug ?? false,
      done: elapsed === schedule.steps.length,
      elapsed,
    };
  }

  const api = { createVisibilitySchedule, snapshot };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.VisibilityLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);