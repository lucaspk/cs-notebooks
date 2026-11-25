const {evalConnective}=require('./model.js');
const {describe,it}=require('node:test');
const assert=require('node:assert');
describe('01',()=>{it('and',()=>assert.strictEqual(evalConnective(true,false,'AND'),false));});