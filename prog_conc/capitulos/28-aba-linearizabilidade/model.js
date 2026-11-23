(function (root) {
  'use strict';

  function buildAbaDemo(useStamp) {
    let head = null;
    let version = 0;
    const history = [];

    function push(value) {
      version += 1;
      head = { value, version };
      return `push ${value}#${version}`;
    }

    function pop() {
      if (!head) return 'pop vazio';
      const v = head;
      head = null;
      return `pop ${v.value}#${v.version}`;
    }

    const script = [
      () => push('A'),
      () => pop(),
      () => push('B'),
      () => pop(),
      () => push('A'),
    ];

    for (const fn of script) history.push({ step: history.length + 1, detail: fn(), head: head ? { ...head } : null });

    const snapshotValue = 'A';
    const snapshotVersion = 1;
    let casOk = false;
    let abaTrap = false;
    let linearizable = true;

    if (head && head.value === snapshotValue) {
      if (!useStamp) {
        casOk = true;
        abaTrap = true;
        linearizable = false;
        history.push({ step: 6, detail: 'CAS (só valor): sucesso enganoso — A voltou após B', casOk, abaTrap, head: null });
        head = null;
      } else if (head.version === snapshotVersion) {
        casOk = true;
        history.push({ step: 6, detail: 'CAS (valor+versão): sucesso legítimo', casOk, abaTrap: false, head: null });
        head = null;
      } else {
        history.push({
          step: 6,
          detail: `CAS falhou: vi A#${head.version}, esperava A#${snapshotVersion}`,
          casOk: false,
          abaTrap: false,
          head: { ...head },
        });
      }
    }

    return { useStamp, history, abaTrap, linearizable, casOk };
  }

  function snapshot(run, step) {
    const elapsed = Math.max(0, Math.min(Math.floor(step), run.history.length));
    const done = elapsed >= run.history.length;
    const frame = run.history[Math.min(elapsed, run.history.length - 1)] || null;
    return { frame, step: elapsed, done, abaTrap: run.abaTrap, linearizable: run.linearizable, useStamp: run.useStamp };
  }

  const api = { buildAbaDemo, snapshot };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.AbaLab = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);