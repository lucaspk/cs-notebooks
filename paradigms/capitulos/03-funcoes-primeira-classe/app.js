'use strict';
const $ = (id) => document.getElementById(id);

function selectedOps() {
  const ops = [...document.querySelectorAll('input[name="op"]:checked')].map((el) => el.value);
  return $('reverse-order').checked ? ops.reverse() : ops;
}

function render() {
  const nums = $('nums').value.split(/[\s,]+/).filter(Boolean).map(Number);
  try {
    const r = FirstClassLab.applyPipeline(nums, selectedOps());
    $('out').textContent = r.result.join(', ');
    $('trace').innerHTML = r.trace.map((t) => `<li>${t.op}: [${t.value.join(', ')}]</li>`).join('');
    $('lab-error').hidden = true;
  } catch (e) {
    $('lab-error').hidden = false;
    $('lab-error').textContent = e.message;
  }
}

$('nums').addEventListener('input', render);
document.querySelectorAll('input[name="op"]').forEach((el) => el.addEventListener('change', render));
render();