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
}
console.log(findMin([4, 5, 6, 7, 0, 1, 2, 3])); // 0