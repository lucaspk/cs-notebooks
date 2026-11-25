# lib/ — {{SLUG}}
Lógica de domínio reutilizada entre capítulos fica aqui em funções puras, com testes node --test.
Exponha uma API IIFE no browser e module.exports no Node. Carregue o script de lib antes de model.js; no browser não use require().
model.js adapta a API para o capítulo. Wiring DOM pertence a ../../../_shared/lab-kit.js.
Evite copiar uma função que já exista em lib/. Um modelo exclusivo pode permanecer no capítulo.
