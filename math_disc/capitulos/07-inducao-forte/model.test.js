const {test}=require('node:test');
const assert=require('node:assert/strict');
const {postage}=require('./model.js');
test('19 uses base 15 and one additional stamp of 4',()=>{
 const r=postage(19);
 assert.deepEqual(r.stamps,[1,3]);
 assert.deepEqual(r.trace,['19 depende de 15','Base 15']);
});
