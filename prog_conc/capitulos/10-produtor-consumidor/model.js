(function (root) {
  'use strict';

  function createBufferSchedule(bufferSize, totalItems, sync) {
    if (!Number.isInteger(bufferSize) || bufferSize < 1) throw new RangeError('Tamanho do buffer inválido.');
    if (!Number.isInteger(totalItems) || totalItems < 1) throw new RangeError('Total de itens inválido.');

    let buffer = 0;
    let produced = 0;
    let consumed = 0;
    let overflows = 0;
    const ticks = [];
    let producerBlockedTicks = 0;

    let tick = 0;
    while (consumed < totalItems) {
      let producerAction = 'idle';
      let consumerAction = 'idle';

      if (produced < totalItems) {
        if (sync && buffer >= bufferSize) {
          producerAction = 'blocked';
          producerBlockedTicks++;
        } else {
          produced++;
          buffer++;
          producerAction = 'produce';
          if (!sync && buffer > bufferSize) overflows++;
        }
      }

      if (consumed < totalItems) {
        const canConsume = buffer > 0 && (sync || tick % 2 === 1);
        if (canConsume) {
          buffer--;
          consumed++;
          consumerAction = 'consume';
        } else if (buffer === 0 && sync && produced <= consumed) {
          consumerAction = 'blocked';
        }
      }
      tick++;

      ticks.push({
        buffer: Math.max(0, buffer),
        produced,
        consumed,
        producerAction,
        consumerAction,
        overflows,
        overCapacity: !sync && buffer > bufferSize,
      });
    }

    return {
      ticks,
      duration: ticks.length,
      bufferSize,
      totalItems,
      sync: Boolean(sync),
      overflowTotal: overflows,
      producerBlockedTicks,
    };
  }

  function snapshot(schedule, time) {
    const elapsed = Math.max(0, Math.min(Math.floor(time), schedule.ticks.length));
    const tick = elapsed > 0 ? schedule.ticks[elapsed - 1] : null;
    const done = elapsed === schedule.ticks.length;
    return {
      buffer: tick?.buffer ?? 0,
      produced: tick?.produced ?? 0,
      consumed: tick?.consumed ?? 0,
      producerAction: tick?.producerAction ?? 'idle',
      consumerAction: tick?.consumerAction ?? 'idle',
      overCapacity: tick?.overCapacity ?? false,
      done,
      elapsed,
      overflows: tick?.overflows ?? 0,
    };
  }

  const api = { createBufferSchedule, snapshot };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ProducerConsumerLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);