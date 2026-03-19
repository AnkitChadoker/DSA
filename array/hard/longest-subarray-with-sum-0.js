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

//console.log(betterLSAwith0([1, -1, 0, -2, -1, 0, 2, 1, 1])); //8


													/** OPTIMAL SOLUTION **/

/** 
 * instead of iterating over the same array twice we can store the sum at the each iteration which can help us get the sub array with the target sum.
 * 
 * HOW WILL IT HELP US ??
 *  
 * lets say we  start iterating over the array and start adding each element one after another.
 * 
 * (i) at any position (index) we get sum equal to 0 that is directly one of our sub array we can directly challange the maxLen with (i+1) if that greater we replace it.
 * 
 * (ii) while storing sum we are also mapping the sum with the index, meaning the sum was that much at that index. so whenever we get the same sum as we have in the map already (not equal to zero, or we can entirely omit storing sum as 0 in the map.), meaninig from that index onwards till current index our entire traversal got 0 again thats why we got the same sum again, making sense !!
 * at index 0 we have sum = 1
 * at index 8 we have the sum = 1 again
 * 
 * and if we observe carefully the we will get 0 when we traverse from 1 to 8, meaning we can say our another sub array would be [-1, 0, -2, -1, 0, 2, 1, 1] of length 8 (current index - mapped index, because indexing start from 0 so will get the correct length). 
 * 
 * **/


function optimalLSAwith0(arr){
	let maxLen = 0;
	const map = new Map();
	let sum = 0;
	for(let i = 0; i < arr.length; i++){
		sum += arr[i];

		if(sum === 0){
			maxLen = Math.max(maxLen, i + 1);
		} else if(map.has(sum)){
			const length = i - map.get(sum);
			maxLen = Math.max(maxLen, length);
		} else {
			map.set(sum, i);
		}
	}
	
	return maxLen;

	/**
	 * TC: O(n)
	 * SC: O(n)
	**/
}

console.log(optimalLSAwith0([1, -1, 0, -2, -1, 0, 2, 1, 1])); //8
