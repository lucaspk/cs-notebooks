'use strict';
const {test}=require('node:test');const assert=require('node:assert/strict');const M=require('./ordering.js');
test('recursão registra desempilhamento, base vazia e progresso',()=>{
 const r=M.recursive([4,-1,2]);assert.equal(r.result,5);assert.equal(r.calls,4);assert.equal(r.depth,4);assert.deepEqual(r.trace.filter(x=>x[0]==='retorna').map(x=>x[1]),[2,1,0]);
 assert.equal(M.recursive([]).calls,1);assert.equal(M.recursive([]).result,0);
 assert.throws(()=>M.recursive([Number.MAX_VALUE,Number.MAX_VALUE]));
});
test('invariante distingue falha inicial, falha de passo e caso que mascara bug',()=>{
 assert.equal(M.invariant([2,3]).valid,true);
 assert.equal(M.invariant([2,3],'bad-init').trace[0][5],'VIOLADO');
 const r=M.invariant([2,3],'skip');assert.deepEqual(r.trace.map(x=>x[5]),['preservado','preservado','VIOLADO']);
 assert.equal(M.invariant([2,0],'skip').valid,true);assert.equal(M.invariant([],'skip').valid,true);assert.equal(M.invariant([],'bad-init').valid,false);
 assert.throws(()=>M.invariant([],'unknown'));
});
test('insertion diferencia empates, melhor caso e inversões',()=>{
 const a=M.insertion([2,2,1]),b=M.insertion([2,2,1],'reverse');
 assert.deepEqual(a.result.map(x=>x.id),[2,0,1]);assert.deepEqual(b.result.map(x=>x.id),[2,1,0]);assert.equal(a.moves,2);assert.equal(b.moves,3);
 for(let n=0;n<=32;n++){const sorted=Array.from({length:n},(_,i)=>i);assert.equal(M.insertion(sorted).moves,0);assert.equal(M.insertion(sorted).comparisons,Math.max(0,n-1));assert.equal(M.insertion(sorted.reverse()).moves,Math.max(0,n*(n-1)/2));}
});
test('merge mantém identidades, usa buffer único e conta escritas de ida e volta',()=>{
 const r=M.merge([3,1,2,1]);assert.deepEqual(r.result.map(x=>x.id),[1,3,2,0]);assert.equal(r.comparisons,5);assert.equal(r.writes,16);assert.equal(r.auxSlots,4);assert.equal(r.maxDepth,3);
 assert.equal(M.merge([]).writes,0);assert.equal(M.merge([7]).comparisons,0);
 for(let k=1;k<=5;k++){const n=2**k,r=M.merge(Array.from({length:n},(_,i)=>i));assert.equal(r.writes,2*n*k);assert.equal(r.auxSlots,n);assert.equal(r.maxDepth,k+1);}
});
test('Lomuto separa os lados no rastro e expõe pior caso e instabilidade',()=>{
 for(const policy of ['last','middle']){
 const r=M.quick([3,1,2,2,0],policy);
 for(const row of r.trace){const pivot=Number(row[1].split('#')[0]);const lo=Number(row[0].match(/\d+/)[0]);const items=row[3].split(', ').map(x=>Number(x.split('#')[0]));const offset=row[2]-lo;assert.equal(items[offset],pivot);assert.ok(items.slice(0,offset).every(x=>x<=pivot));assert.ok(items.slice(offset+1).every(x=>x>pivot));}
 for(let n=0;n<=32;n++){const q=M.quick(Array(n).fill(4),policy);assert.equal(q.comparisons,Math.max(0,n*(n-1)/2));assert.equal(q.maxDepth,n);}
 }
 assert.equal(M.quick([1,2,3,4]).comparisons,6);assert.equal(M.quick([1,2,3,4],'middle').comparisons,4);assert.equal(M.quick([1,2,3,4],'middle').maxDepth,3);
 assert.deepEqual(M.quick([2,2,1]).result.map(x=>x.id),[2,1,0]);
});
test('ordenações preservam multiconjunto, entrada e estabilidade prometida em casos variados',()=>{
 let seed=121;function next(){seed=(seed*1664525+1013904223)>>>0;return seed;}
 for(let t=0;t<150;t++){
 const a=Array.from({length:next()%33},()=>next()%11-5),original=a.slice(),expected=a.slice().sort((x,y)=>x-y);
 for(const r of [M.insertion(a),M.insertion(a,'reverse'),M.merge(a),M.quick(a),M.quick(a,'middle')]){assert.deepEqual(r.result.map(x=>x.key),expected);assert.deepEqual(r.result.map(x=>x.id).sort((x,y)=>x-y),a.map((_,i)=>i));}
 for(const r of [M.insertion(a),M.merge(a)])for(let i=1;i<r.result.length;i++)if(r.result[i].key===r.result[i-1].key)assert.ok(r.result[i].id>r.result[i-1].id);
 assert.deepEqual(a,original);
 }
});
test('contratos rejeitam entradas inválidas sem mutação',()=>{
 for(const f of [M.recursive,M.invariant,M.insertion,M.merge,M.quick])for(const invalid of [null,[NaN],[Infinity],Array(33).fill(1)])assert.throws(()=>f(invalid));
 assert.throws(()=>M.insertion([],'bad'));assert.throws(()=>M.quick([],'random'));
});
