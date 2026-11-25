const {aaa}=require('./model.js');
const {describe,it}=require('node:test');
const assert=require('node:assert');
describe('vv03',()=>{it('a',()=>assert.strictEqual(aaa('given_when_then').act,'when'));});
