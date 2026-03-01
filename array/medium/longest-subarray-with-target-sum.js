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
	for(let i = 0; i < arr.length; i++){

		/** from where the subsets will begin to make **/
		for(let j = i; j < arr.length; j++){

			/** create subsets starting from i till j, like [10] (when i  = 0, j = 0), [10,5] (when i = 0, j = 1) and so on **/
			let subArraySum = 0;
			let subArrayLenght = 0;
			for(let k = i; k <= j; k++){

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
}

console.log(longestSubArrayWithTargetSum([10, 5, 2, 7, 1, 9], 15));