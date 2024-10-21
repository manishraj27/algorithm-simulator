export function selectionSort(array) {
  const animations = [];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      // Push comparison animation (no swap)
      animations.push([j, minIndex, false]);

      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      // Push swap animation
      animations.push([i, minIndex, true]);

      // Perform the swap
      let temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
    }
  }

  return animations;
}
