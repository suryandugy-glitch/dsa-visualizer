import { useState } from 'react';
import { AlgorithmType, DataStructureType } from '@/types';
import { FaSort, FaListUl, FaChartBar, FaProjectDiagram, FaCube, FaNetworkWired } from 'react-icons/fa';

const Sidebar: React.FC<{
  selectedType: 'algorithm' | 'data-structure';
  selectedItem: string;
  onTypeChange: (type: 'algorithm' | 'data-structure') => void;
  onItemSelect: (item: string) => void;
}> = ({ selectedType, selectedItem, onTypeChange, onItemSelect }) => {

  const algorithms: AlgorithmType[] = [
    'bubble-sort', 'selection-sort', 'insertion-sort', 'merge-sort',
    'quick-sort', 'heap-sort', 'radix-sort', 'binary-search', 'linear-search',
    'dfs', 'bfs', 'dijkstra', 'prims', 'kruskals'
  ];

  const dataStructures: DataStructureType[] = [
    'array', 'linked-list', 'stack', 'queue', 'binary-search-tree',
    'avl-tree', 'red-black-tree', 'hash-table', 'heap', 'trie', 'graph'
  ];

  const [toggleState, setToggleState] = useState({
    algorithms: true,
    dataStructures: false
  });

  const toggleSection = (section: keyof typeof toggleState) => {
    setToggleState(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>🎯 DSA Visualizer</h2>
        <button
          className="sidebar-toggle-btn"
          onClick={() => onTypeChange(selectedType === 'algorithm' ? 'data-structure' : 'algorithm')}
        >
          {selectedType === 'algorithm' ? '📊 Data Structures' : '🧮 Algorithms'}
        </button>
      </div>

      <div className="sidebar-section">
        <h3 onClick={() => toggleSection('algorithms')} className="sidebar-section-header">
          {toggleState.algorithms ? '▼' : '▶'} Algorithms
        </h3>
        {toggleState.algorithms && (
          <nav className="sidebar-nav">
            {algorithms.map(algo => {
              const algoName = algo.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
              const isSelected = selectedItem === algo && selectedType === 'algorithm';
              return (
                <button
                  key={algo}
                  className={`sidebar-item ${isSelected ? 'active' : ''}`}
                  onClick={() => onItemSelect(algo)}
                >
                  {algoName}
                </button>
              );
            })}
          </nav>
        )}
      </div>

      <div className="sidebar-section">
        <h3 onClick={() => toggleSection('dataStructures')} className="sidebar-section-header">
          {toggleState.dataStructures ? '▼' : '▶'} Data Structures
        </h3>
        {toggleState.dataStructures && (
          <nav className="sidebar-nav">
            {dataStructures.map(ds => {
              const dsName = ds.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
              const isSelected = selectedItem === ds && selectedType === 'data-structure';
              return (
                <button
                  key={ds}
                  className={`sidebar-item ${isSelected ? 'active' : ''}`}
                  onClick={() => onItemSelect(ds)}
                >
                  {dsName}
                </button>
              );
            })}
          </nav>
        )}
      </div>

      <div className="sidebar-footer">
        <p>Visualize algorithms and data structures in real-time</p>
      </div>
    </aside>
  );
};

export default Sidebar;