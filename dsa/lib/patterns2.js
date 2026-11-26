(function(root){
 'use strict';
 const P=typeof module!=='undefined'&&module.exports?require('./patterns.js'):root.DsaPatterns;
 function integer(v,min,max,label){const n=Number(v);if(String(v).trim()===''||!Number.isInteger(n)||n<min||n>max)throw new Error(label+' inválido.');return n;}
 function mergeIntervals(text,mode='closed'){
  if(!['closed','half-open'].includes(mode))throw new Error('Convenção inválida.');
  const parts=String(text).trim()?String(text).split(','):[];if(parts.length>64)throw new Error('Até 64 intervalos.');
  const intervals=parts.map(p=>{const a=P.values(p);if(a.length!==2||a[0]>a[1]||(mode==='half-open'&&a[0]===a[1]))throw new Error('Use pares início fim, não vazios e válidos.');return a;}).sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
  const merged=[],trace=[];
  for(const [l,r] of intervals){const last=merged[merged.length-1];const overlap=last&&(mode==='closed'?l<=last[1]:l<last[1]);if(overlap){last[1]=Math.max(last[1],r);trace.push(['Mesclar',l,r,last.join(' .. ')]);}else{merged.push([l,r]);trace.push(['Novo bloco',l,r,l+' .. '+r]);}}
  return {intervals,merged,trace};
 }
 function shipping(text,days){const a=P.values(text);if(!a.length||a.some(v=>v<=0))throw new Error('Use pesos positivos e sequência não vazia.');days=integer(days,1,64,'Dias');
  function required(cap){let used=1,load=0;for(const w of a){if(load+w>cap){used++;load=0;}load+=w;}return used;}
  let lo=Math.max(...a),hi=a.reduce((s,v)=>s+v,0);const trace=[];
  while(lo<hi){const mid=lo+Math.floor((hi-lo)/2),need=required(mid);trace.push([lo,hi,mid,need+' dias: '+(need<=days?'viável':'inviável')]);if(need<=days)hi=mid;else lo=mid+1;}
  const loads=[];let sum=0;for(const w of a){if(sum+w>lo){loads.push(sum);sum=0;}sum+=w;}loads.push(sum);
  return {a,capacity:lo,loads,trace};
 }
 function floyd(text,entry=-1){const a=P.values(text),n=a.length;entry=integer(entry,-1,n-1,'Entrada do ciclo');const next=a.map((_,i)=>i+1<n?i+1:entry<0?null:entry);let slow=n?0:null,fast=slow,meeting=null;const trace=[];
  while(fast!==null&&next[fast]!==null){slow=next[slow];fast=next[next[fast]];trace.push(['Detecção',slow,fast,'1 / 2 passos']);if(slow===fast){meeting=slow;break;}}
  let cycleEntry=null,middle=null;
  if(meeting!==null){let p=0,q=meeting;while(p!==q){trace.push(['Localizar entrada',p,q,'1 / 1 passo']);p=next[p];q=next[q];}cycleEntry=p;trace.push(['Entrada',p,q,'mesmo nó']);}else{middle=slow;trace.push(['Sem ciclo',middle,fast,'meio direito se par']);}
  return {a,next,meeting,cycleEntry,middle,trace};
 }
 function reverseSegment(text,left,right){const a=P.values(text),n=a.length;left=integer(left,0,n-1,'Início');right=integer(right,left,n-1,'Fim');const next=a.map((_,i)=>i+1<n?i+1:null);let head=0,before=left===0?null:left-1,cur=left,prev=right+1<n?right+1:null;const trace=[];
  for(let pos=left;pos<=right;pos++){const saved=next[cur];next[cur]=prev;trace.push([cur,saved,prev,'salvar → inverter → avançar']);prev=cur;cur=saved;}
  if(before===null)head=prev;else next[before]=prev;const order=[];for(let p=head;p!==null;p=next[p])order.push(p);
  return {a,next,head,order,values:order.map(i=>a[i]),trace};
 }
 function nextGreater(text){const a=P.values(text),stack=[],answer=a.map(()=>null),trace=[];let pushes=0,pops=0;
  for(let j=0;j<a.length;j++){while(stack.length&&a[stack[stack.length-1]]<a[j]){const i=stack.pop();pops++;answer[i]=j;trace.push(['Resolver',i,j,a[j]]);}stack.push(j);pushes++;trace.push(['Empilhar',j,a[j],stack.join(', ')]);}
  return {a,answer,pushes,pops,trace};
 }
 const api={mergeIntervals,shipping,floyd,reverseSegment,nextGreater};root.DsaPatterns2=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
