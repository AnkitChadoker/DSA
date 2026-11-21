class Heap {
  constructor(comparator) {
    this.data = [];
    this.comparator = comparator;
  }

  size() {
    return this.data.length;
  }

  isEmpty() {
    return this.size() === 0;
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
      if (this.comparator(this.data[idx], this.data[parent]) < 0) {
        this._swap(parent, idx);
        idx = parent;
      } else break;
    }
  }

  _sinkDown(idx) {
    const len = this.size();

    while (true) {
      const LC = 2 * idx + 1;
      const RC = 2 * idx + 2;

      let bestIdx = idx;
      if (LC < len && this.comparator(this.data[LC], this.data[bestIdx]) < 0) {
        bestIdx = LC;
      }

      if (RC < len && this.comparator(this.data[RC], this.data[bestIdx]) < 0) {
        bestIdx = RC;
      }

      if (bestIdx !== idx) {
        this._swap(idx, bestIdx);
        idx = bestIdx;
      } else {
        break;
      }
    }
  }

  _swap(idx1, idx2) {
    [this.data[idx1], this.data[idx2]] = [this.data[idx2], this.data[idx1]];
  }
}

const arr = [3, 2, 5, 6, 1, 2, 4];

const heap = new Heap((a, b) => b - a); // max heap

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
