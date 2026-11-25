(function (root) {
  'use strict';

  function getQueueApi() {
    if (typeof require !== 'undefined') {
      try {
        return require('../../lib/queue.js');
      } catch {
        /* browser bundle */
      }
    }
    if (root.NetQueue) return root.NetQueue;
    throw new Error('NetQueue não carregado');
  }

  /**
   * Simulação discreta: pacotes chegam a taxa fixa; saída a taxa fixa; fila finita; BER opcional no enlace.
   */
  function simulateLoss(opts) {
    const { createQueue, enqueue, dequeue } = getQueueApi();
    const arrivals = Math.max(1, Math.floor(opts?.arrivals ?? 40));
    const capacity = Math.max(1, Math.floor(opts?.queueCapacity ?? 8));
    const arrivalPerRound = Math.max(1, Math.floor(opts?.arrivalPerRound ?? 4));
    const serviceSlots = Math.max(1, Math.floor(opts?.serviceSlotsPerRound ?? 2));
    const linkBer = Math.min(1, Math.max(0, Number(opts?.linkBer ?? 0)));
    const seed = Math.floor(opts?.seed ?? 1);

    const q = createQueue(capacity);
    let droppedQueue = 0;
    let droppedLink = 0;
    let delivered = 0;
    let arrivalIdx = 0;
    const rounds = Math.ceil(arrivals / serviceSlots) + capacity + 2;

    function rnd(i) {
      const x = Math.sin(seed * 9301 + i * 49297) * 10000;
      return x - Math.floor(x);
    }

    for (let round = 0; round < rounds && (arrivalIdx < arrivals || q.items.length); round += 1) {
      const toEnq = Math.min(arrivalPerRound, arrivals - arrivalIdx);
      for (let k = 0; k < toEnq; k += 1) {
        const res = enqueue(q, { id: arrivalIdx + 1 });
        if (!res.accepted) droppedQueue += 1;
        arrivalIdx += 1;
      }
      for (let s = 0; s < serviceSlots; s += 1) {
        const out = dequeue(q);
        if (!out.item) break;
        if (rnd(out.item.id + round) < linkBer) droppedLink += 1;
        else delivered += 1;
      }
    }

    const attempted = arrivals;
    const deliveryRate = delivered / attempted;
    return {
      attempted,
      delivered,
      droppedQueue,
      droppedLink,
      deliveryRate,
      finalQueue: q.items.length,
    };
  }

  function classifyPrimaryLoss(result, linkBer) {
    if (linkBer > 0 && result.droppedLink >= result.droppedQueue && result.droppedLink > 0) {
      return 'link';
    }
    if (result.droppedQueue > 0) return 'queue';
    return 'none';
  }

  const api = { simulateLoss, classifyPrimaryLoss };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.LossLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);