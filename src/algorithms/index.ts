import type { Crop, FarmEdge, RecommendationResult, KnapsackResult, DijkstraResult, KruskalResult, TraversalResult, TraversalStep, FieldPriority, Field, MoistureStatus, DijkstraStep, KruskalStep } from '@/types';

export function recommendCrops(crops: Crop[], land: number, budget: number, water: number, season: string, soil: string): RecommendationResult[] {
  return crops.map((crop) => {
    let score = 0;
    if (crop.land <= land) score += 30;
    if (crop.cost <= budget) score += 25;
    if (crop.waterNeed <= water) score += 20;
    if (crop.season === season || crop.season === 'Year-round' || crop.season.includes(season)) score += 15;
    if (crop.soil === soil) score += 10;
    return { crop, score };
  }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score || b.crop.profit - a.crop.profit).slice(0, 5);
}

export function optimizeCrops(crops: Crop[], capacity: number): KnapsackResult {
  const n = crops.length;
  const dpTable = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  for (let i = 1; i <= n; i += 1) {
    for (let w = 0; w <= capacity; w += 1) {
      dpTable[i][w] = dpTable[i - 1][w];
      if (crops[i - 1].land <= w) dpTable[i][w] = Math.max(dpTable[i][w], dpTable[i - 1][w - crops[i - 1].land] + crops[i - 1].profit);
    }
  }
  const selected: Crop[] = [];
  let w = capacity;
  for (let i = n; i >= 1; i -= 1) {
    if (dpTable[i][w] !== dpTable[i - 1][w]) { selected.unshift(crops[i - 1]); w -= crops[i - 1].land; }
  }
  return { selectedCrops: selected, totalLand: selected.reduce((sum, crop) => sum + crop.land, 0), totalCost: selected.reduce((sum, crop) => sum + crop.cost, 0), maxProfit: dpTable[n][capacity], capacity, dpTable };
}

function graph(locations: string[], edges: FarmEdge[]): { to: number; distance: number }[][] {
  const result = locations.map(() => [] as { to: number; distance: number }[]);
  edges.forEach((edge) => { result[edge.from].push({ to: edge.to, distance: edge.distance }); result[edge.to].push({ to: edge.from, distance: edge.distance }); });
  return result;
}

export function findShortestPath(locations: string[], edges: FarmEdge[], start: number, target: number): DijkstraResult {
  const adjacency = graph(locations, edges); const distances = Array(locations.length).fill(Infinity) as number[]; const parents = Array(locations.length).fill(-1) as number[]; const visited: number[] = []; const steps: DijkstraStep[] = [];
  distances[start] = 0; const done = new Set<number>();
  while (done.size < locations.length) {
    let current = -1;
    for (let i = 0; i < locations.length; i += 1) if (!done.has(i) && (current === -1 || distances[i] < distances[current])) current = i;
    if (current === -1 || distances[current] === Infinity) break;
    done.add(current); visited.push(current); steps.push({ visited: [...visited], distances: [...distances], parents: [...parents], currentNode: current, evaluatedEdges: [], phase: 'visiting' });
    const evaluatedEdges: { from: number; to: number; dist: number }[] = [];
    adjacency[current].forEach(({ to, distance }) => { evaluatedEdges.push({ from: current, to, dist: distance }); if (distances[current] + distance < distances[to]) { distances[to] = distances[current] + distance; parents[to] = current; } });
    steps.push({ visited: [...visited], distances: [...distances], parents: [...parents], currentNode: current, evaluatedEdges, phase: 'relaxing' });
  }
  const path: number[] = []; if (distances[target] !== Infinity) { let current: number | -1 = target; while (current !== -1) { path.unshift(current); current = parents[current]; } }
  steps.push({ visited: [...visited], distances: [...distances], parents: [...parents], currentNode: target, evaluatedEdges: [], phase: 'done' });
  return { distance: distances[target], path, steps, unreachable: distances[target] === Infinity };
}

class DisjointSet { parent: number[]; rank: number[]; constructor(size: number) { this.parent = Array.from({ length: size }, (_, i) => i); this.rank = Array(size).fill(0); } find(value: number): number { if (this.parent[value] !== value) this.parent[value] = this.find(this.parent[value]); return this.parent[value]; } unite(a: number, b: number): boolean { const rootA = this.find(a); const rootB = this.find(b); if (rootA === rootB) return false; if (this.rank[rootA] < this.rank[rootB]) this.parent[rootA] = rootB; else { this.parent[rootB] = rootA; if (this.rank[rootA] === this.rank[rootB]) this.rank[rootA] += 1; } return true; } }

export function minimumNetwork(locations: string[], edges: FarmEdge[]): KruskalResult { const ds = new DisjointSet(locations.length); const sorted = [...edges].sort((a, b) => a.distance - b.distance); const mstEdges: FarmEdge[] = []; const rejectedEdges: FarmEdge[] = []; const steps: KruskalStep[] = []; let totalCost = 0; sorted.forEach((edge) => { const accepted = ds.unite(edge.from, edge.to); if (accepted) { mstEdges.push(edge); totalCost += edge.distance; } else rejectedEdges.push(edge); steps.push({ edge, accepted, totalCost, selectedCount: mstEdges.length }); }); return { mstEdges, rejectedEdges, totalCost, steps, connected: mstEdges.length === locations.length - 1 }; }

function neighbours(node: number, edges: FarmEdge[]): number[] { const result: number[] = []; edges.forEach((edge) => { if (edge.from === node) result.push(edge.to); else if (edge.to === node) result.push(edge.from); }); return result; }
export function traverseNetwork(locations: string[], edges: FarmEdge[], start: number, mode: 'BFS' | 'DFS'): TraversalResult { const order: number[] = []; const steps: TraversalStep[] = []; const visited = new Set<number>(); const structure = [start]; while (structure.length) { const node = mode === 'BFS' ? structure.shift()! : structure.pop()!; if (visited.has(node)) continue; visited.add(node); order.push(node); const next = neighbours(node, edges).filter((value) => !visited.has(value)); if (mode === 'BFS') structure.push(...next); else structure.push(...next.reverse()); steps.push({ node, order: order.length, queueOrStack: [...structure], visited: [...visited], structureType: mode === 'BFS' ? 'queue' : 'stack' }); } return { order, steps }; }

export function moistureStatus(moisture: number): MoistureStatus { if (moisture < 20) return 'CRITICAL'; if (moisture < 35) return 'NEEDS WATER'; if (moisture <= 60) return 'NORMAL'; return 'SUFFICIENT'; }
export function fieldPriority(field: Field): number { let score = field.moisture < 20 ? 50 : field.moisture < 35 ? 35 : field.moisture <= 60 ? 20 : 5; score += (10 - field.condition) * 3; if (field.area >= 4) score += 10; else if (field.area >= 2) score += 5; return score; }
export function prioritizeFields(fields: Field[]): FieldPriority[] { return fields.map((field) => { const status = moistureStatus(field.moisture); return { field, priority: fieldPriority(field), status, recommendation: field.moisture < 20 ? 'Immediate irrigation required.' : field.moisture < 35 ? 'Irrigation should be provided soon.' : 'No immediate irrigation required.' }; }).sort((a, b) => b.priority - a.priority); }
