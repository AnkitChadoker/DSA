/**
 * Given an integer array nums. Return the number of inversions in the array.
 * Two elements a[i] and a[j] form an inversion if a[i] > a[j] and i < j.
 *
 * It indicates how close an array is to being sorted.
 * A sorted array has an inversion count of 0.
 * An array sorted in descending order has maximum inversion.
 * 
 * Input: nums = [2, 3, 7, 1, 3, 5]
 * Output: 5 
 * Explanation:
	The responsible indexes are:
	nums[0], nums[3], values: 2 > 1 & indexes: 0 < 3
	nums[1], nums[3], values: 3 > 1 & indexes: 1 < 3
	nums[2], nums[3], values: 7 > 1 & indexes: 2 < 3
	nums[2], nums[4], values: 7 > 3 & indexes: 2 < 4
	nums[2], nums[5], values: 7 > 5 & indexes: 2 < 5
**/

													/** BRUTE FORCE **/
/** 
 * we can simply take an element from the array and check against all the future elements at how many places it is greater and we increase the count at those times, at the end of the complete array iteration we can return the count
**/

function countInversion(arr){
	let count = 0;

	for(let i = 0; i < arr.length; i++){
		for(let j = i + 1; j < arr.length; j++){
			if(arr[i] > arr[j]) count++;
		}
	}

	return count;

	/**
	 * TC: O(n^2) near about
	 * SC: O(1)
	**/
}

//console.log(countInversion([2, 3, 7, 1, 3, 5]));



												 /** OPTIMAL APPROACH **/

/** Use a modified merge sort to count inversions in O(n * logn) by dividing the array, sorting subarrays, and counting inversions during the merge step.
* 
* Core Insight: While merging two sorted halves, if an element in the left array is greater than an element in the right array, then all remaining elements in the left array (from current index onward) will also be greater, so we can count multiple inversions at once instead of one-by-one.
* 
* Merge Logic: Use two pointers (i) (left array) and (j) (right array): if (left[i] <= right[j]), move (i) (no inversion); if (left[i] > right[j]), then count inversions as ((mid - i + 1)) (i.e., number of remaining elements in left array), and move (j).
* 
* Example: For ([2, 3, 7]) and ([1, 3, 5]), when comparing (2) and (1), since (2 > 1), all elements ((2, 3, 7)) form inversions with (1), so count = 3 at once; similarly, (7 > 3) and (7 > 5) add more inversions, giving total = 5.
* 
* Recursion Structure: Just like merge sort, split the array into halves recursively until single elements, then merge back while counting inversions at each step; the total inversion count is the sum of counts from left half, right half, and cross-inversions during merge.
* 
* Final Takeaway: This approach avoids redundant comparisons by leveraging sorted subarrays, making inversion counting efficient and scalable with time complexity O(n * log n).
* 
**/

function opitmalCountInversion(arr){
	return performMergeSort(arr);

	/**
	 * TC: O(n * logn) //exactly same as merge sort except one single line change 
	 * SC: O(n)
	**/
}
console.log(opitmalCountInversion([17, 15, 11, 6, -5, -10]));

function performMergeSort(arr, left = 0, right = arr.length - 1){
	let count = 0;
	if(left >= right) return count;
	let mid = Math.floor((left + right) / 2);
	count += performMergeSort(arr, left, mid);
	count += performMergeSort(arr, mid+1, right);
	count += merge(arr, left, mid, right);
	return count; //but we do not want the array, we want the count.
}

function merge(arr, left, mid, right){
	let i = left;
	let j = mid + 1;
	const tempArr = [];
	let count = 0;

	while(i <= mid && j <= right){
		if(arr[i] <= arr[j]) {
			tempArr.push(arr[i]);
			i++
		} else {
			// here is i greater than j.
			// only this part is responsible for counting the inversion rest is same as merge sort.
			count += (mid - i + 1); // we need to count all th elements from i to end of the array (mid)

			tempArr.push(arr[j]);
			j++;
		}
	}

	while(i <= mid){
		tempArr.push(arr[i++]);
	}


	while(j <= right){
		tempArr.push(arr[j++]);
	}

	for(let i = 0; i < tempArr.length; i++){
		arr[left + i] = tempArr[i];
	}

	return count;
}