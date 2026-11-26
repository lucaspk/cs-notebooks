'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),M=require('./routes.js');
test('bipartição cobre isolados, ciclos pares e testemunha ímpar',()=>{
 assert.deepEqual(M.bipartite(5,'0 1,1 2,2 3,3 0').color,[0,1,0,1,0]);assert.deepEqual(M.bipartite(5,'4 4').witness,[4,4]);
 for(let mask=0;mask<64;mask++){const pairs=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]],edges=pairs.filter((_,i)=>mask&(1<<i)),text=edges.map(e=>e.join(' ')).join(','),r=M.bipartite(4,text);let possible=false;for(let c=0;c<16;c++)if(edges.every(([u,v])=>((c>>u)&1)!==((c>>v)&1)))possible=true;assert.equal(r.ok,possible);if(r.ok)for(const [u,v] of edges)assert.notEqual(r.color[u],r.color[v]);else{assert.equal((r.witness.length-1)%2,1);assert.equal(r.witness[0],r.witness.at(-1));for(let i=1;i<r.witness.length;i++)assert.ok(edges.some(([u,v])=>u===r.witness[i-1]&&v===r.witness[i]||v===r.witness[i-1]&&u===r.witness[i]));}}
});
test('Kahn respeita arestas e distingue bloqueados de membros de ciclos',()=>{
 assert.deepEqual(M.topological(4,'0 2,1 2,2 3').order,[0,1,2,3]);const r=M.topological(4,'0 1,1 0,1 2');assert.equal(r.ok,false);assert.deepEqual(r.order,[3]);assert.deepEqual(r.blocked,[0,1,2]);assert.equal(M.topological(1,'0 0').ok,false);assert.deepEqual(M.topological(3,'').order,[0,1,2]);
});
test('DAG aceita negativos, pula inalcançáveis e rejeita ciclo desconectado',()=>{
 const r=M.dag(4,'0 1 2,0 2 5,1 2 -4,2 3 3');assert.deepEqual(r.distance,[0,2,-2,1]);assert.deepEqual(r.parent,[null,0,1,2]);assert.deepEqual(M.dag(4,'0 1 2,0 2 5,1 2 -4,2 3 3',2).distance,[null,null,0,3]);assert.throws(()=>M.dag(3,'1 2,2 1'));
});
test('Dijkstra distingue descoberta/fixação, zero e empate',()=>{
 const r=M.dijkstra(5,'0 1 4,0 2 1,2 1 2,1 3 1,2 3 7');assert.deepEqual(r.distance,[0,3,1,4,null]);assert.deepEqual(r.order,[0,2,1,3]);assert.deepEqual(r.settled,[true,true,true,true,false]);assert.equal(r.selections,25);
 assert.deepEqual(M.dijkstra(3,'0 1 0,1 2 0,2 0 0').distance,[0,0,0]);assert.deepEqual(M.dijkstra(3,'0 1 1,0 2 1,1 2 0').parent,[null,0,0]);assert.throws(()=>M.dijkstra(3,'2 2 -1'));
});
test('Bellman-Ford síncrono conserva limite de arestas e influência seletiva',()=>{
 const r=M.bellmanFord(4,'0 1 4,0 2 5,1 2 -2,2 3 3');assert.deepEqual(r.rounds,[[0,null,null,null],[0,4,5,null],[0,4,2,8],[0,4,2,5]]);assert.equal(r.negativeCycle,false);
 assert.deepEqual(M.bellmanFord(4,'0 1 4,1 2 -2,2 1 1,2 3 3').distance,[0,-Infinity,-Infinity,-Infinity]);assert.deepEqual(M.bellmanFord(5,'0 1 2,3 4 -2,4 3 1').distance,[0,2,null,null,null]);assert.deepEqual(M.bellmanFord(5,'0 1 2,3 4 -2,4 3 1,1 3 0').distance,[0,2,null,-Infinity,-Infinity]);assert.deepEqual(M.bellmanFord(1,'0 0 -1').distance,[-Infinity]);assert.deepEqual(M.bellmanFord(1,'').distance,[0]);
});
test('pesos exatos e origem têm contratos explícitos',()=>{
 for(const fn of [M.dag,M.dijkstra,M.bellmanFord]){assert.throws(()=>fn(2,'0 1 0.1'));assert.throws(()=>fn(2,'0 1 1000001'));assert.throws(()=>fn(2,'',2));assert.deepEqual(fn(2,'0 1 1000000').distance,[0,1000000]);}assert.throws(()=>M.bipartite(2,'0 1 0'));
});
test('caminhos contra Floyd-Warshall independente em grafos pequenos variados',()=>{
 let seed=37;function random(n){seed=(seed*1664525+1013904223)>>>0;return (seed>>>16)%n;}
 for(let sample=0;sample<180;sample++){const n=5,edges=[],nonnegative=sample%3===0,acyclic=sample%3===1;const dist=Array.from({length:n},(_,u)=>Array.from({length:n},(_,v)=>u===v?0:Infinity));for(let u=0;u<n;u++)for(let v=0;v<n;v++)if((!acyclic||u<v)&&random(4)===0){const w=nonnegative?random(8):random(11)-5;edges.push([u,v,w]);dist[u][v]=Math.min(dist[u][v],w);}for(let k=0;k<n;k++)for(let u=0;u<n;u++)for(let v=0;v<n;v++)dist[u][v]=Math.min(dist[u][v],dist[u][k]+dist[k][v]);const text=edges.map(e=>e.join(' ')).join(',');
 for(let s=0;s<n;s++){const expected=dist[s].map((d,v)=>{for(let k=0;k<n;k++)if(Number.isFinite(dist[s][k])&&dist[k][k]<0&&Number.isFinite(dist[k][v]))return -Infinity;return Number.isFinite(d)?d:null;});const b=M.bellmanFord(n,text,s);assert.deepEqual(b.distance,expected);assert.equal(b.negativeCycle,expected.includes(-Infinity));if(nonnegative)assert.deepEqual(M.dijkstra(n,text,s).distance,expected);if(acyclic){const r=M.dag(n,text,s);assert.deepEqual(r.distance,expected);const t=M.topological(n,text);assert.equal(t.ok,true);for(const [u,v] of edges)assert.ok(t.order.indexOf(u)<t.order.indexOf(v));}}}
});
