export type AlgorithmType =
  | 'bubble-sort'
  | 'selection-sort'
  | 'insertion-sort'
  | 'merge-sort'
  | 'quick-sort'
  | 'heap-sort'
  | 'radix-sort'
  | 'binary-search'
  | 'linear-search'
  | 'dfs'
  | 'bfs'
  | 'dijkstra'
  | 'prims'
  | 'kruskals';

export type DataStructureType =
  | 'array'
  | 'linked-list'
  | 'stack'
  | 'queue'
  | 'binary-search-tree'
  | 'avl-tree'
  | 'red-black-tree'
  | 'hash-table'
  | 'heap'
  | 'trie'
  | 'graph';

export interface VisualizationData {
  array?: number[];
  treeNodes?: any[];
  graphNodes?: any[];
  graphEdges?: any[];
  linkedListNodes?: any[];
  // Add more as needed
}

export interface AlgorithmStep {
  id: number;
  description: string;
  data: VisualizationData;
  highlights?: {
    indices?: number[];
    nodes?: string[];
    edges?: string[];
  };
  operationCount?: {
    comparisons: number;
    swaps: number;
    assignments: number;
  };
}

export interface ComplexityInfo {
  time: string;
  space: string;
  description?: string;
}