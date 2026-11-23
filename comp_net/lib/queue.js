(function (root) {
  'use strict';

  /**
   * Fila FIFO com capacidade fixa (caps. 02–03). Itens descartados contam em `dropped`.
   * @param {number} capacity
   */
  function createQueue(capacity) {
    if (!Number.isInteger(capacity) || capacity < 1) {
      throw new RangeError('capacity deve ser inteiro positivo.');
    }
    return { capacity, items: [], dropped: 0, accepted: 0 };
  }

  function enqueue(q, item) {
    if (!q || !Array.isArray(q.items)) throw new TypeError('fila inválida');
    if (q.items.length >= q.capacity) {
      q.dropped += 1;
      return { accepted: false, size: q.items.length, dropped: q.dropped };
    }
    q.items.push(item);
    q.accepted += 1;
    return { accepted: true, size: q.items.length, dropped: q.dropped };
  }

  function dequeue(q) {
    if (!q.items.length) return { item: null, size: 0 };
    const item = q.items.shift();
    return { item, size: q.items.length };
  }

  function occupancy(q) {
    return q.items.length / q.capacity;
  }

  const api = { createQueue, enqueue, dequeue, occupancy };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.NetQueue = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);