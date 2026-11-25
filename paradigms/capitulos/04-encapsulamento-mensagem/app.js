'use strict';
const $ = (id) => document.getElementById(id);
let acc = null;

function render() {
  if (!acc) acc = EncapLab.makeAccount($('initial').value);
  $('bal').textContent = String(acc.balance());
}

$('initial').addEventListener('change', () => {
  acc = EncapLab.makeAccount($('initial').value);
  render();
});
$('btn-dep').addEventListener('click', () => {
  try {
    acc.deposit($('amount').value);
    $('msg').textContent = 'Depósito OK';
    render();
  } catch (e) {
    $('msg').textContent = e.message;
  }
});
$('btn-wit').addEventListener('click', () => {
  try {
    acc.withdraw($('amount').value);
    $('msg').textContent = 'Saque OK';
    render();
  } catch (e) {
    $('msg').textContent = e.message;
  }
});
acc = EncapLab.makeAccount(20);
render();