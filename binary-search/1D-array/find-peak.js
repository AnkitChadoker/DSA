/**
* 
* Given an array arr of integers. A peak element is defined as an element greater than both of its neighbors.
*
* Formally, if arr[i] is the peak element, arr[i - 1] < arr[i] and arr[i + 1] < arr[i].
*
* Find the index(0-based) of a peak element in the array. If there are multiple peak numbers, return the index of any peak number.
*
*
* Note:
* ou may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.
*
* Example 1
* Input : arr = [1, 2, 3, 4, 5, 6, 7, 8, 5, 1]
* Output: 7
* Explanation: In this example, there is only 1 peak that is at index 7.
*
* Example 2
* Input : arr = [1, 2, 1, 3, 5, 6, 4]
* Output: 1
* Explanation: In this example, there are 2 peak numbers at indices 1 and 5. We can consider any of them.
*/

/** BRUTE FORCE **/
/**
 *  we can simply iterate over the array and check for each element if its greater than its neighbors.
 *  bit we need to take care of few edge cases as well,
 *  (i) like the 0th element will not have the previous index, though we are said to consider it as -∞, so if out 0th element is greater than the next index its our peak becuase it by default greater than the -∞.
 *  (ii) similarly our last element will not have the next element, though again we are said to consider it as -∞, so if its greater than n-2th element thats our peak.
 *  (iii) if array only has the single element then by default it would be our peak beacause its neighbours would be -∞.
 * 
**/

function findPeak(arr){
	if(arr.length === 1) return 0;
	if(arr[0] > arr[1]) return 0;
	if(arr[arr.length - 1] > arr[arr.length - 2]) return arr.length - 1;

	for(let i = 1; i < arr.length - 1; i++){
		if(arr[i - 1] < arr[i] && arr[i] > arr[i + 1]){
			return i;
		}
	}

	return -1;

	/**
	 * TC: O(n)
	 * SC: O(1)
	**/
}

//console.log(findPeak([1, 2, 1, 3, 5, 6, 4])); // 1

/** OPTIMAL SOLUTION **/
/** 
 * though we had the O(n) TC but still we need to optimize it, meaning we can get the TC to logn and there are not many algo with the TC as low as logn, the most recent we can think of is binary search, but we know that binary search can only be applicable for sorted arrays (partial sorted) only.
 * 
 * if we try to draw a graph using the array values we will see there will be 2 (at least 2, for elements which has only 1 peak) curves one which is going upwards and another which is going downwards (try to draw the graph on paper), and this can only happen if the array elements are linearly increasing or decreasing meaning they are partially at sorted order, that why we can apply the binary search here.
 * 
 * Now main challange, we know that binary search's main concept is to eliminate the half array at each iteration,  how can we do this here becuase the array is not consistantly sorted here. lets see what all we will be doing
 * 
 * (i) we will be find the mid first of all, so we can check if the mid is our peak by checking its neighbors if the mid is greater than its neighbors we already got our target no need to go further.
 * 
 *** please try to draw a graph that will be super helpful for understanding this ***
 * (ii) but if mid is not our peak then it will be on one of the curves be it increasing or decreasing, lets say mid is at increasing curve so its obvious if mid is on the curve which is increasing towards the peak so we will get the peak on the right side (increasing side) only so we can eliminate the left half safely, and if the mid is at decreasing curve meaning we have left the peak behind so we need to go back (left half) meaning we can safely elimiate the right half.
 * 
**/

function optimalFindPeak(arr){
	if(arr.length === 1) return 0;
	if(arr[0] > arr[1]) return 0;
	if(arr[arr.length - 1] > arr[arr.length - 2]) return arr.length - 1;
	let low = 1; let high = arr.length - 2;

	while(low <= high){
		const mid = Math.floor((low + high) / 2);
		if(arr[mid - 1] < arr[mid] && arr[mid] > arr[mid + 1]) return mid;

		/** check if mid is at increasing curve **/
		if(arr[mid] > arr[mid - 1]){
			low = mid + 1;
		}
		/** else mid is at decreasing curve **/ 
		else {
			high = mid - 1;
		}
	}

	return -1;

}

console.log(optimalFindPeak([1, 2, 3, 4, 5, 6, 7, 8, 5, 1])); // 7

/** NOTE: This algo. will also work for the arrays containing multiple peaks as well, becuase we are finding the mid first and if it is belonging to any peak we are returning it, and if not then mid can only belong to either increasing curve or decreasing curve which will be true for all the peaks so for each peak if we go forward on the increasing curve we will find a peak and if we go backward on the decreasing curve we will definately find the peak, try drawing the graph it will be more understandable. **/