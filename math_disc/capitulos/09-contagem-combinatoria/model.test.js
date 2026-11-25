const {passwords}=require('./model.js');
const {describe,it}=require('node:test');
const assert=require('node:assert');
describe('09',()=>{it('p',()=>assert.strictEqual(passwords(2,10),100));});
