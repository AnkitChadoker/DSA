//** iterative */
function insertionSort(arr) {
  for (let i = 0; i <= arr.length - 1; i++) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
      j--;
      console.log(
        "for sorted array this will never run thats why for best case it is O(n).",
      );
    }
  }
  return arr;
}

//** recursive */
function insertionSortRecursive(arr, i = 0) {
  if (i >= arr.length) {
    return arr;
  }
  let j = i;
  while (j > 0 && arr[j - 1] > arr[j]) {
    [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
    j--;
  }
  return insertionSortRecursive(arr, i + 1);
}

console.log(insertionSort([9, 13, 20, 24, 46, 52]));
