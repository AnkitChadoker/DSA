/** Given an integer array nums of size N, sorted in ascending order with distinct values, and then rotated an unknown number of times (between 1 and N), find the minimum element in the array.
*
* Example 1
* Input : nums = [4, 5, 6, 7, 0, 1, 2, 3]
* Output: 0
* Explanation: Here, the element 0 is the minimum element in the array.
**/


/** BRUTE FORCE **/
/** simply iterate over the array by taking the initial min as Infinity and check for each element if its new min element **/

function findMin(arr){
	let min = Infinity;
	for(let i = 0; i < arr.length - 1; i++){
		min = Math.min(min, arr[i]);
	}
	return min;
	/**
	 * TC: O(n)
	 * SC: O(1)
	**/
}
//console.log(findMin([4, 5, 6, 7, 0, 1, 2, 3])); // 0


/** OPTIMAL APPROACH **/
/** Since we know array is sorted (roated) and we need to find for something in sorted array so we should be using binary search. and we know how can we eliminate the half array in the roated sorted array from our previous problems (roated-sorted-array-I etc.), we are gonna use the same approach here as well. we will be finding the sorted half of the array and it is obvious that the first element of the sorted array will be the smallest element of that sorted array, we would never find the smallert element than that element in that perticuler sorted array so we can take the first element of sorted array and challange our existing min and just eliminate the sorted half, like
 * 
 * 		[4, 5, 6, 7, 0, 1, 2, 3]
 * 		L = 0, H = 7, M = 3
 * 	
 *left half would be [4, 5, 6, 7] (including mid)
 * right half would be [7, 0, 1, 2, 3] (including mid)
 * 
 * we can see the left half is sorted so we can take the 4 as our min at this stage and eliminate the left half, now array would be
 * 		[0, 1, 2, 3]
 * 		L = 4, H = 7, M = 5
 * 
 * left half = [0, 1]
 * right half = [1, 2, 3]
 * 
 * basically both are sorted but as we first check the left half first so we will take that half again and take the 0 as our new min becuase its less than existing min (4) and eliminate left half again,
 * 
 *     [2, 3]
 * we will apply the same logic again though its clear that we will not get the min smaller than the existing 0, so i am not explaining further but the program will complete the entire array till low <= high.
**/

function optimalFindMin(arr){
	let min = Infinity;
	let low = 0; let high = arr.length - 1;

	while(low <= high){
		const mid = Math.floor((low + high) / 2);

		if(arr[low] <= arr[mid]){
			/** left half is sorted **/
			min = Math.min(min, arr[low]);
			low = mid + 1;
		} else {
			/** right half is sorted **/
			min = Math.min(min, arr[min]);
			high = min - 1;
		}
	}

	return min;

	/**
	 * TC: O(logn)
	 * SC: O(1)
	**/
}

//console.log(optimalFindMin([4, 5, 6, 7, 0, 1, 2, 3])); // 0