export function shellSort(array) {
  const animations = [];
  const n = array.length;
  let gap = Math.floor(n / 2);

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      let temp = array[i];
      let j = i;

      // Compare and shift elements until the correct position is found
      while (j >= gap && array[j - gap] > temp) {
        // Push animations to compare elements (color them red)
        animations.push([j, j - gap, false]); // Comparison (no swap yet)
        animations.push([j, j - gap, false]); // Revert color

        // Push animation for swap
        animations.push([j, array[j - gap], true]); // Swap
        array[j] = array[j - gap]; // Update the array
        j -= gap;
      }

      // Insert the element at the correct position
      animations.push([j, j, false]); // Comparison for the insert position
      animations.push([j, j, false]); // Revert color
      animations.push([j, temp, true]); // Insert the element
      array[j] = temp;
    }
    gap = Math.floor(gap / 2); // Reduce the gap
  }

  return animations;
}
