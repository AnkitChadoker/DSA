/** we are given an array an we need to return the subarray with the largest sum and return the sum of the elements present in that subarray **/

/*
	arr = [2, 3, 5, -2, 7, -4]
	output = 15 // [2, 3, 5, -2, 7]
*/

/** BRUTE FORCE **/
/* we can again try all possible subarrays (like we did in longest subarray with target sum problem) and try to find the maximum sum of the sub arrays, additionally we can maintain the start and end index of that perticuler subarray if problem setter asks follow up question to print the subarray we can use these pointers to return that sub array as well */

function maxSubarraySum(arr){
	let largestSum = -Infinity;
	let startIndex = -1;
	let endIndex = -1;

	for(let i = 0; i < arr.length; i++){
		let sum = 0;
		for(let j = i; j < arr.length; j++){
			sum += arr[j];
			if(sum > largestSum){
				largestSum = sum;
				startIndex = i;
				endIndex = j;
			}
		}
	}

	console.log([startIndex, endIndex]);
	return largestSum;

	/**
	 * TC: O(n^2)
	 * SC: O(1)
	**/
}

console.log(maxSubarraySum([2, 3, 5, -2, 7, -4]));