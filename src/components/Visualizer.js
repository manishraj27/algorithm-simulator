import React, { useState, useEffect } from 'react';
import { bubbleSort } from '../algorithms/BuddleSort';
import './Visualizer.css';

const Visualizer = () => {
  const [array, setArray] = useState([]);
  const [animations, setAnimations] = useState([]);
  
  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(Math.floor(Math.random() * window.innerHeight * 0.6) + 1); // Random number between 1 and 60% of the window height
    }
    setArray(array);
  };

  const visualizeBubbleSort = () => {
    const animations = bubbleSort([...array]);
    setAnimations(animations); // Save animations to state
    animateSort(animations);
  };

  const animateSort = (animations) => {
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx] = animations[i];
      setTimeout(() => {
        const arrayBars = document.getElementsByClassName('array-bar');
        const barOneStyle = arrayBars[barOneIdx].style; 
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const tempHeight = barOneStyle.height;
        barOneStyle.height = barTwoStyle.height;
        barTwoStyle.height = tempHeight;
      }, i * 10);
    }
  };

  return (
    <div className="array-container">
      {array.map((value, idx) => (
        <div
          className="array-bar"
          key={idx}
          style={{
            height: `${value}px`,
            width: `${100 / array.length}%`, 
          }}
        ></div>
      ))}
      <div className="controls">
        <button onClick={resetArray}>Generate New Array</button>
        <button onClick={visualizeBubbleSort}>Visualize Bubble Sort</button>
      </div>
    </div>
  );
};

export default Visualizer;
