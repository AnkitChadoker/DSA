//** iterative approach */
function bubbleSort(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j <= i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

//** recursive approach */
function bubbleSortRecursive(arr, n = arr.length) {
  if (n <= 1) {
    return arr;
  }

  for (let i = 0; i < n - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    }
  }

  return bubbleSortRecursive(arr, n - 1);
}

console.log(bubbleSortRecursive([13, 20, 24, 46, 52, 9, 2]));
