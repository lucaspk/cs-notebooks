const {path}=require('./model.js');
const {describe,it}=require('node:test');
const assert=require('node:assert');
describe('08',()=>{it('p',()=>assert.ok(path({a:['b'],b:['c']},'a','c')));});
