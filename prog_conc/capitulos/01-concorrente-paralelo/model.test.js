'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createSchedules, snapshot } = require('./model.js');

test('todos os tamanhos e alternâncias da interface preservam trabalho e capacidade dos núcleos', () => {
  for (let work = 2; work <= 8; work++) {
    for (let quantum = 1; quantum <= 3; quantum++) {
      const schedules = createSchedules(work, quantum);
      assert.equal(schedules.duration, 2 * work);
      assert.equal(schedules.parallel.length, work);
      for (const [mode, capacity] of [['concurrent', 1], ['parallel', 2]]) {
        const schedule = schedules[mode];
        assert.ok(schedule.every(tick => tick.length === capacity && new Set(tick).size === capacity));
        assert.equal(schedule.flat().filter(task => task === 'A').length, work);
        assert.equal(schedule.flat().filter(task => task === 'B').length, work);
        let previous = { A: 0, B: 0 };
        for (let time = 0; time <= schedules.duration; time++) {
          const view = snapshot(schedule, time, work);
          assert.equal(view.done, time >= schedule.length);
          for (const task of ['A', 'B']) {
            assert.ok(view.progress[task] >= previous[task] && view.progress[task] <= work);
          }
          assert.equal(view.progress.A + view.progress.B, Math.min(time, schedule.length) * capacity);
          if (view.done) {
            assert.deepEqual(view.active, []);
            assert.deepEqual(view.state, { A: 'Concluída', B: 'Concluída' });
          }
          previous = view.progress;
        }
      }
    }
  }
});

test('a alternância muda a ordem sem mudar o tempo total e trata o último lote menor', () => {
  assert.deepEqual(createSchedules(4, 3).concurrent.flat(), ['A', 'A', 'A', 'B', 'B', 'B', 'A', 'B']);
  assert.deepEqual(createSchedules(2, 3).concurrent.flat(), ['A', 'A', 'B', 'B']);
});

test('o primeiro passo mostra alternância versus simultaneidade e reiniciar zera o progresso', () => {
  const schedules = createSchedules(6, 1);
  assert.deepEqual(snapshot(schedules.concurrent, 1, 6).progress, { A: 1, B: 0 });
  assert.deepEqual(snapshot(schedules.parallel, 1, 6).progress, { A: 1, B: 1 });
  assert.deepEqual(snapshot(schedules.concurrent, 0, 6).state, { A: 'Pronta', B: 'Pronta' });
  assert.deepEqual(snapshot(schedules.parallel, 0, 6).progress, { A: 0, B: 0 });
});
