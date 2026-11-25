(function (root) {
  'use strict';
  const $ = id => document.getElementById(id);
  function mountToggles(hostSel, { markup, readState, render, onInit }) {
    const host = typeof hostSel === 'string' ? document.querySelector(hostSel) : hostSel;
    host.innerHTML = markup;
    const update = () => {
      const output = render(readState());
      if (typeof output === 'string') host.querySelector('#out').textContent = output;
    };
    host.addEventListener('change', update);
    if (onInit) onInit();
    update();
    return { render: update, destroy: () => host.removeEventListener('change', update) };
  }
  function mountStepper({ stepId, resetId, clockId, getPlan, snapshot, paint, onReset }) {
    let time = 0;
    const render = () => {
      const view = snapshot(getPlan(), time);
      if (clockId) $(clockId).textContent = String(view.time);
      paint(view);
    };
    const reset = (runHook = true) => { if (runHook && onReset) onReset(); time = 0; render(); };
    const step = () => {
      const plan = getPlan();
      if (!snapshot(plan, time).done) time += 1;
      render();
    };
    const handleReset = () => reset();
    $(stepId).addEventListener('click', step);
    $(resetId).addEventListener('click', handleReset);
    render();
    return { render, reset, destroy() {
      $(stepId).removeEventListener('click', step);
      $(resetId).removeEventListener('click', handleReset);
    } };
  }
  const api = { $, mountToggles, mountStepper };
  root.PlaygroundLab = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
