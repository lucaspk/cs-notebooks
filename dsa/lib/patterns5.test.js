'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),M=require('./patterns5.js');
function sequences(n,alphabet,fn,p=[]){fn(p);if(p.length===n)return;for(const x of alphabet)sequences(n,alphabet,fn,[...p,x]);}
test('subconjuntos: uso único contra máscaras, reutilização contra busca de somas',()=>{
 sequences(4,[1,2,3],a=>{for(let target=0;target<=12;target++){
  let possible=false;for(let mask=0;mask<2**a.length;mask++){let sum=0;for(let i=0;i<a.length;i++)if(mask&(1<<i))sum+=a[i];if(sum===target)possible=true;}
  assert.equal(M.subset(a.join(','),target).possible,possible);
  const reached=new Set([0]),q=[0];for(let h=0;h<q.length;h++)for(const w of a){const s=q[h]+w;if(s<=target&&!reached.has(s)){reached.add(s);q.push(s);}}
  assert.equal(M.subset(a.join(','),target,true).possible,reached.has(target));
 }});assert.equal(M.subset('3',6).possible,false);assert.equal(M.subset('3',6,true).possible,true);
});
function subsequences(s){let out=[''];for(const c of s)out=out.concat(out.map(t=>t+c));return new Set(out);}
test('LCS contra interseção de todas as subsequências e testemunha',()=>{
 const words=[];sequences(4,['a','b'],a=>words.push(a.join('')));
 for(const a of words)for(const b of words){const sa=subsequences(a),sb=subsequences(b),best=Math.max(...[...sa].filter(s=>sb.has(s)).map(s=>s.length)),r=M.lcs(a,b);assert.equal(r.length,best);assert.equal(r.sequence.length,best);assert.ok(sa.has(r.sequence)&&sb.has(r.sequence));}
 assert.equal(M.lcs('😀a','😀').length,1);assert.equal(M.lcs('ab','ba').sequence,'a');
});
test('trie contra palavras e conjunto explícito de prefixos',()=>{
 const universe=['a','ab','abc','b','ba'];for(let mask=0;mask<32;mask++){const words=universe.filter((_,i)=>mask&(1<<i)),prefix=new Set(['']);for(const w of words)for(let i=1;i<=w.length;i++)prefix.add(w.slice(0,i));for(const q of ['','a','ab','abc','abcd','b','ba','bb']){const r=M.trie(words.join(','),q);assert.equal(r.word,words.includes(q));assert.equal(r.prefix,prefix.has(q));assert.equal(r.nodes,prefix.size);}assert.equal(M.trie([...words,...words].join(','),'').nodes,prefix.size);}
 assert.equal(M.trie('casa,caso,cas','ca').nodes,6);
});
test('máscaras contra Set, inclusive fronteira de bit 30',()=>{
 sequences(4,[0,1,3,30],a=>{const set=new Set(a);for(const bit of [0,1,2,3,30]){const r=M.bits(a.join(','),bit),expected=[...set].reduce((s,x)=>s+2**x,0);assert.equal(r.mask,expected);assert.equal(r.has,set.has(bit));assert.equal(r.removed,expected-(set.has(bit)?2**bit:0));assert.equal(r.toggled,expected+(set.has(bit)?-(2**bit):2**bit));}});assert.equal(M.bits('1,3,3',3).xor,1);assert.equal(1<<32,1);
});
test('problema misto: contagem contra intervalos independentes, janela refutada',()=>{
 sequences(5,[-1,0,1],a=>{for(let target=-2;target<=2;target++){let count=0;for(let l=0;l<a.length;l++)for(let r=l+1;r<=a.length;r++)if(a.slice(l,r).reduce((s,x)=>s+x,0)===target)count++;assert.equal(M.mixed(a.join(','),target,'prefix').count,count);assert.equal(M.mixed(a.join(','),target,'brute').count,count);}});
 assert.equal(M.mixed('0,0',0,'window').count,2);assert.equal(M.mixed('1,-1,1',1,'window').count,2);
});
test('entrevista: propriedades de qualquer par e testes que capturam auto-reuso',()=>{
 sequences(4,[-1,0,1],a=>{for(let t=-2;t<=2;t++){const r=M.interview(a.join(','),t);assert.ok(r.trace.every(row=>row[3]==='passa'));}});
 const bug=M.interview('3',6,'insert-first');assert.deepEqual(bug.pair,[0,0]);assert.equal(bug.trace[1][3],'falha');assert.equal(bug.trace[2][3],'falha');
});
test('limites e contratos inválidos são rejeitados',()=>{
 for(const f of [()=>M.subset('0',1),()=>M.subset('-1',2),()=>M.subset('1',129),()=>M.subset('1',1,'yes'),()=>M.lcs('a'.repeat(25),''),()=>M.trie('Casa','ca'),()=>M.trie('a','á'),()=>M.bits('31',0),()=>M.bits('32',0),()=>M.bits('1',31),()=>M.mixed('',0,'unknown'),()=>M.interview('',0,'unknown')])assert.throws(f);
 assert.equal(M.subset('',0).possible,true);assert.equal(M.lcs('','').length,0);assert.equal(M.trie('','').prefix,true);assert.equal(M.mixed('',0).count,0);
});
