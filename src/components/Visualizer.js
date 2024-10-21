import React, { useState, useEffect } from "react";
import { bubbleSort } from "../algorithms/BubbleSort";
import { mergeSort } from "../algorithms/MergeSort";
import { shellSort } from "../algorithms/ShellSort";
import "./Visualizer.css";

const Visualizer = () => {
  const [array, setArray] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubbleSort");

  useEffect(() => {
    resetArray();
  }, []);

  // Reset the array with random values
  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < 100; i++) {
      newArray.push(Math.floor(Math.random() * window.innerHeight * 0.6) + 1);
    }
    setArray(newArray);
  };

  // Function to handle visualization of the selected sorting algorithm
  const visualizeSort = () => {
    let animations = [];
    switch (selectedAlgorithm) {
      case "bubbleSort":
        animations = bubbleSort([...array]);
        break;
      case "mergeSort":
        animations = mergeSort([...array]);
        break;
      case "shellSort":
        animations = shellSort([...array]);
        break;
      default:
        break;
    }
    animateSort(animations);
  };

  // Function to animate sorting based on the algorithm's output
  const animateSort = (animations) => {
    const arrayBars = document.getElementsByClassName("array-bar");
  
    for (let i = 0; i < animations.length; i++) {
      const isSwap = animations[i][2];
  
      if (selectedAlgorithm === "mergeSort") {
        // Merge Sort logic (already correct)
        if (i % 3 !== 2) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 3 === 0 ? "red" : "turquoise";
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
        // Bubble Sort logic (already correct)
        const [barOneIdx, barTwoIdx] = animations[i];
        setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
        }, i * 10);
      } else if (selectedAlgorithm === "shellSort") {
        // Shell Sort logic
        const [barOneIdx, barTwoIdx] = animations[i];
  
        if (!isSwap) {
          // Highlight bars being compared
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          setTimeout(() => {
            barOneStyle.backgroundColor = "red";
            barTwoStyle.backgroundColor = "red";
          }, i * 15);
  
          // Revert bar colors
          setTimeout(() => {
            barOneStyle.backgroundColor = "turquoise";
            barTwoStyle.backgroundColor = "turquoise";
          }, (i + 1) * 15);
        } else {
          // Swap bar heights
          setTimeout(() => {
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${barTwoIdx}px`; // barTwoIdx contains the new height
          }, i * 15);
        }
      }
    }
  };
  

  return (
    <div>
      <div className="navbar">
        <button onClick={() => setSelectedAlgorithm("bubbleSort")}>Bubble Sort</button>
        <button onClick={() => setSelectedAlgorithm("mergeSort")}>Merge Sort</button>
        <button onClick={() => setSelectedAlgorithm("shellSort")}>Shell Sort</button>
      </div>

      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value}px`, width: `${100 / array.length}%` }}
          ></div>
        ))}
      </div>

      <div className="controls">
        <button onClick={resetArray}>Generate New Array</button>
        <button onClick={visualizeSort}>
          Visualize {selectedAlgorithm.charAt(0).toUpperCase() + selectedAlgorithm.slice(1)}
        </button>
      </div>
    </div>
  );
};

export default Visualizer;
