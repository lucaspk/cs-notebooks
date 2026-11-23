(function (root) {
  'use strict';

  const TASKS = ['A', 'B'];

  function createLivelockSchedule(useBackoff) {
    const steps = [];
    let aPos = 0;
    let bPos = 0;
    const goal = 5;
    let aYield = 0;
    let bYield = 0;
    let guard = 0;

    while ((aPos < goal || bPos < goal) && guard++ < 80) {
      const collision = aPos === bPos && aPos < goal && bPos < goal;
      if (collision) {
        if (useBackoff) {
          if (aYield <= bYield) {
            aPos++;
            aYield = 0;
            bYield++;
          } else {
            bPos++;
            bYield = 0;
            aYield++;
          }
        } else {
          if (aPos > 0) aPos--;
          if (bPos > 0) bPos--;
          aYield++;
          bYield++;
        }
      } else {
        if (aPos < goal) aPos++;
        if (bPos < goal) bPos++;
      }
      const progress = (aPos + bPos) / (2 * goal);
      steps.push({
        aPos,
        bPos,
        collision,
        aYield,
        bYield,
        usefulWork: aPos + bPos,
      });
      if (!useBackoff && aYield > 12 && aPos <= 1 && bPos <= 1) break;
    }

    const done = aPos >= goal && bPos >= goal;
    return { steps, duration: steps.length, useBackoff: Boolean(useBackoff), done, goal };
  }

  function snapshot(schedule, time) {
    const elapsed = Math.max(0, Math.min(Math.floor(time), schedule.steps.length));
    const step = elapsed > 0 ? schedule.steps[elapsed - 1] : null;
    return {
      aPos: step?.aPos ?? 0,
      bPos: step?.bPos ?? 0,
      collision: step?.collision ?? false,
      yields: (step?.aYield ?? 0) + (step?.bYield ?? 0),
      done: schedule.done && elapsed === schedule.steps.length,
      elapsed,
    };
  }

  const api = { TASKS, createLivelockSchedule, snapshot };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.LivelockLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);