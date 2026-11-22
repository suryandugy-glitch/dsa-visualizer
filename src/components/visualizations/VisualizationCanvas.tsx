import { useEffect, useMemo, useRef } from 'react';
import { AlgorithmType, DataStructureType, AlgorithmStep } from '@/types';
import { useAlgorithm } from '@/hooks/useAlgorithm';
import { useDataStructure } from '@/hooks/useDataStructure';

const VisualizationCanvas: React.FC<{
  type: 'algorithm' | 'data-structure';
  item: string;
  data: number[];
  isPlaying: boolean;
  speed: number;
  stepIndex: number;
  onStepChange: (index: number) => void;
  onPlaybackEnd: () => void;
}> = ({ type, item, data, isPlaying, speed, stepIndex, onStepChange, onPlaybackEnd }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const algorithm = useAlgorithm(item as AlgorithmType, data);
  const structure = useDataStructure(item as DataStructureType, data);
  const { generateSteps, complexity } = type === 'algorithm' ? algorithm : structure;
  const steps = useMemo(() => generateSteps(data), [generateSteps, data]);
  const index = Math.min(stepIndex, steps.length - 1);
  const currentStep = steps[index];

  useEffect(() => {
    if (!isPlaying) return;
    if (index >= steps.length - 1) {
      onPlaybackEnd();
      return;
    }
    const timer = setTimeout(() => onStepChange(index + 1), 1000 - speed * 90);
    return () => clearTimeout(timer);
  }, [index, isPlaying, onPlaybackEnd, onStepChange, speed, steps.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (currentStep) drawAlgorithm(context, canvas, currentStep);
  }, [currentStep]);

  const drawAlgorithm = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, step: AlgorithmStep) => {
    if (!step.data.array || step.data.array.length === 0) return;

    const barWidth = canvas.width / step.data.array.length - 2;
    const maxHeight = Math.max(1, ...step.data.array);
    const scaleFactor = (canvas.height - 40) / maxHeight;

    step.data.array.forEach((value, index) => {
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
      ctx.fillStyle = '#334155';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + barWidth / 2, y - 5);
    });
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

      {steps.length > 0 && (
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