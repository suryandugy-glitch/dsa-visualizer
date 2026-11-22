import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import VisualizationCanvas from './components/visualizations/VisualizationCanvas';
import ControlsPanel from './components/controls/ControlsPanel';

const createArray = () => Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);

const App: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'algorithm' | 'data-structure'>('algorithm');
  const [selectedItem, setSelectedItem] = useState<string>('bubble-sort');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(5); // 1-10 scale
  const [stepByStep, setStepByStep] = useState(false);
  const [arrayData, setArrayData] = useState(createArray);
  const [stepIndex, setStepIndex] = useState(0);

  const resetVisualization = () => {
    setIsPlaying(false);
    setStepIndex(0);
  };

  const handleItemSelect = (type: 'algorithm' | 'data-structure', item: string) => {
    setSelectedType(type);
    setSelectedItem(item);
    resetVisualization();
  };

  const handleTypeChange = (type: 'algorithm' | 'data-structure') => {
    handleItemSelect(type, type === 'algorithm' ? 'bubble-sort' : 'array');
  };

  const handleDataChange = (data: number[]) => {
    setArrayData(data);
    resetVisualization();
  };

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
            stepIndex={stepIndex}
            onStepChange={setStepIndex}
            onPlaybackEnd={() => setIsPlaying(false)}
          />

          <ControlsPanel
            isPlaying={isPlaying}
            speed={speed}
            stepByStep={stepByStep}
            onPlayPause={() => setIsPlaying((playing) => !playing)}
            onSpeedChange={setSpeed}
            onStepByStepChange={(enabled) => {
              setStepByStep(enabled);
              setIsPlaying(false);
            }}
            onStepForward={() => setStepIndex((step) => step + 1)}
            onReset={resetVisualization}
            onDataChange={handleDataChange}
          />
        </div>
      </div>

      <footer className="app-footer">
        <p>Made with ❤️ for learners everywhere</p>
        <p>
          <a href="https://github.com/suryandugy-glitch/dsa-visualizer" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;