'use strict';

const $ = (id) => document.getElementById(id);

function render() {
  const mode = document.querySelector('input[name="mode"]:checked')?.value || 'mutate';
  const delta = Number($('delta').value);
  try {
    const r = MutationLab.run(mode, delta);
    $('cart-a').textContent = `${r.A.total} [${r.A.items.join(', ')}]`;
    $('cart-b').textContent = `${r.B.total} [${r.B.items.join(', ')}]`;
    $('surprise').textContent = r.bSurprise
      ? 'B mudou sem código direto em B — aliasing.'
      : 'B ficou em 10 — cópia independente.';
    $('lab-error').hidden = true;
  } catch (e) {
    $('lab-error').hidden = false;
    $('lab-error').textContent = e.message;
  }
}

$('delta').addEventListener('input', render);
document.querySelectorAll('input[name="mode"]').forEach((el) => el.addEventListener('change', render));
render();