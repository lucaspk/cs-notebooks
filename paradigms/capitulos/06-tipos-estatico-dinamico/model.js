(function (root) {
  'use strict';

  function checkStatic(value, type) {
    const t = typeof value;
    if (type === 'number') return t === 'number' && Number.isFinite(value);
    if (type === 'string') return t === 'string';
    return t === type;
  }

  function addHoursStatic(scheduled, hours) {
    if (!checkStatic(scheduled, 'string')) return { ok: false, error: 'horário deve ser string' };
    if (!checkStatic(hours, 'number')) return { ok: false, error: 'horas deve ser number' };
    return { ok: true, result: `${scheduled}+${hours}h` };
  }

  function addHoursDynamic(scheduled, hours) {
    return { ok: true, result: `${scheduled}+${hours}h` };
  }

  function scenario(kind, scheduled, hours) {
    const fn = kind === 'static' ? addHoursStatic : addHoursDynamic;
    return { kind, ...fn(scheduled, hours) };
  }

  const api = { scenario, addHoursStatic, addHoursDynamic };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.TypesLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);