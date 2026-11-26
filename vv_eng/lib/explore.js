(function(root) {
  'use strict';
  function counts(u,i,e) {
    const a=[u,i,e].map(Number);
    if(a.some(n=>!Number.isInteger(n)||n<0||n>10000)) throw new RangeError('Contagens inteiras de 0 a 10000.');
    const total=a.reduce((x,y)=>x+y,0);
    return { total, percentages:a.map(n=>total ? Math.round(100*n/total) : 0), cost:a[0]+a[1]*5+a[2]*20 };
  }
  function aaaCase(start,amount,expected) {
    const a=[start,amount,expected].map(Number);
    if(a.some(n=>!Number.isFinite(n))) throw new RangeError('Use valores finitos.');
    const actual=a[0]+a[1];
    return { actual, expected:a[2], passed:actual===a[2], arrange:'saldo = '+a[0], act:'depositar '+a[1], assert:'saldo === '+a[2] };
  }
  function sortCase(text,implementation) {
    const tokens=String(text).trim().split(/[\s,;]+/).filter(Boolean);
    const input=tokens.map(Number);
    if(input.length>100||input.some(n=>!Number.isFinite(n))) throw new RangeError('Use até 100 números finitos.');
    let output=[...input].sort((a,b)=>a-b);
    if(implementation==='drop') output=[...new Set(output)];
    if(implementation==='reverse') output.reverse();
    const ordered=output.every((v,i)=>i===0||output[i-1]<=v);
    const frequency=a=>{const m=new Map();for(const v of a)m.set(v,(m.get(v)||0)+1);return m;};
    const before=frequency(input),after=frequency(output);
    const preserved=input.length===output.length&&[...before].every(([v,n])=>after.get(v)===n);
    return { input, output, ordered, preserved, passed:ordered&&preserved };
  }
  function tdd(events) {
    let phase='sem teste';
    const trace=[];
    for(const event of events) {
      if(event==='red'&&phase==='sem teste') phase='red';
      else if(event==='green'&&phase==='red') phase='green';
      else if(event==='refactor'&&phase==='green') phase='refactor';
      else return {valid:false,phase,trace,error:'Evento fora de ordem: '+event};
      trace.push(phase);
    }
    return {valid:true,phase,trace};
  }
  const api={counts,aaaCase,sortCase,tdd};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else root.VerificationExplore=api;
})(typeof globalThis!=='undefined'?globalThis:this);
