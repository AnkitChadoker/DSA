class MinHeap {
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
    this.data.push(val);
    this._bubbleUp(this.size() - 1);
  }

  pop() {
    const len = this.size();
    if (len === 0) return undefined;
    if (len === 1) return this.data.pop();

    const top = this.data[0];
    this.data[0] = this.data.pop();
    this._sinkDown(0);

    return top;
  }

  _bubbleUp(idx) {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.data[parent] > this.data[idx]) {
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

      let smallest = idx;
      if (leftChild < len && this.data[smallest] > this.data[leftChild]) {
        smallest = leftChild;
      }
      if (rightChild < len && this.data[smallest] > this.data[rightChild]) {
        smallest = rightChild;
      }

      if (smallest !== idx) {
        this._swap(idx, smallest);
        idx = smallest;
      } else {
        break;
      }
    }
  }

  _swap(i, j) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }
}

const arr = [3, 2, 5, 6, 1, 2, 4];

const heap = new MinHeap();
console.log(heap.top());

console.log(heap.size());

console.log(heap.isEmpty());

for (const num of arr) {
  heap.push(num);
}

console.log(heap.top());

console.log(heap.pop());

console.log(heap.top());

heap.push(0);

console.log(heap.top());

console.log(heap.size());

console.log(heap.isEmpty());
