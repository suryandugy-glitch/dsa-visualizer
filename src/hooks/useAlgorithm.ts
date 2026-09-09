import { useCallback, useMemo } from 'react';
import { AlgorithmType, VisualizationData, AlgorithmStep, ComplexityInfo } from '@/types';

// Bubble Sort Implementation
const bubbleSortSteps = (array: number[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const arr = [...array];
  let stepId = 0;

  // Initial state
  steps.push({
    id: stepId++,
    description: 'Initial array',
    data: { array: [...arr] },
    operationCount: { comparisons: 0, swaps: 0, assignments: 0 }
  });

  let n = arr.length;
  let swapped;

  for (let i = 0; i < n - 1; i++) {
    swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      // Comparison step
      steps.push({
        id: stepId++,
        description: `Comparing ${arr[j]} and ${arr[j + 1]}`,
        data: { array: [...arr] },
        highlights: { indices: [j, j + 1] },
        operationCount: {
          comparisons: steps.length,
          swaps: steps.filter(s => s.highlights?.indices?.includes(j) && s.highlights?.indices?.includes(j + 1)).length,
          assignments: 0
        }
      });

      if (arr[j] > arr[j + 1]) {
        // Swap step
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;

        steps.push({
          id: stepId++,
          description: `Swapping ${arr[j + 1]} and ${arr[j]}`,
          data: { array: [...arr] },
          highlights: { indices: [j, j + 1] },
          operationCount: {
            comparisons: steps.length,
            swaps: steps.length - 1,
            assignments: 2
          }
        });
      }
    }

    // If no swaps, array is sorted
    if (!swapped) break;
  }

  // Final state
  steps.push({
    id: stepId++,
    description: 'Sorting complete!',
    data: { array: [...arr] },
    operationCount: {
      comparisons: steps.filter(s => s.description.includes('Comparing')).length,
      swaps: steps.filter(s => s.description.includes('Swapping')).length,
      assignments: steps.reduce((sum, s) => sum + (s.operationCount.assignments || 0), 0)
    }
  });

  return steps;
};

// Insertion Sort Implementation
const insertionSortSteps = (array: number[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const arr = [...array];
  let stepId = 0;

  // Initial state
  steps.push({
    id: stepId++,
    description: 'Initial array',
    data: { array: [...arr] },
    operationCount: { comparisons: 0, swaps: 0, assignments: 0 }
  });

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    // Move elements of arr[0..i-1] that are greater than key
    // to one position ahead of their current position
    while (j >= 0 && arr[j] > key) {
      steps.push({
        id: stepId++,
        description: `Comparing ${arr[j]} with key ${key}`,
        data: { array: [...arr] },
        highlights: { indices: [j, i] },
        operationCount: {
          comparisons: steps.length,
          swaps: 0,
          assignments: 0
        }
      });

      arr[j + 1] = arr[j];
      j = j - 1;

      steps.push({
        id: stepId++,
        description: `Shifting ${arr[j + 1]} to position ${j + 2}`,
        data: { array: [...arr] },
        highlights: { indices: [j + 1, i] },
        operationCount: {
          comparisons: steps.length,
          swaps: 0,
          assignments: 1
        }
      });
    }

    arr[j + 1] = key;

    steps.push({
      id: stepId++,
      description: `Inserting ${key} at position ${j + 1}`,
      data: { array: [...arr] },
      highlights: { indices: [j + 1] },
      operationCount: {
        comparisons: steps.length,
        swaps: 0,
        assignments: 1
      }
    });
  }

  // Final state
  steps.push({
    id: stepId++,
    description: 'Sorting complete!',
    data: { array: [...arr] },
    operationCount: {
      comparisons: steps.filter(s => s.description.includes('Comparing')).length,
      swaps: 0,
      assignments: steps.reduce((sum, s) => sum + (s.operationCount.assignments || 0), 0)
    }
  });

  return steps;
};

// Merge Sort Implementation
const mergeSortSteps = (array: number[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const arr = [...array];
  let stepId = 0;

  // Initial state
  steps.push({
    id: stepId++,
    description: 'Initial array',
    data: { array: [...arr] },
    operationCount: { comparisons: 0, swaps: 0, assignments: 0 }
  });

  const merge = (left: number, mid: number, right: number) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L: number[] = [];
    const R: number[] = [];

    for (let i = 0; i < n1; i++) {
      L.push(arr[left + i]);
    }
    for (let j = 0; j < n2; j++) {
      R.push(arr[mid + 1 + j]);
    }

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
      steps.push({
        id: stepId++,
        description: `Comparing L[${i}] = ${L[i]} and R[${j}] = ${R[j]}`,
        data: { array: [...arr] },
        highlights: { indices: [left + i, mid + 1 + j] },
        operationCount: {
          comparisons: steps.length,
          swaps: 0,
          assignments: 0
        }
      });

      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }

      steps.push({
        id: stepId++,
        description: `Placing ${arr[k]} at position ${k}`,
        data: { array: [...arr] },
        highlights: { indices: [k] },
        operationCount: {
          comparisons: steps.length,
          swaps: 0,
          assignments: 1
        }
      });

      k++;
    }

    while (i < n1) {
      arr[k] = L[i];
      steps.push({
        id: stepId++,
        description: `Placing remaining L[${i}] = ${L[i]} at position ${k}`,
        data: { array: [...arr] },
        highlights: { indices: [k] },
        operationCount: {
          comparisons: steps.length,
          swaps: 0,
          assignments: 1
        }
      });
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = R[j];
      steps.push({
        id: stepId++,
        description: `Placing remaining R[${j}] = ${R[j]} at position ${k}`,
        data: { array: [...arr] },
        highlights: { indices: [k] },
        operationCount: {
          comparisons: steps.length,
          swaps: 0,
          assignments: 1
        }
      });
      j++;
      k++;
    }
  };

  const mergeSort = (left: number, right: number) => {
    if (left >= right) {
      return;
    }

    const mid = Math.floor((left + right) / 2);

    steps.push({
      id: stepId++,
      description: `Dividing array from index ${left} to ${right} at midpoint ${mid}`,
      data: { array: [...arr] },
      highlights: { indices: [left, mid, right] },
      operationCount: {
        comparisons: steps.length,
        swaps: 0,
        assignments: 0
      }
    });

    mergeSort(left, mid);
    mergeSort(mid + 1, right);
    merge(left, mid, right);
  };

  mergeSort(0, arr.length - 1);

  // Final state
  steps.push({
    id: stepId++,
    description: 'Sorting complete!',
    data: { array: [...arr] },
    operationCount: {
      comparisons: steps.filter(s => s.description.includes('Comparing')).length,
      swaps: 0,
      assignments: steps.reduce((sum, s) => sum + (s.operationCount.assignments || 0), 0)
    }
  });

  return steps;
};

// Quick Sort Implementation
const quickSortSteps = (array: number[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const arr = [...array];
  let stepId = 0;

  // Initial state
  steps.push({
    id: stepId++,
    description: 'Initial array',
    data: { array: [...arr] },
    operationCount: { comparisons: 0, swaps: 0, assignments: 0 }
  });

  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];

    steps.push({
      id: stepId++,
      description: `Swapping ${arr[i]} and ${arr[j]}`,
      data: { array: [...arr] },
      highlights: { indices: [i, j] },
      operationCount: {
        comparisons: steps.length,
        swaps: steps.length - 1,
        assignments: 2
      }
    });
  };

  const partition = (low: number, high: number): number => {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      id: stepId++,
      description: `Pivot selected: ${pivot} at index ${high}`,
      data: { array: [...arr] },
      highlights: { indices: [high] },
      operationCount: {
        comparisons: steps.length,
        swaps: 0,
        assignments: 0
      }
    });

    for (let j = low; j < high; j++) {
      steps.push({
        id: stepId++,
        description: `Comparing ${arr[j]} with pivot ${pivot}`,
        data: { array: [...arr] },
        highlights: { indices: [j, high] },
        operationCount: {
          comparisons: steps.length,
          swaps: 0,
          assignments: 0
        }
      });

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          swap(arr, i, j);
        }
      }
    }

    if (i + 1 !== high) {
      swap(arr, i + 1, high);
    }

    return i + 1;
  };

  const quickSort = (low: number, high: number) => {
    if (low < high) {
      const pi = partition(low, high);

      steps.push({
        id: stepId++,
        description: `Partition complete. Pivot ${arr[pi]} at correct position ${pi}`,
        data: { array: [...arr] },
        highlights: { indices: [pi] },
        operationCount: {
          comparisons: steps.length,
          swaps: 0,
          assignments: 0
        }
      });

      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    }
  };

  quickSort(0, arr.length - 1);

  // Final state
  steps.push({
    id: stepId++,
    description: 'Sorting complete!',
    data: { array: [...arr] },
    operationCount: {
      comparisons: steps.filter(s => s.description.includes('Comparing')).length,
      swaps: steps.filter(s => s.description.includes('Swapping')).length,
      assignments: steps.reduce((sum, s) => sum + (s.operationCount.assignments || 0), 0)
    }
  });

  return steps;
};

// Binary Search Implementation
const binarySearchSteps = (array: number[], target: number = 50): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const arr = [...array].sort((a, b) => a - b); // Binary search requires sorted array
  let stepId = 0;

  // Initial state
  steps.push({
    id: stepId++,
    description: `Searching for target ${target} in sorted array`,
    data: { array: [...arr] },
    operationCount: { comparisons: 0, swaps: 0, assignments: 0 }
  });

  let left = 0;
  let right = arr.length - 1;
  let found = false;
  let position = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      id: stepId++,
      description: `Checking middle element at index ${mid}: ${arr[mid]}`,
      data: { array: [...arr] },
      highlights: { indices: [mid] },
      operationCount: {
        comparisons: steps.length,
        swaps: 0,
        assignments: 0
      }
    });

    if (arr[mid] === target) {
      found = true;
      position = mid;

      steps.push({
        id: stepId++,
        description: `Target ${target} found at index ${mid}!`,
        data: { array: [...arr] },
        highlights: { indices: [mid] },
        operationCount: {
          comparisons: steps.length,
          swaps: 0,
          assignments: 0
        }
      });
      break;
    }

    if (arr[mid] < target) {
      steps.push({
        id: stepId++,
        description: `${arr[mid]} < ${target}, searching right half`,
        data: { array: [...arr] },
        highlights: { indices: [left, mid, right] },
        operationCount: {
          comparisons: steps.length,
          swaps: 0,
          assignments: 0
        }
      });
      left = mid + 1;
    } else {
      steps.push({
        id: stepId++,
        description: `${arr[mid]} > ${target}, searching left half`,
        data: { array: [...arr] },
        highlights: { indices: [left, mid, right] },
        operationCount: {
          comparisons: steps.length,
          swaps: 0,
          assignments: 0
        }
      });
      right = mid - 1;
    }
  }

  if (!found) {
    steps.push({
      id: stepId++,
      description: `Target ${target} not found in array`,
      data: { array: [...arr] },
      operationCount: {
        comparisons: steps.length,
        swaps: 0,
        assignments: 0
      }
    });
  }

  return steps;
};

// Linear Search Implementation
const linearSearchSteps = (array: number[], target: number = 50): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const arr = [...array];
  let stepId = 0;

  // Initial state
  steps.push({
    id: stepId++,
    description: `Searching for target ${target} in array`,
    data: { array: [...arr] },
    operationCount: { comparisons: 0, swaps: 0, assignments: 0 }
  });

  let found = false;
  let position = -1;

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      id: stepId++,
      description: `Checking element at index ${i}: ${arr[i]}`,
      data: { array: [...arr] },
      highlights: { indices: [i] },
      operationCount: {
        comparisons: steps.length,
        swaps: 0,
        assignments: 0
      }
    });

    if (arr[i] === target) {
      found = true;
      position = i;

      steps.push({
        id: stepId++,
        description: `Target ${target} found at index ${i}!`,
        data: { array: [...arr] },
        highlights: { indices: [i] },
        operationCount: {
          comparisons: steps.length,
          swaps: 0,
          assignments: 0
        }
      });
      break;
    }
  }

  if (!found) {
    steps.push({
      id: stepId++,
      description: `Target ${target} not found in array`,
      data: { array: [...arr] },
      operationCount: {
        comparisons: steps.length,
        swaps: 0,
        assignments: 0
      }
    });
  }

  return steps;
};

// Map of algorithm names to their step generators
const algorithmGenerators: Record<AlgorithmType, (data: number[]) => AlgorithmStep[]> = {
  'bubble-sort': bubbleSortSteps,
  'selection-sort': bubbleSortSteps, // Placeholder - would implement separately
  'insertion-sort': insertionSortSteps,
  'merge-sort': mergeSortSteps,
  'quick-sort': quickSortSteps,
  'heap-sort': bubbleSortSteps, // Placeholder
  'radix-sort': bubbleSortSteps, // Placeholder
  'binary-search': binarySearchSteps,
  'linear-search': linearSearchSteps,
  'dfs': bubbleSortSteps, // Placeholder
  'bfs': bubbleSortSteps, // Placeholder
  'dijkstra': bubbleSortSteps, // Placeholder
  'prims': bubbleSortSteps, // Placeholder
  'kruskals': bubbleSortSteps // Placeholder
};

export const useAlgorithm = (algorithm: AlgorithmType, initialData: number[]) => {
  const generateSteps = useCallback((data: number[]) => {
    const generator = algorithmGenerators[algorithm] || bubbleSortSteps;
    return generator(data);
  }, [algorithm]);

  const reset = useCallback(() => {
    // In a full implementation, this would reset algorithm state
    return;
  }, []);

  // Placeholder complexity info - would be calculated based on algorithm and data size
  const complexity: ComplexityInfo = {
    time: 'O(n log n)', // Default
    space: 'O(log n)',  // Default
    description: 'Standard complexity for this algorithm'
  };

  return { generateSteps, reset, complexity };
};