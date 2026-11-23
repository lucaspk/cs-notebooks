'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { runToctou, SCENARIOS } = require('./model.js');

test('TOCTOU permite duas ocupações com uma vaga', () => {
  assert.equal(runToctou(SCENARIOS.safe).bothAssigned, false);
  assert.equal(runToctou(SCENARIOS.toctou).bothAssigned, true);
});