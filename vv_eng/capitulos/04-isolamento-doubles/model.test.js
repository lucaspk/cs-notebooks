const {iso}=require('./model.js');
const {describe,it}=require('node:test');
const assert=require('node:assert');
describe('vv04',()=>{it('i',()=>assert.ok(iso(false,true).isolated));});
