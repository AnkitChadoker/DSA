/**
 * Given a sorted array nums and an integer x. Find the floor and ceil of x in nums. The floor of x is the largest element in the array which is smaller than or equal to x. The ceiling of x is the smallest element in the array greater than or equal to x. If no floor or ceil exists, output -1.
 *	
 * Example 1
 *	Input : nums =[3, 4, 4, 7, 8, 10], x= 5
 *	Output: [4, 7]
 *	Explanation: The floor of 5 in the array is 4, and the ceiling of 5 in the array is 7.
 * 
 *	Example 2
 *	Input : nums =[3, 4, 4, 7, 8, 10], x= 8
 *	Output: [8, 8]
 *	Explanation: The floor of 8 in the array is 8, and the ceiling of 8 in the array is also 8.
 *
 *	Example 3
 *	Input : nums = [2, 4, 6, 8, 10, 12, 14], x= 1
 *	output = [-1, 2]
 *	Explanation: The floor of 1 in the array is not present thats why -1, and the ceiling of 1 in the array is 2.
**/



														/** BRUTE FORCE **/

/** we can simply iterate over the array linearly and can check if any where we find the exact match that is our floor and ceil both otherwise we look for the element which is greatest small element than the x (floor ele.), and greatest small ele than the x (ceil) as soon as we have both we can return them other wise at the end return accordingly **/

function findFloorAndCeil(arr, x){
	let floor = undefined;
	let ceil = undefined;
	for(let i = 0; i < arr.length; i++){
		if(arr[i] === x) {
			return [x, x];
		} else if (arr[i] < x){
			floor = arr[i];
		} else {
			ceil = arr[i];
		}
		if(floor && ceil) return [floor, ceil];
	}

	return [floor || -1, ceil || -1];

	/**
	 * TC: O(n)
	 * SC: O(1)
	**/
}

//console.log(findFloorAndCeil([3, 4, 4, 7, 8, 10], 9));

															//** OPTIMAL APPROACH **/

/** we can use binary search and if any moment we got our mid equal to x we can return from there directly otherwise keep on looking for the ceil and floor value like in brute force way. **/

function optimalFindFloorAndCeil(arr, x){
	let floor = undefined; let ceil = undefined;
	let left = 0; let right = arr.length - 1;

	while(left <= right){
		const mid = Math.floor((left + right) / 2);

		if(arr[mid] === x) return [x, x];
		else if(arr[mid] < x) {
			floor = arr[mid];
			left = mid + 1;
		} else {
			ceil = arr[mid];
			right = mid - 1;
		}
	}

	return [floor || -1, ceil || -1];
}


//console.log(optimalFindFloorAndCeil([2, 4, 6, 8, 10, 12, 14], 15));
