(function (root) {
  'use strict';

  const CRITERIA = ['mudanca', 'equipe', 'risco-concorrencia', 'expressividade'];

  function scoreChoice(opts) {
    const o = {
      mudanca: Number(opts.mudanca) || 3,
      equipe: Number(opts.equipe) || 3,
      conc: Number(opts.conc) || 3,
      express: Number(opts.express) || 3,
    };
    const imperative = o.mudanca <= 2 ? 2 : 4;
    const functional = o.express >= 4 ? 5 : 3;
    const oo = o.equipe >= 4 ? 4 : 3;
    const messages = o.conc >= 4 ? 5 : 2;
    const picks = [
      { style: 'imperativo local', score: imperative + (5 - o.conc) },
      { style: 'funcional + imutável', score: functional + (o.mudanca >= 4 ? 1 : 0) },
      { style: 'OO + encapsulamento', score: oo },
      { style: 'mensagens / atores', score: messages },
    ].sort((a, b) => b.score - a.score);
    return { picks, top: picks[0] };
  }

  const api = { scoreChoice, CRITERIA };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.PickParadigmLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);