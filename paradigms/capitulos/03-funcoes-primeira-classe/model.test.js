'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert');
const { applyPipeline } = require('./model.js');

describe('cap 03 primeira classe', () => {
  it('pipeline double+inc', () => {
    const r = applyPipeline([1, -2], ['double', 'inc']);
    assert.deepStrictEqual(r.result, [3, -3]);
  });
});
it('order is observable for the same functions',()=>{
 assert.deepStrictEqual(applyPipeline([1,-2,3],['inc','double']).result,[4,-2,8]);
 assert.deepStrictEqual(applyPipeline([-2],['inc','abs']).result,[1]);
 assert.deepStrictEqual(applyPipeline([-2],['abs','inc']).result,[3]);
});
it('rejects a nonfinite value instead of propagating invalid output',()=>{
 assert.throws(()=>applyPipeline([Infinity],['inc']),RangeError);
});
