(function (root) {
  'use strict';

  const HEADER = {
    app: 0,
    transport: { udp: 8, tcp: 20 },
    network: 20,
    link: 14,
  };

  const ENCAP_ORDER = ['app', 'transport', 'network', 'link'];
  const HOP_ORDER = ['app', 'transport', 'network', 'link'];

  function buildFrame(payloadBytes, transport = 'udp') {
    const tHdr = HEADER.transport[transport] ?? HEADER.transport.udp;
    return {
      payloadBytes,
      transport,
      headers: {
        app: { bytes: HEADER.app, label: 'App (dados)' },
        transport: { bytes: tHdr, label: transport === 'tcp' ? 'TCP' : 'UDP' },
        network: { bytes: HEADER.network, label: 'IP' },
        link: { bytes: HEADER.link, label: 'Ethernet' },
      },
    };
  }

  function totalOnWire(frame) {
    return (
      frame.payloadBytes +
      frame.headers.transport.bytes +
      frame.headers.network.bytes +
      frame.headers.link.bytes
    );
  }

  function stepsEncapsulate(frame) {
    const layers = [];
    let running = frame.payloadBytes;
    layers.push({ phase: 'payload', layer: 'app', bytes: running, label: `${running} B dados` });
    for (const key of ['transport', 'network', 'link']) {
      running += frame.headers[key].bytes;
      layers.push({
        phase: 'add',
        layer: key,
        bytes: running,
        label: `+ ${frame.headers[key].label} (${frame.headers[key].bytes} B) → ${running} B no fio`,
      });
    }
    return layers;
  }

  function stepsAtRouter(frame) {
    return [
      { phase: 'strip', layer: 'link', label: 'Despacha Ethernet — roteador lê IP' },
      { phase: 'route', layer: 'network', label: 'Decisão por destino IP (não URL)' },
      { phase: 'add', layer: 'link', label: 'Nova camada Ethernet no próximo hop' },
    ];
  }

  function snapshot(frame, time) {
    const enc = stepsEncapsulate(frame);
    const total = enc.length;
    const t = Math.max(0, Math.min(Math.floor(time), total));
    const routerStart = total;
    const router = stepsAtRouter(frame);
    const allLen = total + router.length;
    if (t < total) {
      return { mode: 'encap', step: enc[t] || enc[0], time: t, total: allLen, onWire: enc[Math.min(t, enc.length - 1)]?.bytes ?? frame.payloadBytes };
    }
    const rt = t - total;
    return {
      mode: 'router',
      step: router[rt] || router[router.length - 1],
      time: t,
      total: allLen,
      onWire: t >= total + 2 ? totalOnWire(frame) : frame.payloadBytes + frame.headers.transport.bytes + frame.headers.network.bytes,
    };
  }

  const api = {
    buildFrame,
    totalOnWire,
    stepsEncapsulate,
    stepsAtRouter,
    snapshot,
    ENCAP_ORDER,
    HOP_ORDER,
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.EncapLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);