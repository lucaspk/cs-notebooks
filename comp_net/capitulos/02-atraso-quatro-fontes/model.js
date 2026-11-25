(function (root) {
  'use strict';

  const SPEED_KM_S = 200000;

  function msTransmission(packetBytes, linkMbps) {
    if (linkMbps <= 0) throw new RangeError('linkMbps deve ser positivo');
    const bits = packetBytes * 8;
    return (bits / (linkMbps * 1e6)) * 1000;
  }

  function msPropagation(oneWayKm) {
    if (oneWayKm < 0) throw new RangeError('distância inválida');
    return (oneWayKm / SPEED_KM_S) * 1000;
  }

  function dominantComponent(parts) {
    const order = [
      ['propagation', parts.propagation],
      ['transmission', parts.transmission],
      ['queue', parts.queue],
      ['processing', parts.processing],
    ];
    order.sort((a, b) => b[1] - a[1]);
    return order[0][0];
  }

  function computeDelays(opts) {
    const distanceKm = Number(opts?.distanceKm ?? 5000);
    const linkMbps = Number(opts?.linkMbps ?? 10);
    const packetBytes = Number(opts?.packetBytes ?? 1200);
    const queueMs = Number(opts?.queueMs ?? 0);
    const processMs = Number(opts?.processMs ?? 2);
    const propagation = msPropagation(distanceKm);
    const transmission = msTransmission(packetBytes, linkMbps);
    const oneWay =
      propagation + transmission + Math.max(0, queueMs) + Math.max(0, processMs);
    const parts = {
      propagation,
      transmission,
      queue: Math.max(0, queueMs),
      processing: Math.max(0, processMs),
      oneWay,
      rtt: 2 * oneWay,
    };
    parts.dominant = dominantComponent(parts);
    return parts;
  }

  function barWidths(parts) {
    const total = parts.oneWay || 1;
    return {
      propagation: (parts.propagation / total) * 100,
      transmission: (parts.transmission / total) * 100,
      queue: (parts.queue / total) * 100,
      processing: (parts.processing / total) * 100,
    };
  }

  const api = {
    SPEED_KM_S,
    msTransmission,
    msPropagation,
    computeDelays,
    dominantComponent,
    barWidths,
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.DelayLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);