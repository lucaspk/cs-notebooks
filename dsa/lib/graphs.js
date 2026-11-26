(function(root){
'use strict';
function id(x,n){if(!Number.isInteger(x)||x<0||x>=n)throw Error('Vértice fora de 0..n−1.');return x;}
function graph(n,text,directed=false){
 if(!Number.isInteger(n)||n<1||n>12||typeof text!=='string'||typeof directed!=='boolean')throw Error('Use 1..12 vértices, texto e direção válida.');
 const adj=Array.from({length:n},()=>[]),edges=[],seen=new Set();
 const tokens=text.trim()?text.split(','):[];if(tokens.length>64)throw Error('Máximo de 64 arestas.');
 for(const token of tokens){const parts=token.trim().split(/\s+/);if(parts.length<2||parts.length>3||parts.some(x=>!/^[-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?$/i.test(x)))throw Error('Use u v ou u v peso, separados por vírgula.');
 const [u,v]=parts.map(Number);id(u,n);id(v,n);const w=parts.length===3?Number(parts[2]):1;if(!Number.isFinite(w))throw Error('Peso deve ser finito.');
 const key=directed?u+':'+v:Math.min(u,v)+':'+Math.max(u,v);if(seen.has(key))throw Error('Aresta repetida: multiarestas não são aceitas.');seen.add(key);
 edges.push([u,v,w]);adj[u].push({to:v,weight:w});if(!directed&&u!==v)adj[v].push({to:u,weight:w});
 }
 for(const a of adj)a.sort((a,b)=>a.to-b.to);
 return {n,directed,edges,adj};
}
function representation(n,text,directed=false){const g=graph(n,text,directed),matrix=Array.from({length:n},()=>Array(n).fill(null));let entries=0;for(let u=0;u<n;u++)for(const e of g.adj[u]){matrix[u][e.to]=e.weight;entries++;}return {...g,matrix,entries,cells:n*n};}
function unweighted(g){if(g.edges.some(e=>e[2]!==1))throw Error('Este laboratório exige peso 1; BFS minimiza número de arestas.');}
function bfs(n,text,directed=false,source=0,target=n-1){const g=graph(n,text,directed);unweighted(g);id(source,n);id(target,n);
 const distance=Array(n).fill(null),parent=Array(n).fill(null),queue=[source],order=[],trace=[];distance[source]=0;let scans=0;
 trace.push(['Descobrir',source,0,queue.join(', ')]);
 for(let head=0;head<queue.length;head++){const u=queue[head];order.push(u);trace.push(['Retirar',u,distance[u],queue.slice(head+1).join(', ')||'∅']);for(const e of g.adj[u]){scans++;const v=e.to;if(distance[v]===null){distance[v]=distance[u]+1;parent[v]=u;queue.push(v);trace.push(['Descobrir',v,distance[v],queue.slice(head+1).join(', ')]);}}}
 const path=[];if(distance[target]!==null){for(let v=target;v!==null;v=parent[v])path.push(v);path.reverse();}
 return {distance,parent,order,path,trace,scans};}
function dfs(n,text,directed=false){const g=graph(n,text,directed);unweighted(g);const discovery=Array(n).fill(0),finish=Array(n).fill(0),parent=Array(n).fill(null),trace=[],stack=[];let time=0,scans=0;
 function visit(u){discovery[u]=++time;stack.push(u);trace.push(['Descobrir',u,time,stack.join(' → ')]);for(const e of g.adj[u]){scans++;if(!discovery[e.to]){parent[e.to]=u;visit(e.to);}}finish[u]=++time;trace.push(['Terminar',u,time,stack.join(' → ')]);stack.pop();}
 for(let u=0;u<n;u++)if(!discovery[u])visit(u);return {discovery,finish,parent,trace,scans};}
function components(n,text,directed=false){const g=graph(n,text,directed);unweighted(g);
 function reach(start){const found=Array(n).fill(false),q=[start];found[start]=true;for(let h=0;h<q.length;h++)for(const e of g.adj[q[h]])if(!found[e.to]){found[e.to]=true;q.push(e.to);}return found;}
 const reachable=Array.from({length:n},(_,u)=>reach(u)),labels=Array(n).fill(-1),groups=[];
 for(let u=0;u<n;u++)if(labels[u]===-1){const group=[];for(let v=0;v<n;v++)if(labels[v]===-1&&reachable[u][v]&&reachable[v][u]){labels[v]=groups.length;group.push(v);}groups.push(group);}
 return {reachable,labels,groups,count:groups.length};}
function cycles(n,text,directed=false){const g=graph(n,text,directed);unweighted(g);const color=Array(n).fill(0),parent=Array(n).fill(null),trace=[];let witness=[];
 function visit(u){color[u]=1;trace.push(['Ativar',u,'', 'cinza']);for(const e of g.adj[u]){const v=e.to;trace.push(['Examinar',u,v,color[v]===0?'branco':color[v]===1?'cinza':'preto']);if(!directed&&v===parent[u]){trace.push(['Ignorar pai',u,v,'mesma aresta']);continue;}if(color[v]===0){parent[v]=u;if(visit(v))return true;}else if(color[v]===1){const chain=[u];while(chain[chain.length-1]!==v)chain.push(parent[chain[chain.length-1]]);witness=chain.reverse();witness.push(v);trace.push(['Ciclo',u,v,witness.join(' → ')]);return true;}}
 color[u]=2;trace.push(['Terminar',u,'','preto']);return false;}
 for(let u=0;u<n;u++)if(color[u]===0&&visit(u))break;return {hasCycle:witness.length>0,witness,trace,parent,color};}
const api={graph,representation,bfs,dfs,components,cycles};root.DsaGraphs=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
