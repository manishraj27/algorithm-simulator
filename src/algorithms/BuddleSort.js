export function bubbleSort(array) {
    const animations = [];
    let n = array.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          // Swap and record animation
          animations.push([j, j + 1]);
          let temp = array[j]; 
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }
    return animations;
  }
  