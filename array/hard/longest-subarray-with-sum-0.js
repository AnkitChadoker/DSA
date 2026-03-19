/**
 * We are given an array of integers and we need to find the length of the lonegest subarray with the sum 0.
 * 
 * arr = [-2, -1, 0, 1, 2]
 * output = 5
 * 
**/

													/** BRUTE FORCE **/
/* like all other sub array problem we can generate all posible sub arrays and check for the given constraints */

function LSAwith0(arr){
	let maxLen = 0;

	/** starting of sub array **/
	for(let i = 0; i < arr.length; i++){

		/** generating the sub array **/
		for(let j = i; j < arr.length; j++){
			let sum = 0;

			/** iterating over the sub array to sum the elements **/
			for(let k = i; k <= j; k++){
				sum += arr[k];
				if(sum === 0){
					maxLen = Math.max(maxLen, k - i + 1);
				}
			}
		}
	}

	return maxLen;

	/**
	 * TC: near about O(n^3)
	 * SC: O(1)
	**/
}

// console.log(LSAwith0([1, -1, 0, -2, -1, 0, 2, 1, 1])); //8



													/** BETTER SOLUTION **/

/** we can ignore the third loop as we we can get he sum of the elements while generating the sub array itself instead of first generate it and then again loop over it to get the sum **/

function betterLSAwith0(arr){
	let maxLen = 0;

	for(let i = 0; i < arr.length; i++){
		let sum = 0;

		for(let j = i; j < arr.length; j++){
			sum += arr[j];

			if(sum === 0){
				maxLen = Math.max(maxLen, j - i + 1);
			}
		}
	}

	return maxLen;

	/**
	 * TC: near about O(n^2)
	 * SC: O(1)
	**/
}

console.log(betterLSAwith0([1, -1, 0, -2, -1, 0, 2, 1, 1])); //8

