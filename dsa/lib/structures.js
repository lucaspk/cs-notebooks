(function(root){
'use strict';
function integer(n,min,max,label){if(!Number.isInteger(n)||n<min||n>max)throw new Error(label+': informe inteiro entre '+min+' e '+max+'.');return n;}
function values(a){if(!Array.isArray(a)||a.length>64||a.some(v=>!Number.isFinite(v)))throw new Error('Use até 64 números finitos.');}
function dynamic(count, policy='double'){
 integer(count,0,64,'Inserções');if(!['double','increment'].includes(policy))throw new Error('Política desconhecida.');
 let capacity=1,size=0,total=0,copies=0;const trace=[];
 for(let i=0;i<count;i++){
  let moved=0;const before=capacity;
  if(size===capacity){moved=size;capacity=policy==='double'?capacity*2:capacity+1;}
  size++;copies+=moved;total+=moved+1;trace.push([size,before,capacity,moved,moved+1,total]);
 }
 return {size,capacity,copies,writes:total,amortized:count?total/count:0,trace};
}
function linked(a,operation,index,value){
 values(a);if(!['insert','remove'].includes(operation))throw new Error('Operação desconhecida.');
 integer(index,0,operation==='insert'?a.length:a.length-1,'Índice');
 if(operation==='insert'&&(!Number.isFinite(value)||a.length===64))throw new Error('Inserção exige valor finito e espaço no limite de 64 nós.');
 let head=null;const nodes=[];let nextId=0;
 for(const v of a){const node={id:'N'+nextId++,value:v,next:null};nodes.push(node);if(nodes.length>1)nodes[nodes.length-2].next=node;else head=node;}
 const before=nodes.map(n=>[n.id,n.value,n.next?n.next.id:'∅']);const trace=[];let prev=null,cursor=head,steps=0;
 for(let j=0;j<index;j++){prev=cursor;cursor=cursor.next;steps++;trace.push('Avançar para índice '+(j+1));}
 let removed;
 if(operation==='insert'){
  const node={id:'N'+nextId,value,next:cursor};trace.push(node.id+'.next = '+(cursor?cursor.id:'∅'));
  if(prev){prev.next=node;trace.push(prev.id+'.next = '+node.id);}else{head=node;trace.push('head = '+node.id);}
 }else{
  removed=cursor.value;
  if(prev){prev.next=cursor.next;trace.push(prev.id+'.next = '+(cursor.next?cursor.next.id:'∅'));}else{head=cursor.next;trace.push('head = '+(head?head.id:'∅'));}
  trace.push('Desvincular '+cursor.id);
 }
 const after=[];for(let node=head;node;node=node.next)after.push([node.id,node.value,node.next?node.next.id:'∅']);
 return {before,after,result:after.map(row=>row[1]),steps,removed,trace};
}
function delimiters(text){
 if(typeof text!=='string'||text.length>128)throw new Error('Use até 128 caracteres.');
 const stack=[],trace=[],pairs={')':'(',']':'[','}':'{'};let error=null;
 for(let i=0;i<text.length;i++){
  const c=text[i];let action='ignorar';
  if('([{'.includes(c)){stack.push(c);action='push '+c;}
  else if(')]}'.includes(c)){
   if(stack.length===0){error='Fechamento sem abertura no índice '+i;action='rejeitar: pilha vazia';}
   else if(stack[stack.length-1]!==pairs[c]){error='Tipo incompatível no índice '+i;action='rejeitar: topo '+stack[stack.length-1];}
   else action='pop '+stack.pop();
  }
  trace.push([i,c,action,stack.join(' ')||'∅']);if(error)break;
 }
 if(!error&&stack.length)error='Fim com aberturas pendentes.';
 return {valid:!error,error,stack:stack.slice(),trace};
}
function commands(text){
 if(typeof text!=='string')throw new Error('Informe comandos.');
 if(!text.trim())return [];
 const tokens=text.split(',').map(t=>t.trim());
 if(tokens.length>64||tokens.some(t=>!t))throw new Error('Use até 64 comandos não vazios.');
 return tokens.map(t=>{if(t==='-')return {kind:'take'};if(!/^\+\s*[^\s].*$/.test(t))throw new Error('Use +valor para inserir e - para retirar.');const value=Number(t.slice(1));if(!Number.isFinite(value))throw new Error('Valor deve ser finito.');return {kind:'put',value};});
}
function queue(capacity,text){
 integer(capacity,1,16,'Capacidade');const ops=commands(text),buffer=Array(capacity).fill(null),trace=[];
 let head=0,size=0;const removed=[];
 ops.forEach((op,i)=>{
  let action;
  if(op.kind==='put'){
   if(size===capacity)action='rejeitar: cheia';
   else{const tail=(head+size)%capacity;buffer[tail]=op.value;size++;action='inserir '+op.value+' em '+tail;}
  }else if(!size)action='rejeitar: vazia';
  else{const value=buffer[head];buffer[head]=null;head=(head+1)%capacity;size--;removed.push(value);action='retirar '+value;}
  trace.push([i+1,action,head,(head+size)%capacity,size,JSON.stringify(buffer)]);
 });
 const result=Array.from({length:size},(_,i)=>buffer[(head+i)%capacity]);
 return {buffer:buffer.slice(),head,tail:(head+size)%capacity,size,result,removed,trace};
}
function hash(keys,buckets,target){
 values(keys);integer(buckets,1,16,'Buckets');
 if(keys.some(k=>!Number.isSafeInteger(k))||!Number.isSafeInteger(target))throw new Error('Hash exige chaves inteiras seguras.');
 const table=Array.from({length:buckets},()=>[]),trace=[];let collisions=0,size=0;
 const slot=k=>((k%buckets)+buckets)%buckets;
 keys.forEach(k=>{const index=slot(k),chain=table[index];
  if(chain.includes(k)){trace.push([k,index,'duplicata: não inserir',chain.join(' → ')]);return;}
  const collision=chain.length>0;if(collision)collisions++;
  chain.push(k);size++;trace.push([k,index,collision?'colisão: encadear':'bucket vazio',chain.join(' → ')]);
 });
 const index=slot(target),chain=table[index];let comparisons=0,found=false;
 for(const key of chain){comparisons++;if(key===target){found=true;break;}}
 return {table,size,load:size/buckets,collisions,index,comparisons,found,trace};
}
const api={dynamic,linked,delimiters,queue,hash};root.DsaStructures=api;
if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
