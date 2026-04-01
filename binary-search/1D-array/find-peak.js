/**
* 
* Given an array arr of integers. A peak element is defined as an element greater than both of its neighbors.
*
* Formally, if arr[i] is the peak element, arr[i - 1] < arr[i] and arr[i + 1] < arr[i].
*
* Find the index(0-based) of a peak element in the array. If there are multiple peak numbers, return the index of any peak number.
*
*
* Note:
* ou may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.
*
* Example 1
* Input : arr = [1, 2, 3, 4, 5, 6, 7, 8, 5, 1]
* Output: 7
* Explanation: In this example, there is only 1 peak that is at index 7.
*
* Example 2
* Input : arr = [1, 2, 1, 3, 5, 6, 4]
* Output: 1
* Explanation: In this example, there are 2 peak numbers at indices 1 and 5. We can consider any of them.
*/

/** BRUTE FORCE **/
/**
 *  we can simply iterate over the array and check for each element if its greater than its neighbors.
 *  bit we need to take care of few edge cases as well,
 *  (i) like the 0th element will not have the previous index, though we are said to consider it as -∞, so if out 0th element is greater than the next index its our peak becuase it by default greater than the -∞.
 *  (ii) similarly our last element will not have the next element, though again we are said to consider it as -∞, so if its greater than n-2th element thats our peak.
 *  (iii) if array only has the single element then by default it would be our peak beacause its neighbours would be -∞.
 * 
**/

function findPeak(arr){
	if(arr.length === 1) return 0;
	if(arr[0] > arr[1]) return 0;
	if(arr[arr.length - 1] > arr[arr.length - 2]) return arr.length - 1;

	for(let i = 1; i < arr.length - 1; i++){
		if(arr[i - 1] < arr[i] && arr[i] > arr[i + 1]){
			return i;
		}
	}

	return -1;

	/**
	 * TC: O(n)
	 * SC: O(1)
	**/
}

console.log(findPeak([1, 2, 1, 3, 5, 6, 4])); // 1
 