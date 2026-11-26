(function(root){
  'use strict';
  const api = typeof module !== 'undefined' && module.exports ? require('../../lib/patterns4.js') : root.DsaPatterns4;
  root.DsaLab = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
