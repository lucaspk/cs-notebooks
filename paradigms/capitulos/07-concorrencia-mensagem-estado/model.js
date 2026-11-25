(function (root) {
  'use strict';

  function runShared(turns) {
    let counter = 0;
    const trace = [];
    for (let i = 0; i < turns; i += 1) {
      const read = counter;
      counter = read + 1;
      trace.push({ mode: 'memória compartilhada', step: i + 1, counter });
    }
    return { mode: 'shared', trace, final: counter };
  }

  function runMessages(turns) {
    let counter = 0;
    const inbox = [];
    const trace = [];
    for (let i = 0; i < turns; i += 1) {
      inbox.push('inc');
      counter += 1;
      trace.push({ mode: 'mensagem', step: i + 1, counter, inbox: inbox.length });
    }
    return { mode: 'messages', trace, final: counter };
  }

  function compare(turns) {
    const n = Math.max(1, Math.floor(Number(turns) || 1));
    const shared = runShared(n);
    const messages = runMessages(n);
    return {
      turns: n,
      shared,
      messages,
      sameFinal: shared.final === messages.final,
    };
  }

  const api = { compare, runShared, runMessages };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ConcModelLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);