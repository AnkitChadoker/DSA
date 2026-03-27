/**
 * 
 * Given a sorted array of integers nums with 0-based indexing, find the index of a specified target integer. If the target is found in the array, return its index. If the target is not found, return -1.
 *	Example 1
 *	Input: nums = [-1,0,3,5,9,12], target = 9
 *	Output: 4
 *	Explanation: The target integer 9 exists in nums and its index is 4
**/

														/** OPTIMAL APPROACH **/

/** since we know array is sorted so we can start by taking 2 pointers at the begining and at the end and then keep on deviding the array into half in order to find the element, like we can find the mid of the array and compare the mid element with the given target if the mid itself is the target we return immidiatly, if element is smaller than the target so ignore the part after the mid becuase array is sorted and if the target is less than our mid element there is no sence checking it after mid and if target is greater than the target we ignore the part before the mid for the same logic **/

function searchElementInSortedArray(arr, target){
	let left = 0;
	let right = arr.length - 1;

	while(left <= right){
		const mid = Math.floor((left + right) / 2);

		if(arr[mid] === target) return mid;
		else if(arr[mid] > target) {
			right = mid - 1;
		} else {
			left = mid + 1;
		}
	}

	return -1;
	/**
	 * TC: O(logn) // we are keep cutting down the array into half at each iteration
	 * SC: O(1)
	**/
}

console.log(searchElementInSortedArray([-1,0,3,5,9,12], 9)); // 4