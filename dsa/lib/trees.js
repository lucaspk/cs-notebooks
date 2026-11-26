(function(root){
'use strict';
function integer(n,min,max){if(!Number.isInteger(n)||n<min||n>max)throw new Error(`Use inteiro entre ${min} e ${max}.`);}
function numbers(a){if(!Array.isArray(a)||a.length>32||Array.from(a).some(x=>!Number.isFinite(x)))throw new Error('Use até 32 números finitos.');return a.slice();}
function bound(n){integer(n,0,100);let permutations=1n;for(let i=2;i<=n;i++)permutations*=BigInt(i);let leaves=1n,comparisons=0;while(leaves<permutations){leaves*=2n;comparisons++;}return {permutations:permutations.toString(),comparisons,leaves:leaves.toString()};}
function tree(a){let root=null;for(const key of numbers(a)){let node=root,parent=null;while(node){parent=node;if(key===node.key)break;node=key<node.key?node.left:node.right;}if(node)continue;const fresh={key,left:null,right:null};if(!parent)root=fresh;else if(key<parent.key)parent.left=fresh;else parent.right=fresh;}return root;}
function inorder(node){return node?[...inorder(node.left),node.key,...inorder(node.right)]:[];}
function height(node){return node?1+Math.max(height(node.left),height(node.right)):0;}
function rows(node,path='raiz'){return node?[[path,node.key,node.left?node.left.key:'∅',node.right?node.right.key:'∅'],...rows(node.left,path+'.E'),...rows(node.right,path+'.D')]:[];}
function bst(a,target,operation='search'){
 if(!Number.isFinite(target))throw new Error('Alvo finito obrigatório.');if(!['search','insert','remove'].includes(operation))throw new Error('Operação inválida.');
 let root=tree(a),before=rows(root),trace=[],comparisons=0,found=false;
 function visit(node){if(!node){trace.push(['∅','ausente']);return null;}comparisons++;trace.push([node.key,target===node.key?'igual':target<node.key?'esquerda':'direita']);if(target===node.key)found=true;return node;}
 if(operation==='search'){let n=root;while(visit(n)){if(found)break;n=target<n.key?n.left:n.right;}}
 if(operation==='insert'){function add(n){if(!visit(n))return {key:target,left:null,right:null};if(target<n.key)n.left=add(n.left);else if(target>n.key)n.right=add(n.right);return n;}root=add(root);}
 if(operation==='remove'){function remove(n){if(!visit(n))return null;if(target<n.key)n.left=remove(n.left);else if(target>n.key)n.right=remove(n.right);else{if(!n.left)return n.right;if(!n.right)return n.left;let parent=n,s=n.right;while(s.left){trace.push([s.key,'sucessor: esquerda']);parent=s;s=s.left;}trace.push([s.key,'sucessor escolhido']);n.key=s.key;if(parent===n)parent.right=s.right;else parent.left=s.right;}return n;}root=remove(root);}
 return {before,after:rows(root),result:inorder(root),height:height(root),trace,comparisons,found};
}
function rotate(a,pivot,direction='right'){
 if(!Number.isFinite(pivot)||!['left','right'].includes(direction))throw new Error('Pivô/direção inválido.');
 let root=tree(a);const before=rows(root),order=inorder(root),beforeHeight=height(root);let parent=null,node=root;
 while(node&&node.key!==pivot){parent=node;node=pivot<node.key?node.left:node.right;}
 if(!node)throw new Error('Pivô ausente.');const child=direction==='right'?node.left:node.right;if(!child)throw new Error('Rotação exige filho na direção escolhida.');
 if(direction==='right'){node.left=child.right;child.right=node;}else{node.right=child.left;child.left=node;}
 if(!parent)root=child;else if(parent.left===node)parent.left=child;else parent.right=child;
 return {before,after:rows(root),order,result:inorder(root),beforeHeight,height:height(root)};
}
function heap(a,extract=0){
 a=numbers(a);integer(extract,0,32);const h=[],trace=[],removed=[];let comparisons=0;
 function swap(i,j){[h[i],h[j]]=[h[j],h[i]];trace.push(['troca',`${i} ↔ ${j}`,h.join(', ')]);}
 for(const x of a){h.push(x);trace.push(['insere',x,h.join(', ')]);let i=h.length-1;while(i>0){const p=Math.floor((i-1)/2);comparisons++;if(h[p]<=h[i])break;swap(p,i);i=p;}}
 for(let k=0;k<extract;k++){if(!h.length){trace.push(['retirada','rejeitada: vazio','∅']);break;}const min=h[0],last=h.pop();removed.push(min);if(h.length){h[0]=last;let i=0;while(2*i+1<h.length){let child=2*i+1;if(child+1<h.length){comparisons++;if(h[child+1]<h[child])child++;}comparisons++;if(h[i]<=h[child])break;swap(i,child);i=child;}}trace.push(['retira',min,h.join(', ')||'∅']);}
 return {result:h,removed,comparisons,trace};
}
function unionFind(n,commands,compress=true){
 integer(n,1,16);if(typeof commands!=='string'||typeof compress!=='boolean')throw new Error('Comandos/opção inválidos.');const ops=commands.trim()?commands.split(',').map(x=>x.trim()):[];if(ops.length>64)throw new Error('Até 64 comandos.');
 const parent=Array.from({length:n},(_,i)=>i),size=Array(n).fill(1),trace=[],answers=[];let steps=0,components=n;
 function find(x){const path=[];let r=x;while(parent[r]!==r){path.push(r);r=parent[r];steps++;}if(compress)for(const v of path)parent[v]=r;return r;}
 for(const op of ops){const m=/^([ufq])\s+(\d+)(?:\s+(\d+))?$/.exec(op);if(!m||((m[1]==='f')!==(m[3]===undefined)))throw new Error('Use u a b, q a b ou f a, separados por vírgula.');const a=Number(m[2]);integer(a,0,n-1);let answer;
 if(m[1]==='f')answer=find(a);else{const b=Number(m[3]);integer(b,0,n-1);let ra=find(a),rb=find(b);if(m[1]==='q'){answer=ra===rb;answers.push(answer);}else if(ra===rb)answer='já unidos';else{if(size[ra]<size[rb])[ra,rb]=[rb,ra];parent[rb]=ra;size[ra]+=size[rb];components--;answer=`raiz ${ra}`;}}
 trace.push([op,String(answer),parent.join(', '),components,steps]);}
 return {parent,size,components,steps,answers,trace};
}
const api={bound,bst,rotate,heap,unionFind};root.DsaTrees=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
