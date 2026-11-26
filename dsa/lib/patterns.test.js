'use strict';
const {test}=require('node:test');const assert=require('node:assert/strict');const M=require('./patterns.js');
function intervals(a,t){let count=0,best=null;for(let i=0;i<a.length;i++){let sum=0;for(let j=i;j<a.length;j++){sum+=a[j];if(sum===t)count++;if(sum>=t&&(best===null||j-i+1<best))best=j-i+1;}}return {count,best};}
test('contratos de duplicatas, índices e ordem',()=>{assert.deepEqual(M.hashPair('3,3',6).pair,[0,1]);assert.equal(M.hashPair('3',6).pair,null);assert.deepEqual(M.hashPair('1,2,3,4',5).pair,[1,2]);assert.deepEqual(M.twoPointers('-4,-1,2,5',1).pair,[0,3]);assert.equal(M.twoPointers('',0).pair,null);assert.throws(()=>M.twoPointers('4,1,3',4));});
test('janelas negativas, empate, zeros e ausência',()=>{assert.equal(M.fixedWindow('-5,-2,-3',2).best,-5);assert.equal(M.fixedWindow('1,1,1',2).start,0);assert.equal(M.variableWindow('0,0,7',7).best.length,1);assert.equal(M.variableWindow('2,3,1,2,4,3',16).best,null);assert.throws(()=>M.variableWindow('1,-1,5',5));assert.equal(M.prefixHash('0,0,0',0).count,6);assert.equal(M.prefixHash('',0).count,0);assert.equal(M.prefixHash('3',3).count,1);});
test('enumeração independente de todas as sequências pequenas contra força bruta',()=>{
 for(let n=0;n<=5;n++)for(let mask=0;mask<3**n;mask++){let x=mask;const a=Array.from({length:n},()=>{const v=x%3-1;x=Math.floor(x/3);return v;});const text=a.join(',');
  for(let t=-2;t<=2;t++){let exists=false;for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)if(a[i]+a[j]===t)exists=true;
   for(const r of [M.hashPair(text,t),M.twoPointers([...a].sort((u,v)=>u-v).join(','),t)]){assert.equal(r.pair!==null,exists);if(r.pair){assert.ok(r.pair[0]<r.pair[1]);assert.equal(r.a[r.pair[0]]+r.a[r.pair[1]],t);}}
   assert.equal(M.prefixHash(text,t).count,intervals(a,t).count);
  }
  for(let k=1;k<=n;k++){const sums=Array.from({length:n-k+1},(_,i)=>a.slice(i,i+k).reduce((s,v)=>s+v,0));const r=M.fixedWindow(text,k);assert.equal(r.best,Math.max(...sums));assert.equal(r.start,sums.indexOf(r.best));}
  const nonnegative=a.map(v=>v+1);for(let t=1;t<=5;t++){const r=M.variableWindow(nonnegative.join(','),t);assert.equal(r.best===null?null:r.best.length,intervals(nonnegative,t).best);if(r.best)assert.ok(nonnegative.slice(r.best.start,r.best.end+1).reduce((s,v)=>s+v,0)>=t);}
 }
});
test('entradas inválidas e limites numéricos',()=>{for(const s of ['1.5','NaN','1000001','1,,2'])assert.throws(()=>M.values(s));assert.throws(()=>M.values(Array(65).fill(0).join(',')));for(const k of [0,4,1.5,''])assert.throws(()=>M.fixedWindow('1,2,3',k));assert.throws(()=>M.fixedWindow('',1));assert.throws(()=>M.variableWindow('1,2',0));assert.throws(()=>M.hashPair('1',''));assert.equal(M.prefixHash(Array(64).fill(0).join(','),0).count,2080);assert.equal(M.fixedWindow(Array(64).fill(1000000).join(','),64).best,64000000);});
