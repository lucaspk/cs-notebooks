'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { prevents, matrix, demoSchedule, snapshot, LEVELS, ANOMALIES } = require('./model.js');

test('matriz cobre todos os pares nível × anomalia', () => {
  const rows = matrix();
  assert.equal(rows.length, ANOMALIES.length);
  for (const row of rows) {
    for (const level of LEVELS) assert.equal(typeof row.levels[level], 'boolean');
  }
});

test('serializable previne write skew; read uncommitted não previne dirty read', () => {
  assert.equal(prevents('serializable', 'write-skew'), true);
  assert.equal(prevents('read-uncommitted', 'dirty-read'), false);
  assert.equal(prevents('read-committed', 'dirty-read'), true);
});

test('snapshot de demonstração marca prevenção', () => {
  const blocked = snapshot('repeatable-read', 'non-repeatable-read', 3);
  assert.equal(blocked.prevented, true);
  const open = snapshot('read-committed', 'phantom-read', 3);
  assert.equal(open.prevented, false);
  assert.equal(demoSchedule('lost-update').length, 3);
});