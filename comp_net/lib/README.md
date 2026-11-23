# Biblioteca compartilhada — `comp_net`

Módulos sem DOM, testáveis com `node --test`. Capítulos importam no browser via `<script>` ou duplicam o padrão IIFE `model.js`.

| Módulo | Uso previsto | Testes |
| --- | --- | --- |
| `queue.js` | Filas com capacidade, perda (caps. 02–03, 18) | `queue.test.js` |
| `topology.js` | Nós, enlaces, caminho, atraso por salto (caps. 06–11, 22) | `topology.test.js` |

```sh
cd lib && node --test queue.test.js topology.test.js
node --test capitulos/01-pontos-extremos-servico/model.test.js
```