const {test}=require('node:test');
const assert=require('node:assert/strict');
const V=require('./explore.js');
test('pyramid cost is illustrative and empty suite has no implied coverage',()=>{
 assert.equal(V.counts(5,3,20).cost,420);
 assert.equal(V.counts(5,3,2).cost,60);
 assert.deepEqual(V.counts(0,0,0),{total:0,percentages:[0,0,0],cost:0});
 assert.throws(()=>V.counts(-1,0,0),RangeError);
});
test('AAA assertion can fail independently of the operation',()=>{
 assert.equal(V.aaaCase(10,5,15).passed,true);
 assert.equal(V.aaaCase(10,5,14).passed,false);
 assert.equal(V.aaaCase(10,5,14).actual,15);
});
test('red must precede green and refactor follows green',()=>{
 assert.equal(V.tdd(['green']).valid,false);
 assert.equal(V.tdd(['red','refactor']).valid,false);
 assert.equal(V.tdd(['red','green','refactor']).phase,'refactor');
 assert.equal(V.tdd([]).phase,'sem teste');
});
test('multiplicity property catches a bug that sortedness misses',()=>{
 const r=V.sortCase('3 1 1 2','drop');
 assert.equal(r.ordered,true);assert.equal(r.preserved,false);
 assert.equal(V.sortCase('3 1 2','drop').passed,true);
 assert.equal(V.sortCase('1 1','drop').passed,false);
 assert.equal(V.sortCase('1 2','reverse').ordered,false);
 assert.equal(V.sortCase('','correct').passed,true);
 assert.throws(()=>V.sortCase('3 abc','correct'),RangeError);
});
