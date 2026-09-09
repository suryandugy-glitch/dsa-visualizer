import { useCallback } from 'react';
import { DataStructureType, VisualizationData, AlgorithmStep, ComplexityInfo } from '@/types';

// Placeholder implementations for data structure steps
// In a full implementation, each would have proper step generation

const arraySteps = (array: number[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  let stepId = 0;

  // Initial state
  steps.push({
    id: stepId++,
    description: 'Array initialized',
    data: { array: [...array] },
    operationCount: { comparisons: 0, swaps: 0, assignments: 0 }
  });

  // Show some basic operations
  if (array.length > 0) {
    steps.push({
      id: stepId++,
      description: `Accessing element at index 0: ${array[0]}`,
      data: { array: [...array] },
      highlights: { indices: [0] },
      operationCount: { comparisons: 1, swaps: 0, assignments: 0 }
    });

    steps.push({
      id: stepId++,
      description: `Modifying element at index 0 to ${array[0] * 2}`,
      data: { array: [array[0] * 2, ...array.slice(1)] },
      highlights: { indices: [0] },
      operationCount: { comparisons: 0, swaps: 0, assignments: 1 }
    });
  }

  steps.push({
    id: stepId++,
    description: 'Array operations complete',
    data: { array: [...array] },
    operationCount: {
      comparisons: steps.filter(s => s.operationCount.comparisons > 0).length,
      swaps: 0,
      assignments: steps.reduce((sum, s) => sum + s.operationCount.assignments, 0)
    }
  });

  return steps;
};

const linkedListSteps = (array: number[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  let stepId = 0;

  // Initial state
  steps.push({
    id: stepId++,
    description: 'Linked list created from array',
    data: { array: [...array] }, // Using array representation for simplicity
    operationCount: { comparisons: 0, swaps: 0, assignments: 0 }
  });

  // Show traversal
  array.forEach((value, index) => {
    steps.push({
      id: stepId++,
      description: `Visiting node ${index} with value ${value}`,
      data: { array: [...array] },
      highlights: { indices: [index] },
      operationCount: { comparisons: 0, swaps: 0, assignments: 0 }
    });
  });

  steps.push({
    id: stepId++,
    description: 'Linked list traversal complete',
    data: { array: [...array] },
    operationCount: {
      comparisons: 0,
      swaps: 0,
      assignments: array.length
    }
  });

  return steps;
};

const stackSteps = (array: number[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  let stepId = 0;
  const stack: number[] = [];

  // Initial state
  steps.push({
    id: stepId++,
    description: 'Stack initialized (empty)',
    data: { array: [...stack] },
    operationCount: { comparisons: 0, swaps: 0, assignments: 0 }
  });

  // Push operations
  array.forEach((value, index) => {
    steps.push({
      id: stepId++,
      description: `Pushing ${value} onto stack`,
      data: { array: [...stack, value] },
      highlights: { indices: [stack.length] },
      operationCount: { comparisons: 0, swaps: 0, assignments: 1 }
    });
    stack.push(value);
  });

  // Pop operations
  while (stack.length > 0) {
    const popped = stack.pop();
    steps.push({
      id: stepId++,
      description: `Popping ${popped} from stack`,
      data: { array: [...stack] },
      highlights: { indices: [stack.length] },
      operationCount: { comparisons: 0, swaps: 0, assignments: 1 }
    });
  }

  steps.push({
    id: stepId++,
    description: 'Stack operations complete',
    data: { array: [...stack] },
    operationCount: {
      comparisons: 0,
      swaps: 0,
      assignments: array.length * 2
    }
  });

  return steps;
};

const queueSteps = (array: number[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  let stepId = 0;
  const queue: number[] = [];

  // Initial state
  steps.push({
    id: stepId++,
    description: 'Queue initialized (empty)',
    data: { array: [...queue] },
    operationCount: { comparisons: 0, swaps: 0, assignments: 0 }
  });

  // Enqueue operations
  array.forEach((value, index) => {
    steps.push({
      id: stepId++,
      description: `Enqueuing ${value}`,
      data: { array: [...queue, value] },
      highlights: { indices: [queue.length] },
      operationCount: { comparisons: 0, swaps: 0, assignments: 1 }
    });
    queue.push(value);
  });

  // Dequeue operations
  while (queue.length > 0) {
    const dequeued = queue.shift();
    if (dequeued !== undefined) {
      steps.push({
        id: stepId++,
        description: `Dequeuing ${dequeued}`,
        data: { array: [...queue] },
        highlights: { indices: [0] },
        operationCount: { comparisons: 0, swaps: 0, assignments: 1 }
      });
    }
  }

  steps.push({
    id: stepId++,
    description: 'Queue operations complete',
    data: { array: [...queue] },
    operationCount: {
      comparisons: 0,
      swaps: 0,
      assignments: array.length * 2
    }
  });

  return steps;
};

// Map of data structure names to their step generators
const dsGenerators: Record<DataStructureType, (data: number[]) => AlgorithmStep[]> = {
  'array': arraySteps,
  'linked-list': linkedListSteps,
  'stack': stackSteps,
  'queue': queueSteps,
  'binary-search-tree': arraySteps, // Placeholder
  'avl-tree': arraySteps, // Placeholder
  'red-black-tree': arraySteps, // Placeholder
  'hash-table': arraySteps, // Placeholder
  'heap': arraySteps, // Placeholder
  'trie': arraySteps, // Placeholder
  'graph': arraySteps // Placeholder
};

export const useDataStructure = (ds: DataStructureType, initialData: number[]) => {
  const generateSteps = useCallback((data: number[]) => {
    const generator = dsGenerators[ds] || arraySteps;
    return generator(data);
  }, [ds]);

  const reset = useCallback(() => {
    // In a full implementation, this would reset data structure state
    return;
  }, []);

  // Placeholder complexity info
  const complexity: ComplexityInfo = {
    time: 'O(1) average', // Default
    space: 'O(n)',        // Default
    description: 'Standard complexity for this data structure'
  };

  return { generateSteps, reset, complexity };
};