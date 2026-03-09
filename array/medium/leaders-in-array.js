/**
	Given an integer array nums, return a list of all the leaders in the array.
	A leader in an array is an element whose value is strictly greater than all elements to its right in the given array. The rightmost element is always a leader. The elements in the leader array must appear in the order they appear in the nums array.

	Example 1
	Input: nums = [1, 2, 5, 3, 1, 2]
	Output: [5, 3, 2]
	Explanation:
	2 is the rightmost element, 3 is the largest element in the index range [3, 5], 5 is the largest element in the index range [2, 5]

	Example 2
	Input: nums = [-3, 4, 5, 1, -4, -5]
	Output: [5, 1, -4, -5]
	Explanation:
	-5 is the rightmost element, -4 is the largest element in the index range [4, 5], 1 is the largest element in the index range [3, 5] and 5 is the largest element in the range [2, 5]
**/


/** BRUTE FORCE **/
/** we can check for every element if there is any greater element to its right if yes meaninig its not a leader and if we do not find any greater element then the element is the leader and we push it into the leaders space, simple nested iteration **/

function leaders(arr){
	const leadersArr = [];

	for(let i = 0; i < arr.length; i++){
		let isLeader = true;
		/** we need to strictly check for the leaders to be strictly greater, even if any element is equal to its right meaning its not a leader */
		for(let j = i + 1; j < arr.length; j++){

			//** anytime we get the greater element than the i, meaning arr[i] is not a leader we break out of the array, no sence iterating till the end, and if we never go into this condition meaning i one of is the leaders

			if(arr[j] > arr[i]) {
				isLeader =  false;
				break;
			}
		}

		if(isLeader === true) leadersArr.push(arr[i]);
	}

	return leadersArr;
}

console.log(leaders([1, 2, 5, 3, 1, 2])); //output [5,3,2]