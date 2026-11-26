'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert');
const { scenario } = require('./model.js');

describe('cap 06 tipos', () => {
  it('estático rejeita horas string', () => {
    const r = scenario('static', '10:00', '2');
    assert.ok(!r.ok);
  });
  it('dinâmico aceita e concatena', () => {
    const r = scenario('dynamic', '10:00', '2');
    assert.ok(r.ok);
    assert.match(r.result, /10:00\+2h/);
  });
});
it('number conversion satisfies type contract but not time semantics',()=>{
 assert.ok(scenario('static','not-a-time',2).ok);
 assert.ok(!scenario('static','10:00',Infinity).ok);
});
