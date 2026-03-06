/** we need to find the longest sub-array in the given array with the targeted sum */
/** 
 	what is subarray: a consecutive part of array (should be contagious) is called a subarray of given array.
 	arr = [1,2,3,4,5,6,7,8]
 	subarrays: [1], [1,2], [2,3], [3,4,5], [1,2,3,4,5,6,7,8,]
 	not a subarray: [1,2,4], [5,7], [6,8]
 **/

/** only positive numbers, array can only contain positive numbers only, (>=0) **/
/** arr = [10, 5, 2, 7, 1, 9],  target = 15
 	output = 4 //[5, 2, 7, 1]
	though [10, 5] also giving us the target but we need the longest subarray thats why the above output is expected.
 **/

/** BRUTE FORCE **/

/** try out all posible sub arrays **/
/** like we know 
  	i = 0 (sub arrays started from i = 0) =>	[10], [10,5], [10,5,2], [10,5,2,7], [10,5,2,7,1]
  	i = 1 (sub arrays started from i = 1) =>	[5], [5,2], [5,2,7], [5,2,7,1], [5,2,7,1,9]
										  		..
										  		..
										  		..
										  		etc.

  		all this are sub arrays of given array and we can get all this using iterations, if we carefully see we can use the first iteration for the value of i which will start from 0 and gets ++ each time and another iteration for creating a valid subarrays using j it will iterate from i to n each time and get us every sub array of the given array.
**/

function longestSubArrayWithTargetSum(arr, target){
	let longestSubArrayLength = 0;
	//** starting point of new subsets each time **/
	for(let i = 0; i < arr.length; i++){ //TC: O(n)

		/** from where the subsets will begin to make **/
		for(let j = i; j < arr.length; j++){ //TC: O(n) approax (each time there will be increased i)

			/** create subsets starting from i till j, like [10] (when i  = 0, j = 0), [10,5] (when i = 0, j = 1) and so on **/
			let subArraySum = 0;
			let subArrayLenght = 0;
			for(let k = i; k <= j; k++){ //TC: O(n) approax (at worst case when i at 0 and j at arr.length - 1, we have the biggest subarray (entire array))

				subArrayLenght += 1;
				subArraySum += arr[k];

				if(subArraySum === target){
					longestSubArrayLength = Math.max(longestSubArrayLength, subArrayLenght);
				} else if(subArraySum > target){
					/** since we are considering only positive number so there is no sence iterating even after sub array sum crossed the target becuase it will keep on growing after that so that will never match our target **/
					break;
				}

			}

		}

	}

	return longestSubArrayLength;

	/**
	 	TC: O(n^3) // approax
	 	SC: O(1) 
	 */
}

//console.log(longestSubArrayWithTargetSum([10, 5, 2, 7, 1, 9], 15));


/** Better BRUTE FORCE **/
function BBFlongestSubArrayWithTargetSum(arr, target){
	let longestSubArrayLength = 0;

	for(let i = 0; i < arr.length; i++){
		subArraySum = 0
		for(let j = i; j < arr.length; j++){
			/** 
			 previously we were using extra loop to iterate from i to j but if we carefully observe we are just adding the current j th element into the sum becuase lets say i = 1, j = 4
			 so we already had the sum of i = 1, j = 3 // [5, 2, 7] we just need to add 1 (j = 4) into it only.
			 in each iteration only j is getting incremented i is on 1 only so we can add j[0] + j[1] + j[2] + j[3] and so on,
			 these will reduce the TC to approax O(n^2)
			*/
			subArraySum += arr[j];
			if(subArraySum === target) {
				longestSubArrayLength = Math.max(longestSubArrayLength, j-i+1);
			} else if(subArraySum > target) {
				break;
			}
		}
	}

	return longestSubArrayLength;
}

//console.log(BBFlongestSubArrayWithTargetSum([10, 5, 2, 7, 1, 9], 15));


/** BETTER SOLUTION **/

/** we can use map and store the index and the sum at that index and on each iteration if we match the target thats our new lenght if its obviously greater than previous lenght, and if its greater than the target we can check if at any index we have the value which is the difference of (current sum - target), because from that index onwards the sum of all the elements till the current "i" is equal to target.
	 
  i   sum

| 5 => 34 | target greater by 19, so we have any point where total was 19, no so we return our answer.
| 4 => 25 | target greater by 10, do we have any point previously where total was 10, yes we do have which was at index 0 so from 
				there onwards we would have another sub array matching our target length (i - index of count found)
| 3 => 24 | target greater by 9 do we have any point previously where total was 9, no
| 2 => 17 | greater than target by 2 so do we have any point where we have 2 as a total, no
| 1 => 15 | equal to target update maxLength i+1
| 0 => 10 | less then target 
 ---------

**/

function betterLongestSubArrayWithTargetSum(arr, target){
	let longest = 0;
	const map = new Map();
	let sum = 0

	for(let i = 0; i < arr.length; i++){
		sum += arr[i]		

		if(sum === target){
			longest = Math.max(longest, i+1);
		}

		const diff = sum - target;
		if(map.has(diff)){
			longest = Math.max(longest, i - map.get(diff));
		}

		/** 
		 	in case of 0 and negative numbers we need to handle this below edge case with condition, becuase if add 0 anything in it will be the same sum but the indexing will be updated for that sum in the map so it give us the smallest sub array intead of longest, try to understand it using [2,0,0,3] array.

		 	 sum index
		 	|         |
		 	| 5		3 | greater than target by 2 so we check for the 2 in previous indexes where sum was 2 at any point and its at 
		 				index 2 instead it should have been at index 0 becuase we need longest sub array so we want it be as left as posible.

		 	| 2		2 |	this will not be added as new entries this will update the map where sum is 2 it will change the index 0 to 1 
		 				to 2
		 	| 2		1 |
		 	| 2		0 |
		 	___________

		 	so now for index 3 it will return the index 2 as previous count existed where difference was 2, ideally it should have been 0, that why we need to add extra check if the sum already exists in the map do not update it.

		 	and this will also work for negative number as well, and it will be OPTIMAL SOLUTION for the array containing 0 and negative elements as well
		*/
		if(!map.has(sum)){
			map.set(sum, i);
		}
		
	}
	return longest;

	/*
		TC: O(n)
		SC: O(n)
	*/
}

//console.log(betterLongestSubArrayWithTargetSum([0,0,-1,0,0,-1,-2], -1)); // 5


/** OPTIMAL SOLUTION **/
/*** THIS IS FOR ONLY NUMBER ABOVE 0 (POSITIVE NUMBERS) **/

/** we can use 2 pointers approach here pointer i to denote starting of the subarray and pointer j to denote end of the subarray, we keep incrementing pointer j until we go past (more than) the target value, once we go past the target we stop incrementing j pointer instead we shrink down the sub array from start meaning incremenenting i pointer until the sum becomes less then target, this way we will cover the all posible subarrays as well and will be able to find the subarray matching the target as well, between this pointer increment and decrement we will ofcource be checking for the target matching the sum as well. */

function optimalLongestSubArrayWithTargetSum(arr, target){
	let start = 0;
	let end = 0;
	let longest = 0;
	let sum = arr[0]; // initially sum will be the first element of array iteself, becuase both start and end are at 0th index so this will be our first subarray itself.

	/* at any point start crosess the end meaning we do not have the target value in the array itself. */
	while(start <= end && end < arr.length){

		/** as discussed above if sum is greater than target we shrink the sub array from start, but first try to dry run the code below this while than it will be more clear. **/

		while(sum > target){			
			sum -= arr[start];
			start++;
			if(target === sum ){
				longest = Math.max(longest, end-start+1);
			}			
		}

		if(target === sum){
			longest = Math.max(longest, end-start+1);
		}

		end++;	
		/** if end at (arr.length - 1) index, then without checking the condition it will cross the bound of array after increment (++) **/
		if(end < arr.length){			
			sum += arr[end];			
		}
	}

	return longest;

	/** 
	 	* if we observe carefully wwe are doing end++ and the calulating the sum while we are calculating the sum and doing start++, because in case of start we must minus the current value of start first then only we can move shrink the subarray while at time of end we need to first inlarge the sub array and then we can calculate the sum
	 	
	 	TC: 
	 		* first loop is definately running from 0 to n-1 so clearly its O(n).
	 		* here is the most confusing part with the naked eye it looks like O(n^2) becuase of nested loop structure, but it is not running for n time for each iteration of outer loop, it is entirely dependent on the condition which may or may not be true for each iteration of outer loop so it can run sometimes for any iteration of outer loop or it may not run at all or any iteration, so it will be additional O(n) not multiplication but addition.
	 		* total TC: O(2n).
	 	SC: O(1)

	 	NOTE: THIS ALGO. IS ONLY FOR THE ARRAY CONTAINING ELEMENTS BIGGER THAN 0, for arrays containing negative and 0 "better" approach is optimal for that problem.
	**/
}

console.log(optimalLongestSubArrayWithTargetSum([10, 5, 2, 7, 1, 9], 15)); // 3


