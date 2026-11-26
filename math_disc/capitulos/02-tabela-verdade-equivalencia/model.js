(function(root) {
  'use strict';
  const domain = typeof module !== 'undefined' && module.exports
    ? require('../../lib/explore.js') : root.DiscreteExplore;
  const api = { ...domain, rows:domain.truthTableBinary, implies:(p,q)=>domain.evalConnective(p,q,'IMP') };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.MathLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
