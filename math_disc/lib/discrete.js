(function(root) {
'use strict';

function evalConnective(p, q, op) {
  if (op === 'AND') return p && q;
  if (op === 'OR') return p || q;
  if (op === 'IMP') return !p || q;
  throw new RangeError('op');
}

function truthTableBinary(fn) {
  const rows = [];
  for (const p of [false, true]) {
    for (const q of [false, true]) {
      rows.push({ p, q, out: fn(p, q) });
    }
  }
  return rows;
}

function forallExists(domain, pred) {
  const all = domain.every(pred);
  const exists = domain.some(pred);
  return { all, exists };
}

function setOps(A, B) {
  const a = new Set(A);
  const b = new Set(B);
  const union = [...new Set([...a, ...b])].sort();
  const inter = [...a].filter((x) => b.has(x)).sort();
  return { union, inter };
}

function isFunction(rel) {
  const seen = new Map();
  for (const [d, r] of rel) {
    if (seen.has(d) && seen.get(d) !== r) return false;
    seen.set(d, r);
  }
  return true;
}

function sum1toN(n) {
  const k = Math.floor(Number(n));
  return (k * (k + 1)) / 2;
}

function inductiveSumProof(n) {
  const k = Math.floor(Number(n));
  return { base: sum1toN(1) === 1, stepOk: sum1toN(k) + (k + 1) === sum1toN(k + 1) };
}

function fibStrong(n) {
  const k = Math.max(0, Math.floor(Number(n)));
  if (k <= 1) return k;
  let a = 0;
  let b = 1;
  for (let i = 2; i <= k; i += 1) {
    const t = a + b;
    a = b;
    b = t;
  }
  return b;
}

function hasPath(adj, from, to) {
  const stack = [from];
  const seen = new Set();
  while (stack.length) {
    const v = stack.pop();
    if (v === to) return true;
    if (seen.has(v)) continue;
    seen.add(v);
    for (const nxt of adj[v] || []) stack.push(nxt);
  }
  return false;
}

function countPassword(length, alphabet) {
  const l = Math.floor(Number(length));
  const a = Math.floor(Number(alphabet));
  return Math.pow(a, l);
}

const api = {
  evalConnective,
  truthTableBinary,
  forallExists,
  setOps,
  isFunction,
  sum1toN,
  inductiveSumProof,
  fibStrong,
  hasPath,
  countPassword,
};
if (typeof module !== 'undefined' && module.exports) module.exports = api;
else root.DiscreteLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
