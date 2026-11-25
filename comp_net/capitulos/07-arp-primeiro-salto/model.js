(function (root) {
  'use strict';

  const BROADCAST_MAC = 'ff:ff:ff:ff:ff:ff';

  function createSubnet(hosts, prefix = '10.0.0.') {
    return hosts.map((h) => ({
      id: h.id,
      ip: h.ip || `${prefix}${h.hostOctet ?? 1}`,
      mac: String(h.mac).toLowerCase(),
      label: h.label || h.id,
    }));
  }

  function sameSubnet(ipA, ipB, prefix = '10.0.0.') {
    return String(ipA).startsWith(prefix) && String(ipB).startsWith(prefix);
  }

  function lookupMac(hosts, ip) {
    return hosts.find((h) => h.ip === ip)?.mac ?? null;
  }

  function buildArpPlan(hosts, srcId, destIp, cache) {
    const src = hosts.find((h) => h.id === srcId);
    if (!src) throw new RangeError('origem inválida');
    const destMacDirect = lookupMac(hosts, destIp);
    if (!sameSubnet(src.ip, destIp)) {
      return {
        destIp,
        viaGateway: true,
        steps: [
          {
            id: 'off-subnet',
            title: 'Fora da sub-rede local',
            body: 'ARP resolve próximo hop (gateway) — cap. 09 aprofunda.',
          },
        ],
        cacheHit: false,
      };
    }
    const key = `${src.id}:${destIp}`;
    if (cache[key]) {
      return {
        destIp,
        destMac: cache[key],
        steps: [
          {
            id: 'hit',
            title: 'Cache ARP',
            body: `Já conhece ${destIp} → ${cache[key]}; sem broadcast.`,
          },
        ],
        cacheHit: true,
      };
    }
    const target = hosts.find((h) => h.ip === destIp);
    if (!target) {
      return {
        destIp,
        steps: [{ id: 'miss-host', title: 'Sem resposta', body: 'Ninguém com esse IP na LAN modelo.' }],
        cacheHit: false,
      };
    }
    const steps = [
      {
        id: 'need',
        title: `${src.label} precisa do MAC`,
        body: `Tem IP ${destIp}, quadro Ethernet exige MAC destino.`,
      },
      {
        id: 'request',
        title: 'ARP Request (broadcast)',
        body: `“Quem tem ${destIp}?” → destino MAC ${BROADCAST_MAC}`,
        broadcast: true,
      },
      {
        id: 'reply',
        title: 'ARP Reply (unicast)',
        body: `${target.label} responde ${target.mac} só para ${src.mac}`,
        learnedMac: target.mac,
      },
      {
        id: 'ready',
        title: 'Próximo quadro IP',
        body: `Unicast Ethernet para ${target.mac}.`,
        learnedMac: target.mac,
      },
    ];
    return { destIp, destMac: target.mac, steps, cacheHit: false, cacheKey: key };
  }

  function applyCache(plan, cache) {
    if (plan.cacheKey && plan.destMac && !plan.cacheHit) {
      cache[plan.cacheKey] = plan.destMac;
    }
    return { ...cache };
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

  const api = {
    BROADCAST_MAC,
    createSubnet,
    sameSubnet,
    buildArpPlan,
    applyCache,
    snapshot,
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ArpLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);