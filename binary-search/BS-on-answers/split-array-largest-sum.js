/**
 * Given an integer array a of size n and an integer k. Split the array a into k non-empty subarrays such that the largest sum of any subarray is minimized. Return the minimized largest sum of the split.

 * Example 1
 * Input: a = [1, 2, 3, 4, 5], k = 3
 * Output:6
 * Explanation: There are many ways to split the array a[] into k consecutive subarrays. The best way to do this is to split the array a[] into [1, 2, 3], [4], and [5], where the largest sum among the three subarrays is only 6.
 *
 * 
 * Example 2
 * Input: a = [3,5,1], k = 3
 * Output: 5
 * Explanation: There is only one way to split the array a[] into 3 subarrays, i.e., [3], [5], and [1]. The largest sum among these subarrays is 5.
 * 
**/

/** INTUITION **/

/**
 * if we observe carefully it is exactly same as previous problem, we need to devide the given  array into k subarray (contiguous partition) and need to find the combination where the largest sum is minimal. 
 * lets see in how many ways we can divide this given array 
 * into k subarrays.
 *
 * 
 * arr = [1, 2, 3, 4, 5], k = 3
 * 
 * * 1          2         3          Max Sum
 * 
 * [1]        [2]       [3, 4, 5]       12
 * [1, 2]     [3]       [4, 5]           9
 * [1, 2, 3]  [4]       [5]              6
 * [1]        [2, 3]    [4, 5]           9
 * 				.
 * 				.
 * 				.
 * there can be various way to do so, but we would never get the subarrays combination where the maximum sum is lower than 6, thats why 6 is the answer.
 *
 * 
 * lets take one more example to understand
 * 	arr = [3, 5, 1], k = 3
 * 
 * there is only one way we can split this array into k subarrays.
 * 
 *  [3] [5] [1]
 * 
 * the max sum is 5 and it can not be further minimized.
 * 
 * and this example also tells that the min subarray sum for any array has to be the max. ele. of the array, because that ele. will belong to any of the subarray so the max sum will be atleast that much.
 * so we have our lower bound of the search space Math.max(...arr).
 * 
 * now lets say instead of k = 3 we had k = 1, then we can only have one subarray [3, 5, 1] and the sum would be summation of the array itself. So our upper bound of the search space would be sum(arr).
 * 
 * and now this is the exact same problem as previous one.
 */

/** helper function to check if for the specific sum limit can we split the array into k or minimun sub array. **/

function canArrayBeSplited(arr, maxSum){
	let subArrayCount = 1;
	let subArraySum = 0;

	for(let i = 0; i < arr.length; i++){
		if(subArraySum + arr[i] <= maxSum){
			subArraySum += arr[i];
		} else {
			subArrayCount += 1;
			subArraySum = arr[i];
		}
	}

	return subArrayCount;
}


									/** BRUTE FORCE **/

function splitArray(arr, k){
	let min = Math.max(...arr);
	let max = arr.reduce( (sum, i) => sum + i, 0);

	for(let i = min; i <= max; i++){
		if(canArrayBeSplited(arr, i) <= k){
			return i;
		}
	}

	return -1;

	/**
	 * TC: O((sum - max) * n)
	 * SC: O(1)
	**/
}

//console.log(splitArray([5, 5, 5, 5], 3))


								/** OPTIMAL APPROACH **/

function optimalSplitArray(arr, k){
	let min = Math.max(...arr);
	let max = arr.reduce( (sum, i) => sum + i, 0);

	while(min <= max){
		const mid = Math.floor( (min + max) / 2);
		if(canArrayBeSplited(arr, mid) <= k){
			max = mid - 1;
		} else {
			min = mid + 1;
		}
	}

	return min;

	/**
	 * TC: O((sum - max) * logn)
	 * SC: O(1)
	**/
}

console.log(optimalSplitArray([5, 5, 5, 5], 3))

/** 
 * NOTE : we have used (<= k), becuase in leedcode there was a testcase for arr = [5, 5, 5, 5], k = 3:
 * 
 * min = 5, max = 20
 * 
 * for 5 as maxSum (limit) there will be 4 subarrays [5], [5], [5], [5] and we only need maximum 3 subarrays so we increase the limit and this will be same for 6, 7, 8 and 9 as well. and for limit as 10 we can have max 2 subarrays [5, 5], [5, 5].
 * 
 * there is no way we can get 3 sub arrays from 10 onwards till 20 as well, thats why we used (<= k) instead of (== k)
**/

