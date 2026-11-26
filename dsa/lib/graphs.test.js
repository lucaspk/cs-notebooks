'use strict';
const {test}=require('node:test');const assert=require('node:assert/strict');const M=require('./graphs.js');
test('representações preservam zero, direção, laços e isolados',()=>{
 const r=M.representation(4,'0 1 0,1 2 -5,2 2 3');assert.equal(r.cells,16);assert.equal(r.entries,5);assert.equal(r.matrix[0][1],0);assert.equal(r.matrix[1][0],0);assert.equal(r.matrix[3][0],null);assert.deepEqual(r.adj[3],[]);
 const d=M.representation(4,'0 1 0,1 2 -5,2 2 3',true);assert.equal(d.entries,3);assert.equal(d.matrix[1][0],null);
});
test('contratos rejeitam IDs, pesos, duplicatas e entradas ambíguas',()=>{
 for(const args of [[0,''],[13,''],[3,'0 3'],[3,'0 -1'],[3,'0.5 1'],[3,'0 1,'],[3,'0 1,1 0'],[3,'0 1 NaN'],[3,'0 1 1e999'],[3,'0 1 2 3'],[3,'0 1','yes']])assert.throws(()=>M.graph(...args));
 assert.throws(()=>M.bfs(3,'0 1 0'));assert.throws(()=>M.dfs(3,'0 1 2'));assert.throws(()=>M.components(3,'0 1 -1'));assert.throws(()=>M.cycles(3,'0 1 2'));assert.throws(()=>M.bfs(2,'',false,2));assert.throws(()=>M.bfs(2,'',false,0,-1));
});
test('BFS marca na descoberta, cobre alcançáveis e reconstrói caminho',()=>{
 const r=M.bfs(5,'0 1,0 2,1 3,2 3',true,0,3);assert.deepEqual(r.distance,[0,1,1,2,null]);assert.deepEqual(r.path,[0,1,3]);assert.deepEqual(r.order,[0,1,2,3]);assert.equal(r.scans,4);assert.equal(r.trace.filter(x=>x[0]==='Descobrir'&&x[1]===3).length,1);
 assert.deepEqual(M.bfs(5,'0 1',true,0,4).path,[]);assert.deepEqual(M.bfs(1,'0 0',true,0,0).path,[0]);assert.equal(M.bfs(3,'0 1,1 2',false,2,0).distance[0],2);
});
test('DFS relógio e intervalos incluem componentes isolados e ciclos',()=>{
 const r=M.dfs(4,'0 1,0 2,1 2',true);assert.deepEqual(r.discovery,[1,2,3,7]);assert.deepEqual(r.finish,[6,5,4,8]);assert.deepEqual(r.parent,[null,0,1,null]);assert.equal(r.scans,3);
 const c=M.dfs(4,'0 1,1 2,2 0',true);assert.equal(new Set([...c.discovery,...c.finish]).size,8);for(let u=0;u<4;u++){assert.ok(c.discovery[u]<c.finish[u]);if(c.parent[u]!==null){const p=c.parent[u];assert.ok(c.discovery[p]<c.discovery[u]&&c.finish[u]<c.finish[p]);}}
});
test('componentes fortes diferem de alcance unilateral e de grupos não dirigidos',()=>{
 assert.deepEqual(M.components(4,'0 1,1 0,1 2',true).groups,[[0,1],[2],[3]]);assert.deepEqual(M.components(4,'0 1,1 2').groups,[[0,1,2],[3]]);assert.deepEqual(M.components(4,'0 1,1 2',true).groups,[[0],[1],[2],[3]]);assert.deepEqual(M.components(4,'0 1,1 2,2 0',true).groups,[[0,1,2],[3]]);
});
test('ciclos distinguem pai, preto, aresta inversa, laço e componente separado',()=>{
 assert.equal(M.cycles(3,'0 1,0 2,1 2',true).hasCycle,false);assert.equal(M.cycles(3,'0 1,1 2').hasCycle,false);assert.deepEqual(M.cycles(3,'0 1,0 2,1 2').witness,[0,1,2,0]);assert.deepEqual(M.cycles(2,'0 1,1 0',true).witness,[0,1,0]);assert.deepEqual(M.cycles(3,'2 2').witness,[2,2]);
});
test('todos os grafos dirigidos de três IDs: BFS, alcance e ciclos contra fechamento independente',()=>{
 for(let mask=0;mask<512;mask++){
  const edges=[],dist=Array.from({length:3},(_,u)=>Array.from({length:3},(_,v)=>u===v?0:Infinity));for(let u=0;u<3;u++)for(let v=0;v<3;v++)if(mask&(1<<(u*3+v))){edges.push(u+' '+v);dist[u][v]=Math.min(dist[u][v],1);}
  for(let k=0;k<3;k++)for(let u=0;u<3;u++)for(let v=0;v<3;v++)dist[u][v]=Math.min(dist[u][v],dist[u][k]+dist[k][v]);
  const text=edges.join(','),c=M.components(3,text,true),cycle=M.cycles(3,text,true);const expected=edges.some(e=>{const [u,v]=e.split(' ').map(Number);return Number.isFinite(dist[v][u]);});assert.equal(cycle.hasCycle,expected);
  for(let u=0;u<3;u++){assert.deepEqual(M.bfs(3,text,true,u,u).distance,dist[u].map(x=>Number.isFinite(x)?x:null));for(let v=0;v<3;v++){assert.equal(c.reachable[u][v],Number.isFinite(dist[u][v]));assert.equal(c.labels[u]===c.labels[v],Number.isFinite(dist[u][v])&&Number.isFinite(dist[v][u]));}}
  if(cycle.hasCycle){const w=cycle.witness;assert.equal(w[0],w[w.length-1]);assert.equal(new Set(w.slice(0,-1)).size,w.length-1);for(let i=1;i<w.length;i++)assert.ok(edges.includes(w[i-1]+' '+w[i]));}
 }
});
test('todos os grafos não dirigidos de quatro IDs: ciclo contra união de conjuntos',()=>{
 const pairs=[];for(let u=0;u<4;u++)for(let v=u;v<4;v++)pairs.push([u,v]);for(let mask=0;mask<1024;mask++){const parent=[0,1,2,3],edges=[];const find=x=>parent[x]===x?x:find(parent[x]);let expected=false;for(let i=0;i<pairs.length;i++)if(mask&(1<<i)){const [u,v]=pairs[i];edges.push(u+' '+v);const a=find(u),b=find(v);if(a===b)expected=true;else parent[a]=b;}const r=M.cycles(4,edges.join(','));assert.equal(r.hasCycle,expected);if(r.hasCycle)for(let i=1;i<r.witness.length;i++){const u=r.witness[i-1],v=r.witness[i];assert.ok(edges.includes(Math.min(u,v)+' '+Math.max(u,v)));}}
});
