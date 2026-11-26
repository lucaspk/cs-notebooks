(function(root){
 'use strict';
 const node=typeof module!=='undefined'&&module.exports;
 const P=node?require('./patterns.js'):root.DsaPatterns,G=node?require('./graphs.js'):root.DsaGraphs;
 function integer(v,min,max){const n=Number(v);if(String(v).trim()===''||!Number.isInteger(n)||n<min||n>max)throw new Error('Inteiro fora do intervalo permitido.');return n;}
 function subsets(text,target,prune=true){const a=P.values(text);if(a.length>12||a.some(v=>v<=0)||typeof prune!=='boolean')throw new Error('Até 12 valores positivos e opção de poda válida.');target=integer(target,0,1000000);const suffix=Array(a.length+1).fill(0);for(let i=a.length-1;i>=0;i--)suffix[i]=suffix[i+1]+a[i];const path=[],matches=[],trace=[];let calls=0,pruned=0;
  function visit(i,sum){calls++;if(prune&&(sum>target||sum+suffix[i]<target)){pruned++;trace.push(['Podar',i,sum,sum>target?'soma excedeu':'restante insuficiente']);return;}if(i===a.length){if(sum===target){matches.push(path.slice());trace.push(['Emitir',i,sum,path.join(', ')||'vazio']);}return;}path.push(i);trace.push(['Escolher',i,sum+a[i],path.join(', ')]);visit(i+1,sum+a[i]);path.pop();trace.push(['Restaurar / excluir',i,sum,path.join(', ')||'vazio']);visit(i+1,sum);}
  visit(0,0);return {a,matches,calls,pruned,trace};
 }
 function gridBfs(text){const rows=String(text).trim().split(';').map(r=>r.trim().split(/\s+/));if(rows.length>8||!rows[0].length||rows[0].length>8||rows.some(r=>r.length!==rows[0].length||r.some(v=>!['0','1','2'].includes(v))))throw new Error('Grade retangular até 8×8, células 0,1,2; linhas por ponto e vírgula.');const grid=rows.map(r=>r.map(Number)),h=grid.length,w=grid[0].length,dist=grid.map(r=>r.map(()=>null)),parent=grid.map(r=>r.map(()=>null)),queue=[],trace=[];
  for(let r=0;r<h;r++)for(let c=0;c<w;c++)if(grid[r][c]===2){dist[r][c]=0;queue.push([r,c]);trace.push(['Fonte',r,c,0]);}
  let scans=0;for(let head=0;head<queue.length;head++){const [r,c]=queue[head];for(const [dr,dc] of [[-1,0],[0,1],[1,0],[0,-1]]){scans++;const nr=r+dr,nc=c+dc;if(nr<0||nr>=h||nc<0||nc>=w||grid[nr][nc]===1||dist[nr][nc]!==null)continue;dist[nr][nc]=dist[r][c]+1;parent[nr][nc]=[r,c];queue.push([nr,nc]);trace.push(['Descobrir',nr,nc,dist[nr][nc]]);}}
  return {grid,dist,parent,scans,trace};
 }
 function dependencies(n,text,mode='dependencies'){n=integer(n,1,12);if(!['dependencies','components'].includes(mode))throw new Error('Escolha dependências ou componentes.');const g=G.graph(n,text,mode==='dependencies');if(g.edges.some(e=>e[2]!==1))throw new Error('Use ligações sem peso.');const trace=[];
  if(mode==='dependencies'){const indegree=Array(n).fill(0);for(const [,v] of g.edges)indegree[v]++;const q=[];for(let i=0;i<n;i++)if(!indegree[i])q.push(i);for(let h=0;h<q.length;h++){const u=q[h];trace.push(['Executar',u,h,'todos os pré-requisitos liberados']);for(const {to:v} of g.adj[u])if(--indegree[v]===0)q.push(v);}return {mode,ok:q.length===n,order:q,blocked:indegree.map((v,i)=>v?i:null).filter(v=>v!==null),trace};}
  const parent=Array.from({length:n},(_,i)=>i),size=Array(n).fill(1);let count=n;function find(v){while(parent[v]!==v){parent[v]=parent[parent[v]];v=parent[v];}return v;}for(const [u,v] of g.edges){let a=find(u),b=find(v);if(a!==b){if(size[a]<size[b])[a,b]=[b,a];parent[b]=a;size[a]+=size[b];count--;trace.push(['Unir',u,v,count+' componentes']);}else trace.push(['Já conectados',u,v,count+' componentes']);}const labels=parent.map((_,i)=>find(i));return {mode,labels,count,trace};
 }
 function intervals(text){const parts=String(text).trim()?String(text).split(','):[];if(parts.length>32)throw new Error('Até 32 intervalos.');return parts.map((p,id)=>{const a=P.values(p);if(a.length!==2||a[0]>=a[1])throw new Error('Use início fim com início<fim.');return {id,start:a[0],end:a[1]};});}
 function schedule(text){const a=intervals(text),sorted=a.slice().sort((x,y)=>x.end-y.end||x.start-y.start||x.id-y.id),selected=[],trace=[];let end=-Infinity;for(const x of sorted){if(x.start>=end){selected.push(x.id);end=x.end;trace.push(['Aceitar',x.id,x.start,x.end]);}else trace.push(['Rejeitar conflito',x.id,x.start,x.end]);}
  const shortest=[];for(const x of a.slice().sort((x,y)=>(x.end-x.start)-(y.end-y.start)||x.start-y.start||x.id-y.id)){if(shortest.every(id=>a[id].end<=x.start||x.end<=a[id].start))shortest.push(x.id);}
  return {intervals:a,selected,shortest,trace};
 }
 function nonAdjacent(text){const a=P.values(text),memo=Array(a.length+1),trace=[];let calls=0,computed=0;
  function solve(i){calls++;if(i<=0)return 0;if(memo[i]!==undefined)return memo[i];computed++;return memo[i]=Math.max(solve(i-1),solve(i-2)+a[i-1]);}
  const memoBest=solve(a.length),dp=Array(a.length+1).fill(0);for(let i=1;i<=a.length;i++){const skip=dp[i-1],take=(i>=2?dp[i-2]:0)+a[i-1];dp[i]=Math.max(skip,take);trace.push([i,skip,take,dp[i]]);}const selected=[];for(let i=a.length;i>0;)if(dp[i]===dp[i-1])i--;else{selected.push(i-1);i-=2;}selected.reverse();return {a,best:dp[a.length],memoBest,dp,selected,calls,computed,trace};
 }
 const api={subsets,gridBfs,dependencies,schedule,nonAdjacent};root.DsaPatterns4=api;if(node)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
