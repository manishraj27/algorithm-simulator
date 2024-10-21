import React, { useState } from "react";
import Visualizer from "./components/Visualizer";
import "./App.css";

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubbleSort"); // Default to bubble sort

  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Algorithm Simulator</h1>
        <nav className="navbar">
          <button onClick={() => handleAlgorithmChange("bubbleSort")}>
            Bubble Sort
          </button>
          <button onClick={() => handleAlgorithmChange("mergeSort")}>
            Merge Sort
          </button>
          <button onClick={() => handleAlgorithmChange("shellSort")}>
            Shell Sort
          </button>
        </nav>
      </header>
      <Visualizer selectedAlgorithm={selectedAlgorithm} />
    </div>
  );
}

export default App;