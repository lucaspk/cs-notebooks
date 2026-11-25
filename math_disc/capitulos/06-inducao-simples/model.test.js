const {sum}=require('./model.js');
const {describe,it}=require('node:test');
const assert=require('node:assert');
describe('06',()=>{it('10',()=>assert.strictEqual(sum(10),55));});
