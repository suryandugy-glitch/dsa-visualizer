import { useState } from 'react';
import './App.css';
import Sidebar from './components/layout/Sidebar';
import VisualizationCanvas from './components/visualizations/VisualizationCanvas';
import ControlsPanel from './components/controls/ControlsPanel';
import { AlgorithmType, DataStructureType } from './types';

const App: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'algorithm' | 'data-structure'>('algorithm');
  const [selectedItem, setSelectedItem] = useState<string>('bubble-sort');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(5); // 1-10 scale
  const [stepByStep, setStepByStep] = useState(false);
  const [arrayData, setArrayData] = useState<number[]>([]);
  const [complexity, setComplexity] = useState({ time: '', space: '' });

  // Generate random array data
  const generateRandomArray = (size: number = 20) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
  };

  // Handle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle step forward
  const stepForward = () => {
    // Implementation would advance one step in the algorithm
    console.log('Stepping forward');
  };

  // Handle reset
  const resetVisualization = () => {
    setIsPlaying(false);
    setArrayData(generateRandomArray());
    // Reset algorithm state
  };

  // Handle item selection
  const handleItemSelect = (item: string) => {
    setSelectedItem(item);
    resetVisualization();
  };

  // Handle type change
  const handleTypeChange = (type: 'algorithm' | 'data-structure') => {
    setSelectedType(type);
    // Reset to default item for new type
    setSelectedItem(type === 'algorithm' ? 'bubble-sort' : 'array');
    resetVisualization();
  };

  // Initialize with random data
  const initialData = generateRandomArray();

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎯 DSA Visualizer</h1>
        <p>Interactive Data Structures & Algorithms Visualizer</p>
      </header>

      <div className="app-main">
        <Sidebar
          selectedType={selectedType}
          selectedItem={selectedItem}
          onTypeChange={handleTypeChange}
          onItemSelect={handleItemSelect}
        />

        <div className="app-content">
          <VisualizationCanvas
            type={selectedType}
            item={selectedItem}
            data={arrayData}
            isPlaying={isPlaying}
            speed={speed}
            stepByStep={stepByStep}
            onPlayPause={togglePlay}
            onStepForward={stepForward}
            onReset={resetVisualization}
            onDataChange={setArrayData}
            complexity={complexity}
          />

          <ControlsPanel
            isPlaying={isPlaying}
            speed={speed}
            stepByStep={stepByStep}
            onPlayPause={togglePlay}
            onSpeedChange={setSpeed}
            onStepByStepChange={setStepByStep}
            onStepForward={stepForward}
            onReset={resetVisualization}
            onDataChange={setArrayData}
          />
        </div>
      </div>

      <footer className="app-footer">
        <p>Made with ❤️ for learners everywhere</p>
        <p>
          <a href="https://github.com/yourusername/DSA-Visualizer" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;