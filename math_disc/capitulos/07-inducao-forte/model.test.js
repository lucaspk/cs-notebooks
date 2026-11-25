const {step}=require('./model.js');
const {describe,it}=require('node:test');
const assert=require('node:assert');
describe('07',()=>{it('s',()=>assert.ok(step(3)));});
