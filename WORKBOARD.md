# WORKBOARD — cs-notebooks

**Quadro compartilhado entre agentes** (Cursor, Codex, Copilot, Claude). Humanos podem editar reivindicações e prioridades.

**Instruções:** [AGENTS.md](AGENTS.md) (canônico) · [CODEX.md](CODEX.md) · [CLAUDE.md](CLAUDE.md) · [.github/copilot-instructions.md](.github/copilot-instructions.md)

<!-- workboard:manual:start -->
## Coordenação entre agentes

1. **Antes de codar:** leia este arquivo inteiro, `git status`, e [AGENTS.md](AGENTS.md).
2. **Reivindicar:** adicione uma linha em **Reivindicações ativas** (livro + slugs). Não toque slugs de outra reivindicação ativa.
3. **Durante:** um fenômeno por capítulo; siga o molde em [README.md](README.md#molde-pedagógico-todos-os-livros-e-capítulos).
4. **Ao terminar:** `finalize-chapter` + testes → `node _tools/refresh-workboard.mjs` → linha no **Diário** → remova a reivindicação.

### Reivindicações ativas

| Agente / ferramenta | Livro | Slug(s) | Desde (UTC) | Notas |
| --- | --- | --- | --- | --- |
| *(nenhuma)* | — | — | — | — |

### Fases atuais no repositório

| Fase | Livros presentes | Estado |
| --- | --- | --- |
| 0a | `vv_eng` | 7/7 publicados |
| 0b | `math_disc` | 9/9 publicados |
| 0c | `paradigms` | 8/8 publicados |
| 3 | `prog_conc` | 29/29 publicados |
| 3 | `comp_net` | 8/31 publicados |

Qualquer novo capítulo deve indicar fase, pré-requisitos e a ligação com o próximo livro na documentação do tema. O catálogo geral ordena os livros por essa fase, não pela data de criação.

### Próxima onda sugerida (edite ao priorizar)

| Prioridade | Livro | Slug(s) | Copiar tom de | Notas |
| --- | --- | --- | --- | --- |
| 1 | `comp_net` | `09-sub-rede-roteador`, `10-tabela-roteamento-lpm`, `11-caminho-pacote-hop` | `07-arp-primeiro-salto` | L3 após LAN L2 |
| 2 | `dsa` | *(livro ainda não criado)* | `comp_net/01` | Criar com `new-livro.mjs` antes |
| 3 | `math_disc` / `vv_eng` | ondas de **enriquecimento** (mesmos slugs) | `comp_net/02` | Fase 0 publicada mas labs enxutos |

### Débito de qualidade (não bloqueia, mas evite copiar o mínimo)

| Livro | Situação |
| --- | --- |
| `paradigms` | Revisado: `01-quatro-leituras-mesmo-problema` agora define os quatro estilos antes da previsão. Caps 03–08 ainda podem ganhar revisão mais profunda de layout e navegação. |
| `math_disc`, `vv_eng` | Molde completo; densidade pedida = padrão `comp_net`; validar em passadas futuras a contextualização anterior a previsões/MC. |
| **Regra transversal** | Qualquer capítulo novo ou corrigido deve apresentar termos, listas e conjuntos antes de perguntas que os referenciem (`os quatro`, `ambos`, `as opções`). |

### Diário (prepend — mais recente no topo)

| Quando (UTC) | Quem | Resumo |
| --- | --- | --- |
| 2026-11-25 | Codex | Fase 1 shared: practice centralizado, template sem cópia e cap. 01 dos cinco livros migrados; 101 testes de modelos + 2 testes de persistência/legacy verdes. Scripts locais preservados para capítulos estáveis; smoke em navegador pendente. Fases 2–5 planejadas. |
| 2026-11-25 | Copilot (agent) | Corrigida a sequência de `paradigms/01-quatro-leituras-mesmo-problema`: os quatro estilos são definidos antes da previsão; a pergunta agora exige contexto e justificativa |
| 2026-11-25 | Copilot (agent) | Integrados ao canon e manutenção: fase canônica por livro/tópico, regra de contextos antes de previsões, templates atualizados e validador pedagógico em `maintain-book`/`maintain-all`; catálogo geral reordenado por fases; auditoria verde |
| 2026-11-25 | Copilot (agent) | Reprojetado o laboratório de `paradigms/01-quatro-leituras-mesmo-problema`: cabeçalho, entrada, resultado, cartões por estilo, trace e controles com melhor hierarquia responsiva |
| 2026-11-25 | Copilot (agent) | Revisado `paradigms/01-quatro-leituras-mesmo-problema`: explicadas as quatro leituras no próprio capítulo, removida suposição de contexto e 3 testes verdes |
| 2026-11-25 | Copilot (agent) | Enriquecidos 24 capítulos da Fase 0: `paradigms` 8/8, `math_disc` 9/9, `vv_eng` 7/7; gabaritos sincronizados e 29 testes verdes |
| 2026-11-25 | Cursor (Composer) | Fase 0: `paradigms` 8/8, `math_disc` 9/9, `vv_eng` 7/7; `comp_net` já estava 8/31 |
<!-- workboard:manual:end -->


<!-- workboard:auto:start -->
## Publicação (gerado automaticamente)

_Atualizado: 2026-11-25 17:52:59 UTC · comando: `node _tools/refresh-workboard.mjs`_

| Livro | Publicados | No roteiro | Próximo(s) slug | Gabarito OK | Observação |
| --- | --- | --- | --- | --- | --- |
| `comp_net` | 8 | 31 | 09-sub-rede-roteador, 10-tabela-roteamento-lpm, 11-caminho-pacote-hop, 12-icmp-diagnostico, 13-udp-portas-demux | sim | — |
| `math_disc` | 9 | 9 | — | sim | — |
| `paradigms` | 8 | 8 | — | sim | — |
| `prog_conc` | 29 | 29 | — | sim | — |
| `vv_eng` | 7 | 7 | — | sim | — |

### Slugs publicados por livro

- **comp_net:** 01-pontos-extremos-servico, 02-atraso-quatro-fontes, 03-perda-fila-esgotada, 04-throughput-gargalo, 05-encapsulamento-camadas, 06-quadro-ethernet-broadcast, 07-arp-primeiro-salto, 08-switch-tabela-mac
- **math_disc:** 01-proposicoes-conectivos, 02-tabela-verdade-equivalencia, 03-quantificadores, 04-conjuntos, 05-relacoes-funcoes, 06-inducao-simples, 07-inducao-forte, 08-grafos-definicoes, 09-contagem-combinatoria
- **paradigms:** 01-quatro-leituras-mesmo-problema, 02-mutacao-vs-valor, 03-funcoes-primeira-classe, 04-encapsulamento-mensagem, 05-composicao-heranca, 06-tipos-estatico-dinamico, 07-concorrencia-mensagem-estado, 08-escolher-paradigma
- **prog_conc:** 01-concorrente-paralelo, 02-execucao-sequencial, 03-threads-nucleos, 04-espera-io, 05-interleavings, 06-contador-perdido, 07-toctou, 08-mutex-atomicidade, 09-semaforos, 10-produtor-consumidor, 11-deadlock, 12-livelock, 13-starvation, 14-inversao-prioridade, 15-visibilidade-memoria, 16-ciclo-vida-tarefas, 17-dirty-read, 18-dirty-write, 19-leitura-nao-repetivel, 20-leitura-fantasma, 21-lost-update-transacao, 22-read-skew, 23-write-skew, 24-isolamento-niveis, 25-contencao-desempenho, 26-amdahl-false-sharing, 27-cas-lock-free, 28-aba-linearizabilidade, 29-servicos-mensagens
- **vv_eng:** 01-falha-reproduzivel, 02-piramide-testes, 03-unitario-aaa, 04-isolamento-doubles, 05-tdd-ciclo, 06-propriedade-invariante, 07-revisao-eficaz
<!-- workboard:auto:end -->
