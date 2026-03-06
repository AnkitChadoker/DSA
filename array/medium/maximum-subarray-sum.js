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

//console.log(maxSubarraySum([2, 3, 5, -2, 7, -4]));

/** OPTIMAL APPROACH **/

/** KADANE'S ALGORITHM **/
/** according to the algorithm we iterate over the array and and keep on adding each element of the array into the sum and on each iteration we check against the largestSum as well if sum is greater than largestSUm we replace it and if any moment sum becomes less than 0 we reset it 0, becuase a negative sum can never help us find the larger sum. 
**/

function optimalMaxSubarraySum(arr){
	let largestSum = -Infinity;
	let sum = 0;

	let startAt = 0;
	let startIndex = -1;
	let endIndex = -1

	for(let i = 0; i < arr.length; i++){

		/** because if any point sum is 0 meaning we are starting the new subarray. **/

		if(sum === 0) {
			startAt = i;
		}

		sum += arr[i];

		if(sum > largestSum){
			largestSum = sum;

			/** only if new subarray has the sum larger than previous sub array sum then only we update the indexes of subarray **/
			startIndex = startAt;
			endIndex = i;
		}

		/** we are reseting the sum to 0 if anytime it reaches below 0 because if we carry the negative value in the next iteration, we will be in that much loss already instead of summing up we are reducing it, thats why if our sum at any point goes below 0 we are starting the new subarray from next iteration because till here we are already in loss adding this sub array element into the result would never give us the largest sum. **/

		if(sum < 0) { sum = 0; }
	}

	
	/** if we are asked to print the subarray as well which is giving us the largest sum, so below code is for that **/
	const subArray = [];
	for(let i = startIndex; i <= endIndex; i++){
		subArray.push(arr[i]);
	}
	console.log(subArray);


	return largestSum;

	/**
	 * TC: O(n) // for returning sub array it would be additional O(n) at worst if subarray is the array itself.
	 * SC: O(1) // for returning subb array it would be also O(n) at worst case, will be storing all the elements in the new array (subArray) 
	**/
}


console.log(optimalMaxSubarraySum( [-1, 2, 3, -1, 2, -6, 5]));