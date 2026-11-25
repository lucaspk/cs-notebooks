const {review}=require('./model.js');
const {describe,it}=require('node:test');
const assert=require('node:assert');
describe('vv07',()=>{it('r',()=>assert.strictEqual(review({comportamento:1,teste:1}),2));});
