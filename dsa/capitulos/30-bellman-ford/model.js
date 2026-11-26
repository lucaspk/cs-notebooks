(function(root){
  'use strict';
  const api = typeof module !== 'undefined' && module.exports ? require('../../lib/routes.js') : root.DsaRoutes;
  root.DsaLab = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
