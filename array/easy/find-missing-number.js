//** we are given an array containing natural number (not necessarily in sorted order) till n except one missing number we need to find that missing number **//
//** arr = [1,2,4,5,6], n = 6 **//
//** output = 3 **//

//** BRUTE FORCE **//

function findMissingNumber(arr, n){
	//** we can loop through the n numbers and check for each number if it exists in the given array or not **//

	for(let i = 1; i <= n; i++){
		let missing = true;
		for(let j = 0; j < arr.length; j++){
			if(arr[j] === i){
				missing = false;
				break;
			}
		}

		if(missing === true) return i;
	}

	/*
		TC: O(n * n) approx,
		SC: O(1)
	*/
}

//console.log(findMissingNumber([1,2,8,4,5,6,3], 8)); // 7


/** BETTER APPROACH **/
function betterFindMissingNumber(arr, n){
	/* since we know there will be only one number which will be missing from 1 to n, so we can create an array of (n + 1) elements with initial value as 0 and we can go through entire array once and mark the value as 1 for each element of array and only 1 element would be left with count as 0 and thats our guy.  */

	const freqencyArr = new Array(n+1).fill(0);

	for(let i = 0; i < arr.length; i++){
		freqencyArr[arr[i]] += 1;
	}

	for(let i = 1; i < freqencyArr.length; i++){
		if(freqencyArr[i] === 0) return i;
	}

	return -1;

	
	/*
		TC: O(2n), because O(n) for looping once to update the counter, additionaly looping over the freqencyArr to return the response so O(n) as well. 
		SC: O(n), to create an array to keep track of counter (frequency). 
	*/

}

//console.log(betterFindMissingNumber([1,2,3,4,5,6,7], 8)); // 8


//** OPTIMAL SOLUTION **/
/* There are two optimal solution are posible */

/* (i) using sum of n numbers */

/** we now that we will be given an array of n natural numbers except for one missing number and we know that we can get the sum of n natural number using formula [ (n* (n+1)) / 2 ], and if we minus the sum of all the given array elements from the sum of n natural number we will be left with missing number only. **/

function findMissingNumberSummision(arr, n){
	const sumOfN = (n* (n+1))/ 2;
	let sumOfArray = 0;
	
	for(let i = 0; i < arr.length; i++){
		sumOfArray += arr[i]
	}
	return sumOfN - sumOfArray;

	/*
		TC: O(n), to sum all the array elements,
		SC: O(1)
	*/
}

//console.log(findMissingNumberSummision([1,2,8,4,5,6,7], 8)); // 3


/* (ii) using XOR operator */

/** lets first understand some basic opration of XOR (^) operator **/
//** if we xor to same elements the result will be always 0, like 2 ^ 2 = 0, 5 ^ 5 = 0. **//
//** and if we xor any element with 0 it will return the same element itself like 2 ^ 0 = 2, 0 ^ 3 = 3. **//
//** lets say we have 2 ^ 2 ^ 3 ^ 5 ^ 5 this will result in 3, why because 2 ^ 2 would become 0 and same 5 ^ 5 would be 0, so remaining 0 ^ 3 ^ 0 would be 3 as we know anything xor with 0 will be that element itslef, lets now try to solve the problem using xor properties. **//

function findMissingNumberXOR(arr, n){
	let xorOfN = 0;
	for(let i = 1; i <= n; i++){
		xorOfN ^= i;
	}

	/** xorOfN would be like 0 ^ 1 ^ 2 ^ 3 ^ 4 ^ 5 ^ 6 ^ 7 ^ 8 **/

	let xorOfArr = 0;
	for(let i = 0; i < arr.length; i++){
		xorOfArr ^= arr[i];
	}

	/** xorOfArr would be like 0 ^ 1 ^ 2 ^ 8 ^ 4 ^ 5 ^ 6 ^ 7 */

	return xorOfN ^ xorOfArr;

	/** (0 ^ 1 ^ 2 ^ 3 ^ 4 ^ 5 ^ 6 ^ 7 ^ 8 ^ 0 ^ 1 ^ 2 ^ 8 ^ 4 ^ 5 ^ 6 ^ 7) everything will be cancel out except the remaining one element which is (3) in this case. */

	/*
		TC: O(2n), to XOR all the array elements and another loop to xor the all n natural numbers, but we can also do it in single loop if we observer carefully. like below and the reduces TC would be O(n),
		SC: O(1)
	*/
}

function optimalFindMissingNumberXOR(arr, n){
	let xorOfN = 0;
	let xorOfArr = 0;

	for(let i =0; i < arr.length; i++){
		xorOfN ^= i + 1;
		xorOfArr ^= arr[i];
	}

	/** becuase loop will run till n-1 only, so the remaining n we will have to add additionaly **/
	xorOfN ^= n;

	return xorOfN ^ xorOfArr;
}

console.log(optimalFindMissingNumberXOR([1,2,8,4,5,6,7], 8)); // 3
