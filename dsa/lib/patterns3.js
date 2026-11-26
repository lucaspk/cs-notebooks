(function(root){
 'use strict';
 const P=typeof module!=='undefined'&&module.exports?require('./patterns.js'):root.DsaPatterns;
 function integer(v,min,max){const n=Number(v);if(String(v).trim()===''||!Number.isInteger(n)||n<min||n>max)throw new Error('Inteiro fora do intervalo permitido.');return n;}
 function windowMax(text,k){const a=P.values(text);k=integer(k,1,a.length);const q=Array(k),answer=[],indices=[],trace=[];let head=0,size=0,pushes=0,pops=0;
  for(let j=0;j<a.length;j++){while(size&&q[head]<=j-k){trace.push(['Expirar',q[head],j,'fora da janela']);head=(head+1)%k;size--;pops++;}while(size&&a[q[(head+size-1)%k]]<=a[j]){const i=q[(head+size-1)%k];size--;pops++;trace.push(['Dominar',i,j,'novo é >= e mais recente']);}q[(head+size)%k]=j;size++;pushes++;if(j>=k-1){const i=q[head];indices.push(i);answer.push(a[i]);trace.push(['Máximo',j-k+1,j,i+' : '+a[i]]);}}
  return {a,answer,indices,pushes,pops,trace};
 }
 function heap(better){const a=[];return {a,push(x){a.push(x);let i=a.length-1;while(i){const p=Math.floor((i-1)/2);if(!better(a[i],a[p]))break;[a[i],a[p]]=[a[p],a[i]];i=p;}},pop(){if(!a.length)return null;const first=a[0],last=a.pop();if(a.length){a[0]=last;let i=0;while(i*2+1<a.length){let c=i*2+1;if(c+1<a.length&&better(a[c+1],a[c]))c++;if(!better(a[c],a[i]))break;[a[c],a[i]]=[a[i],a[c]];i=c;}}return first;}};}
 function topK(text,k){const a=P.values(text);k=integer(k,1,64);const h=heap((x,y)=>x<y),trace=[];
  for(let i=0;i<a.length;i++){const x=a[i];let action;if(h.a.length<k){h.push(x);action='Inserir';}else if(x>h.a[0]){h.pop();h.push(x);action='Substituir mínimo';}else action='Descartar';trace.push([i,x,action,h.a.join(', ')]);}
  const result=h.a.slice(),sorted=[];while(h.a.length)sorted.push(h.pop());sorted.reverse();return {a,result,sorted,trace};
 }
 function medians(text){const a=P.values(text),low=heap((x,y)=>x>y),high=heap((x,y)=>x<y),answer=[],snapshots=[],trace=[];
  for(let i=0;i<a.length;i++){const x=a[i];if(!low.a.length||x<=low.a[0])low.push(x);else high.push(x);if(low.a.length>high.a.length+1)high.push(low.pop());else if(high.a.length>low.a.length)low.push(high.pop());const m=low.a.length===high.a.length?(low.a[0]+high.a[0])/2:low.a[0];answer.push(m);snapshots.push({low:low.a.slice(),high:high.a.slice()});trace.push([i,x,low.a.join(', ')+' | '+high.a.join(', '),m]);}
  return {a,answer,snapshots,trace};
 }
 function tree(text){const tokens=String(text).trim()?String(text).split(',').map(t=>t.trim()):[];if(tokens.length>63)throw new Error('Até 63 posições.');const nodes=tokens.map(t=>t==='null'?null:integer(t,-1000000,1000000));for(let i=1;i<nodes.length;i++)if(nodes[i]!==null&&nodes[Math.floor((i-1)/2)]===null)throw new Error('Nó sem pai; use null nas posições ausentes.');return nodes;}
 function paths(text,target){const nodes=tree(text);target=integer(target,-1000000,1000000);const path=[],matches=[],trace=[];let visited=0;
  function dfs(i,sum){if(i>=nodes.length||nodes[i]===null)return;visited++;sum+=nodes[i];path.push(i);trace.push(['Entrar',i,sum,path.join(' → ')]);const left=2*i+1,right=left+1,isLeaf=(left>=nodes.length||nodes[left]===null)&&(right>=nodes.length||nodes[right]===null);if(isLeaf&&sum===target)matches.push(path.slice());dfs(left,sum);dfs(right,sum);path.pop();trace.push(['Restaurar',i,sum-nodes[i],path.join(' → ')||'vazio']);}
  dfs(0,0);return {nodes,matches,visited,trace};
 }
 function diameter(text){const nodes=tree(text),trace=[],heights=nodes.map(()=>null);let best=0,visited=0;
  function dfs(i){if(i>=nodes.length||nodes[i]===null)return 0;visited++;const l=dfs(2*i+1),r=dfs(2*i+2);best=Math.max(best,l+r);const h=1+Math.max(l,r);heights[i]=h;trace.push([i,l,r,'altura '+h+' / diâmetro '+best]);return h;}
  const height=dfs(0);return {nodes,height,heights,diameter:best,visited,trace};
 }
 const api={windowMax,topK,medians,tree,paths,diameter};root.DsaPatterns3=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
