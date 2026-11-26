(function(root){
 'use strict';
 function values(text){
  if(/(^|,)\s*(,|$)/.test(String(text))&&String(text).trim())throw new Error('Há um valor vazio entre separadores.');
  const tokens=String(text).trim()?String(text).trim().split(/[\s,]+/):[];
  if(tokens.length>64)throw new Error('Use até 64 inteiros.');
  return tokens.map(t=>{if(!/^-?\d+$/.test(t)||Math.abs(Number(t))>1000000)throw new Error('Use inteiros entre −1000000 e 1000000.');return Number(t);});
 }
 function integer(value,min,max,label){const n=Number(value);if(String(value).trim()===''||!Number.isInteger(n)||n<min||n>max)throw new Error(label+' inválido.');return n;}
 function target(value){return integer(value,-1000000,1000000,'Alvo');}
 function hashPair(text,t){const a=values(text);t=target(t);const seen=new Map(),trace=[];let pair=null;
  for(let j=0;j<a.length;j++){const c=t-a[j],i=seen.get(c);trace.push([j,a[j],c,i===undefined?'ausente':'índice '+i]);if(i!==undefined){pair=[i,j];break;}if(!seen.has(a[j]))seen.set(a[j],j);}
  return {a,pair,trace};
 }
 function twoPointers(text,t){const a=values(text);t=target(t);if(a.some((v,i)=>i&&v<a[i-1]))throw new Error('Entrada deve estar ordenada.');let l=0,r=a.length-1,pair=null;const trace=[];
  while(l<r){const sum=a[l]+a[r];trace.push([l,r,sum,sum===t?'encontrou':sum<t?'avance esquerda':'recue direita']);if(sum===t){pair=[l,r];break;}if(sum<t)l++;else r--;}
  return {a,pair,trace};
 }
 function fixedWindow(text,k){const a=values(text);k=integer(k,1,a.length,'Tamanho da janela');let sum=0,best=-Infinity,start=0;const trace=[];
  for(let r=0;r<a.length;r++){sum+=a[r];if(r>=k)sum-=a[r-k];if(r>=k-1){const l=r-k+1;if(sum>best){best=sum;start=l;}trace.push([l,r,sum,best]);}}
  return {a,best,start,end:start+k-1,trace};
 }
 function variableWindow(text,t){const a=values(text);t=integer(t,1,1000000,'Limiar positivo');if(a.some(v=>v<0))throw new Error('Janela variável exige valores não negativos.');let l=0,sum=0,best=null;const trace=[];
  for(let r=0;r<a.length;r++){sum+=a[r];trace.push(['Expandir',l,r,sum]);while(sum>=t&&l<=r){if(best===null||r-l+1<best.length)best={start:l,end:r,length:r-l+1};trace.push(['Registrar e contrair',l,r,sum]);sum-=a[l++];}}
  return {a,best,trace};
 }
 function prefixHash(text,t){const a=values(text);t=target(t);let prefix=0,count=0;const frequencies=new Map([[0,1]]),trace=[];
  for(let j=0;j<a.length;j++){prefix+=a[j];const needed=prefix-t,matches=frequencies.get(needed)||0;count+=matches;trace.push([j,prefix,needed,matches+' / total '+count]);frequencies.set(prefix,(frequencies.get(prefix)||0)+1);}
  return {a,count,prefix,trace};
 }
 const api={values,hashPair,twoPointers,fixedWindow,variableWindow,prefixHash};root.DsaPatterns=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
