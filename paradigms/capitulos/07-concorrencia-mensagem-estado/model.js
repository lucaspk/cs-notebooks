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


  function schedule(rounds, overlap) {
    const n=Number(rounds);
    if(!Number.isInteger(n)||n<1||n>20)throw new RangeError('Use de 1 a 20 rodadas.');
    let shared=0,owner=0;
    const trace=[];
    for(let i=0;i<n;i++){
      if(overlap){
        const readA=shared,readB=shared;
        shared=readA+1;shared=readB+1;
        trace.push('A e B leem '+readA+'; A grava '+(readA+1)+'; B grava '+shared);
      } else {
        shared+=1;shared+=1;
        trace.push('A termina antes de B: contador '+shared);
      }
      owner+=2;
    }
    return {shared,messages:owner,expected:2*n,trace};
  }
  const api = { compare, runShared, runMessages, schedule };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ConcModelLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);