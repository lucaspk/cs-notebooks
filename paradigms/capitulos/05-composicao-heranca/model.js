(function (root) {
  'use strict';

  function encoderBase() {
    return {
      encode(msg) {
        return String(msg);
      },
    };
  }

  function viaInheritance(msg) {
    const parent = encoderBase();
    const child = {
      encode(msg) {
        return `[LOG] ${parent.encode(msg)}`;
      },
    };
    return child.encode(msg);
  }

  function viaComposition(msg) {
    const inner = encoderBase();
    const wrapper = {
      inner,
      encode(msg) {
        return `[LOG] ${this.inner.encode(msg)}`;
      },
    };
    return wrapper.encode(msg);
  }

  function compare(msg) {
    const text = String(msg);
    return {
      inheritance: viaInheritance(text),
      composition: viaComposition(text),
      same: viaInheritance(text) === viaComposition(text),
    };
  }

  const api = { compare, viaInheritance, viaComposition };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ComposeLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);