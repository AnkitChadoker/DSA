/**
 * Given an integer array sorted in ascending order, write a funciton to search a target in arr. if target exists, then return the index, otherwise return -1. 
 * However, the array size is unknown to you. You may only access the array using an ArrayReader interface, where ArrayReader.get(k) return the element of the array at index k (0 base indexing).
 * 
 * 
 * You may assume all the integer in the array are less than 10000, and if you access the array out of bounds, ArrayReader.get will return 2147483647.
**/

/** Simulating the reader class **/
class ArrayReader{
	constructor(arr){
		this.arr = arr;
	}

	get(index){
		if(index >= 0 && index < this.arr.length){
			return this.arr[index];
		}

		return 2147483647
	}
}

				
				/** BRUTE FORCE **/

/** linear search for each index starting from 0 onwards till we either find the element or cross the target **/

function findElementInUnknownSize(reader, target){
	let i = 0;

	while(true){

		/* get the value of the index **/
		const val = reader.get(i);

		/** if the value matches the target return the index **/
		if(val === target) return i;

		/** if the returned value is greater than target return -1 **/
		if(val > target) return -1;

		i++;
	}

	/**
	 *TC: O(n) 
	 *SC: O(1)
	**/
}

// const arr = [-1, 0, 3, 5, 9, 12];
// const reader = new ArrayReader(arr);

// console.log(findElementInUnknownSize(reader, 9));


			/** OPTIMAL APPROACH **/

/** 
 * we do not know the size of array it can be anything, but we do know that array is sorted so we can apply the binary search,
 * but to apply binary search we need a seach space in which we need to find the element but here we do have the starting point 0th index but we do not know the upper boound of the array.
 * 
 * since the array is sorted so we can first find the range where the target element can potentially be and once we found the range we can apply BS on that.
 * 
 * we can initially take the range from 0 to 1 and check if target is lower than right element if its not we shift the search to next range by just replacing low = high and high = 2 * high, we keep on doing this until either we find the target element range or high hit the out of bound index in that case the reader would return 2147483647 which is certainly greater than the target so we would be out of loop and our range would be from previously set low to high, then we can perform the BS on this range.
**/

function optimalFindElementInUnknownSize(reader, target){
	let low = 0;
	let high = 1;

	/** to find the range to apply BS on, TC: O(logn) **/
	while(reader.get(high) <= target){
		low = high;
		high = 2 * high;
	}

	/** basic binary search **/
	while(low <= high){
		const mid = Math.floor( (low + high) / 2);
		const val = reader.get(mid);

		if(target === val) return mid;
		else if(val > target) high = mid - 1;
		else low = mid + 1;
	}

	return -1;

	/**
	 * TC: O(logn) + O(logn)
	 * SC: O(1)
	**/
}


const arr = [-1, 0, 3, 5, 9, 12];
const reader = new ArrayReader(arr);

console.log(optimalFindElementInUnknownSize(reader, 9));