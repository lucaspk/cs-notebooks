(function(root){
'use strict';
function values(a){if(!Array.isArray(a)||a.length>32||a.some(x=>!Number.isFinite(x)))throw new Error('Use até 32 números finitos.');return a.slice();}
function recursive(a){
 a=values(a);const trace=[];let calls=0,depth=0;
 function sum(i){calls++;depth=Math.max(depth,i+1);trace.push(['entra',i,i+1,'aguarda retorno']);if(i===a.length){trace.push(['base',i,i+1,0]);return 0;}
 const rest=sum(i+1),r=a[i]+rest;if(!Number.isFinite(r))throw new Error('Soma fora do intervalo numérico.');trace.push(['retorna',i,i+1,`${a[i]} + ${rest} = ${r}`]);return r;}
 return {result:sum(0),calls,depth,trace};
}
function invariant(a,mode='correct'){
 a=values(a);if(!['correct','skip','bad-init'].includes(mode))throw new Error('Variante inválida.');
 let i=0,acc=mode==='bad-init'?1:0;const trace=[];
 function check(stage){let expected=0;for(let k=0;k<i;k++)expected+=a[k];if(!Number.isFinite(expected)||!Number.isFinite(acc))throw new Error('Soma fora do intervalo numérico.');const valid=acc===expected;trace.push([stage,i,acc,expected,a.length-i,valid?'preservado':'VIOLADO']);return valid;}
 let holds=check('inicialização');
 while(i<a.length){if(mode!=='skip'||i!==a.length-1)acc+=a[i];i++;holds=check('fronteira do laço')&&holds;}
 return {result:acc,valid:holds,trace};
}
function records(a){return values(a).map((key,id)=>({key,id}));}
function label(a){return a.map(x=>`${x.key}#${x.id}`).join(', ')||'∅';}
function insertion(a,ties='stable'){
 if(!['stable','reverse'].includes(ties))throw new Error('Critério inválido.');
 const r=records(a),trace=[];let comparisons=0,moves=0;
 for(let i=1;i<r.length;i++){const key=r[i];let j=i-1,shift=0;
 while(j>=0){comparisons++;if(!(r[j].key>key.key||(ties==='reverse'&&r[j].key===key.key)))break;r[j+1]=r[j];j--;moves++;shift++;}
 r[j+1]=key;trace.push([i,`${key.key}#${key.id}`,shift,label(r)]);}
 return {result:r,comparisons,moves,trace};
}
function merge(a){
 const r=records(a),aux=new Array(r.length),trace=[];let comparisons=0,writes=0,maxDepth=0;
 function sort(lo,hi,depth){maxDepth=Math.max(maxDepth,depth);if(hi-lo<=1)return;const mid=Math.floor((lo+hi)/2);sort(lo,mid,depth+1);sort(mid,hi,depth+1);
 let i=lo,j=mid,k=lo;while(i<mid&&j<hi){comparisons++;aux[k++]=r[i].key<=r[j].key?r[i++]:r[j++];writes++;}
 while(i<mid){aux[k++]=r[i++];writes++;}while(j<hi){aux[k++]=r[j++];writes++;}
 for(k=lo;k<hi;k++){r[k]=aux[k];writes++;}trace.push([`[${lo},${hi})`,mid,comparisons,label(r.slice(lo,hi))]);}
 sort(0,r.length,1);return {result:r,comparisons,writes,auxSlots:r.length,maxDepth,trace};
}
function quick(a,policy='last'){
 if(!['last','middle'].includes(policy))throw new Error('Pivô inválido.');
 const r=records(a),trace=[];let comparisons=0,swaps=0,maxDepth=0;
 function swap(i,j){if(i!==j){[r[i],r[j]]=[r[j],r[i]];swaps++;}}
 function sort(lo,hi,depth){if(lo>hi)return;maxDepth=Math.max(maxDepth,depth);if(lo===hi)return;
 const p=policy==='last'?hi:Math.floor((lo+hi)/2);swap(p,hi);const pivot=r[hi];let i=lo;
 for(let j=lo;j<hi;j++){comparisons++;if(r[j].key<=pivot.key){swap(i,j);i++;}}
 swap(i,hi);trace.push([`[${lo},${hi}]`,`${pivot.key}#${pivot.id}`,i,label(r.slice(lo,hi+1))]);sort(lo,i-1,depth+1);sort(i+1,hi,depth+1);}
 sort(0,r.length-1,1);return {result:r,comparisons,swaps,maxDepth,trace};
}
const api={recursive,invariant,insertion,merge,quick,label};root.DsaOrdering=api;
if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
