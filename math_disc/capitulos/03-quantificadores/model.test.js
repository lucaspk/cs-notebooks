const {quant}=require('./model.js');
const {describe,it}=require('node:test');
const assert=require('node:assert');
describe('03',()=>{it('all',()=>assert.strictEqual(quant([2,4,6],x=>x%2===0).all,true));});
