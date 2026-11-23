(function (root) {
  'use strict';

  function payloadByteLength(text) {
    return new TextEncoder().encode(text).length;
  }

  const INTERPRET = {
    text: {
      label: 'texto',
      atB(message) {
        return { ok: true, summary: `Texto recebido: “${message}”` };
      },
    },
    json: {
      label: 'JSON',
      atB(message) {
        try {
          JSON.parse(message);
          return { ok: true, summary: 'JSON válido na aplicação B' };
        } catch {
          return { ok: false, summary: 'Erro na app B: bytes não são JSON válido' };
        }
      },
    },
    http: {
      label: 'HTTP',
      atB(message) {
        const ok = /^GET |^POST |^HEAD /i.test(message.trim());
        return ok
          ? { ok: true, summary: 'Linha de pedido HTTP reconhecida' }
          : { ok: false, summary: 'Erro na app B: não parece um pedido HTTP' };
      },
    },
  };

  function createDeliveryPlan(message) {
    const trimmed = String(message ?? '').trim();
    if (!trimmed) throw new RangeError('mensagem vazia');
    const bytes = payloadByteLength(trimmed);
    const steps = [
      {
        id: 'compose',
        layer: 'app',
        host: 'A',
        title: 'Aplicação em A',
        body: `Prepara: “${trimmed}”`,
        wire: null,
      },
      {
        id: 'handoff',
        layer: 'app',
        host: 'A',
        title: 'Entrega ao serviço de rede',
        body: 'Passa bytes ao socket; significado não vai “dentro do fio”.',
        wire: bytes,
      },
      {
        id: 'transit',
        layer: 'net',
        host: 'link',
        title: 'Enlace / rede',
        body: `Transporta datagrama opaco (${bytes} bytes).`,
        wire: bytes,
      },
      {
        id: 'socket',
        layer: 'net',
        host: 'B',
        title: 'Rede em B',
        body: 'Entrega os mesmos bytes ao socket de B.',
        wire: bytes,
      },
      {
        id: 'interpret',
        layer: 'app',
        host: 'B',
        title: 'Aplicação em B',
        body: '',
        wire: bytes,
      },
    ];
    return { message: trimmed, bytes, steps };
  }

  function snapshot(plan, time, interpretKey) {
    const mode = INTERPRET[interpretKey] || INTERPRET.text;
    const total = plan.steps.length;
    const t = Math.max(0, Math.min(Math.floor(time), total));
    const done = t >= total;
    const steps = plan.steps.slice(0, t).map((step) => {
      if (step.id !== 'interpret') return { ...step };
      const result = mode.atB(plan.message);
      return {
        ...step,
        body: result.summary,
        ok: result.ok,
      };
    });
    const active = t > 0 && !done ? { ...plan.steps[t - 1] } : null;
    const onWire = t >= 3 ? plan.bytes : t >= 2 ? plan.bytes : null;
    return { steps, active, done, time: t, total, bytesOnWire: onWire, mode: mode.label };
  }

  const api = {
    payloadByteLength,
    INTERPRET,
    createDeliveryPlan,
    snapshot,
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.EndpointsLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);