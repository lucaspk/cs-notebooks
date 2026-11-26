'use strict';
const {test}=require('node:test');const assert=require('node:assert/strict');const M=require('./trees.js');
test('limite usa fatorial exato e menor potência suficiente',()=>{
 assert.deepEqual([0,1,3,4,5].map(n=>M.bound(n).comparisons),[0,0,3,5,7]);
 for(let n=0;n<=100;n++){const r=M.bound(n),p=BigInt(r.permutations),cap=BigInt(r.leaves);assert.ok(cap>=p);if(r.comparisons)assert.ok(cap/2n<p);}
 assert.equal(M.bound(20).permutations,'2432902008176640000');assert.throws(()=>M.bound(-1));assert.throws(()=>M.bound(101));
});
function validateRows(rows,expected){
 const byPath=new Map(rows.map(r=>[r[0],r]));const keys=[];
 function walk(path,lo,hi){const r=byPath.get(path);if(!r)return;assert.ok(r[1]>lo&&r[1]<hi);keys.push(r[1]);for(const [side,index] of [['E',2],['D',3]]){const child=byPath.get(path+'.'+side);assert.equal(child?child[1]:'∅',r[index]);if(child)walk(path+'.'+side,side==='D'?r[1]:lo,side==='E'?r[1]:hi);}}
 walk('raiz',-Infinity,Infinity);assert.equal(keys.length,rows.length);assert.deepEqual(keys.sort((a,b)=>a-b),expected);
}
test('BST remove folhas, filhos únicos e sucessor com filho direito',()=>{
 const cases=[[[4],4],[[4,2],4],[[4,6],4],[[4,2,7,5,6,8],4],[[10,4,12,2,8,6,7],4],[[4,2,6],99], [[],4]];
 for(const [a,target] of cases){const original=a.slice(),r=M.bst(a,target,'remove'),expected=[...new Set(a)].filter(x=>x!==target).sort((a,b)=>a-b);assert.deepEqual(r.result,expected);validateRows(r.after,expected);assert.deepEqual(a,original);}
 assert.equal(M.bst([4,2,6,1,3,5,7],7).comparisons,3);assert.equal(M.bst([1,2,3,4,5,6,7],7).comparisons,7);assert.deepEqual(M.bst([2,1,3],2,'insert').result,[1,2,3]);
});
test('rotações preservam ordem e subárvore intermediária, inclusive pivô interno',()=>{
 for(const [a,p,d] of [[[4,2,6,1,3],4,'right'],[[3,1,2],3,'right'],[[4,2,6,5,7],4,'left'],[[10,4,12,2,8,6,7],4,'left']]){const r=M.rotate(a,p,d);assert.deepEqual(r.result,r.order);validateRows(r.after,r.order);}
 assert.equal(M.rotate([3,2,1],3).height,2);assert.equal(M.rotate([3,1,2],3).height,3);assert.throws(()=>M.rotate([3],3));assert.throws(()=>M.rotate([3],9));
});
test('heap retira em ordem, preserva multiplicidade e propriedade final',()=>{
 let seed=91;for(let t=0;t<100;t++){seed=(seed*1664525+1013904223)>>>0;const a=Array.from({length:seed%33},(_,i)=>(seed+i*37)%19-9);const original=a.slice();const r=M.heap(a,32);assert.deepEqual(r.removed,a.slice().sort((x,y)=>x-y));assert.deepEqual(r.result,[]);assert.deepEqual(a,original);
 for(let k=0;k<Math.min(a.length,5);k++){const r=M.heap(a,k);for(let i=1;i<r.result.length;i++)assert.ok(r.result[Math.floor((i-1)/2)]<=r.result[i]);assert.deepEqual([...r.removed,...r.result].sort((x,y)=>x-y),a.slice().sort((x,y)=>x-y));}}
 assert.deepEqual(M.heap([5,2,4,1],2).result,[4,5]);assert.deepEqual(M.heap([],1).removed,[]);
});
test('Union-Find comprime sem alterar partição e não conta união redundante',()=>{
 const cmds='u 0 1,u 2 3,u 0 2,f 3,f 3';const a=M.unionFind(4,cmds),b=M.unionFind(4,cmds,false);assert.deepEqual(a.parent,[0,0,0,0]);assert.deepEqual(b.parent,[0,0,0,2]);assert.equal(a.steps,3);assert.equal(b.steps,4);
 assert.equal(M.unionFind(4,cmds+',u 1 3,q 1 3').steps,7);assert.equal(M.unionFind(4,cmds+',u 1 3,q 1 3',false).steps,10);
 const ops=['u 0 1','u 2 3','q 0 3','u 1 3','q 0 3','u 0 3','q 4 0'];for(const compress of [true,false]){const r=M.unionFind(5,ops.join(','),compress);assert.deepEqual(r.answers,[false,true,false]);assert.equal(r.components,2);}
});
test('Union-Find comparado com partição de referência em sequência variada',()=>{
 const n=12,group=Array.from({length:n},(_,i)=>i),commands=[],expected=[];let seed=77;
 for(let t=0;t<150;t++){seed=(seed*1664525+1013904223)>>>0;const a=seed%n,b=(seed>>>8)%n;if(t%3){commands.push(`u ${a} ${b}`);const from=group[b],to=group[a];for(let i=0;i<n;i++)if(group[i]===from)group[i]=to;}else{commands.push(`q ${a} ${b}`);expected.push(group[a]===group[b]);}
 if(commands.length===60){for(const compress of [true,false])assert.deepEqual(M.unionFind(n,commands.join(','),compress).answers,expected);break;}}
});
test('contratos rejeitam entradas e comandos inválidos',()=>{
 for(const bad of [[NaN],Array(33).fill(1),null]){assert.throws(()=>M.bst(bad,1));assert.throws(()=>M.heap(bad));}
 for(const cmd of ['u 0','f 0 1','q 0 9','u -1 2','oops','u 0 1,'])assert.throws(()=>M.unionFind(4,cmd));
 assert.throws(()=>M.unionFind(0,''));assert.throws(()=>M.heap([],1.2));assert.throws(()=>M.bst([],NaN));
});
