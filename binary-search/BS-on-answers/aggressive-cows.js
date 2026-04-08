/**
* Given an array nums of size n, which denotes the positions of stalls, and an integer k, which denotes the number of aggressive cows, assign stalls to k cows such that the minimum distance between any two cows is the maximum possible. Find the maximum possible minimum distance.
*
*
* Example 1
* Input: n = 6, k = 4, nums = [0, 3, 4, 7, 10, 9]
* Output: 3
* Explanation: The maximum possible minimum distance between any two cows will be 3 when 4 cows are placed at positions [0, 3, 7, 10]. Here the distances between cows are 3, 4, and 3 respectively.
In no manner can we increase the minimum distance beyond 3.
*
* Example 2
* Input : n = 5, k = 2, nums = [4, 2, 1, 3, 6]
* Output: 5
* Explanation: The maximum possible minimum distance between any two cows will be 5 when 2 cows are placed at positions [1, 6]. 
**/

/** INTUITION **/

function canWePlaceKCows(arr, distance, k){
	let placed = 1;
	let lastStall = arr[0];

	for(let i = 1; i < arr.length; i++){
		if(arr[i] - lastStall >= distance){
			lastStall = arr[i];
			placed += 1;
		}
	}
	return placed >= k;
}

													
													/** BRUTE FORCE **/

function aggresiveCows(arr, k){
	arr.sort( (a, b) => a - b);

	let min = 1;
	let max = arr[arr.length - 1] - arr[0];
	let answer = min;

	for(let i = min; i <= max; i++){
		if(canWePlaceKCows(arr, i, k)){
			answer = i;
		} else {
			break;
		}
	}

	return answer;

	/**
	 * TC: O(nlogn) * O(max) * O(n)
	 * SC: O(1)
	**/
}

console.log(aggresiveCows([0, 3, 4, 7, 10, 9], 4)) // 3