import { useState } from 'react';
import { FaPlay, FaPause, FaStepForward, FaRedo, FaMoon, FaSun } from 'react-icons/fa';

const ControlsPanel: React.FC<{
  isPlaying: boolean;
  speed: number;
  stepByStep: boolean;
  onPlayPause: () => void;
  onSpeedChange: (speed: number) => void;
  onStepByStepChange: (stepByStep: boolean) => void;
  onStepForward: () => void;
  onReset: () => void;
  onDataChange: (data: number[]) => void;
}> = ({ isPlaying, speed, stepByStep, onPlayPause, onSpeedChange, onStepByStepChange, onStepForward, onReset, onDataChange }) => {
  const [arraySize, setArraySize] = useState(20);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const generateArray = () => {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1);
    onDataChange(newArray);
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSpeedChange(Number(e.target.value));
  };

  const handleArraySizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArraySize(Number(e.target.value));
  };

  return (
    <div className="controls-panel">
      <div className="controls-header">
        <h3>Controls</h3>
        <button
          className="theme-toggle"
          onClick={() => setIsDarkMode(!isDarkMode)}
          title="Toggle theme"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <div className="controls-group">
        <label htmlFor="play-pause">Playback</label>
        <div className="controls-group-inner">
          <button
            onClick={onPlayPause}
            className="control-btn"
            title="Play/Pause"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button
            onClick={onStepForward}
            className="control-btn"
            title="Step Forward"
            disabled={isPlaying && !stepByStep}
          >
            <FaStepForward />
          </button>
          <button
            onClick={onReset}
            className="control-btn"
            title="Reset"
          >
            <FaRedo />
          </button>
        </div>
      </div>

      <div className="controls-group">
        <label htmlFor="speed-slider">Speed</label>
        <div className="slider-container">
          <input
            type="range"
            id="speed-slider"
            min="1"
            max="10"
            value={speed}
            onChange={handleSpeedChange}
          />
          <div className="speed-label">
            <span>{speed === 1 ? 'Slow' : speed === 10 ? 'Fast' : speed}</span>
          </div>
        </div>
      </div>

      <div className="controls-group">
        <label htmlFor="step-by-step">Step-by-Step</label>
        <div className="controls-group-inner">
          <label className="switch">
            <input
              type="checkbox"
              checked={stepByStep}
              onChange={(e) => onStepByStepChange(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <span className="switch-label">Enabled</span>
        </div>
      </div>

      <div className="controls-group">
        <label htmlFor="array-size">Array Size</label>
        <div className="slider-container">
          <input
            type="range"
            id="array-size"
            min="5"
            max="50"
            value={arraySize}
            onChange={handleArraySizeChange}
          />
          <div className="speed-label">
            <span>{arraySize}</span>
          </div>
        </div>
        <button onClick={generateArray} className="generate-btn">
          Generate New Array
        </button>
      </div>

      <div className="controls-group">
        <label htmlFor="custom-input">Custom Input (comma-separated)</label>
        <input
          type="text"
          id="custom-input"
          placeholder="e.g., 5, 3, 8, 1, 9"
          className="custom-input"
          onBlur={(e) => {
            const input = e.target.value;
            if (input) {
              const numbers = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
              if (numbers.length > 0) {
                onDataChange(numbers);
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default ControlsPanel;