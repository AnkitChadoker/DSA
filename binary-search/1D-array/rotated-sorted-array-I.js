/** 
 * Given an integer array nums, sorted in ascending order (with distinct values) and a target value k. The array is rotated at some pivot point that is unknown. Find the index at which k is present and if k is not present return -1.

 * Example 1
 * Input : nums = [4, 5, 6, 7, 0, 1, 2], k = 0
 * Output: 4
*/

															/** BRUTE FORCE **/

/* simply iterate over the array linearly and as soon as we intercept the element we return the index otherwise return -1 at the end **/

function searchRSA(arr, k){
	for(let i = 0; i < arr.length; i++){
		if(arr[i] === k) return i;
	}
	return -1;

	/**
	 * TC: O(n)
	 * SC: O(1)
	**/
}

//console.log(searchRSA([4, 5, 6, 7, 0, 1, 2], 0)) // 4


														/** OPTIMAL SOLUTION **/

/** 
 * Since we know the array is sorted (rotated) and we need to find in the sorted array so we should be using binary search to reduce the TC to O(logn), and how do we reduce it to logn by eleminating the half the array at each iteration.
 * 
 * but since the array is not simple sorted array in simply sorted array we can easily eliminate one half by comparing the mid with the target if the target is greater than the mid then there is no chance we can get the element (target) in left half so we would easily eliminate that part and continue with the right part and vise-versa.
 * 
 * but here we can not simply compare the mid and eliminate the array, because array is rotated at some (unknown) pivot point point so the element could be in any part of the array like,
 * 					
 * 					arr = [6, 7, 0, 1, 2, 3, 4, 5], k = 7
 * 					
 * 					L = 0, H = 7, mid = 3 (1)
 * 
 *				  	left half would be [6, 7, 0]
 *				    right half would be [1, 2, 3, 4] 
 * 
 * so ideally since mid 1 is smaller than the target 7, so we should have eliminate the left half and only look into the right half, but in this case we would never find the target if we do so, because target is in left half.
 * 
 * so we need to smartly eliminate the array, if we see from above example one of the arrays is sorted in this case its right array and that will be always true one of the array will always be sorted, so what we can do is if know which array is sorted we can directly check if the target element lies between the range of that array if it does we eliminate the other part of the array otherwise we elimiate the sorted part of the array. we mainly we need to do only 2 things to shrink the array to half:
 * 
 * 	(i) find the sorted part of the array.
 *  (ii) check if target lies between that range, if it does we eliminate other part of the array otherwise we eliminate the sorted array.
 * 
 * and we can easily check which part of the array is sorted by just checking if arr[low] <= arr[mid] if yes meaning left part is sorted otherwise right part would be sorted
 * 
**/

function optimalSearchRSA(arr, k){
	let low = 0; let high = arr.length - 1;

	while(low <= high){
		const mid = Math.floor((low + high) / 2);
		if(arr[mid] === k) return mid;

		/** check which part is sorted **/

		if(arr[low] <= arr[mid]){
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

	return -1;

	/**
	 * TC: O(logn)
	 * SC: O(1)
	**/
}


console.log(optimalSearchRSA([5, 1, 3], 3)) // 2
