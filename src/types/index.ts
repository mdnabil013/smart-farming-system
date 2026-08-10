export interface Crop {
  name: string;
  season: string;
  soil: string;
  waterLevel: string;
  land: number;
  cost: number;
  profit: number;
  risk: string;
  waterNeed: number;
  days: number;
}

export interface FarmEdge {
  from: number;
  to: number;
  distance: number;
}

export interface Field {
  name: string;
  crop: string;
  area: number;
  moisture: number;
  growthStage: string;
  condition: number;
}

export type MoistureStatus = 'CRITICAL' | 'NEEDS WATER' | 'NORMAL' | 'SUFFICIENT';

export interface RecommendationResult {
  crop: Crop;
  score: number;
}

export interface KnapsackResult {
  selectedCrops: Crop[];
  totalLand: number;
  totalCost: number;
  maxProfit: number;
  capacity: number;
  dpTable: number[][];
}

export interface DijkstraStep {
  visited: number[];
  distances: number[];
  parents: number[];
  currentNode: number | null;
  evaluatedEdges: { from: number; to: number; dist: number }[];
  phase: 'visiting' | 'relaxing' | 'done';
}

export interface DijkstraResult {
  distance: number;
  path: number[];
  steps: DijkstraStep[];
  unreachable: boolean;
}

export interface KruskalStep {
  edge: FarmEdge;
  accepted: boolean;
  totalCost: number;
  selectedCount: number;
}

export interface KruskalResult {
  mstEdges: FarmEdge[];
  rejectedEdges: FarmEdge[];
  totalCost: number;
  steps: KruskalStep[];
  connected: boolean;
}

export interface TraversalStep {
  node: number;
  order: number;
  queueOrStack: number[];
  visited: number[];
  structureType: 'queue' | 'stack';
}

export interface TraversalResult {
  order: number[];
  steps: TraversalStep[];
}

export interface FieldPriority {
  field: Field;
  priority: number;
  status: MoistureStatus;
  recommendation: string;
}
