'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { runLessonScenario, forwardFrame, createSwitch } = require('./model.js');

test('primeiro quadro faz flood; segundo unicast após aprender', () => {
  const { log, finalState } = runLessonScenario();
  assert.equal(log[0].mode, 'flood');
  assert.equal(log[2].mode, 'unicast');
  assert.equal(finalState.table['aa:02'], 2);
});

test('aprende MAC de origem na porta de entrada', () => {
  let state = createSwitch([
    { port: 1, id: 'A', mac: 'aa:01' },
    { port: 2, id: 'B', mac: 'aa:02' },
  ]);
  const res = forwardFrame(state, {
    ingressPort: 1,
    srcMac: 'aa:01',
    destMac: 'ff:ff:ff:ff:ff:ff',
    label: 'test',
  });
  assert.equal(res.state.table['aa:01'], 1);
  assert.equal(res.mode, 'flood');
  assert.deepEqual(res.egressPorts.sort(), [2]);
});