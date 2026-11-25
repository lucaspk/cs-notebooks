(function (root) {
  'use strict';

  function sanitizeLinks(linksMbps) {
    const arr = (linksMbps || []).map((x) => Number(x)).filter((x) => x > 0);
    if (!arr.length) throw new RangeError('pelo menos um enlace');
    return arr;
  }

  function bottleneckMbps(linksMbps) {
    const links = sanitizeLinks(linksMbps);
    const min = Math.min(...links);
    const index = links.indexOf(min);
    return { mbps: min, index, links };
  }

  /** Tempo para enviar todos os bits do arquivo pelo gargalo (ms). */
  function transferTimeMs(fileBytes, linksMbps) {
    const { mbps } = bottleneckMbps(linksMbps);
    const bits = fileBytes * 8;
    return (bits / (mbps * 1e6)) * 1000;
  }

  function snapAfterLink(fileBytes, linksMbps, linkIndex) {
    const { links } = bottleneckMbps(linksMbps);
    if (linkIndex < 0 || linkIndex >= links.length) throw new RangeError('índice inválido');
    const prefix = links.slice(0, linkIndex + 1);
    return transferTimeMs(fileBytes, prefix);
  }

  const api = { bottleneckMbps, transferTimeMs, snapAfterLink, sanitizeLinks };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ThroughputLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);