import { useEffect, useRef, useState } from 'react';
import { AlgorithmType, DataStructureType, VisualizationData, AlgorithmStep, ComplexityInfo } from '@/types';
import { useAlgorithm } from '@/hooks/useAlgorithm';
import { useDataStructure } from '@/hooks/useDataStructure';

const VisualizationCanvas: React.FC<{
  type: 'algorithm' | 'data-structure';
  item: string;
  data: number[];
  isPlaying: boolean;
  speed: number;
  stepByStep: boolean;
  onPlayPause: () => void;
  onStepForward: () => void;
  onReset: () => void;
  onDataChange: (data: number[]) => void;
  complexity: ComplexityInfo;
}> = ({ type, item, data, isPlaying, speed, stepByStep, onPlayPause, onStepForward, onReset, onDataChange, complexity }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentStep, setCurrentStep] = useState<AlgorithmStep | null>(null);
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Algorithm hook
  const {
    generateSteps: generateAlgorithmSteps,
    reset: resetAlgorithm,
    complexity: algoComplexity
  } = useAlgorithm(item as AlgorithmType, data);

  // Data structure hook
  const {
    generateSteps: generateDSSteps,
    reset: resetDS,
    complexity: dsComplexity
  } = useDataStructure(item as DataStructureType, data);

  useEffect(() => {
    // Generate steps when type, item, or data changes
    if (type === 'algorithm') {
      const newSteps = generateAlgorithmSteps(data);
      setSteps(newSteps);
      if (newSteps.length > 0) {
        setCurrentStep(newSteps[0]);
      }
    } else {
      const newSteps = generateDSSteps(data);
      setSteps(newSteps);
      if (newSteps.length > 0) {
        setCurrentStep(newSteps[0]);
      }
    }
    setIsInitialized(true);
  }, [type, item, data, generateAlgorithmSteps, generateDSSteps]);

  useEffect(() => {
    if (!isInitialized) return;

    // Update complexity display
    const currentComplexity = type === 'algorithm' ? algoComplexity : dsComplexity;
    // In a real implementation, we'd pass this up via props or context
  }, [algoComplexity, dsComplexity, isInitialized]);

  // Animation frame handling
  useEffect(() => {
    if (!isPlaying || !stepByStep || !currentStep || steps.length === 0) return;

    const delay = Math.max(100, 1000 - (speed * 90)); // 100ms to 1000ms based on speed
    const timer = setTimeout(() => {
      const currentIndex = steps.indexOf(currentStep!);
      if (currentIndex < steps.length - 1) {
        setCurrentStep(steps[currentIndex + 1]);
      } else {
        // End of animation
        setIsPlaying(false);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isPlaying, stepByStep, currentStep, steps, speed]);

  // Drawing logic
  useEffect(() => {
    if (!canvasRef.current || !currentStep || steps.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw based on type and item
    if (type === 'algorithm') {
      drawAlgorithm(ctx, canvas, currentStep);
    } else {
      drawDataStructure(ctx, canvas, currentStep);
    }
  }, [currentStep, steps, type, item]);

  const drawAlgorithm = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, step: AlgorithmStep) => {
    if (!step.array || step.array.length === 0) return;

    const barWidth = canvas.width / step.array.length - 2;
    const maxHeight = Math.max(...step.array);
    const scaleFactor = (canvas.height - 40) / maxHeight;

    step.array.forEach((value, index) => {
      const x = index * (barWidth + 2) + 1;
      const y = canvas.height - value * scaleFactor - 20;
      const height = value * scaleFactor;

      // Determine bar color
      let color = '#3b82f6'; // Default blue
      if (step.highlights?.indices?.includes(index)) {
        color = '#ef4444'; // Red for highlights
      } else if (step.highlights?.indices?.includes(index - 1)) {
        color = '#10b981'; // Green for secondary highlights
      }

      // Draw bar
      ctx.fillStyle = color;
      ctx.fillRect(x, y, barWidth, height);

      // Draw value text
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + barWidth / 2, y - 5);
    });
  };

  const drawDataStructure = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, step: AlgorithmStep) => {
    // Simplified drawing for data structures
    // In a full implementation, each data structure would have its own drawing logic
    ctx.fillStyle = '#6b7280';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Data Structure: ${item}`, canvas.width / 2, canvas.height / 2);
  };

  return (
    <div className="visualization-container">
      <div className="visualization-header">
        <h3>
          {type === 'algorithm'
            ? item.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
            : item.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
        </h3>
        <div className="complexity-badge">
          <span>Time: {complexity.time}</span>
          <span>Space: {complexity.space}</span>
        </div>
      </div>

      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          width="800"
          height="400"
          className="visualization-canvas"
        />
      </div>

      {!isPlaying && steps.length > 0 && (
        <div className="step-info">
          <p><strong>Step:</strong> {currentStep?.description || 'Initial state'}</p>
          {currentStep?.operationCount && (
            <div className="operation-counts">
              <span>Comparisons: {currentStep.operationCount.comparisons}</span>
              <span>Swaps: {currentStep.operationCount.swaps}</span>
              <span>Assignments: {currentStep.operationCount.assignments}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VisualizationCanvas;