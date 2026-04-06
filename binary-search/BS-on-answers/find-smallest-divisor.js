/**
*Given an array of integers nums and an integer limit as the threshold value, find the smallest positive integer divisor such that upon dividing all the elements of the array by this divisor, the sum of the division results is less than or equal to the threshold value.
*After dividing each element by the chosen divisor, take the ceiling of the result (i.e., round up to the next whole number).
*
* Example 1
* Input: nums = [1, 2, 3, 4, 5], limit = 8
* Output: 3
* Explanation: We can get a sum of 15(1 + 2 + 3 + 4 + 5) if we choose 1 as a divisor. 
The sum is 9(1 + 1 + 2 + 2 + 3) if we choose 2 as a divisor. Upon dividing all the elements of the array by 3, we get 1,1,1,2,2 respectively. Now, their sum is equal to 7 <= 8 i.e. the threshold value. So, 3 is the minimum possible answer.
*
* Example 2
* Input: nums = [8,4,2,3], limit = 10
* Output: 2
* Explanation: If we choose 1, we get 17 as the sum. If we choose 2, we get 9 (4+2+1+2) <= 10 as the answer. So, 2 is the answer.
**/

						/** INTUITION **/
/**
* Suppose we are given an array like this: [1, 2, 3, 4, 5]
* If we observe carefully, by dividing anything above 5, we will always get the division as 1 for each element.
* Like dividing by 6:
*
* ceil → 1/6, 2/6, 3/6, 4/6, 5/6 
*      → [1,  1,   1,   1,   1]
*
* It would be the same for 7, 8, …, 100 etc.
* So clearly, we have our max limit which is the maximum element of the array.
* And the start point would be 1 (smallest positive integer).
* Now again, we have the range and we need the smallest number which satisfies the condition.
* It is similar to the previous problem.
**/ 

					
					/** HELPER FUNCTION **/

function getDividedSum(arr, divisor, limit){
	let sum = 0;
	for(let i = 0; i < arr.length; i++){
		sum += Math.ceil(arr[i]/divisor);
	}
	return sum <= limit;
}

					/** BRUTE FORCE **/
/** same approach as minimum days to make M bouquests **/

function smallestDivisor(arr, limit){
	const max = Math.max(...arr);

	for(let i = 1; i <= max; i++){
		if(getDividedSum(arr, i, limit)) return i;
	}
	return -1;

	/**
	 * TC: O(max * n)
	 * SC: O(1)
	**/
}

//console.log(smallestDivisor([1, 2, 3, 4, 5], 8)); //3


					/** OPTIMAL **/
/** same approach as minimum days to make M bouquests **/

function optimalSmallestDivisor(arr, limit){
	let max = Math.max(...arr);
	let min = 1;
	while(min <= max){
		const mid = Math.floor((min + max) / 2);
		if(getDividedSum(arr, mid, limit)) {
			max = mid - 1;
		} else {
			min = mid + 1;
		}
	}
	return min;

	/**
	 * TC: O(max * logn)
	 * SC: O(1)
	**/
}

console.log(optimalSmallestDivisor([1, 2, 3, 4, 5], 8)); //3