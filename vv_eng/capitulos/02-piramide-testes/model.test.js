const {advice}=require('./model.js');
const {describe,it}=require('node:test');
const assert=require('node:assert');
describe('vv02',()=>{it('h',()=>assert.match(advice(5,3,20).hint,/e2e/));});
