/*Definiton of singly Linked List
class ListNode {
    constructor(val = 0, next = null, child = null) {
        this.val = val;
        this.next = next;
        this.child = child;
    }
}
}
*/
class Solution {
    flattenLinkedList(head) {
        if(!head) return null;
        let temp = head;
        const pq = new MineMinHeap();

        while(temp){
            pq.insert(temp);
            temp = temp.next;
        }
        const dummy = new ListNode(-1);
        let T = dummy;

        while(pq.size()){
            const node = pq.removeMin();
            T.child = node;
            T = T.child;

            if(node.child) pq.insert(node.child);
        }

        return dummy.next;
    }
}


class MineMinHeap {
    constructor() {
        this.heap = [];
    }

    // Helper methods to get indices
    getParentIndex(i) { return Math.floor((i - 1) / 2); }
    getLeftChildIndex(i) { return 2 * i + 1; }
    getRightChildIndex(i) { return 2 * i + 2; }

    // Helper method to swap two elements in the heap
    swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    // Return the minimum element without removing it - O(1)
    peek() {
        if (this.heap.length === 0) return null;
        return this.heap[0];
    }

    // Insert a new value into the heap - O(log n)
    insert(value) {
        this.heap.push(value); // Push to the end
        this.heapifyUp(this.heap.length - 1); // Bubble it up to its correct spot
    }

    // Remove and return the minimum element - O(log n)
    removeMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop(); // Move the last element to the root
        this.heapifyDown(0); // Bubble it down to its correct spot

        return min;
    }

    // Maintain heap property when moving an element UP
    heapifyUp(index) {
        let currentIndex = index;
        let parentIndex = this.getParentIndex(currentIndex);

        // Compare .val properties instead of the whole object!
        while (currentIndex > 0 && this.heap[currentIndex].val < this.heap[parentIndex].val) {
            this.swap(currentIndex, parentIndex);
            currentIndex = parentIndex;
            parentIndex = this.getParentIndex(currentIndex);
        }
    }

    // Maintain heap property when moving an element DOWN
    heapifyDown(index) {
        let currentIndex = index;
        let leftChildIndex = this.getLeftChildIndex(currentIndex);
        let rightChildIndex = this.getRightChildIndex(currentIndex);
        let smallestIndex = currentIndex;

        const length = this.heap.length;

        // Compare .val properties here as well!
        if (leftChildIndex < length && this.heap[leftChildIndex].val < this.heap[smallestIndex].val) {
            smallestIndex = leftChildIndex;
        }

        if (rightChildIndex < length && this.heap[rightChildIndex].val < this.heap[smallestIndex].val) {
            smallestIndex = rightChildIndex;
        }

        if (smallestIndex !== currentIndex) {
            this.swap(currentIndex, smallestIndex);
            this.heapifyDown(smallestIndex);
        }
    }

    // Helper to get size
    size() {
        return this.heap.length;
    }
}