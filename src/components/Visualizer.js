import React, { useState, useEffect } from "react";
import { bubbleSort } from "../algorithms/BubbleSort";
import { mergeSort } from "../algorithms/MergeSort";
import "./Visualizer.css";

const Visualizer = ({ selectedAlgorithm }) => {
  const [array, setArray] = useState([]);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < 100; i++) {
      newArray.push(Math.floor(Math.random() * window.innerHeight * 0.6) + 1);
    }
    setArray(newArray);
  };

  const visualizeSort = () => {
    let animations = [];
    if (selectedAlgorithm === "bubbleSort") {
      animations = bubbleSort([...array]);
    } else if (selectedAlgorithm === "mergeSort") {
      animations = mergeSort([...array]);
    }
    animateSort(animations);
  };

  const animateSort = (animations) => {
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2; // For merge sort animations
      const arrayBars = document.getElementsByClassName("array-bar");
      if (selectedAlgorithm === "mergeSort") {
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 3 === 0 ? "red" : "turquoise"; // Change color for comparison
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * 10);
        } else {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * 10);
        }
      } else if (selectedAlgorithm === "bubbleSort") {
        // For Bubble Sort animation
        const [barOneIdx, barTwoIdx] = animations[i];
        setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
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
          style={{ height: `${value}px`, width: `${100 / array.length}%` }}
        ></div>
      ))}
      <div className="controls">
        <button onClick={resetArray}>Generate New Array</button>
        <button onClick={visualizeSort}>
          Visualize{" "}
          {selectedAlgorithm === "bubbleSort" ? "Bubble Sort" : "Merge Sort"}
        </button>
      </div>
    </div>
  );
};

export default Visualizer;