# Redes de computadores — playground

**Fase 3** — redes e sistemas distribuídos. Pré-requisitos recomendados: estruturas básicas e sistemas operacionais leves; pode estudar em paralelo com programação concorrente.

Abra `index.html` no navegador para acessar o sumário do livro interativo. Cada capítulo terá sua própria página. Não precisa instalar dependências ou iniciar um servidor (mesmo molde de `prog_conc/`).

Parte do monorepo [cs-notebooks](../README.md) · [catálogo de livros e fundamentos](../LIVROS.md) · sumário geral: [../index.html](../index.html).

**Status:** roteiro aprovado (**30 + 31 opcional**). Infra do livro publicada (`styles.css`, `practice.js`, `index.html`, `TEMPLATE.html`, `lib/`, `build-index.mjs`). Capítulos publicados: **01–08** (métricas + LAN L2) — demais entradas do sumário ainda sem página.

## Por que este livro é diferente de um curso “de camadas”

Objetivo: **comportamento observável da Internet**, não decorar o modelo OSI. Cada capítulo cabe na working memory: um fenômeno, uma topologia pequena, previsão antes de “enviar o pacote”, e justificativa que **descarta** alternativas plausíveis.

Princípios (alinhados ao [molde pedagógico do playground](../README.md#molde-pedagógico-todos-os-livros-e-capítulos)):

1. **Fim a fim primeiro** — A pergunta “o que acontece entre o navegador e o servidor?” aparece no cap. **01** (sem ensinar HTTP ainda) e volta como **síntese** no cap. **19**; o cap. **31** mostra como a pilha evoluiu.
2. **Uma variável por experimento** — Mudar só MTU, só perda, só janela, só tamanho de fila; não misturar dez knobs.
3. **Tempo e fila visíveis** — Atraso não é fórmula solta: propagação, transmissão, fila e processamento aparecem na linha do tempo do lab.
4. **Pacote como personagem** — Encapsulamento, desencapsulamento e “quem decide o próximo salto” são animados ou passo a passo, não só diagrama estático.
5. **Sintoma ≠ causa** — Tabelas de confusões comuns (lentidão ≠ congestionamento; perda ≠ sempre Wi‑Fi ruim; `ECONNREFUSED` ≠ firewall em todo caso).
6. **Teoria recolhida** — RFCs, quadros de bits e história ficam em `<details>`; o fluxo principal é previsão → lab → comparar → MC com justificativa dupla.

### O que deliberadamente fica para depois (ou só em “aprofundar”)

- BGP e política de roteamento global (só esboço no cap. 29 se couber).
- Detalhe de algoritmos wireless (OFDMA, etc.).
- QUIC além do essencial comparativo (migration, spin bit, versões de congestionamento) — o cap. **31** cobre HTTP/3·QUIC para contraste com caps. 13–19 e **24**, não substitui TCP.
- Simulação de datacenter (ECMP, bufferbloat avançado) — tópicos avulsos futuros.

Isso mantém o caderno **sólido para desenvolver e operar sistemas distribuídos no dia a dia**, sem virar enciclopédia.

## Organização do livro (planejada)

- `index.html`: sumário (**30 capítulos** + **31 opcional**; regenerar com `capitulos/_tools/build-index.mjs` quando existir).
- `capitulos/MAPEAMENTO.md`: tabela canônica slug ↔ roteiro didático.
- Cada capítulo: pasta em `capitulos/` com HTML, lab e `model.js` testável com `node --test`.
- `styles.css`: aparência compartilhada (reutilizar/estender o de `prog_conc` onde fizer sentido).
- `practice.js`: persistência no `localStorage` (`playground_comp_net__<slug>`).
- `capitulos/README.md` e `capitulos/TEMPLATE.html`: convenções (a espelhar de `prog_conc` na implementação).

Os tipos de prática e a sequência sugerida estão no [molde pedagógico](../README.md#molde-pedagógico-todos-os-livros-e-capítulos).

Testes: `node --test lib/queue.test.js lib/topology.test.js comp_net/capitulos/*/model.test.js` (a partir da raiz do repo: `node --test comp_net/lib/*.test.js comp_net/capitulos/*/model.test.js`)

## Capítulo publicado (01)

| Cap. | Slug | Mix |
| --- | --- | --- |
| 01 | `01-pontos-extremos-servico` | pré-teste, teaser URL, exemplo, previsão, lab, comparar, MC, contexto, design, checkpoint |

Checklist do molde: cap. 01 cumpre objetivo único, pré-teste, previsão antes do lab, MC com justificativa dupla, design mínimo, checkpoint.

## Capítulos planejados

| Cap. | Slug | Objetivo (uma frase) | Mix de prática |
| --- | --- | --- | --- |
| 01 | `01-pontos-extremos-servico` | Distinguir rede como entrega entre aplicações; **teaser** opcional de linha do tempo “URL → ?” só para prever (remontar no cap. 19) | pré-teste, previsão, lab, comparar/MC, checkpoint |
| 02 | `02-atraso-quatro-fontes` | Decompor RTT em propagação, transmissão, fila e processamento; prever o que domina | pré-teste, previsão, lab, comparar/MC, checkpoint |
| 03 | `03-perda-fila-esgotada` | Explicar perda por fila cheia vs enlace com erro; prever taxa de entrega | pré-teste, previsão, lab, comparar/MC, checkpoint |
| 04 | `04-throughput-gargalo` | Calcular throughput limitado pelo elo mais lento (modelo do tubo) | pré-teste, exemplo trabalhado, lab, MC, design mínimo |
| 05 | `05-encapsulamento-camadas` | Empilhar e despilhar cabeçalhos sem confundir “camada” com “caixa física” | pré-teste, previsão, lab, comparar/MC, checkpoint |
| 06 | `06-quadro-ethernet-broadcast` | Ver domínio de broadcast e endereço MAC no mesmo enlace | pré-teste, previsão, lab, comparar/MC, checkpoint |
| 07 | `07-arp-primeiro-salto` | Resolver “próximo IP na LAN” em MAC antes do primeiro roteador | pré-teste, exemplo trabalhado, lab, MC, checkpoint |
| 08 | `08-switch-tabela-mac` | Prever flood vs unicast após switch aprender portas | pré-teste, previsão, lab, comparar/MC, checkpoint |
| 09 | `09-sub-rede-roteador` | Particionar endereços: mesma sub-rede local; atravessar roteador quando não | pré-teste, previsão, lab, comparar/MC, checkpoint |
| 10 | `10-tabela-roteamento-lpm` | Escolher rota por longest prefix match com entradas sobrepostas | pré-teste, exemplo trabalhado, lab, MC, checkpoint |
| 11 | `11-caminho-pacote-hop` | Seguir um pacote salto a salto (decisão L2 vs L3 em cada tipo de nó) | pré-teste, previsão, lab, comparar, checkpoint |
| 12 | `12-icmp-diagnostico` | Interpretar eco, tempo excedido e destino inalcançável (não só “pinga”) | pré-teste, previsão, lab, MC, checkpoint |
| 13 | `13-udp-portas-demux` | Multiplexar por porta/IP; datagrama pode chegar fora de ordem ou sumir | pré-teste, previsão, lab, comparar/MC, checkpoint |
| 14 | `14-tcp-handshake-estados` | Montar e derrubar conexão; síntese perdida e meia abertura | pré-teste, previsão, lab, comparar/MC, checkpoint |
| 15 | `15-seg-ack-ordem` | Reordenar e detectar buraco com número de sequência e ACK cumulativo | pré-teste, previsão, lab, MC, checkpoint |
| 16 | `16-retransmissao-rtt` | Ligar timeout a RTT estimado; retransmissão duplicada vs necessária | pré-teste, previsão, lab, comparar/MC, checkpoint |
| 17 | `17-janela-fluxo` | Limitar envio pela janela do receptor (não confundir com congestionamento) | pré-teste, previsão, lab, tradeoffs, checkpoint |
| 18 | `18-congestionamento-tcp` | Reagir a perda/cheia: reduzir taxa e reconvergir (modelo simplificado) | pré-teste, previsão, lab, comparar/MC, checkpoint |
| 19 | `19-http-request-response` | **Síntese top-down:** cronologia de uma página (DNS, TCP, TLS, request, response) com o que caps. 02–18 ensinaram | pré-teste, lab guiado, comparar, contexto, checkpoint |
| 20 | `20-dns-resolucao-cache` | Resolver nome com cache, TTL e falha autoritativa vs recursiva | pré-teste, previsão, lab, MC, checkpoint |
| 21 | `21-dhcp-atribuicao` | Obter IP/gateway na LAN; renovar lease; conflito de endereço | pré-teste, previsão, lab, MC, checkpoint |
| 22 | `22-nat-tabela-conexao` | Traduzir endereço/porta de saída; por que servidor atrás de NAT exige traverso | pré-teste, previsão, lab, comparar, design mínimo |
| 23 | `23-firewall-estado` | Permitir tráfego iniciado de dentro; bloquear pacote órfão sem estado | pré-teste, previsão, lab, MC, checkpoint |
| 24 | `24-tls-confidencialidade` | Separar confidencialidade, integridade e autenticação do servidor (handshake enxuto) | pré-teste, lab, comparar/MC, prós/contras, checkpoint |
| 25 | `25-ipv6-essencial` | Endereço mais longo, sem ARP; vizinho discovery em uma frase + lab mínimo | pré-teste, comparar IPv4/6, lab, checkpoint |
| 26 | `26-wifi-meio-compartilhado` | Contenção no ar vs switch com fio; latência sob carga no mesmo AP | pré-teste, previsão, lab, comparar/MC, checkpoint |
| 27 | `27-loop-l2-stp` | Tempestade de broadcast com loop; STP bloqueia porta (visão operacional) | pré-teste, previsão, lab, MC, checkpoint |
| 28 | `28-cdn-cache-proximidade` | Reduzir RTT servindo cópia perto do cliente; cache hit vs miss | pré-teste, previsão, lab, contexto, checkpoint |
| 29 | `29-falhas-parciais-retry` | Timeout, partição parcial, retry idempotente (ponte com sistemas distribuídos) | pré-teste, comparar, MC, design mínimo |
| 30 | `30-design-rede-minimo` | Dado requisito (NAT, HTTPS, N usuários), propor topologia e justificar trade-offs | contexto, design, checkpoint (menos teoria) |
| 31 | `31-http3-quic-essencial` | *(opcional)* Comparar HTTP/1.1, HTTP/2 (HOL) e HTTP/3 sobre QUIC/UDP; TLS acoplado sem repetir caps. 14–18 | pré-teste, previsão, lab comparativo, MC, checkpoint |

Uma etapa da ordem didática pode render vários capítulos (por exemplo ARP + switch, ou seq/ack + retransmissão). O roteiro completo fica aqui; cada página cobre só o fenômeno daquele experimento.

## Abordagem híbrida (não é OSI nem Kurose puro)

| Fase | Capítulos | Estilo | Por quê |
| --- | --- | --- | --- |
| **Gancho mensurável** | 01–04 | Fim a fim sem pilha | Motivação e métricas (atraso, perda, gargalo) sem chute em waterfall |
| **Pilha de baixo para cima** | 05–18 | Bottom-up | Cada lab exige saber *onde está o pacote* e *quem encaminha* |
| **Síntese e operação** | 19–30 | Top-down na prática | HTTP, DNS, edge, segurança, CDN — “por que demorou?” com ferramentas |
| **Extensão** | 31 (opcional) | Comparar evoluções | HTTP/3·QUIC depois de TCP, TLS e HTTP; ecoa `prog_conc` cap. 29 |

Regra: **não** abrir HTTP como ensino antes do cap. 19 (exceto teaser de previsão no 01). **Não** jogar STP/CDN antes da síntese HTTP se isso atrasa o payoff do navegador.

## Ordem didática sugerida

Avançar com **topologias minúsculas** (dois hosts, um switch, um roteador) e **perguntas operacionais**: onde o pacote está agora? quem encaminha? o que mudou se eu dobrar o RTT?

### Sequência de experimentos

1. **Serviço entre aplicações e noção de enlace.** Dois pontos extremos trocam mensagens; distinção útil entre “rede entrega datagramas” e “aplicação interpreta bytes”. Teaser opcional: linha do tempo “abri um site” **só para prever** — promessa de remontar no cap. 19 e contrastar no 31. Sem TCP ainda.

2. **Desempenho mensurável na prática.** Atraso (quatro componentes), perda por fila, throughput limitado pelo gargalo. Fórmulas só depois da previsão errada/acertada no lab.

3. **Camadas como contrato, não como lista OSI.** Encapsulamento; cada hop vê um cabeçalho específico. Comparar “camada lógica” com “dispositivo físico” (roteador não “faz TCP”).

4. **LAN: Ethernet, ARP, switch.** Broadcast, tabela MAC, aprendizado. Primeiro salto L3→L2 na mesma sub-rede.

5. **Inter-rede: sub-redes, roteamento, caminho.** Máscara, gateway padrão, tabela e LPM. Animar um pacote atravessando limites L2.

6. **UDP e multiplexação.** Portas, demux no receptor, perda e ordem como propriedades do serviço — não “erro do programador” por padrão.

7. **TCP confiável.** Handshake, estados, seq/ack, retransmissão, janela de fluxo. Um mecanismo por capítulo; só então congestionamento simplificado.

8. **Aplicações que você usa todo dia.** Cap. **19** = síntese HTTP (waterfall de ponta a ponta). Cap. **20** = DNS aprofundado. Amarrar com caps. 2–18: “por que demorou?”.

9. **Edge da rede operacional.** DHCP, NAT, firewall com estado. Sintomas clássicos de misconfiguração no lab.

10. **Segurança e evolução sem dogma.** TLS (o que garante e o que não garante), IPv6 essencial, Wi‑Fi compartilhado vs fio.

11. **LAN em escala e entrega de conteúdo.** Loop L2/STP, CDN. Foco em “o que quebra em produção”.

12. **Falhas parciais e design (fechamento).** Retries, idempotência, desenho mínimo de rede — prepara sistemas distribuídos; ecoa `prog_conc` cap. 29.

13. **HTTP/3 e QUIC (extensão opcional).** Mesmo recurso, três colunas: várias TCP (1.1), uma TCP + HOL em stream (2), QUIC sobre UDP com TLS integrado (3). Uma variável: *qual barra trava as outras?*

### Como avançar (perguntas-guia)

Antes de publicar o próximo capítulo, o estudante (e o autor) deve conseguir responder:

1. **Onde está o pacote agora** e qual dispositivo decide o próximo salto?
2. **Qual fila ou qual elo** explica o atraso ou a perda que vimos?
3. **Qual camada** expõe o sintoma (app vs transporte vs rede) — e onde está a causa?
4. **O que mudaria** se trocássemos UDP por TCP, ou NAT por IP público, mantendo o resto igual?

## Confusões comuns (material para MC e comparar cenários)

| Confusão | O que o experimento deve deixar claro |
| --- | --- |
| **Lentidão = “rede ruim”** | Pode ser DNS, TLS, fila no servidor, janela pequena ou gargalo de banda — medir antes de culpar o Wi‑Fi. |
| **Perda = sempre wireless** | Filas cheias e policers descartam também; retransmissão TCP mascara com atraso, não com mensagem mágica. |
| **Mais banda = sempre menos RTT** | Propagação e distância não somem; CDN e cache mudam *quem* responde, não a velocidade da luz. |
| **Roteador “entende” URL ou socket** | Encaminha por IP/prefixo; NAT/firewall é outra caixa com estado e regras. |
| **TLS = “rede criptografada” completa** | Protege o canal cliente↔servidor que negociou; não substitui auth na API, validação de input nem logs. |
| **`ping` ok mas site não abre** | ICMP pode passar enquanto TCP/443 ou DNS falham — camadas e regras diferentes. |
| **Broadcast “vaza” como roteamento** | Domínios L2 terminam no roteador; confundir isso gera loops e planos de endereço errados. |
| **HTTP/3 = “rede sem TCP”** | Ainda há confiabilidade e congestionamento no QUIC; UDP é transporte, não “perda aceita”. Caps. 14–18 continuam válidos. |
| **QUIC substitui TLS** | Integra handshakes, mas confidencialidade/integridade/auth do cap. 24 continuam o quadro mental. |

Referências úteis para teoria recolhida (não substituem o lab): [Computer Networking: A Top-Down Approach](https://gaia.cs.umass.edu/kurose_ross/) (Kurose & Ross), [Wireshark samples](https://wiki.wireshark.org/SampleCaptures), documentação [MDN HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) e [Cloudflare Learning](https://www.cloudflare.com/learning/).

## Tipos de laboratório previstos (por capítulo)

| Família de lab | Capítulos típicos | Ideia |
| --- | --- | --- |
| **Linha do tempo / fila** | 02–04, 18 | Slider de taxa, tamanho de fila, ver atraso e descarte |
| **Topologia clicável** | 06–11, 22–23 | Clicar “enviar”; highlight hop a hop |
| **Tabela (MAC, rota, NAT, fw)** | 08, 10, 22, 23 | Editar entrada e prever encaminhamento |
| **Segmentos TCP** | 14–18 | Lista de segmentos; drag reorder; ACK interativo |
| **Waterfall HTTP** | 19–20, 28 | Barras DNS/TCP/TLS/TTFB comparando cenários |
| **HTTP 1.1 / 2 / 3 lado a lado** | 31 | Mesmo asset; paralelismo de conexões vs multiplex vs QUIC; perda num stream |

Cada `model.js` deve ser **determinístico e testável** com `node --test`, como em `prog_conc/`.

## Próximo passo (implementação)

**Onda atual (ver [WORKBOARD.md](../WORKBOARD.md)):** caps **09–11** — `09-sub-rede-roteador`, `10-tabela-roteamento-lpm`, `11-caminho-pacote-hop`. Tom: `07-arp-primeiro-salto`.

1. Reivindicar slug(s) no WORKBOARD antes de codar.
2. `GABARITO.md` + `node _tools/finalize-chapter.mjs comp_net <slug>`.
3. `node _tools/refresh-workboard.mjs` ao terminar a onda.

Slugs canônicos: `capitulos/MAPEAMENTO.md`.