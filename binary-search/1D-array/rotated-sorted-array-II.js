/** 
 * Given an integer array nums, sorted in ascending order (may contain duplicate values) and a target value k. Now the array is rotated at some pivot point unknown to you. Return True if k is present and otherwise, return False.

 * Example 1
 * Input : nums = [7, 8, 1, 2, 3, 3, 3, 4, 5, 6], k = 3
 * Output: true
*/

															/** BRUTE FORCE **/

/* simply iterate over the array linearly and as soon as we intercept the element we return the true otherwise return false at the end **/

function searchRSA(arr, k){
	for(let i = 0; i < arr.length; i++){
		if(arr[i] === k) return true;
	}
	return false;

	/**
	 * TC: O(n)
	 * SC: O(1)
	**/
}

//console.log(searchRSA([7, 8, 1, 2, 3, 3, 3, 4, 5, 6], 3)) // true


														/** OPTIMAL SOLUTION **/

/** 
 * It will be similar to last problem (rotated-sroted-array-I), but we may have duplicate values in the array, so we need to handle that case only, 
 * 			how can it affect our algo ?? 
 * 
 * we know from our previous problem we are first finding the sorted array part and then eliminating the half the array, now since the elements can be duplicated into the array there can be some certain situation where we might not able to find the sorted array firsthand, but when will it happen ??
 * 
 * suppose our low, high and mid are equal then we would be able to find which part of the array is sorted,like
 * 
 * 		[4,4,4,4,3,4,4,4],  k = 3
 * 		
 * low = 4 (at 0 index), high = 4 (at 7 index) and mid = 4 (at index 3), so in this case we need to shirk down the array from both the ends till we get the condition where the above condition is false, then only we can decide which array we need to eliminate and which array we need to move ahead with. 
 * 
 * so we can keep on increment the low and decrement the high and check for mid and see if find the situation to take decision.
 * 	low  = 4 (at 1 index), high = 4 (at 6 index), mid = 4 (at 3 index), again do the same thing,
 *  low = 4 (at 2 index), high = 4 (at 5 index), mid = 4 (at 3 index), again,
 *  low = 4 (at 3 index), high = 3 (at 4 index), mid = 4 (at 3 index), but this time we have different values so we can take descision, we can see right part is sorted so we make low = mid + 1,
 * 
 * now (index) low = 4, high = 4, mid = 4 and at 4th index we have our target sop just return true.
 * 
**/

function optimalSearchRSA(arr, k){
	let low = 0; let high = arr.length - 1;

	while(low <= high){
		const mid = Math.floor((low + high) / 2);
		if(arr[mid] === k) return true;

		if(arr[low] === arr[mid] && arr[mid] === arr[high]){ 
			low++;
			high--;
		}
		/** check which part is sorted **/
		else if(arr[low] <= arr[mid]){
			/** left half is sorted **/
			/** check if the target lies between the sorted range **/
			if(arr[low] <= k && k < arr[mid]){
				/** target lies in the sorted array **/
				high = mid - 1;
			} else {
				/** target does not lie between the sorted range, so we move ahead with the other part of the array **/
				low = mid + 1
			}
		} else {
			/** right half is sorted **/
			/** check if the target lies between the sorted range **/
			if(arr[mid] < k && k <= arr[high]){
				/** target lies in the sorted array **/
				low = mid + 1;
			} else {
				/** target does not lie between the sorted range, so we move ahead with the other part of the array **/
				high = mid - 1
			}
		}
	}

	return false;

	/**
	 * TC: O(logn) at avg, but at worst (n/2), because we can have an array like [2,2,2,2,2,2,2,2] and target as 1, so at each iteration we will get the mid, low and high as same so we keep on shrinking the array for n/2 times ( shifting array by 2 places in each iteration, low++, high--).
	 * SC: O(1)
	**/
}


console.log(optimalSearchRSA([4,4,4,4,3,4,4,4], 3)) // 2
