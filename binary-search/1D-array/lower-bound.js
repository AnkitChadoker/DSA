/**
 * Given a sorted array of nums and an integer x, write a program to find the lower bound of x.
 * 
 * The lower bound algorithm finds the first and smallest index in a sorted array where the value at that index is greater than or equal to a given target i.e. x.
 * If no such index is found, return the size of the array.
 *
 *	Example 1
 *	Input : nums= [1,2,2,3], target = 2
 *	Output: 1
 *	Explanation: Index 1 is the smallest index such that arr[1] >= target.
**/


														/** OPTIMAL SOLUTION **/

/** again similar to classic binary search problem take 2 pointers and find the mid and based on the condition cut short the array. **/

function lowerBound(arr, target){
	let LB = arr.length;
	let left = 0;
	let right = LB - 1;

	while(left <= right){
		const mid = Math.floor((left + right) / 2);

		if(arr[mid] >= target){
			// we need minimum index where element is greater than or equal to target, so we are just keep on checking for the element which is at smallest index.
			LB  = mid; 
			right = mid - 1;
		} else {
			left = mid + 1;
		}
	}

	return LB;

	/**
	 * TC: O(logn)
	 * SC: O(1)
	**/
}

console.log(lowerBound([1,2,2,3], 2)) // 1