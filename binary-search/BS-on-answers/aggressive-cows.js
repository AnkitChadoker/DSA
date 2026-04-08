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

/**
 * Since we need to arrange this aggressive cows, so we simply assume that the array will contain only unique integers, and the min. distance between any two stall position is minimal to be 1 unit and the max. distance can be the difference of the first stall and the last stall (max - min), we can only arrange the cows between these distance ranges only.now we have our distances (1 to max.).
 * now we need to check for each distance can we arrange our k cows by keeping min. of that particular distance, we need the distance to be as max. as possible that all cows can be arranged by keeping min. of that much distance between 2 cows.
 * but to be able to calculate distance between two position (coordinates) we need them to be unidirectional, like they should all be showing the one directional path. meaning if we try to calculate the distance of our example stalls:
 * 				[ 0, 3, 4, 7, 10, 9 ]
 *    distances:    3  1  3  3   -1  
 * 
 * we can not have this negative distance, that’s why first of all we make the stall position in increasing direction (sort the array).
 *   			[ 0, 3, 4, 7, 9, 10 ]
 *    distances:    3  1  3  2  1 
 * 
 * 
 * now we can try for each distance from the identified range (1 to max.) if we can place k cows by maintaining minimum of that distance (from 1 to max).
 * how should we check that?
 * 
 * 
 * 				    arr = [0,  3,  4,  7,  9,  10]
 * 
 * 			distance        Placements
 * 				
 * 			  1           C1  C2  C3  C4   					{ maintaining the min. distance of 1 between each two cows }
 * 			  2           C1  C2  X   C3   C4				{ maintaining the min. distance of 2 between each two cows}
 * 			  3           C1  C2  X   C3   X   C4  			{ maintaining the min. distance of 3 between each two cows}	
 * 			  4           C1  X   C2   X   C3   X  			{ by maintaining the min. distance of 4 we were not able to place 4 cows, thats why the max. possible ditance is 3}	
 * 
 * Some things are clear by above representation:
 *	(i) cow(1) will always be kept at first position.
 *	(ii) we can get the distance by just subtracting the current position from last placed stall.
 *	(iii) as soon as we find the distance where arrangement is not possible we return the (distance - 1).	
**/

/** helper function to find if cows can be arranged using certain distance. **/

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

/** we can linearly check for each range from { 1 to (max-min) } and as sson as we encounter the distance where the palcement can not be possible we return the previous distance **/

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
	 * TC: O(nlogn) + O((max postion of stall - min position of stall) * n)
	 * SC: O(1)
	**/
}

//console.log(aggresiveCows([0, 3, 4, 7, 10, 9], 4)) // 3


												/** OPTIMAL APPROACH **/

/** 
 * Since the distance range is sorted and we need to find the result among that range we can use BS on the range answers, initially min. will be pointing to the potential distance (feasible options) which can be the result and max. to the non feasible distances but at some point they start representing the opposite polarity and thats where we can return the max. becuase max. will be pointing to the answer.
 *
 * 
 * try doing dry run it will be more understandable.
**/

function optimalAggresiveCows(arr, k){
	/** sort to make the stall position uni direction **/
	arr.sort( (a, b) =>  a - b);

	/** there can be the min distance of 1 and the max distance can be of the diffrence between the far most stalls (last - first) between two cows **/
	let min = 1;
	let max = arr[arr.length - 1] - arr[0];

	while(min <= max){
		const mid = Math.floor( (min + max) / 2);
		if(canWePlaceKCows(arr, mid, k)){
			/** if we are able to arrange cows try to find even bigger distance which allows to placement **/
			min = mid + 1;
		} else {
			max = mid - 1;
		}
	}
	return max;

	/**
	 * TC: O(nlogn) + O((max postion of stall - min position of stall) * logn)
	 * SC: O(1)
	**/
}

console.log(optimalAggresiveCows([4, 2, 1, 3, 6], 2)) // 5