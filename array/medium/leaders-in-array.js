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

	/**
	 * TC: O(n^2)
	 * SC: O(n) // if array is sorted in descending order all the elements will be leaders.
	**/
}

//console.log(leaders([1, 2, 5, 3, 1, 2])); //output [5, 3, 2]


/** OPTIMAL APPROACH **/
/** we will need the extra space to represent the leaders of the original array, so we can optimize it based on TC only, since its already O(n^2) in brute approach we can reduce it to min of O(n) because we need to iterate over the array atleast once to know the leaders **/

/** Here is the insight since we know the last element of the array will always be the leader no matter how small it is, so we already have a leader, now for the rest of the elements we know that if there is no greater element than the element it is the leader.
so what we can so it we can start the iteration from behind taking the last element as our first leader than we move left considering as the maximum element and when we move to the second last element if its greater than the last element meanining it is the leader and we can replace the maximum element with the second last element to challange the next leader, we keep on doing that and we will get our leaders. 
	
	SIMPLE LOGIC:: in order for any element to be the leader it must be greater than the maximum element we have encountered till now.

but here is a minor catch since we are iterating from behind the leaders array would be filled from behind as well but according to the problem we must maintain the order of the elements as per the original array, so we need to reverse the leaders array at the end and then return the leaders array 
**/

function optimalLeaders(arr){
	let max = arr[arr.length-1];
	const leadersArr = [max];

	for(let i = arr.length - 2; i >= 0; i--){
		if(arr[i] > max){
			leadersArr.push(arr[i]);
			max = arr[i];
		}
	}

	// reverse leaders array
	let left = 0;
	let right = leadersArr.length - 1;

	while(left < right){
		[leadersArr[left], leadersArr[right]] = [leadersArr[right], leadersArr[left]]
		left++;
		right--;
	}

	return leadersArr;

	/**
	 * TC: O(n) + O(n/2) // iteration + reverse
	 * SC: O(n)
	**/
}

console.log(optimalLeaders([-3, 4, 5, 1, -4, -5])); //output [ 5, 1, -4, -5 ]