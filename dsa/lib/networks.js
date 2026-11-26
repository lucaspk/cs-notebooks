(function(root){
'use strict';
const G=typeof module!=='undefined'&&module.exports?require('./graphs.js'):root.DsaGraphs;
function integerGraph(n,text,directed){const g=G.graph(n,text,directed);if(g.edges.some(e=>!Number.isInteger(e[2])||Math.abs(e[2])>1000000))throw Error('Use pesos inteiros entre −1000000 e 1000000.');return g;}
function id(v,n){if(!Number.isInteger(v)||v<0||v>=n)throw Error('Vértice fora de 0..n−1.');}
function kruskal(n,text){const g=integerGraph(n,text,false),parent=Array.from({length:n},(_,i)=>i),size=Array(n).fill(1),selected=[],trace=[];let components=n,total=0;
 function find(u){let r=u;while(parent[r]!==r)r=parent[r];while(parent[u]!==u){const next=parent[u];parent[u]=r;u=next;}return r;}
 const sorted=g.edges.map(([u,v,w])=>[Math.min(u,v),Math.max(u,v),w]).sort((a,b)=>a[2]-b[2]||a[0]-b[0]||a[1]-b[1]);
 for(const [u,v,w] of sorted){let a=find(u),b=find(v);if(a===b){trace.push(['Rejeitar',u+' — '+v,w,'mesmo componente']);continue;}if(size[a]<size[b])[a,b]=[b,a];parent[b]=a;size[a]+=size[b];selected.push([u,v,w]);total+=w;components--;trace.push(['Aceitar',u+' — '+v,w,'total '+total+'; componentes '+components]);}
 return {selected,total,components,trace,parent:parent.map((_,u)=>find(u))};}
function prim(n,text,start=0){const g=integerGraph(n,text,false);id(start,n);const used=Array(n).fill(false),key=Array(n).fill(null),parent=Array(n).fill(null),selected=[],roots=[],trace=[];let total=0,selections=0;key[start]=0;
 for(let k=0;k<n;k++){let u=-1;for(let v=0;v<n;v++){selections++;if(!used[v]&&key[v]!==null&&(u===-1||key[v]<key[u]))u=v;}
 if(u===-1){u=used.findIndex(x=>!x);key[u]=0;}used[u]=true;
 if(parent[u]===null){roots.push(u);trace.push(['Nova raiz',u,0,'componente '+roots.length]);}else{selected.push([parent[u],u,key[u]]);total+=key[u];trace.push(['Conectar',parent[u]+' — '+u,key[u],'total '+total]);}
 for(const {to:v,weight:w} of g.adj[u])if(!used[v]&&(key[v]===null||w<key[v])){key[v]=w;parent[v]=u;trace.push(['Atualizar chave',v,w,'pai '+u]);}}
 return {selected,total,components:roots.length,roots,parent,key,trace,selections};}
function maxFlow(n,text,source=0,sink=n-1){const g=integerGraph(n,text,true);id(source,n);id(sink,n);if(source===sink)throw Error('Origem e destino devem ser distintos.');if(g.edges.some(([u,v,c])=>u===v||c<0))throw Error('Capacidades 0..1000000, sem laços.');
 const adj=Array.from({length:n},()=>[]),original=[];
 for(let i=0;i<g.edges.length;i++){const [u,v,c]=g.edges[i],forward={from:u,to:v,residual:c,index:i,reverse:false},backward={from:v,to:u,residual:0,index:i,reverse:true};forward.pair=backward;backward.pair=forward;adj[u].push(forward);adj[v].push(backward);original.push(forward);}
 for(const a of adj)a.sort((a,b)=>a.to-b.to||a.index-b.index||Number(a.reverse)-Number(b.reverse));
 const trace=[],augmentations=[];let value=0;
 function search(){const parent=new Map(),seen=new Set([source]),q=[source];for(let h=0;h<q.length;h++)for(const e of adj[q[h]])if(e.residual>0&&!seen.has(e.to)){seen.add(e.to);parent.set(e.to,e);q.push(e.to);}return {parent,seen};}
 let result;
 while(true){result=search();if(!result.seen.has(sink))break;const path=[];let delta=Infinity;for(let v=sink;v!==source;v=result.parent.get(v).from){const e=result.parent.get(v);path.push(e);delta=Math.min(delta,e.residual);}path.reverse();for(const e of path){e.residual-=delta;e.pair.residual+=delta;}value+=delta;const steps=path.map(e=>({from:e.from,to:e.to,index:e.index,reverse:e.reverse}));augmentations.push({steps,delta,value});trace.push(['Aumentar',path.map(e=>e.from+'→'+e.to+(e.reverse?' (reversa)':'')).join(' ; '),delta,value]);}
 const flow=g.edges.map(([u,v,capacity],i)=>({from:u,to:v,capacity,flow:capacity-original[i].residual})),sourceSide=[],sinkSide=[];for(let u=0;u<n;u++)(result.seen.has(u)?sourceSide:sinkSide).push(u);
 const cut=flow.filter(e=>result.seen.has(e.from)&&!result.seen.has(e.to)),cutCapacity=cut.reduce((sum,e)=>sum+e.capacity,0);
 return {value,flow,sourceSide,sinkSide,cut,cutCapacity,augmentations,trace};}
const api={kruskal,prim,maxFlow};root.DsaNetworks=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
