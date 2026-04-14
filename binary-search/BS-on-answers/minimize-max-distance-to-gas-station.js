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

/** INTUITION **/
/**
 * we are given an array which represents the position of gas stations and we are asked to place another k gas stations such that the max. distance between any two gas stations can be min.
 * Suppose we are given an array like 
 * 			[1, 7] 
 * and asked to place 2 more gas stations such that the distance between any two gas stations can be min, like currently we have the max distance is 6 (7-1).
 * now one thing is clear that if we place the new gas station at the array edges like [0, 1, 7, 8], this would do nothing because still the max. length btw any two gas station is 6.
 * So we need to place this new gas stations in between the array, that way we can minimize the distance.
 * 
 * Let's take another example to understand deeply.
 * 					
 * 			arr = [1, 13, 17, 23], k = 5
 * 
 * we need to place 5 new gas stations such that the max. distance can be minimized. 
 * and we can not just place all 5 at one go we need to place them one by one.
 * like wherever the distance is max, we can place new gas station to min. the distance btw adjacent gas stations. 
 * like here we have max distance as 12 btw 1 and 13 so we can place a new gas station between them first of all.
 * And we know we only have 3 meaningful places (between each indices in the array) where we can place the new gas station so we can keep the track of each place, like how many new gas stations are placed there.
 * 
 * 					[ 0 | 0 | 0 ]
 * 
 * now lets place first gas station btw 1 and 13.
 * 					
 * 					   (i)
 * 			[ 1 --(6)-- * --(6)-- 13 --(4)-- 17 --(6)-- 23 ]
 * 			
 * 			[ 1 | 0 | 0 ]
 * 
 * we have placed one gas station at place (i) and now the max. distance is 6. 
 * let's place another one. We are not updating the real array by placing this new values because that would be heavy operation to manage all the indexes. then how are we knowing the distances between each ?
 * though we are managing the placements we are getting the distance through that only like we have 1 placed gas station between 1 and 13.
 * 		
 * 			So: 13 - 1 / 1 + 1 = 12/2 = 6
 * 
 * we divide the distance by the sections which will be created by placing gas stations.
 * 	
 * 				1 --- (sec 1) --- (*) --- (sec 2) --- 13 
 * 
 * 					13 - 1 / 2 = 6
 * 
 * If we would have placed 2 gas stations there we would divide by 3 because it would have created 3 sections.
 * 
 * 				1 --- (sec 1) --- * --- (sec 2) --- * --- (sec 3) --- 13
 * 
 * this way we get the distances between 2 adjacent gas stations.
 * 
 * now let's place 3rd, 4th, and last (5th).
 * 
 *                     (i)      (ii)      (iii)                 (iv)                 (v) 
 * 			[ 1 --(3)-- * --(3)-- * --(3)-- * --(3)-- 13 --(2)-- * --(2)-- 17 --(3)-- * --(3)-- 23 ]
 * 
 * so the max. distance is now 3 after placing all 5 gas stations, which is our answer.
 * 
**/

									
											/** BRUTE FORCE **/

/**
 * we can put each gas station one by one and we aare first finding the place where the distance between 2 adjacent gas stations is maximum and then we are placing the new gas station there
 * 
**/

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


												/** Better Solution **/

/**
 * every time we are looking for the max distance indices, 
 * which is causing us (k * n) T.C. instead we can use a priority queue 
 * data structure (max. heap) which by default maintains the highest ele. 
 * at top using only (logn) T.C. so instead of scanning through the array each time 
 * we could just pick the top ele. from PQ, and also at the end instead of 
 * finding max. distance linearly we can just return the root of max. heap 
 * (top ele. of PQ).
 * * But J.S. does not have any predefined class or object for this, so we 
 * have to manually create that.
 */

class maxHeap{
	constructor(){
		this.heap = [];
	}

	/* insert ele. into heap */
	push(value){
		this.heap.push(value);
		this._heapifyUp();
	}

	/* remove and return the root (top) element */
	pop(){
		if(this.heap.length === 0) return null;
		const max = this.heap[0];
		const end = this.heap.pop();
		if(this.heap.length > 0){
			this.heap[0] = end;
			this._heapifyDown();
		}
		return max;
	}

	/* return the root (top) element without removing it */
	top(){
		return this.heap[0];
	}

	/* return the number of element in the heap */
	size(){
		return this.heap.length;
	}

	/* Maintain the max heap after insertion */
	_heapifyUp(){
		let index = this.heap.length - 1;
		while(index > 0){
			const parentIdx = Math.floor((index - 1) / 2);
            if (this.heap[index][0] <= this.heap[parentIdx][0]) break;
            [this.heap[parentIdx], this.heap[index]] = [this.heap[index], this.heap[parentIdx]];
            index = parentIdx;
		}
	}


	/* Maintain the max heap after removal */
	_heapifyDown(){
		let index = 0;
		const length = this.heap.length;
		while(true){
			let left = 2 * index + 1;
			let right = 2 * index + 2;
			let largest = index;

			if(left < length && this.heap[left][0] > this.heap[largest][0]) largest = left;
			if(right < length && this.heap[right][0] > this.heap[largest][0]) largest = right;
			if(largest === index) break;

			[this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
			index = largest;
		}
	}

}

function betterGasStation(arr, k){
	let places = new Array(arr.length - 1).fill(0);
	let PQ = new maxHeap();

	for(let i = 0; i < arr.length - 1; i++){
		const distance = arr[i + 1] - arr[i];
		PQ.push([distance, i]);  // [distance, index]
	}

	for(let i = 1; i <= k; i++){
		const [distance, index] = PQ.pop();
		places[index] += 1;

		/** Recalculate the distance for the index again **/
		const diff = arr[index + 1] - arr[index];
		const length = diff/(places[index] + 1);
		PQ.push([length, index]);
	}

	return PQ.top()[0];

	/**
	 * T.C: O(n*logn + k*logn) (for inserting n distance in PQ, for placing each gas station)
	 * S.C: O(n-1) + O(n-1) (for PQ and placed array) 
	**/
}

//console.log(betterGasStation([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10)); // 0.5


										
											/** OPTIMAL APPRACH **/

/**
 * even after the above T.C. further optimize it, if we are required to bring down the T.C. to somewhere O(logn) and we know that BS can offer that, also if we see the problem it says that array is sorted and we need to find the min(max), which is similar to BS on answer problem. So first of all we need to find the search space, 
 * 
 * can we directly say the upper bound of our search space is nothing but the max. distance btw any two gas station.
 * 			
 * 				[1, 13, 17, 23] 
 * 
 * 	max distance is 12. Since we know we are only placing the new gas station in-between the array, so distance can not be greater than the max. 
 * 		we know that if all the gas stations are at the same coordinates meaning.
 * 	
 *  			[5, 5, 5, 5]
 *
 * then the distance would be 0, and also distance can never be negative so we can take 0 as our lower bound.
 * 	
 * 				range -> [0 - max]
 * 
 * though we found our answer range, but we can not directly apply linear search on it, because the answer can be a floating number like 0.50000 and problem also stated that the answer be accepted till 6 decimal number 1e-6.so if we do linear search from 0 to 1 only, we need to check for (exp. purpose only) 0.000001, 0.000002 etc and it could go on for millions of times, that's why linear search is directly out of equation.
 * 
 * and for binary search also we can not use generic way like
 * 		
 * 		(i) low <= high
 * 		(ii) mid + 1
 * 		(iii) mid - 1
 * 
 * because we would be losing so much values in between instead we would be just doing
 * 
 * 		high = mid or low = mid
 * 
 * and for condition we would do 
 * 		high - low > 1e-6
 * 
 * meaning if there are still 1e-6 values left for search, like below
 * 			
 * 			0.000268 > greater than 1e-60
 * 			
 * 			but if 0.00000091 < less than 1e-6
 * 			we are way too close so we can just neglect them.
 * 
**/

function findMaxDistance(arr){
	let maxDistance = -1;
	for(let i = 0; i < arr.length - 1; i++){
		maxDistance = Math.max(maxDistance, arr[i + 1] - arr[i]);
	}
	return maxDistance;
}

/** WHY (--) **/
/**
 * Binary Search Dry Run Example:
 * Let's take an example: 
 * arr = [1, 2, 3, 4, 5], k = 5
 * low = 0, max = 1, mid = 0.5
 * for (0 -> 3)
 * diff = 2 - 1 = 1
 * required = floor(1 / 0.5) = 2
 * if (2 * 0.5 == 1) yes, only required 1 gas station here to keep the distance of 0.5
 * 
 * 
 * Suppose if mid was 0.4
 * 
 * for (0 -> 3)
 * diff = 2 - 1 = 1
 * required = floor(1 / 0.4) = 2
 * if (2 * 0.4 == 1) No, we need at least 2 gas stations to keep the distance of 0.4
 * 
 *
 *  Final Formula Note
 *	if the distance difference completely divided by the distance (mid) that's when we need one less gas station.
 * 
**/
function checkHowManyGasStationRequired(arr, distance){
	let count = 0;
	for(let i = 0; i < arr.length - 1; i++){
		let required = Math.floor((arr[i + 1] - arr[i]) / distance);
		if(required * distance === arr[i + 1] - arr[i]){
			required--;
		}
		count += required;
	}	

	return count;
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

	/**
	 * T.C: O(n * log(max_len)) + O(n) (how many gas station required check + find max distance)
	 * S.C: O(1)
	 * 
	**/
}


console.log(optimalGasStation([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10));