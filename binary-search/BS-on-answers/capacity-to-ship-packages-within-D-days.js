/**
* You are given an array weights where weights[i] represents the weight of the i-th package on a conveyor belt. All the packages must be shipped in the order given from one port to another within days days.
*
* Each day, the ship can carry a contiguous sequence of packages, as long as the total weight does not exceed its maximum capacity.
* 
* Your task is to find the minimum possible capacity of the ship so that all packages can be shipped within the given number of days.
*
* Example 1
* Input: weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], days = 5
* Output: 15
* Explanation: Minimum ship capacity = 15. One way to ship in 5 days:
* Day 1: 1 + 2 + 3 + 4 + 5 = 15
* Day 2: 6 + 7 = 13
* Day 3: 8
* Day 4: 9
* Day 5: 10
*
* No day exceeds capacity 15 and all packages are shipped in order in 5 days.
*
* Example 2
* Input: weights = [3, 2, 2, 4, 1, 4], days = 3
* Output: 6
* Explanation: One possible division with capacity 6:
*
* Day 1: 3 + 2 = 5
* Day 2: 2 + 4 = 6
* Day 3: 1 + 4 = 5
*
* All packages shipped in order within 3 days.
**/

/** INTUITION **/
/**
* we are given array of n products and we need to pick products in contiguous fashion, we can not pick products randomly. now lets say we are given below array
*	[3, 2, 2, 4, 1, 4] and days = 3

* if we take the ship capacity as 100, we will be able to ship all the products in 1 day only, because 3+2+2+4+1+4 = 16 <= 100, which can be our answer, even if we take the capacity as 50 we would still be able to do it in a single day, but since we want the minimum possible capacity, so if the ship capacity would be 16 we can still deliver all the products within a day. and from 16th day onwards this will be true for every day, but since we want our range data to be as minimal as possible we can take 16 (sum of all products weight) as our max. capacity.
*
* now for min capacity we can start with 1, lets check for 1 as a ship capacity.
*
* [ 3, 2, 2, 4, 1, 4 ]
*	^
*	X
*
* we can not even pick our first product for the capacity of 1, and this will be true for capacity 2 also, now lets take capacity as 3.
*
* days: (1) (2)  (3) X
*      [ 3,  2,   2, 4,  1,  4 ]
*
* we were able to ship 3 products in 3 days but the 4th product has the weight greater than the capacity itself. so this can also not be feasible option.
*
* now lets check for capacity 4.
*
* days: (1)   (2)  (3) (4) (5)
*      [ 3,  2, 2,  4,  1,  4 ]
*
* yes for the capacity of 4 we were able to ship all the products, so 4 can be our min. capacity of the identified range (which is nothing but the max ele of the array).
*
* so this way we have our range of capacity:
*
* 			low = max. ele. of array
*			high = sum of all ele.
*
* we need a helper function to check in how many days the products will be shipped for certain capacity.
**/


						/** HELPER FUNCTION **/

function countDays(arr, capacity){
	// we will start with day 1 and lest see how many products can be delivered on that day.
	let days = 1; let weight = 0;
	for(let i = 0; i < arr.length; i++){
		// first check if this product can be delivered on the same day.
		if(arr[i] + weight <= capacity){
			weight += arr[i];
		} else {
			// otherwise deliver the product on the next day.
			days += 1;
			weight = arr[i];
		}
	}

	return days;
}

								/** BRUTE FORCE **/

function shipWithinDays(weights, days){
	let minCapacity = Math.max(...weights);
	let maxCapacity = weights.reduce((weight, sum) => sum + weight, 0);

	for(let i = minCapacity; i <= maxCapacity; i++){
		if(countDays(weights, i) <= days){
			return i;
		}
	}

	return -1;
}

//console.log(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)) // 15


								/** OPTIMAL APPROACH **/
/**
 * we now have a sorted range of capacities and need to find the min. possible capacity such that all the products can be shipped under given days, so we can use binary search here, thoough there can be many feasible and non-feasible options available but we need to find the smallest feasible option so we will keep on looking for the min. capacity which satifies the constraints.
 * 
 * 	 weights = [1,2,3,4,5,6,7,8,9,10]
 *     range = [10, 11, 12, 13, 14, 15, 16,........., 54, 55];
 * 
 * all the smaller capacity than 15 are non feasible and all greater capacity than 15 are feasible but we need min. possible capacity thats why we would look for minimal capacity till possible, lets check for 14 in that case
 * 		
 *      days    = [    (1)   ,  (2), (3), (4), (5), (6)]
 * 		weights = [1, 2, 3, 4, 5, 6,  7,   8,   9,  10 ]
 * 
 * so with capacity 14 we will need atleast 6 days to deliver all the products which is outside of our given days thats why its non-feasible option, and 15 onwards we can deliver all the products in the given days thats why those are feasible options.
**/		

function optimalShipWithinDays(weights, days){
	let minCapacity = Math.max(...weights);
	let maxCapacity = weights.reduce( (weight, sum) => sum + weight, 0);

	while(minCapacity <= maxCapacity){
		const mid = Math.floor(minCapacity + (maxCapacity - minCapacity) / 2); // best practice
		const estimatedDays = countDays(weights, mid);
		if(estimatedDays <= days){
			maxCapacity = mid - 1;
		} else {
			minCapacity = mid + 1;
		}
	}
	// using opposite polarity concept.
	return minCapacity;
}


console.log(optimalShipWithinDays([3, 2, 2, 4, 1, 4], 3)) // 6
