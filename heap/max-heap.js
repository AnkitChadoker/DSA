class MaxHeap {
  constructor() {
    this.data = [];
  }

  size() {
    return this.data.length;
  }

  isEmpty() {
    return this.data.length === 0;
  }

  top() {
    return this.size() > 0 ? this.data[0] : undefined;
  }

  push(val) {
    // push value at the very last
    this.data.push(val);

    // now we balance the heap by bubbling the value to as top as possible
    this._bubbleUp(this.size() - 1);
  }

  pop() {
    const len = this.size();
    if (len === 0) return undefined;
    if (len === 1) return this.data.pop();

    // take out top element
    const top = this.data[0];

    // not pick the last element and replace it with top element and then balance the heap by sinking this value as down as possible
    this.data[0] = this.data.pop();
    this._sinkDown(0);

    return top;
  }

  _bubbleUp(idx) {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);

      // we keep on bubble up the value as long as the value is greater than its parent
      if (this.data[parent] < this.data[idx]) {
        this._swap(parent, idx);
        idx = parent;
      } else break;
    }
  }

  _sinkDown(idx) {
    const len = this.size();

    while (true) {
      const leftChild = 2 * idx + 1;
      const rightChild = 2 * idx + 2;

      // we check each children of the idx and see how long we can push this temp. top (pushed the last value at top while popping value out of heap)
      let bestIdx = idx;

      if (leftChild < len && this.data[bestIdx] < this.data[leftChild]) {
        bestIdx = leftChild;
      }
      if (rightChild < len && this.data[bestIdx] < this.data[rightChild]) {
        bestIdx = rightChild;
      }

      if (bestIdx === idx) {
        break;
      }
      this._swap(idx, bestIdx);
      idx = bestIdx;
    }
  }

  _swap(idx1, idx2) {
    [this.data[idx1], this.data[idx2]] = [this.data[idx2], this.data[idx1]];
  }
}

const arr = [3, 2, 5, 6, 1, 2, 4];

const heap = new MaxHeap();
console.log(heap.top());

console.log(heap.size());

console.log(heap.isEmpty());

for (const num of arr) {
  heap.push(num);
}

console.log(heap.top());

console.log(heap.pop());

console.log(heap.top());

heap.push(11);

console.log(heap.top());

console.log(heap.size());

console.log(heap.isEmpty());
