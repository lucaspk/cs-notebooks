const {ops}=require('./model.js');
const {describe,it}=require('node:test');
const assert=require('node:assert');
describe('04',()=>{it('u',()=>assert.deepStrictEqual(ops([1,2],[2,3]).inter,[2]));});
