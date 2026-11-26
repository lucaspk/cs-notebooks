'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert');
const { scoreChoice } = require('./model.js');

describe('cap 08 escolher paradigma', () => {
  it('alta conc favorece mensagens', () => {
    const r = scoreChoice({ mudanca: 3, equipe: 3, conc: 5, express: 3 });
    assert.strictEqual(r.top.style, 'mensagens / atores');
  });
});
it('low concurrency changes ranking under the declared heuristic',()=>{
 const r=scoreChoice({mudanca:3,equipe:3,conc:1,express:3});
 assert.strictEqual(r.top.style,'imperativo local');
 assert.strictEqual(r.top.score,8);
});
