/** we need to find the longest sub-array in the given array with the targeted sum */
/** 
 	what is subarray: a consecutive part of array (should be contagious) is called a subarray of given array.
 	arr = [1,2,3,4,5,6,7,8]
 	subarrays: [1], [1,2], [2,3], [3,4,5], [1,2,3,4,5,6,7,8,]
 	not a subarray: [1,2,4], [5,7], [6,8]
 **/

/** only positive numbers, array can only contain positive numbers only, (>0) **/
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

console.log(BBFlongestSubArrayWithTargetSum([10, 5, 2, 7, 1, 9], 15));