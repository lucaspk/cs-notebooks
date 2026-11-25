(function (root) {
  'use strict';

  const BROADCAST_MAC = 'ff:ff:ff:ff:ff:ff';

  function createLan(hosts) {
    const list = hosts.map((h) => ({
      id: h.id,
      mac: String(h.mac).toLowerCase(),
      label: h.label || h.id,
    }));
    const macs = new Set(list.map((h) => h.mac));
    if (macs.size !== list.length) throw new Error('MAC duplicado');
    return { hosts: list, broadcastMac: BROADCAST_MAC };
  }

  function recipients(lan, destMac, fromMac) {
    const dest = String(destMac).toLowerCase();
    if (dest === BROADCAST_MAC) {
      return lan.hosts.filter((h) => h.mac !== fromMac);
    }
    const one = lan.hosts.filter((h) => h.mac === dest);
    if (!one.length) return [];
    if (one[0].mac === fromMac) return [];
    return one;
  }

  function buildSendPlan(lan, fromId, destMac) {
    const from = lan.hosts.find((h) => h.id === fromId);
    if (!from) throw new RangeError('origem inválida');
    const dest = String(destMac).toLowerCase();
    const rcv = recipients(lan, dest, from.mac);
    const steps = [
      {
        id: 'compose',
        title: 'Host monta quadro Ethernet',
        body: `De ${from.mac} para ${dest === BROADCAST_MAC ? 'broadcast' : dest}`,
      },
      {
        id: 'wire',
        title: 'Enlace compartilhado',
        body: rcv.length
          ? `Quadro visto por ${rcv.length} interface(s) na LAN.`
          : 'Nenhum outro host aceita este destino.',
      },
    ];
    rcv.forEach((h) => {
      steps.push({
        id: `rx-${h.id}`,
        title: `${h.label} recebe`,
        body: dest === BROADCAST_MAC ? 'Broadcast — todas as NICs da LAN escutam.' : 'Unicast — só o MAC destino.',
        host: h.id,
      });
    });
    return { from, destMac: dest, recipients: rcv, steps, isBroadcast: dest === BROADCAST_MAC };
  }

  function snapshot(plan, time) {
    const t = Math.max(0, Math.min(Math.floor(time), plan.steps.length));
    return {
      time: t,
      total: plan.steps.length,
      done: t >= plan.steps.length,
      steps: plan.steps.slice(0, t),
      active: t < plan.steps.length ? plan.steps[t] : null,
    };
  }

  const api = { BROADCAST_MAC, createLan, recipients, buildSendPlan, snapshot };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.EthernetLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);