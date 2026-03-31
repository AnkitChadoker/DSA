/**
* Given an integer array nums of size n, sorted in ascending order with distinct values. The array has been right rotated an unknown number of times, between 0 and n-1 (including). Determine the number of rotations performed on the array.
*
* Example 1
* Input : nums = [4, 5, 6, 7, 0, 1, 2, 3]
* Output: 4
* Explanation: The original array should be [0, 1, 2, 3, 4, 5, 6, 7]. So, we can notice that the array has been rotated 4 times.
* 
* Input: nums = [3, 4, 5, 1, 2]
* Output: 3
* Explanation: The original array should be [1, 2, 3, 4, 5]. So, we can notice that the array has been rotated 3 times.
**/

/** SOLUTION **/
/** if we observe carefully the answer is actully nothing but the index of the min ele. of the rotated sorted array, and we have solve the problem to find the min in the rotated sorted array, we can see above example as well we can see the output is nothing but the index of the min element only, because from 0 to till that index the array is rotated only. **/

function findRotationCount(arr){
	let min = Infinity;
	let rotationCount = 0;
	let low = 0;
	let high = arr.length - 1;

	while(low <= high){
		const mid = Math.floor((low + high) / 2);

		/** for duplicate elements as well **/
		if(arr[low] === arr[mid && arr[mid] === arr[high]]){
			low++;
			high--;
		}else if(arr[low] <= arr[mid]){
			if(arr[low] < min){
				min = arr[low];
				rotationCount = low;
			}
			low = mid + 1;
		} else {
			if(arr[mid] < min){
				min = arr[mid];
				rotationCount = mid;
			}
			high = mid - 1;
		}
	}

	return rotationCount;
}

console.log(findRotationCount([3, 3, 3, 3, 3, 4, 5, 0, 1, 2, 3, 3, 3, 3, 3])); // 7