/** we are given and array with target sum and we need to return the number of subarrays matching the target sum **/
/** arr = [1, -1, 0], target = 0
 * output = 3 // [1, -1, 0], [1,-1], [0]
 * 
 * arr = [0,0,0], target = 0
 * output = 6 //[0,0,0], [0,0], [0,0], [0], [0], [0]
**/

/** BRUTE FORCE **/
/** we can generate all posible subarrays and calc. there sum and if it matches the target we can increament the count. and the the end just return the count **/

function countSubarrWithTargetSum(arr, target){
	let count = 0;

	for(let i = 0; i < arr.length; i++){
		let sum = 0;
		for(let j = i; j < arr.length; j++){
			sum += arr[j];
			if(sum === target) count++;
		}
	}

	return count;

	/**
	 * TC: O(n^2)
	 * SC: O(1)
	**/
}

//console.log(countSubarrWithTargetSum([1, -1, 0], 0)); // 3


/** OPTIMAL SOLUTION **/

/** we can iterate over the array once taking the sum on each iteration and check on each iteration if the sum === target means that our one of the subarray and at the same time we keep on register the frequncies of the sum in the map if the sum already exists in the map we increment its frequency becuase there might be some case when (sum - target) matches at any point so we need all the frequencies of that sum.


 * arr = [1, -1, 0, 1, -1], target = 0
 * 
 * sum = 0, count = 0, map = []
 * 
 * (i) i = 1, sum would be 1 does not match the target do nothing, also nothing at the moment in the map, now add into the map = [ {1: 1} ]

 * (ii) i = -1, sum would be 0 matches the target do count++ (count = 1), do we have ((sum) 0 -  target (0)) = 0 in the map no we do not so do nothing, add the sum into the map as its already not in the map = [{ 1: 1 }, { 0: 1 }]

 * (iii) i = 0, sum would still be 0, matches the target again so do count++ (count = 2), do we have (0 - 0) = 0 in the map yes we do have so add the frequency in the count (count = 3) and since 0 already exists in the map update its frequency by 1 map = [{ 1: 1}, { 0: 2 }]

 * (iv) i = 1, sum would be 1, not eqaul to target do nothing, do we have (1-0) = 1 in the map yes we do have add its freqency to the count (count = 4), update the frequncy into map = [ {1: 2}, {0,2}]

 * (v) i = -1, sum would be 0 again which is equal to target so do count++ (count = 5), do we have (0 - 0) = 0 in the map yes we do have add its freuqency to the count (count = 7, becuase 0 has 2 frequncy), and updated 0's frequncy in the map = [{ 1: 2}, { 0: 3}]

 * **/

function optimalCountSubarrWithTargetSum(arr, target){
	let count = 0;
	const map = new Map();
	let sum = 0;

	for(let i = 0; i < arr.length; i++){
		sum += arr[i];

		if(sum === target) count++;

		if(map.has(sum - target)) count += map.get(sum - target);

		if(map.has(sum)){
			map.set(sum, map.get(sum) + 1);
		} else {
			map.set(sum, 1);
		}
	}

	return count;

	/** TC: O(n)
	 * SC: O(n)
	**/
}

console.log(optimalCountSubarrWithTargetSum([1, -1, 0, 1, -1], 0)); // 7