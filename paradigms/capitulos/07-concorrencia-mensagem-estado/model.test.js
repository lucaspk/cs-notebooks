'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert');
const { compare } = require('./model.js');

describe('cap 07 concorrência modelo', () => {
  it('mesmo contador final', () => {
    const r = compare(3);
    assert.ok(r.sameFinal);
    assert.strictEqual(r.shared.final, 3);
  });
});
it('overlapped reads lose one update per round; serial order does not',()=>{
 const {schedule}=require('./model.js');
 const overlapped=schedule(3,true),serial=schedule(3,false);
 assert.strictEqual(overlapped.shared,3);
 assert.strictEqual(overlapped.messages,6);
 assert.strictEqual(serial.shared,6);
 assert.strictEqual(serial.messages,6);
 assert.throws(()=>schedule(0,true),RangeError);
});
