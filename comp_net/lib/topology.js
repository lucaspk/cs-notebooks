(function (root) {
  'use strict';

  /**
   * Topologia não dirigida simples (caps. 06–11). `links`: { from, to, delayMs? }.
   */
  function createTopology(nodeIds, links) {
    const nodes = [...new Set(nodeIds)];
    const adj = new Map(nodes.map((id) => [id, []]));
    for (const link of links) {
      if (!adj.has(link.from) || !adj.has(link.to)) {
        throw new Error(`nó desconhecido em ${link.from}→${link.to}`);
      }
      const delay = link.delayMs ?? 0;
      adj.get(link.from).push({ to: link.to, delayMs: delay });
      adj.get(link.to).push({ to: link.from, delayMs: delay });
    }
    return { nodes, adj };
  }

  /** BFS — caminho mínimo em número de saltos */
  function findPath(topology, from, to) {
    if (from === to) return [from];
    if (!topology.adj.has(from) || !topology.adj.has(to)) return null;
    const visited = new Set([from]);
    const queue = [[from]];
    while (queue.length) {
      const path = queue.shift();
      const tip = path[path.length - 1];
      for (const edge of topology.adj.get(tip)) {
        if (visited.has(edge.to)) continue;
        visited.add(edge.to);
        const next = path.concat(edge.to);
        if (edge.to === to) return next;
        queue.push(next);
      }
    }
    return null;
  }

  function hopDelays(topology, path) {
    if (!path || path.length < 2) return { hops: [], totalDelayMs: 0 };
    const hops = [];
    let totalDelayMs = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const a = path[i];
      const b = path[i + 1];
      const edge = topology.adj.get(a).find((e) => e.to === b);
      const delayMs = edge?.delayMs ?? 0;
      hops.push({ from: a, to: b, delayMs });
      totalDelayMs += delayMs;
    }
    return { hops, totalDelayMs };
  }

  const api = { createTopology, findPath, hopDelays };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.NetTopology = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);