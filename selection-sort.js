//** iterative approach */
function selectionSort(arr) {
  for (let i = 0; i <= arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j <= arr.length - 1; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}

//** recursive approach */
function selectionSortRecursive(arr, i = 0) {
  if (i >= arr.length) {
    return arr;
  }

  let minIndex = i;
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[j] < arr[minIndex]) {
      minIndex = j;
    }
  }

  [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  return selectionSortRecursive(arr, i + 1);
}

console.log(selectionSort([9, 13, 20, 24, 46, 52]));
console.log(selectionSortRecursive([9, 13, 20, 24, 46, 52]));
