const {state}=require('./model.js');
const {describe,it}=require('node:test');
const assert=require('node:assert');
describe('vv05',()=>{it('g',()=>assert.strictEqual(state(true,true),'green'));});
