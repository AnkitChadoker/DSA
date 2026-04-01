/**
* Given an array nums sorted in non-decreasing order. Every number in the array except one appears twice. Find the single number in the array.
* 
*	Example 1
*	Input :nums = [1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6]
*	Output:4
*	Explanation: Only the number 4 appears once in the array.
**/

/** BRUTE FORCE **/
/** since we have already solved these kind of problem previously as well we can use the XOR (^) operrater which well eliminate all the duplicates and return the single element **/

function singleNonDuplicate(arr){
	let xor = 0;
	for(let i = 0; i < arr.length; i++){
		xor ^= arr[i];
	}
	return xor;
}

console.log(singleNonDuplicate([1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6])); // 4