(function (root) {
  'use strict';
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function field({ id, label, type = 'number', value = '', options = [], min, max, step }) {
    if (!/^[a-z][a-z0-9-]*$/.test(id || '') || !label) throw new Error('Campo exige id e label');
    if (!['number', 'text', 'checkbox', 'select', 'range'].includes(type)) throw new Error('Tipo de campo inválido');
    const attrs = ['min', 'max', 'step'].map(k => ({ min, max, step })[k] == null ? '' : ' ' + k + '="' + escape(({ min, max, step })[k]) + '"').join('');
    const control = type === 'select'
      ? '<select id="' + escape(id) + '">' + options.map(option => '<option value="' + escape(option.value) + '"' + (String(option.value) === String(value) ? ' selected' : '') + '>' + escape(option.label) + '</option>').join('') + '</select>'
      : '<input id="' + escape(id) + '" type="' + type + '"' + (type === 'checkbox' ? (value ? ' checked' : '') : ' value="' + escape(value) + '"') + attrs + '>';
    return '<label class="component-field" for="' + escape(id) + '">' + (type === 'checkbox' ? control : '') + '<span>' + escape(label) + '</span>' + (type === 'checkbox' ? '' : control) + '</label>';
  }
  function table(columns, rows, caption = 'Resultado') {
    return '<div class="component-table"><table><caption>' + escape(caption) + '</caption><thead><tr>' + columns.map(c => '<th scope="col">' + escape(c) + '</th>').join('') + '</tr></thead><tbody>' + rows.map(row => '<tr>' + row.map(cell => '<td>' + escape(cell) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
  }
  function controls(prefix) {
    return '<div class="toolbar"><div class="playback"><button type="button" class="primary" id="' + escape(prefix) + '-step">Um passo →</button><button type="button" id="' + escape(prefix) + '-reset">Reiniciar</button></div><span class="clock">Passo <strong id="' + escape(prefix) + '-clock">0</strong></span></div>';
  }
  function mount(host, { id, title, description, fields = [], evaluate, columns, stepper }) {
    if (!/^[a-z][a-z0-9-]*$/.test(id)) throw new Error('id do laboratório inválido');
    if (new Set(fields.map(f => f.id)).size !== fields.length) throw new Error('IDs de campos repetidos');
    const element = typeof host === 'string' ? document.querySelector(host) : host;
    if (!element || !title || (!stepper && typeof evaluate !== 'function')) throw new Error('Configuração incompleta');
    element.classList.add('component-lab');
    element.innerHTML = '<header class="mini-lab-header"><p class="eyebrow">LABORATÓRIO</p><h2>' + escape(title) + '</h2><p>' + escape(description || '') + '</p></header>' +
      (stepper ? controls(id) : '') + '<div class="component-body"><div class="component-fields">' + fields.map(field).join('') + '</div><div class="component-result" role="status" aria-live="polite"><span class="eyebrow">RESULTADO</span><div data-result></div></div></div>';
    const output = element.querySelector('[data-result]');
    const read = () => Object.fromEntries(fields.map(f => {
      const input = element.querySelector('[id="' + f.id + '"]');
      return [f.id, f.type === 'checkbox' ? input.checked : ['number', 'range'].includes(f.type || 'number') ? (input.value === '' ? NaN : Number(input.value)) : input.value];
    }));
    const update = () => {
      const state = read();
      if (Object.values(state).some(v => typeof v === 'number' && !Number.isFinite(v))) {
        output.textContent = 'Preencha as entradas numéricas.'; return;
      }
      let result;
      try { result = evaluate(state); }
      catch (error) { output.textContent = error.message; return; }
      if (columns) output.innerHTML = table(columns, result, title);
      else output.textContent = String(result);
    };
    if (stepper) {
      if (fields.length) throw new Error('Stepper usa plano próprio; configure entradas fora deste componente');
      return root.PlaygroundLab.mountStepper({
        stepId: id + '-step', resetId: id + '-reset', clockId: id + '-clock',
        ...stepper, paint: view => { output.textContent = String(stepper.describe(view)); },
      });
    }
    element.addEventListener('input', update);
    element.addEventListener('change', update);
    update();
    return { render: update, destroy() { element.removeEventListener('input', update); element.removeEventListener('change', update); } };
  }
  const api = { escape, field, table, controls, mount };
  root.PlaygroundComponents = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
