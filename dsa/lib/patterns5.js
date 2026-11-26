(function(root){
 'use strict';
 const P=typeof module!=='undefined'&&module.exports?require('./patterns.js'):root.DsaPatterns;
 function integer(v,min,max){const n=Number(v);if(String(v).trim()===''||!Number.isInteger(n)||n<min||n>max)throw Error('Inteiro fora dos limites '+min+'..'+max);return n;}
 function subset(text,target,reuse=false){const a=P.values(text);if(a.length>16||a.some(x=>x<=0))throw Error('Use até 16 inteiros positivos.');target=integer(target,0,128);if(typeof reuse!=='boolean')throw Error('Modo inválido.');const dp=Array(target+1).fill(false),trace=[];dp[0]=true;
  a.forEach((w,i)=>{if(reuse){for(let s=w;s<=target;s++){const old=dp[s];dp[s]=dp[s]||dp[s-w];trace.push([i,s,dp[s-w],old+' → '+dp[s]]);}}else{for(let s=target;s>=w;s--){const old=dp[s];dp[s]=dp[s]||dp[s-w];trace.push([i,s,dp[s-w],old+' → '+dp[s]]);}}});return {a,dp,possible:dp[target],trace};}
 function lcs(first,second){const a=Array.from(String(first)),b=Array.from(String(second));if(a.length>24||b.length>24)throw Error('Até 24 pontos de código por sequência.');const dp=Array.from({length:a.length+1},()=>Array(b.length+1).fill(0)),trace=[];
  for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++){dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);trace.push([i,j,a[i-1]===b[j-1]?'diagonal + 1':'máximo cima/esquerda',dp[i][j]]);}
  let i=a.length,j=b.length,out=[];while(i&&j){if(a[i-1]===b[j-1]){out.push(a[--i]);j--;}else if(dp[i-1][j]>=dp[i][j-1])i--;else j--;}
  return {length:dp[a.length][b.length],sequence:out.reverse().join(''),dp,trace};}
 function trie(text,query){const words=String(text).trim()?String(text).trim().split(/[\s,]+/):[];query=String(query);if(words.length>32||words.some(w=>! /^[a-z]{1,16}$/.test(w))||! /^[a-z]{0,16}$/.test(query))throw Error('Até 32 palavras a-z, até 16 letras; consulta pode ser vazia.');const nodes=[{next:new Map(),end:false}],trace=[];
  for(const w of words){let id=0;for(const c of w){if(!nodes[id].next.has(c)){nodes[id].next.set(c,nodes.length);nodes.push({next:new Map(),end:false});}id=nodes[id].next.get(c);}nodes[id].end=true;}
  let id=0;for(const c of query){const next=nodes[id].next.get(c);trace.push([id,c,next===undefined?'ausente':next,'seguir prefixo']);if(next===undefined){id=-1;break;}id=next;}
  return {word:id>=0&&nodes[id].end,prefix:id>=0,nodes:nodes.length,trace};}
 function bits(text,bit){const a=P.values(text);if(a.some(x=>x<0||x>30))throw Error('IDs entre 0 e 30.');bit=integer(bit,0,30);let mask=0,xor=0;const trace=[];for(const x of a){mask|=1<<x;xor^=x;trace.push([x,mask,mask.toString(2),xor]);}return {mask,xor,has:(mask&(1<<bit))!==0,toggled:mask^(1<<bit),removed:mask&~(1<<bit),trace};}
 function mixed(text,target,strategy='prefix'){const a=P.values(text);target=integer(target,-1000000,1000000);if(!['prefix','brute','window'].includes(strategy))throw Error('Estratégia inválida.');let count=0,operations=0;const trace=[];
  if(strategy==='prefix'){const freq=new Map([[0,1]]);let sum=0;for(let j=0;j<a.length;j++){sum+=a[j];const hits=freq.get(sum-target)||0;count+=hits;trace.push([j,sum,hits,count]);freq.set(sum,(freq.get(sum)||0)+1);operations++;}}
  else if(strategy==='brute'){for(let i=0;i<a.length;i++){let sum=0;for(let j=i;j<a.length;j++){sum+=a[j];operations++;if(sum===target)count++;trace.push([i,j,sum,count]);}}}
  else {let left=0,sum=0;for(let right=0;right<a.length;right++){sum+=a[right];operations++;while(left<=right&&sum>target){sum-=a[left++];operations++;}if(left<=right&&sum===target)count++;trace.push([left,right,sum,count]);}}
  return {count,operations,trace,certified:strategy!=='window'};}
 function interview(text,target,variant='correct'){if(!['correct','insert-first'].includes(variant))throw Error('Variante inválida.');target=integer(target,-1000000,1000000);const a=P.values(text);
  function solve(values,t){const seen=new Map();for(let j=0;j<values.length;j++){if(variant==='insert-first')seen.set(values[j],j);if(seen.has(t-values[j]))return [seen.get(t-values[j]),j];if(!seen.has(values[j]))seen.set(values[j],j);}return null;}
  function verify(values,t,pair){let exists=false;for(let i=0;i<values.length;i++)for(let j=i+1;j<values.length;j++)if(values[i]+values[j]===t)exists=true;return pair===null?!exists:pair.length===2&&Number.isInteger(pair[0])&&Number.isInteger(pair[1])&&pair[0]>=0&&pair[0]<pair[1]&&pair[1]<values.length&&values[pair[0]]+values[pair[1]]===t;}
  const pair=solve(a,target),cases=[[[],0],[[3],6],[[3,3],6],[[-2,5,1],3],[[1,2],8],[a,target]];
  return {pair,trace:cases.map(([v,t])=>{const p=solve(v,t);return [JSON.stringify(v),t,JSON.stringify(p),verify(v,t,p)?'passa':'falha'];})};}
 const api={subset,lcs,trie,bits,mixed,interview};root.DsaPatterns5=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
