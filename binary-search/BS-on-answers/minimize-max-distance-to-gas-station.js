/**
Given a sorted array arr of size n, containing integer positions of n gas stations on the X-axis, and an integer k, place k new gas stations on the X-axis.
The new gas stations can be placed anywhere on the non-negative side of the X-axis, including non-integer positions.
Let dist be the maximum distance between adjacent gas stations after adding the k new gas stations.
Find the minimum value of dist.

Your answer will be accepted if it is within 1e-6 of the true value.

Example 1
Input: n = 10, arr = [1, 2, 3, 4, 5, 6 ,7, 8, 9, 10], k = 10
Output: 0.50000
Explanation:
	One of the possible ways to place 10 gas stations is [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10].
	Thus the maximum difference between adjacent gas stations is 0.5.
	Hence, the value of dist is 0.5.
	It can be shown that there is no possible way to add 10 gas stations in such a way that the value of dist is lower than this.

Example 2
Input : n = 10, arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], k = 1
Output: 1.00000
Explanation:
	One of the possible ways to place 1 gas station is [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].
	New Gas Station is at 11.
	Thus the maximum difference between adjacent gas stations is still 1.
	Hence, the value of dist is 1.
	It can be shown that there is no possible way to add 1 gas station in such a way that the value of dist is lower than this. 
**/

/** BRUTE FORCE **/

function findMaxDistancePlace(arr, places){
	let maxDistance = -1;
	let index = -1;

	for(let i = 0; i < arr.length - 1; i++){
		const calcDistance = (arr[i + 1] - arr[i]) / (places[i] + 1);
		if(calcDistance > maxDistance){
			maxDistance = calcDistance;
			index = i;
		}
	}

	return index;
}


function gasStation(arr, k){
	let places = new Array(arr.length - 1).fill(0);
	for(let i = 1; i <= k; i++){
		const index = findMaxDistancePlace(arr, places);
		places[index] += 1;
	}

	let distance = 0;
	for(let i = 0; i < arr.length - 1; i++){
		distance = Math.max(distance, (arr[i + 1] - arr[i]) / (places[i] + 1))
	}

	return distance;

	/**
	 * TC: O(k * n) + O(n) 
	 * SC: O(1)
	**/
}

//console.log(gasStation([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10));


/** OPTIMAL APPRACH **/

function findMaxDistance(arr){
	let maxDistance = -1;
	for(let i = 0; i < arr.length - 1; i++){
		maxDistance = Math.max(maxDistance, arr[i + 1] - arr[i]);
	}
	return maxDistance;
}

function checkHowManyGasStationRequired(arr, distance){
	let totalRequired = 0;
	for(let i = 0; i < arr.length - 1; i++){
		let required = Math.floor((arr[i + 1] - arr[i]) / distance);
		if(required * distance === arr[i + 1] - arr[i]){
			required--;
		}
		totalRequired += required;
	}	

	return totalRequired;
}

function optimalGasStation(arr, k){
	let min = 0;
	let max = findMaxDistance(arr);

	while(max - min > 1e-6){
		const mid = (max + min) / 2;
		const required = checkHowManyGasStationRequired(arr, mid);

		if(required > k) min = mid;
		else max = mid;
	}

	return max;
}


console.log(optimalGasStation([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10));