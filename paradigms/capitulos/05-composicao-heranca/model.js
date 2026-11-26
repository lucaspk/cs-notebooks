(function(root) {
  'use strict';
  const encoders={plain:msg=>String(msg),upper:msg=>String(msg).toUpperCase()};
  class BaseEncoder { encode(msg){return String(msg);} }
  class LoggedEncoder extends BaseEncoder { encode(msg){return '[LOG] '+super.encode(msg);} }
  function viaInheritance(msg){return new LoggedEncoder().encode(msg);}
  function viaComposition(msg,kind='plain'){
    if(!encoders[kind])throw new RangeError('Codificador desconhecido');
    const inner={encode:encoders[kind]};
    return '[LOG] '+inner.encode(msg);
  }
  function compare(msg,kind='plain'){
    const inheritance=viaInheritance(msg),composition=viaComposition(msg,kind);
    return {inheritance,composition,same:inheritance===composition};
  }
  const api={compare,viaInheritance,viaComposition};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ComposeLab=api;
})(typeof globalThis!=='undefined'?globalThis:this);
