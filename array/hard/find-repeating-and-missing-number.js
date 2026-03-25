/** 
 * Given an integer array nums of size n containing values from [1, n] and each value appears exactly once in the array, except for A, which appears twice and B which is missing.
 * Return the values A and B, as an array of size 2, where A appears in the 0-th index and B in the 1st index.
 * 
 *  Input: nums = [3, 5, 4, 1, 1]
 *	Output: [1, 2]
 *	Explanation: 1 appears two times in the array and 2 is missing from nums
**/



											/** BRUTE FORCE **/
/**
 * since we know that there can be only 1 to n elements so we iterate from 1 to n numbers and check in the array if the number is missing or appearing twice as soon as we get both the elements we return the result array. 
**/

function findMissingAndRepeatingNumber(arr, n){
	let missing = undefined;
	let repeating = undefined;

	for(let i = 1; i <= n; i++){
		for(let j = 0; j < arr.length; j++){
			let count = 0;
			if(i === arr[j]){
				count++;
			}
		}
		if(count === 0) missing = i;
		if(count === 2) repeating = i;
		if(missing && repeating) break;
	}

	return [repeating, missing];

	/**
	 * TC: O(n^2)
	 * SC: O(1)
	**/
}
//console.log(findMissingAndRepeatingNumber([1, 2, 3, 6, 7, 5, 7], 7));




											/** BETTER SOLUTION **/
/**
 * Since we know that there would be 1 to n numbers only so we can take the array of size n + 1 and prefilled with 0 (frequency of each element at the begining), and do a single iteration over the main array and update the frequency of each array element in the frequency array.
 * 
 * at the end check for element with frequency 0 and 2 and return the answer.
**/
function betterFindMissingAndRepeatingNumber(arr, n){
	const store = new Array(n + 1).fill(0);
	let missing = undefined;
	let repeating = undefined;

	for(let i = 0; i < arr.length; i++){
		store[arr[i]] += 1;
	}

	for(let i = 1; i < store.length; i++){
		if(store[i] === 0) missing = i;
		if(store[i] === 2) repeating = i;
		if(missing && repeating) break;
	}

	return [repeating, missing];

	/***
	 * TC: O(n) + O(n)
	 * SC: O(n)
	**/
}

//console.log(betterFindMissingAndRepeatingNumber([1, 2, 3, 6, 7, 5, 7], 7));




											/** OPTIMAL SOLUTION **/

/**
 *  For optimal solution we need to think out of the box here, since we need to values here lets call them X and Y and from basic maths we know that if we want to know the value of X and Y we can solve the linear equations like X - Y = A and X + Y = B and from there we can get the values of X and Y, so this intution we gonna use here.
 * 
 * lets see how can we generate this equations from our given data what all data we have here ??, we know we are given an array of elements, we are given in the problem itself that the array elements can only be 1 to n (n natural numbers) only.
 * so can we do something like this.
 * 
 * 		A = sum of n natural number - sum of the array elements  // X - Y = A
 * 
 * and for the second eqaution we know the formula as well (a^2 - b^2) = (a-b)(a+b), if we already have (a-b) we can get the a + b, so we can do like this 
 * 
 * 		B = sum of the square of n natural number - sum of the sqaure of all array elements // X + Y = B
 * 
 * and then after solving this 2 equationwe can get the values of X and Y and then simply iterate over the actual array onec to know which one is missing element and which one is repeating.
**/

function optimalFindMissingAndRepeatingNumber(arr, n){
	let sumOfN = 0;
	let sqaureOfN = 0;
	let sumOfArr = 0;
	let sqaureOfArr = 0;

	for(let i = 0; i < arr.length; i++){
		sumOfArr += arr[i];
		sqaureOfArr += arr[i] * arr[i];
	}	

	sumOfN = (n * (n + 1)) / 2;
	sqaureOfN = (n * (n + 1) * (2*n + 1)) / 6;

	let A = sumOfN - sumOfArr; // X - Y = A
	let B = (sqaureOfN - sqaureOfArr) / A; // (X^2 - Y^2) = (X + Y)(X - Y) , :: [(X^2 - Y^2) / (X - Y)] => X + Y = B

	x = (A + B)/2; // A + B = (X + Y) + (X - Y) => A + B = 2X => X = (A + B / 2), where A = X + Y, B = X - Y
	y = (B - A)/2; // B - A = (X + Y) - (X - Y) => B - A = 2Y => Y = (B - A)/ 2), where A = X + Y, B = X - Y


	/** to check which is repeating and which is missing between both x and y **/
	let repeating = undefined;
	let missing = undefined;
	for(let i = 0; i < arr.length; i++){
		if(arr[i] === x) { 
			repeating = x;
			missing = y;
		 	break;
		} else if(arr[i] === y) {
			repeating = y;
			missing = x;
			break;
		}
	}

	return [repeating, missing];

	/**
	 * TC: O(n) + O(n)
	 * SC: O(1)
	**/
}


console.log(optimalFindMissingAndRepeatingNumber([1, 2, 3, 6, 7, 5, 7], 7));