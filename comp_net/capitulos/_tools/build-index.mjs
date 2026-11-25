#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chapterPublished, renderChapterListItem } from '../../../_tools/index-items.mjs';
import { syncBookGabarito } from '../../../_tools/gabarito-lib.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const chapters = [
  ['01', '01-pontos-extremos-servico', 'COMECE AQUI', 'Pontos extremos e serviço', 'App nas pontas; rede entrega bytes opacos.'],
  ['02', '02-atraso-quatro-fontes', '', 'As quatro fontes de atraso', 'Propagação, transmissão, fila, processamento.'],
  ['03', '03-perda-fila-esgotada', '', 'Perda e fila esgotada', 'Fila cheia vs enlace com erro.'],
  ['04', '04-throughput-gargalo', '', 'Throughput e gargalo', 'O elo mais lento manda.'],
  ['05', '05-encapsulamento-camadas', '', 'Encapsulamento', 'Empilhar e despilhar cabeçalhos.'],
  ['06', '06-quadro-ethernet-broadcast', '', 'Quadro Ethernet e broadcast', 'MAC e domínio de broadcast.'],
  ['07', '07-arp-primeiro-salto', '', 'ARP e primeiro salto', 'IP na LAN vira MAC.'],
  ['08', '08-switch-tabela-mac', '', 'Switch e tabela MAC', 'Flood, aprendizado, unicast.'],
  ['09', '09-sub-rede-roteador', '', 'Sub-rede e roteador', 'Mesma LAN vs atravessar gateway.'],
  ['10', '10-tabela-roteamento-lpm', '', 'Roteamento (LPM)', 'Longest prefix match.'],
  ['11', '11-caminho-pacote-hop', '', 'Caminho pacote a pacote', 'Salto a salto entre nós.'],
  ['12', '12-icmp-diagnostico', '', 'ICMP e diagnóstico', 'Eco, inalcançável, tempo.'],
  ['13', '13-udp-portas-demux', '', 'UDP, portas e demux', 'Datagrama e multiplexação.'],
  ['14', '14-tcp-handshake-estados', '', 'TCP: handshake e estados', 'SYN, ACK, meia abertura.'],
  ['15', '15-seg-ack-ordem', '', 'Sequência, ACK e ordem', 'Byte stream confiável.'],
  ['16', '16-retransmissao-rtt', '', 'Retransmissão e RTT', 'Timeout e reenvio.'],
  ['17', '17-janela-fluxo', '', 'Janela de fluxo', 'Receptor limita envio.'],
  ['18', '18-congestionamento-tcp', '', 'Congestionamento (TCP)', 'Perda reduz taxa.'],
  ['19', '19-http-request-response', '', 'HTTP request/response', 'Waterfall de uma página.'],
  ['20', '20-dns-resolucao-cache', '', 'DNS, cache e TTL', 'Nome → endereço.'],
  ['21', '21-dhcp-atribuicao', '', 'DHCP', 'IP e gateway na LAN.'],
  ['22', '22-nat-tabela-conexao', '', 'NAT e tabela de conexão', 'Traduz saída; atravessa entrada.'],
  ['23', '23-firewall-estado', '', 'Firewall com estado', 'Pacote órfão vs fluxo iniciado.'],
  ['24', '24-tls-confidencialidade', '', 'TLS: o que garante', 'Canal, integridade, servidor.'],
  ['25', '25-ipv6-essencial', '', 'IPv6 essencial', 'Endereço e vizinho.'],
  ['26', '26-wifi-meio-compartilhado', '', 'Wi‑Fi e meio compartilhado', 'Contenção no ar.'],
  ['27', '27-loop-l2-stp', '', 'Loop em L2 e STP', 'Tempestade e bloqueio de porta.'],
  ['28', '28-cdn-cache-proximidade', '', 'CDN e cache', 'Perto do cliente.'],
  ['29', '29-falhas-parciais-retry', '', 'Falhas parciais e retry', 'Timeout e idempotência.'],
  ['30', '30-design-rede-minimo', '', 'Design mínimo de rede', 'Requisitos → topologia.'],
  ['31', '31-http3-quic-essencial', 'OPCIONAL', 'HTTP/3 e QUIC (essencial)', '1.1 vs 2 vs 3 lado a lado.'],
];

const items = chapters.map((row) => renderChapterListItem(root, row)).join('\n');
const publishedCount = chapters.filter(([, slug]) => chapterPublished(root, slug)).length;

const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f6f5f0">
  <base href="./">
  <title>Redes de computadores · Livro interativo</title>
  <link rel="stylesheet" href="styles.css">
  <script src="../local-links.js" defer></script>
</head>
<body>
  <main class="book-index">
    <header class="page-header">
      <a class="brand" href="../index.html" aria-label="Playground, sumário geral"><span class="brand-mark" aria-hidden="true">p.</span> playground <span class="brand-divider">/</span> redes de computadores</a>
      <span class="lesson-tag">LIVRO INTERATIVO · ${publishedCount}/${chapters.length} CAPÍTULOS</span>
    </header>
    <section class="intro" aria-labelledby="page-title">
      <h1 id="page-title">MENOS LEITURA.<br><span>MAIS PACOTE NO FIO.</span></h1>
    </section>
    <section class="contents" aria-labelledby="contents-title">
      <div class="contents-heading"><h2 id="contents-title">Sumário</h2><span>${publishedCount} publicados · ${chapters.length} no roteiro</span></div>
      <ol class="chapter-list">
${items}
      </ol>
    </section>
  </main>
</body>
</html>
`;

fs.writeFileSync(path.join(root, 'index.html'), html);
console.log(`Wrote index.html with ${chapters.length} chapters`);
syncBookGabarito(path.basename(root), { repo: path.dirname(root) });