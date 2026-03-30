/** 
 * Given an integer array nums, sorted in ascending order (with distinct values) and a target value k. The array is rotated at some pivot point that is unknown. Find the index at which k is present and if k is not present return -1.

 * Example 1
 * Input : nums = [4, 5, 6, 7, 0, 1, 2], k = 0
 * Output: 4
*/

/** BRUTE FORCE **/

/* simply iterate over the array linearly and as soon as we intercept the element we return the index otherwise return -1 at the end **/

function searchRSA(arr, k){
	for(let i = 0; i < arr.length; i++){
		if(arr[i] === k) return i;
	}
	return -1;

	/**
	 * TC: O(n)
	 * SC: O(1)
	**/
}

console.log(searchRSA([4, 5, 6, 7, 0, 1, 2], 0)) // 4