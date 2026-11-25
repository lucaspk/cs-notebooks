(function (root) {
  'use strict';

  const BROADCAST_MAC = 'ff:ff:ff:ff:ff:ff';

  function createSwitch(portHosts) {
    const ports = portHosts.map((p) => ({
      port: p.port,
      id: p.id,
      mac: String(p.mac).toLowerCase(),
      label: p.label || p.id,
    }));
    return { ports, table: {} };
  }

  function learn(table, mac, port) {
    const m = String(mac).toLowerCase();
    if (m === BROADCAST_MAC) return { ...table };
    return { ...table, [m]: port };
  }

  function egressForDest(state, ingressPort, destMac) {
    const dest = String(destMac).toLowerCase();
    if (dest === BROADCAST_MAC) {
      return { egress: state.ports.map((p) => p.port).filter((p) => p !== ingressPort), flood: true };
    }
    const out = state.table[dest];
    if (out === undefined) {
      return {
        egress: state.ports.map((p) => p.port).filter((p) => p !== ingressPort),
        flood: true,
      };
    }
    if (out === ingressPort) return { egress: [], flood: false };
    return { egress: [out], flood: false };
  }

  function forwardFrame(state, { ingressPort, srcMac, destMac, label }) {
    const tableAfterLearn = learn(state.table, srcMac, ingressPort);
    const nextState = { ...state, table: tableAfterLearn };
    const { egress, flood } = egressForDest(nextState, ingressPort, destMac);
    const mode = flood ? 'flood' : egress.length === 1 ? 'unicast' : 'local';
    return {
      state: nextState,
      ingressPort,
      egressPorts: egress,
      mode,
      step: {
        title: label || `Quadro ${srcMac} → ${destMac}`,
        body:
          mode === 'flood'
            ? `Destino desconhecido ou broadcast — repete nas portas ${egress.join(', ') || '—'}.`
            : mode === 'unicast'
              ? `Tabela aponta porta ${egress[0]} — só ela transmite.`
              : 'Destino na mesma porta — não repete.',
        mode,
      },
    };
  }

  function runLessonScenario() {
    const hosts = [
      { port: 1, id: 'A', mac: 'aa:01', label: 'A' },
      { port: 2, id: 'B', mac: 'aa:02', label: 'B' },
      { port: 3, id: 'C', mac: 'aa:03', label: 'C' },
    ];
    let state = createSwitch(hosts);
    const frames = [
      { ingressPort: 1, srcMac: 'aa:01', destMac: 'aa:02', label: '1º quadro A→B (MAC B desconhecido)' },
      { ingressPort: 2, srcMac: 'aa:02', destMac: 'aa:01', label: 'B responde (aprende B na p2)' },
      { ingressPort: 1, srcMac: 'aa:01', destMac: 'aa:02', label: '2º quadro A→B (B conhecido)' },
    ];
    const log = [];
    for (const frame of frames) {
      const res = forwardFrame(state, frame);
      state = res.state;
      log.push(res);
    }
    return { hosts, log, finalState: state };
  }

  const api = {
    BROADCAST_MAC,
    createSwitch,
    learn,
    egressForDest,
    forwardFrame,
    runLessonScenario,
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SwitchLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);