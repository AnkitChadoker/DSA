/**
 * Given a sorted array of nums consisting of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
 *
 *	Example 1
 *	Input: nums = [1, 3, 5, 6], target = 5
 *	Output: 2
 *	Explanation: The target value 5 is found at index 2 in the sorted array. Hence, the function returns 2.
**/

														/** OPTIMAl SOLUTION **/

/** This is the exact same problem as the lower bound if we observe carefully, we just need to either return the index where element is or if its not there we need to return the index where it can be inserted (lower bound: index where the element is either equal or greater than the target such that index is minimal.). **/

function searchInsertPosition(arr, target){
	let index = arr.length; // the element can be inserted at the last position at max.
	let left = 0;
	let right = index - 1;

	while(left <= right){
		const mid = Math.floor((left + right) / 2);
		if(arr[mid] === target) return mid;
		else if(arr[mid] > target){
			index = Math.min(mid, index);
			right = mid - 1;
		} else {
			left = mid + 1;
		}
	}

	return index;

	/**
	 * TC: O(logn)
	 * SC: O(1)
	**/
}


console.log(searchInsertPosition([1, 3, 5, 6], 5)) // 2