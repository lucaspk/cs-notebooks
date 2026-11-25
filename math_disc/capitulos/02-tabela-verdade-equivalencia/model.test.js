const {rows,implies}=require('./model.js');
const {describe,it}=require('node:test');
const assert=require('node:assert');
describe('02',()=>{it('imp',()=>assert.strictEqual(implies(true,false),false));});
