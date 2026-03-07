/**
 	Given an array nums of n integers.
	Return the length of the longest sequence of consecutive integers. The integers in this sequence can appear in any order.

	Example 1
	Input: nums = [100, 4, 200, 1, 3, 2]
	Output: 4

	Explanation:
	The longest sequence of consecutive elements in the array is [1, 2, 3, 4], which has a length of 4. This sequence can be formed regardless of the initial order of the elements in the array.
*/

/** BRUTE FORCE **/
/** 
 	we can start iterating over the array and for each element we can start looking for the consecutiveness like our first (0th) element is 100 so we start seeing the next element which is 101 in the array using linear scanning and if get the 101 in the array we look for the 102 and keep incrementing the length of current consecutiveness and the the end of this consecutive sequence we challange out standing longest. 
**/

function longestConsecutiveSequence(arr){
	let longest = 0;

	for(let i = 0; i < arr.length; i++){
		
		let length = 1;
		let nextEle = arr[i] + 1;

		while(search(nextEle, arr)){
			length++;
			nextEle += 1;
		}

		longest = Math.max(length, longest);
	}

	return longest;

	/**
	 * TC: O(n * n) = ~ O(n^2) // linear iteration over main array and then for each array we are doing linear scanning in the array till me find the consecutiveness.
	 * SC: O(1) 
	**/
}

function search(needle, haystack){
	for(let i = 0; i < haystack.length; i++){
		if(haystack[i] === needle) return true;
	}
	return false;
}

console.log(longestConsecutiveSequence([100, 4, 200, 1, 3, 2, 101, 102, 103, 104]));