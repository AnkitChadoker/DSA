/**
 * Given an integer array nums. Return the number of inversions in the array.
 * Two elements a[i] and a[j] form an inversion if a[i] > a[j] and i < j.
 *
 * It indicates how close an array is to being sorted.
 * A sorted array has an inversion count of 0.
 * An array sorted in descending order has maximum inversion.
 * 
 * Input: nums = [2, 3, 7, 1, 3, 5]
 * Output: 5 
 * Explanation:
	The responsible indexes are:
	nums[0], nums[3], values: 2 > 1 & indexes: 0 < 3
	nums[1], nums[3], values: 3 > 1 & indexes: 1 < 3
	nums[2], nums[3], values: 7 > 1 & indexes: 2 < 3
	nums[2], nums[4], values: 7 > 3 & indexes: 2 < 4
	nums[2], nums[5], values: 7 > 5 & indexes: 2 < 5
**/

/** BRUTE FORCE **/
/** 
 * we can simply take an element from the array and check against all the future elements at how many places it is greater and we increase the count at those times, at the end of the complete array iteration we can return the count
**/

function countInversion(arr){
	let count = 0;

	for(let i = 0; i < arr.length; i++){
		for(let j = i + 1; j < arr.length; j++){
			if(arr[i] > arr[j]) count++;
		}
	}

	return count;

	/**
	 * TC: O(n^2) near about
	 * SC: O(1)
	**/
}

console.log(countInversion([2, 3, 7, 1, 3, 5]));