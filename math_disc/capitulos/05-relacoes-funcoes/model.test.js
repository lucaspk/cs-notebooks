const {isFn}=require('./model.js');
const {describe,it}=require('node:test');
const assert=require('node:assert');
describe('05',()=>{it('fn',()=>assert.strictEqual(isFn([[1,'a'],[2,'b']]),true));});
