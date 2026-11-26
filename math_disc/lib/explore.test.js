const {test}=require('node:test');
const assert=require('node:assert/strict');
const D=require('./explore.js');
test('truth-table equivalences and converse counterexamples cover all rows',()=>{
 assert.ok(D.equivalent('rewrite').every(r=>r[4]==='igual'));
 assert.ok(D.equivalent('contra').every(r=>r[4]==='igual'));
 assert.equal(D.equivalent('converse').filter(r=>r[4]==='difere').length,2);
 assert.equal(D.evalConnective(true,false,'IMP'),false);
});
test('domain parsing, empty quantifiers and set multiplicity',()=>{
 assert.deepEqual(D.numbers(''),[]);
 assert.throws(()=>D.numbers('1 x'),RangeError);
 assert.throws(()=>D.numbers('Infinity'),RangeError);
 assert.deepEqual(D.forallExists([],x=>x>0),{all:true,exists:false});
 assert.deepEqual(D.setOps([1,1,2],[2,3]),{union:[1,2,3],inter:[2]});
});
test('function requires declared coverage and unique result, not distinct outputs',()=>{
 assert.equal(D.relation('1:a 2:a','1 2').valid,true);
 assert.equal(D.relation('1:a','1 2').valid,false);
 assert.equal(D.relation('1:a 1:b 2:a','1 2').valid,false);
 assert.equal(D.relation('1:a 1:a','1').valid,true);
 assert.throws(()=>D.relation('3:a','1 2'),RangeError);
 assert.throws(()=>D.relation('1:a:b','1'),RangeError);
});
test('strong induction reaches a valid base and reconstructs every postage amount 12..100',()=>{
 for(let n=12;n<=100;n++){
  const r=D.postage(n);
  assert.equal(4*r.stamps[0]+5*r.stamps[1],n);
  assert.match(r.trace.at(-1),/^Base 1[2-5]$/);
 }
 assert.equal(D.postage(8).stamps,null);
 assert.throws(()=>D.postage(12.5),RangeError);
});
test('sum example compares iterative sum with formula and successor',()=>{
 for(let n=0;n<=50;n++){
  const r=D.induction(n);assert.equal(r.sum,r.formula);assert.equal(r.step,r.next);
 }
 assert.throws(()=>D.induction(-1),RangeError);
});
test('direction and cycles do not imply a reverse path',()=>{
 assert.equal(D.graph('a>b b>c','c','a').reachable,false);
 assert.equal(D.graph('a>b b>c c>a','c','b').reachable,true);
 assert.equal(D.graph('','a','a').reachable,true);
 assert.throws(()=>D.graph('a-b','a','b'),RangeError);
});
test('count handles repetition, insufficient symbols and empty word',()=>{
 assert.equal(D.count(3,4,true),64);assert.equal(D.count(3,4,false),24);
 assert.equal(D.count(5,4,false),0);assert.equal(D.count(0,0,false),1);
 assert.throws(()=>D.count(-1,4,true),RangeError);
});

test('large combinatorial counts remain exact and arbitrary vertex names work',()=>{
 assert.equal(D.count(12,36,true),36n**12n);
 assert.equal(D.graph('constructor>__proto__','constructor','__proto__').reachable,true);
});
