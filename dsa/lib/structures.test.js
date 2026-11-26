'use strict';
const {test}=require('node:test');const assert=require('node:assert/strict');const M=require('./structures.js');
test('duplicação limita custo acumulado apesar dos picos; incremento acumula quadrático',()=>{
 for(let n=0;n<=64;n++){
  const d=M.dynamic(n),u=M.dynamic(n,'increment');assert.equal(d.size,n);assert.ok(d.capacity>=n);
  if(n)assert.ok(d.writes<3*n);else assert.equal(d.amortized,0);
  assert.equal(u.writes,n*(n+1)/2);
  assert.equal(d.trace.reduce((sum,r)=>sum+r[4],0),d.writes);
 }
 assert.deepEqual(M.dynamic(5).trace.map(r=>r[4]),[1,2,3,1,5]);
 assert.equal(M.dynamic(9).trace[8][4],9);
 for(const n of [-1,1.5,65,NaN])assert.throws(()=>M.dynamic(n));assert.throws(()=>M.dynamic(3,'triple'));
});
test('lista preserva identidades e ligações ao inserir/remover em qualquer posição',()=>{
 for(let n=0;n<20;n++)for(let i=0;i<=n;i++){
  const a=Array.from({length:n},(_,j)=>j),copy=a.slice(),r=M.linked(a,'insert',i,99);
  assert.deepEqual(a,copy);assert.deepEqual(r.result,[...a.slice(0,i),99,...a.slice(i)]);assert.equal(r.steps,i);
  assert.equal(new Set(r.after.map(row=>row[0])).size,n+1);
  r.after.forEach((row,j)=>assert.equal(row[2],r.after[j+1]?.[0]||'∅'));
  assert.deepEqual(M.linked(r.result,'remove',i).result,a);
 }
 assert.deepEqual(M.linked([1],'remove',0).after,[]);
 assert.throws(()=>M.linked([],'remove',0));assert.throws(()=>M.linked([1],'insert',2,4));
 assert.throws(()=>M.linked([1],'insert',0,Infinity));
});
test('pilha distingue tipo, ordem, underflow e abertura pendente',()=>{
 for(const text of ['', '([x])','{[()]}','()[]{}','texto'])assert.equal(M.delimiters(text).valid,true);
 for(const text of ['([)]','(()',')(','{]'])assert.equal(M.delimiters(text).valid,false);
 const crossed=M.delimiters('([)]');assert.equal(crossed.trace.length,3);assert.deepEqual(crossed.stack,['(','[']);
 assert.match(M.delimiters(')').error,/sem abertura/);assert.match(M.delimiters('(').error,/pendentes/);
 assert.throws(()=>M.delimiters('('.repeat(129)));
});
test('fila circular faz wrap, preserva FIFO e rejeita sem sobrescrever',()=>{
 const r=M.queue(3,'+10,+20,+30,-,+40,+50,-');
 assert.deepEqual(r.result,[30,40]);assert.deepEqual(r.removed,[10,20]);assert.equal(r.head,2);assert.equal(r.tail,1);assert.equal(r.size,2);
 const full=M.queue(1,'+1,+2');assert.deepEqual(full.result,[1]);assert.equal(full.head,full.tail);assert.equal(full.size,1);
 const empty=M.queue(1,'-');assert.equal(empty.size,0);assert.equal(empty.head,empty.tail);
 assert.deepEqual(M.queue(2,'+-5,+0,-').removed,[-5]);
 for(const text of ['+1,','1','-5','+Infinity','+,'])assert.throws(()=>M.queue(3,text));
 assert.throws(()=>M.queue(0,''));
});
test('fila concorda com uma sequência de referência em múltiplas voltas',()=>{
 for(let c=1;c<=8;c++){
  const ref=[],ops=[],removed=[];
  for(let i=0;i<60;i++){
   if((i%5)<3){ops.push('+'+i);if(ref.length<c)ref.push(i);}
   else{ops.push('-');if(ref.length)removed.push(ref.shift());}
  }
  const r=M.queue(c,ops.join(','));assert.deepEqual(r.result,ref);assert.deepEqual(r.removed,removed);
 }
});
test('hash encadeia colisões, deduplica e normaliza negativos',()=>{
 const r=M.hash([1,5,9,5],4,13);assert.equal(r.size,3);assert.equal(r.load,.75);assert.equal(r.collisions,2);assert.equal(r.comparisons,3);assert.equal(r.found,false);
 assert.deepEqual(r.table[1],[1,5,9]);assert.equal(M.hash([1,5,9],4,2).comparisons,0);
 assert.equal(M.hash([1,5,9],5,9).comparisons,1);
 assert.deepEqual(M.hash([-1,3,7],4,7).table[3],[-1,3,7]);
 assert.equal(M.hash([0,1,2],1,2).load,3);
 assert.equal(M.hash([],4,2).found,false);assert.equal(M.hash([0],4,0).found,true);
 assert.throws(()=>M.hash([1.5],4,0));assert.throws(()=>M.hash([1],0,1));assert.throws(()=>M.hash([1],4,NaN));
});
