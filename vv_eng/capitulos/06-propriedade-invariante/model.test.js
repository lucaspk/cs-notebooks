const {sorted}=require('./model.js');
const {describe,it}=require('node:test');
const assert=require('node:assert');
describe('vv06',()=>{it('s',()=>assert.ok(sorted([3,1,2])));});
