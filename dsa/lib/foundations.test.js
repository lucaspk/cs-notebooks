'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const M = require('./foundations.js');
test('soma distingue resultado de operações e trata entrada vazia', () => {
  assert.deepEqual(M.sum([]), { total:0, additions:0, reads:0, trace:[] });
  const r=M.sum([3,1,4,0]); assert.equal(r.total,8); assert.equal(r.additions,4);
  assert.deepEqual(r.trace.map(row=>row[2]),[3,4,8,8]);
  assert.equal(M.sum([100,100,100]).additions,3);
  assert.throws(()=>M.sum([Infinity])); assert.throws(()=>M.sum([Number.MAX_VALUE,Number.MAX_VALUE]));
});
test('parsing recusa campos parciais e números inválidos sem inventar zeros',()=>{
  assert.deepEqual(M.numbers(''),[]); assert.deepEqual(M.numbers(' -2, 0, 1.5 '),[-2,0,1.5]);
  for(const s of ['1,,2','1,','NaN','Infinity','2x',Array(65).fill('1').join(',')]) assert.throws(()=>M.numbers(s));
});
test('crescimento segue as divisões inteiras e a regra de duplicação',()=>{
  assert.deepEqual(M.growth(1),{n:1,constant:1,logarithmic:0,linear:1,quadratic:1});
  assert.equal(M.growth(7).logarithmic,2); assert.equal(M.growth(8).logarithmic,3);
  for(let n=1;n<=1024;n*=2){const a=M.growth(n),b=M.growth(2*n);assert.equal(b.logarithmic,a.logarithmic+1);assert.equal(b.linear,2*a.linear);assert.equal(b.quadratic,4*a.quadratic);}
  for(const n of [0,-1,1.5,NaN,1048577]) assert.throws(()=>M.growth(n));
});
test('inserção e remoção preservam sequência, contagens e entrada',()=>{
  for(let n=0;n<20;n++) for(let i=0;i<=n;i++){
    const input=Array.from({length:n},(_,j)=>j); const copy=input.slice();
    const r=M.vector(input,'insert',i,99);assert.deepEqual(input,copy);
    assert.deepEqual(r.result,[...input.slice(0,i),99,...input.slice(i)]);
    assert.equal(r.moves,n-i);assert.equal(r.writes,n-i+1);
    const back=M.vector(r.result,'remove',i);assert.deepEqual(back.result,input);assert.equal(back.moves,n-i);
  }
  assert.equal(M.vector([10,20,30],'read',1).value,20);
  assert.throws(()=>M.vector([],'read',0));assert.throws(()=>M.vector([1],'insert',2,0));
  assert.throws(()=>M.vector([1],'other',0));assert.throws(()=>M.vector([1],'insert',0,NaN));
});
test('busca linear retorna primeira ocorrência e custo dependente da posição',()=>{
  for(let n=0;n<30;n++){
    const a=Array.from({length:n},(_,i)=>i%4);
    for(let target=-1;target<=4;target++){
      const r=M.linear(a,target), expected=a.indexOf(target);
      assert.equal(r.index,expected);assert.equal(r.comparisons,expected<0?n:expected+1);
    }
  }
});
test('busca binária preserva contrato e limite em entradas ordenadas com duplicatas',()=>{
  for(let n=0;n<=64;n++){
    const a=Array.from({length:n},(_,i)=>Math.floor(i/2)*2);
    for(let target=-1;target<=n+1;target++){
      const r=M.binary(a,target);
      assert.equal(r.index>=0,a.includes(target)); if(r.index>=0)assert.equal(a[r.index],target);
      assert.ok(r.probes <= (n ? Math.floor(Math.log2(n))+1 : 0));
      let previous=n+1;
      for(const [lo,hi,mid] of r.trace){assert.ok(hi-lo+1<previous);assert.ok(mid>=lo&&mid<=hi);previous=hi-lo+1;}
    }
  }
  assert.deepEqual(M.binary([2,4,6,8,10,12,14],5).trace.map(row=>row[2]),[3,1,2]);
  assert.equal(M.binary([2,2,2],2).index,1);
  assert.throws(()=>M.binary([3,1,2],1));assert.throws(()=>M.binary([1],NaN));
});
