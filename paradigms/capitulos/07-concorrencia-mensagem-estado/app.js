'use strict';
const $=id=>document.getElementById(id);
function render(){
 try{
  const r=ConcModelLab.schedule($('turns').value,$('overlap').checked);
  $('shared').textContent=r.shared+' de '+r.expected+' incrementos esperados';
  $('msg').textContent=r.messages+'; um dono processa cada mensagem uma vez';
  $('schedule-trace').textContent=r.trace.join(' → ');
 }catch(e){$('schedule-trace').textContent=e.message;}
}
$('turns').addEventListener('input',render);
$('overlap').addEventListener('change',render);
render();
