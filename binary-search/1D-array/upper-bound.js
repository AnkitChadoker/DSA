/**
 * Given a sorted array of nums and an integer target, write a program to find the upper bound of target.
 * The upper bound of target is defined as the smallest index i such that nums[i] > target.
 * If no such index is found, return the size of the array.
 *
 * Example 1
 * Input : n= 4, nums = [1,2,2,3], target = 2
 * Output:3
 * Explanation:
 * Index 3 is the smallest index such that arr[3] > target.
**/


														/** OPTIMAL SOLUTION **/

/** again similar to classic binary search problem take 2 pointers and find the mid and based on the condition cut short the array. **/
function upperBound(arr, target){
	let UB = arr.length;
	let left = 0;
	let right = UB - 1;

	while(left <= right){
		const mid = Math.floor((left + right)/2);

		if(arr[mid] > target){
			// we need minimum index where element is greater than target, so we are just checking for the greater element which is at smallest index.
			UB = Math.min(UB, mid);
			right = mid - 1;
		} else {
			left = mid + 1;
		}
	}

	return UB;

	/**
	 * TC: O(logn)
	 * SC: O(1)
	**/
}

console.log(upperBound([1,2,2,3], 2)) // 3