(function(root){
  'use strict';
  const api = typeof module !== 'undefined' && module.exports ? require('../../lib/patterns3.js') : root.DsaPatterns3;
  root.DsaLab = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
