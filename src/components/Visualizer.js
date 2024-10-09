import React, { useState, useEffect } from 'react';
import { bubbleSort } from '../algorithms/BubbleSort';
import { mergeSort } from '../algorithms/MergeSort';

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

  const visualizeMergeSort = () => {
    const animations = mergeSort([...array]);
    setAnimations(animations); // Save animations to state
    animateMergeSort(animations);
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

  const animateMergeSort = (animations) => {
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      const arrayBars = document.getElementsByClassName('array-bar');
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const color = i % 3 === 0 ? 'red' : 'turquoise'; // Change color for comparisons
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = color;
          arrayBars[barTwoIdx].style.backgroundColor = color;
        }, i * 10);
      } else {
        const [barIdx, newHeight] = animations[i];
        setTimeout(() => {
          arrayBars[barIdx].style.height = `${newHeight}px`; // Update height
        }, i * 10);
      }
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
        <button onClick={visualizeMergeSort}>Visualize Merge Sort</button>
      </div>
    </div>
  );
};

export default Visualizer;
