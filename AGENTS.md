# Instruções para o agente (cs-notebooks)

> **Visibilidade (Cursor, Codex, Copilot, Claude, …):** este arquivo + [WORKBOARD.md](WORKBOARD.md).  
> Espelhos com o mesmo roteiro: [CODEX.md](CODEX.md) · [CLAUDE.md](CLAUDE.md) · [.github/copilot-instructions.md](.github/copilot-instructions.md).  
> Workspace pai `repos/`: [../AGENTS.md](../AGENTS.md) aponta para cá.

O **usuário não roda comandos nem edita HTML de manutenção**. Toda publicação, gabarito e sumário ficam com o agente.

## Trabalho em paralelo (vários agentes)

**Leia primeiro:** [WORKBOARD.md](WORKBOARD.md) — reivindicações, próxima onda, débito de qualidade, diário e tabela **gerada** de publicação.

| Passo | Ação |
| --- | --- |
| **Entrada** | `WORKBOARD.md` + `git status` / `git log -3` (evitar reverter trabalho do outro) |
| **Reivindicar** | Linha em **Reivindicações ativas** com livro + slug(s) exatos de `capitulos/MAPEAMENTO.md` |
| **Referência** | Capítulo **ouro** indicado no WORKBOARD ou `07-arp-primeiro-salto` (`comp_net`) para densidade |
| **Saída** | Testes verdes → `refresh-workboard.mjs` → entrada no **Diário** → remover reivindicação |

**Não faça sem combinar (ou sem reivindicar o mesmo livro):**

- Reescrever em massa capítulos já publicados “para padronizar”
- Mudar `build-index.mjs` / `MAPEAMENTO` de outro agente em andamento
- `git push --force`, `reset --hard`, amend de commit que não é seu
- Apagar linhas do **Diário** de outro agente (só prepend das suas entregas)

**Conflitos prováveis:** dois agentes no **mesmo** `capitulos/NN-slug/`. Um slug = uma reivindicação. Ondas diferentes do **mesmo livro** (ex.: cap 09 vs cap 12) podem correr em paralelo se cada um reivindicar slugs distintos.

**Canon pedagógico:** [README.md § Molde](README.md#molde-pedagógico-todos-os-livros-e-capítulos) · **Canon técnico:** [LIVROS.md](LIVROS.md) · **Por livro:** `<slug>/README.md` + `capitulos/MAPEAMENTO.md`.

---

## Ao criar ou alterar um capítulo

Ordem obrigatória:

1. `capitulos/NN-slug/index.html` — molde pedagógico do [README.md](README.md).
   - Nunca use referentes não apresentados (ex.: “os quatro estilos”, “ambos”, “as opções”) antes de uma lista, definição ou exemplo aparecer na página.
   - Em capítulos novos, apresente termos/contexto e um exemplo mínimo antes de pedir previsão sobre esse conjunto.
   - Não aceite texto genérico de placeholders (`Alternativa incorreta típica`, `Ver modelo no lab`, `Outra distração`) ou perguntas que pressupõem outro capítulo.
2. `capitulos/NN-slug/GABARITO.md` — critérios completos (pré-teste, previsões, MC, checkpoint). **Sem isso o repositório falha na validação.**
3. `capitulos/MAPEAMENTO.md` e `capitulos/_tools/build-index.mjs` (lista de capítulos), se for capítulo novo.
4. **Finalizar** (o agente executa):
   ```bash
   node _tools/finalize-chapter.mjs <livro> <NN-slug>
   ```
   ou, para o livro inteiro:
   ```bash
   node _tools/maintain-book.mjs <livro>
   ```
   ou tudo:
   ```bash
   node _tools/maintain-all.mjs
   ```
5. **Atualizar o quadro:**
   ```bash
   node _tools/refresh-workboard.mjs
   ```

`build-index.mjs` já propaga o gabarito para o HTML (`<details class="chapter-gabarito">`). Não peça ao usuário para sincronizar manualmente.

### `model.js` (browser + testes)

- IIFE com export Node: `if (typeof module !== 'undefined' && module.exports) module.exports = api`.
- **Sem** `require()` no carregamento do browser (só `file://` / Pages).
- Lógica pura testável: `node --test <livro>/capitulos/NN-slug/model.test.js`.

### Handoff mínimo (se outro agente continua na mesma sessão de usuário)

Inclua no chat ou no **Diário** do WORKBOARD:

- Livro e slugs **concluídos** vs **só planejados**
- Comando de teste usado
- Débito consciente (capítulo “fino” a enriquecer depois)

---

## Novo livro

```bash
node _tools/new-livro.mjs --slug … --title "…" --brand "…"
```

Depois: roteiro no README do livro, MAPEAMENTO, cap. 01 + `GABARITO.md`, então `node _tools/maintain-book.mjs <slug>` e `refresh-workboard.mjs`.

## Testes (agente)

```bash
# Capítulo isolado
node --test <livro>/capitulos/NN-slug/model.test.js

# Livro (exemplos)
node --test comp_net/lib/*.test.js comp_net/capitulos/*/model.test.js
node --test paradigms/capitulos/*/model.test.js math_disc/capitulos/*/model.test.js vv_eng/capitulos/*/model.test.js
node --test prog_conc/capitulos/*/model.test.js
```

## O que o estudante vê

- Site estático (`index.html`); gabarito só no collapse **Gabarito +** no fim do capítulo (fechado).
- Nenhuma instrução de CLI no HTML dos livros.

## GitHub Pages

Raiz publicada = esta pasta; `.nojekyll` presente. Push é enough — sem build no CI obrigatório (agente pode rodar `maintain-all` e `refresh-workboard` antes de commit se quiser garantir).