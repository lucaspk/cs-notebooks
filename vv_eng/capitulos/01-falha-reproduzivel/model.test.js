const {score}=require('./model.js');
const {describe,it}=require('node:test');
const assert=require('node:assert');
describe('vv01',()=>{it('s',()=>assert.strictEqual(score({sintoma:1,passos:1}),2));});
