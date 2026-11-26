'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),M=require('./networks.js');
const example='0 1 2,0 2 2,1 2 1,1 3 4,2 3 5';
test('Kruskal ordena e rejeita ciclos, laços e preserva componentes isolados',()=>{
 const r=M.kruskal(5,example);assert.deepEqual(r.selected,[[1,2,1],[0,1,2],[1,3,4]]);assert.equal(r.total,7);assert.equal(r.components,2);assert.equal(r.selected.length,5-r.components);assert.equal(M.kruskal(4,example.replace('1 2 1','1 2 -1')+',3 3 -9').total,5);assert.equal(M.kruskal(3,'').components,3);assert.equal(M.kruskal(1,'0 0 -1').total,0);
});
test('Prim mantém chaves de aresta, reinicia componentes e não acumula distância',()=>{
 const r=M.prim(5,example);assert.deepEqual(r.parent,[null,0,1,1,null]);assert.deepEqual(r.key,[0,2,1,4,0]);assert.equal(r.total,7);assert.deepEqual(r.roots,[0,4]);assert.equal(r.selections,25);assert.deepEqual(M.prim(4,example,2).selected,[[2,1,1],[2,0,2],[1,3,4]]);assert.equal(M.prim(4,example.replace('1 2 1','1 2 -1')).total,5);assert.equal(M.prim(1,'0 0 -9').total,0);
});
function minimumForest(n,edges){
 const reach=Array.from({length:n},(_,u)=>Array.from({length:n},(_,v)=>u===v));for(const [u,v] of edges)reach[u][v]=reach[v][u]=true;for(let k=0;k<n;k++)for(let u=0;u<n;u++)for(let v=0;v<n;v++)reach[u][v] ||= reach[u][k]&&reach[k][v];let best=Infinity;
 for(let mask=0;mask<(1<<edges.length);mask++){const p=Array.from({length:n},(_,i)=>i);const find=u=>p[u]===u?u:find(p[u]);let sum=0,valid=true;for(let i=0;i<edges.length;i++)if(mask&(1<<i)){const [u,v,w]=edges[i],a=find(u),b=find(v);if(a===b){valid=false;break;}p[a]=b;sum+=w;}if(!valid)continue;for(let u=0;u<n;u++)for(let v=0;v<n;v++)if(reach[u][v]!== (find(u)===find(v)))valid=false;if(valid)best=Math.min(best,sum);}
 return best;
}
test('MSF contra enumeração independente de subconjuntos, com empates e negativos',()=>{
 let seed=91;function random(n){seed=(seed*1664525+1013904223)>>>0;return (seed>>>16)%n;}
 for(let sample=0;sample<100;sample++){const edges=[];for(let u=0;u<4;u++)for(let v=u;v<4;v++)if(random(3)!==0)edges.push([u,v,random(7)-3]);const text=edges.map(e=>e.join(' ')).join(','),expected=minimumForest(4,edges),k=M.kruskal(4,text);assert.equal(k.total,expected);
 for(let start=0;start<4;start++){const p=M.prim(4,text,start);assert.equal(p.total,expected);assert.equal(p.components,k.components);assert.equal(p.selected.length,4-p.components);const parent=[0,1,2,3],find=u=>parent[u]===u?u:find(parent[u]);for(const [u,v,w] of p.selected){assert.ok(edges.some(([a,b,c])=>(a===u&&b===v||a===v&&b===u)&&c===w));assert.notEqual(find(u),find(v));parent[find(u)]=find(v);}}}
});
function verifyFlow(n,edges,s,t,r){const balance=Array(n).fill(0);assert.equal(r.flow.length,edges.length);for(let i=0;i<edges.length;i++){const [u,v,c]=edges[i],e=r.flow[i];assert.equal(e.from,u);assert.equal(e.to,v);assert.equal(e.capacity,c);assert.ok(e.flow>=0&&e.flow<=c);balance[u]+=e.flow;balance[v]-=e.flow;}for(let u=0;u<n;u++)assert.equal(balance[u],u===s?r.value:u===t?(-r.value||0):0);assert.ok(r.sourceSide.includes(s));assert.ok(r.sinkSide.includes(t));assert.equal(r.cutCapacity,r.value);assert.equal(r.cut.reduce((a,e)=>a+e.capacity,0),r.value);}
test('fluxo exemplo tem gargalos e corte verificável',()=>{
 const edges=[[0,1,3],[0,2,2],[1,2,1],[1,3,2],[2,3,3]],r=M.maxFlow(4,edges.map(e=>e.join(' ')).join(','));assert.equal(r.value,5);assert.deepEqual(r.augmentations.map(a=>a.delta),[2,2,1]);assert.deepEqual(r.sourceSide,[0]);assert.deepEqual(r.flow.map(e=>e.flow),[3,2,1,2,3]);verifyFlow(4,edges,0,3,r);assert.equal(M.maxFlow(4,'0 1 3,0 2 2,1 2 1,1 3 2,2 3 1').value,3);
});
test('reversa cancela fluxo anterior, sem confundir aresta original oposta',()=>{
 const text='0 1 1,0 2 1,1 3 1,1 4 1,2 3 1,3 5 1,4 5 1',r=M.maxFlow(6,text);assert.equal(r.value,2);assert.ok(r.augmentations[1].steps.some(e=>e.reverse&&e.from===3&&e.to===1));assert.equal(r.flow.find(e=>e.from===1&&e.to===3).flow,0);
 const opposed=M.maxFlow(6,text+',3 1 0');assert.equal(opposed.value,2);assert.equal(opposed.flow.at(-1).flow,0);assert.ok(opposed.augmentations[1].steps.some(e=>e.reverse&&e.index===2));
 assert.equal(M.maxFlow(4,'0 1 0,1 2 3').value,0);
});
test('fluxo contra todos os cortes em redes variadas, incluindo capacidades zero e sentidos opostos',()=>{
 let seed=17;function random(n){seed=(seed*1664525+1013904223)>>>0;return (seed>>>16)%n;}
 for(let sample=0;sample<160;sample++){const n=5,s=sample%n,t=(s+1+random(n-1))%n,edges=[];for(let u=0;u<n;u++)for(let v=0;v<n;v++)if(u!==v&&random(3)===0)edges.push([u,v,random(6)]);const r=M.maxFlow(n,edges.map(e=>e.join(' ')).join(','),s,t);verifyFlow(n,edges,s,t,r);let cut=Infinity;for(let mask=0;mask<(1<<n);mask++)if((mask&(1<<s))&&!(mask&(1<<t))){const cap=edges.reduce((sum,[u,v,c])=>sum+((mask&(1<<u))&&!(mask&(1<<v))?c:0),0);cut=Math.min(cut,cap);}assert.equal(r.value,cut);}
});
test('contratos recusam capacidade negativa, laços em fluxo, origem inválida e pesos imprecisos',()=>{
 for(const fn of [M.kruskal,M.prim,M.maxFlow]){assert.throws(()=>fn(2,'0 1 0.5'));assert.throws(()=>fn(2,'0 1 1000001'));assert.throws(()=>fn(2,'0 1,0 1'));}
 assert.throws(()=>M.prim(2,'',2));assert.throws(()=>M.maxFlow(2,'',0,0));assert.throws(()=>M.maxFlow(2,'',-1,1));assert.throws(()=>M.maxFlow(2,'0 0 1'));assert.throws(()=>M.maxFlow(2,'0 1 -1'));assert.equal(M.maxFlow(2,'0 1 1000000').value,1000000);assert.equal(M.maxFlow(2,'').value,0);
});
