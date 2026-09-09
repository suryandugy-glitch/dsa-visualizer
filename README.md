# 🎯 DSA Visualizer: Interactive Data Structures & Algorithms Visualizer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Version](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

## 🚀 Overview

**DSA Visualizer** is an interactive web application that brings data structures and algorithms to life through beautiful, real-time animations. Watch as sorting algorithms dance, trees grow and shrink, and graphs unfold their secrets—all with adjustable speeds, step-by-step execution, and detailed explanations.

Perfect for students learning DSA concepts, teachers preparing lectures, or anyone curious about how algorithms actually work under the hood!

## ✨ Features

### 🎨 Interactive Visualizations
- **Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort, Radix Sort
- **Data Structures**: Arrays, Linked Lists, Stacks, Queues, Binary Search Trees, AVL Trees, Red-Black Trees, Hash Tables
- **Graph Algorithms**: BFS, DFS, Dijkstra's, Prim's, Kruskal's
- **Dynamic Programming**: Fibonacci, Knapsack, Longest Common Subsequence

### ⚙️ Customization & Control
- **Speed Control**: Sliders to adjust animation speed from turtle-slow to lightning-fast
- **Step-by-Step Mode**: Pause, play, step forward/backward through each operation
- **Input Customization**: Enter your own data or generate random datasets
- **Theme Support**: Light/Dark mode with smooth transitions

### 📚 Educational Enhancements
- **Complexity Analysis**: Real-time Big O notation display for time and space complexity
- **Operation Counters**: Track comparisons, swaps, and other key operations
- **Pseudocode Display**: Side-by-side view of actual code being executed
- **Explanation Panels**: Detailed descriptions of what's happening at each step
- **Difficulty Ratings**: Beginner/Intermediate/Advanced tags for each algorithm

### 💻 Developer Experience
- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Clean Code**: Well-organized, documented, and tested components
- **Extensible Design**: Easy to add new algorithms and data structures
- **Responsive Design**: Works on desktop and tablet browsers

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Quick Start
```bash
# Clone the repository
git clone https://github.com/yourusername/DSA-Visualizer.git
cd DSA-Visualizer

# Install dependencies
npm install

# Start the development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Production Build
```bash
npm run build
# Preview the build
npm run preview
```

## 📁 Project Structure

```
DSA-Visualizer/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, icons, etc.
│   ├── components/         # Reusable UI components
│   │   ├── controls/       # Playback controls, speed sliders, etc.
│   │   ├── visualizations/ # Algorithm-specific visualization components
│   │   └── layout/         # Header, footer, sidebar components
│   ├── algorithms/         # Algorithm implementations and logic
│   │   ├── sorting/        # Sorting algorithm implementations
│   │   ├── searching/      # Searching algorithms
│   │   ├── graphs/         # Graph algorithms
│   │   └── trees/          # Tree-based algorithms
│   ├── data-structures/    # Data structure implementations
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── styles/             # CSS/Tailwind configurations
│   └── App.tsx             # Main application component
├── tests/                  # Unit and integration tests
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies and scripts
```

## 🎯 How It Works

1. **Algorithm Selection**: Choose from the sidebar menu
2. **Input Configuration**: Set array size, generate random data, or input custom values
3. **Visualization Control**: Use play/pause/step buttons and speed slider
4. **Real-time Feedback**: Watch complexity metrics update as the algorithm runs
5. **Learning Mode**: Read explanations and view pseudocode alongside the visualization

## 🌐 Live Demo

Try it live: [https://dsa-visualizer.vercel.app](https://dsa-visualizer.vercel.app) *(coming soon)*

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Ways to Contribute
- Add new algorithms or data structures
- Improve existing visualizations
- Enhance educational content (explanations, complexity analysis)
- Fix bugs and improve performance
- Add translations for internationalization
- Create tutorials and examples

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Visualgo.net](https://visualgo.net/) and [CS Visualizations](https://www.cs.usfca.edu/~galles/visualization/)
- Special thanks to the open-source DSA education community
- Icons from [Heroicons](https://heroicons.com/) and animations powered by [Framer Motion](https://www.framer.com/motion/)

---

**Made with ❤️ for learners everywhere. Happy visualizing!**