(function (root) {
  'use strict';
  function integer(value, min, max, label) {
    if (!Number.isInteger(value) || value < min || value > max) throw new Error(label + ': informe inteiro entre ' + min + ' e ' + max + '.');
    return value;
  }
  function numbers(text) {
    if (typeof text !== 'string') throw new Error('Informe uma sequência numérica.');
    if (!text.trim()) return [];
    const parts = text.split(',');
    if (parts.length > 64 || parts.some(p => !p.trim() || !Number.isFinite(Number(p)))) throw new Error('Use até 64 números finitos separados por vírgula.');
    return parts.map(Number);
  }
  function array(values) {
    if (!Array.isArray(values) || values.length > 64 || values.some(v => !Number.isFinite(v))) throw new Error('Use até 64 números finitos.');
  }
  function finite(value) { if (!Number.isFinite(value)) throw new Error('O valor deve ser um número finito.'); }
  function sum(values) {
    array(values); let total = 0;
    const trace = values.map((value, i) => { total += value; if (!Number.isFinite(total)) throw new Error('Soma excede o intervalo numérico.'); return [i, value, total]; });
    return { total, additions: values.length, reads: values.length, trace };
  }
  function growth(n) {
    integer(n, 1, 1048576, 'n');
    let steps = 0;
    for (let size = n; size > 1; size = Math.floor(size / 2)) steps++;
    return { n, constant: 1, logarithmic: steps, linear: n, quadratic: n * n };
  }
  function vector(values, operation, index, value) {
    array(values);
    if (!['read', 'insert', 'remove'].includes(operation)) throw new Error('Operação desconhecida.');
    integer(index, 0, operation === 'insert' ? values.length : values.length - 1, 'Índice');
    const result = values.slice(); const trace = [];
    if (operation === 'read') return { result, value: result[index], moves: 0, writes: 0, trace: [[index, result[index], 'ler']] };
    if (operation === 'insert') {
      finite(value);
      if (values.length === 64) throw new Error('Limite didático: 64 elementos.');
      for (let j = result.length; j > index; j--) { result[j] = result[j - 1]; trace.push([j - 1, j, result[j]]); }
      result[index] = value;
      return { result, moves: trace.length, writes: trace.length + 1, trace };
    }
    const removed = result[index];
    for (let j = index; j < result.length - 1; j++) { result[j] = result[j + 1]; trace.push([j + 1, j, result[j]]); }
    result.pop();
    return { result, value: removed, moves: trace.length, writes: trace.length, trace };
  }
  function linear(values, target) {
    array(values); finite(target); const trace = [];
    for (let i = 0; i < values.length; i++) {
      trace.push([i, values[i], values[i] === target ? 'encontrou' : 'diferente']);
      if (values[i] === target) return { index: i, comparisons: trace.length, trace };
    }
    return { index: -1, comparisons: trace.length, trace };
  }
  function binary(values, target) {
    array(values); finite(target);
    if (values.some((value, i) => i && values[i - 1] > value)) throw new Error('Busca binária exige sequência ordenada em ordem crescente (não decrescente).');
    let lo = 0, hi = values.length - 1; const trace = [];
    while (lo <= hi) {
      const mid = lo + Math.floor((hi - lo) / 2);
      const decision = values[mid] === target ? 'encontrou' : values[mid] < target ? 'descartar esquerda e meio' : 'descartar direita e meio';
      trace.push([lo, hi, mid, values[mid], decision]);
      if (values[mid] === target) return { index: mid, probes: trace.length, trace };
      if (values[mid] < target) lo = mid + 1; else hi = mid - 1;
    }
    return { index: -1, probes: trace.length, trace };
  }
  const api = { numbers, sum, growth, vector, linear, binary };
  root.DsaFoundations = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
