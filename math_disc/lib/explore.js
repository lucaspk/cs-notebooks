(function(root) {
  'use strict';
  const D = typeof module !== 'undefined' && module.exports ? require('./discrete.js') : root.DiscreteLab;
  const integer = (n, max = 100) => {
    const k = Number(n);
    if (!Number.isInteger(k) || k < 0 || k > max) throw new RangeError('Use inteiro entre 0 e ' + max + '.');
    return k;
  };
  function numbers(text) {
    const parts = String(text).trim().split(/[\s,;]+/).filter(Boolean);
    const list = parts.map(Number);
    if (list.length > 100 || list.some(n => !Number.isFinite(n))) throw new RangeError('Use até 100 números finitos separados por espaço.');
    return list;
  }
  function equivalent(kind) {
    return D.truthTableBinary((p,q) => D.evalConnective(p,q,'IMP')).map(row => {
      const right = kind === 'contra' ? (!(!row.q) || !row.p) : kind === 'converse' ? (!row.q || row.p) : (!row.p || row.q);
      return [row.p ? 'V' : 'F', row.q ? 'V' : 'F', row.out ? 'V' : 'F', right ? 'V' : 'F', row.out === right ? 'igual' : 'difere'];
    });
  }
  function relation(text, domainText) {
    const domain = [...new Set(String(domainText).trim().split(/[\s,;]+/).filter(Boolean))];
    const pairs = String(text).trim().split(/[\s,;]+/).filter(Boolean).map(token => {
      const p = token.split(':');
      if (p.length !== 2 || p.some(x => !x)) throw new RangeError('Pares no formato 1:a separados por espaço.');
      if (!domain.includes(p[0])) throw new RangeError('Entrada fora do domínio: ' + p[0]);
      return p;
    });
    const missing = domain.filter(x => !pairs.some(p => p[0] === x));
    return { unique: D.isFunction(pairs), missing, valid: D.isFunction(pairs) && missing.length === 0 };
  }
  function induction(n) {
    const k = integer(n, 50);
    let sum = 0;
    const trace = [];
    for (let i=1;i<=k;i++) { sum += i; trace.push(i + ' → ' + sum); }
    return { sum, formula: D.sum1toN(k), step: D.sum1toN(k) + k + 1, next: D.sum1toN(k+1), trace };
  }
  // Strong induction example: postage of 4 or 5 units, with bases 12..15.
  function postage(n) {
    const k = integer(n, 100);
    const trace = [];
    function decompose(x) {
      if (x < 12) return null;
      if (x <= 15) {
        const bases = {12:[3,0],13:[2,1],14:[1,2],15:[0,3]};
        trace.push('Base ' + x);
        return bases[x];
      }
      trace.push(x + ' depende de ' + (x-4));
      const result = decompose(x-4);
      return result && [result[0]+1, result[1]];
    }
    return { n:k, stamps:decompose(k), trace };
  }
  function graph(edges, from, to) {
    const adj = Object.create(null);
    const list = String(edges).trim().split(/[\s,;]+/).filter(Boolean);
    for (const edge of list) {
      const p=edge.split('>');
      if (p.length!==2 || p.some(x=>!x)) throw new RangeError('Use arestas a>b separadas por espaço.');
      (adj[p[0]] ||= []).push(p[1]); adj[p[1]] ||= [];
    }
    if (!from || !to) throw new RangeError('Informe origem e destino.');
    adj[from] ||= []; adj[to] ||= [];
    return { reachable:D.hasPath(adj,from,to), vertices:Object.keys(adj), edges:list.length };
  }
  function count(length, alphabet, repeat) {
    const l=integer(length,12), a=integer(alphabet,36);
    let product=1n;
    for (let i=0;i<l;i++) product*=BigInt(repeat ? a : Math.max(0,a-i));
    return product<=BigInt(Number.MAX_SAFE_INTEGER) ? Number(product) : product;
  }
  const api={...D, integer, numbers, equivalent, relation, induction, postage, graph, count};
  if (typeof module !== 'undefined' && module.exports) module.exports=api;
  else root.DiscreteExplore=api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
