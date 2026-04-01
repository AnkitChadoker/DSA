/**
* Given an array nums sorted in non-decreasing (ascending) order. Every number in the array except one appears twice. Find the single number in the array.
* 
*	Example 1
*	Input :nums = [1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6]
*	Output:4
*	Explanation: Only the number 4 appears once in the array.
**/

											/** BRUTE FORCE **/

/** since we have already solved these kind of problem previously as well we can use the XOR (^) operrater which well eliminate all the duplicates and return the single element **/

function singleNonDuplicate(arr){
	let xor = 0;
	for(let i = 0; i < arr.length; i++){
		xor ^= arr[i];
	}
	return xor;
	/**
	 * TC: O(n)
	 * SC: O(1)
	**/
}

//console.log(singleNonDuplicate([1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6])); // 4


											/** FUNDAMENTAL APPROACH **/
/**
 * 
 * Since we know the array is sorted and from the problem also stated that every element will be apprearing only twice so all the elements which are appearing twice will be appearing in the consecutive sequence as we can see from the given array itself like 1,1 and 2,2 and 3,3 etc.
 * 
 * so if to know if any element is appearing twice we can check on each index if either its previous index or next index has the same value as the current index meaning its the repeating element and for any index this condition fails meaning that is the non duplicate (single) element index.
 * 
 * like suppose we are at index 2 in the loop so we will check at index 1 and 3 if at any index the element is same as the element at index 2 meaning its duplicate element so we move ahead at index 3 and do the same check again for index 3 as well we will check for 2 and 4 index.
 * 
 * 
 * But here is a problem when we will be at index 0 we would not have the previous index and for the element at last index we would not have the next index so we need to handle these special cases separately.
 * 
 * and also what if array has only 1 element like [3] so its the answer itself becuase it is appearing only single time as well.
**/

/** This method will help us in the binary search solution **/
function fundamentalSingleNonDuplicate(arr){
	/** if array has only single element **/
	if(arr.length === 1) return arr[0];

	/** explicitely check for the first and last element **/
	if(arr[0] !== arr[1]) return arr[0];
	if(arr[arr.length - 1] !== arr[arr.length - 2]) return arr[arr.length - 1];

	/** since we have already checked for first and last element thats why we will loop from 1 to n-2 only **/
	for(let  i = 1; i < arr.length - 1; i++){
		if(arr[i] !== arr[i-1] && arr[i] !== arr[i+1]) return arr[i];
	}

	return -1;
	/**
	 * TC: O(n)
	 * SC: O(1)
	**/
}
//console.log(fundamentalSingleNonDuplicate([1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6])); // 4


/** OPTIMAL APPROACH **/
/**
 * Our fundamental approach is gonna help us here as well for the edge cases and for the remaining part we need know that the array is sorted and we need to find something in that array so we can basically use the binary search algo. and we know the basic concept of binary search is to eliminate the half array at each iteration, so to do that we need to observe some pattern here, like we need to play around with the indices,
 * 
 * 	indices = [0 1 2 3 4 5 6 7 8 9 10]
 * 	arr =     [1 1 2 2 3 3 4 5 5 6 6] 
 * 
 * we know that our target element is 4 so if we look at the left side of the target element and see the indices of array, its following the even-odd pattern (meaning each pair has the indexing as even-odd pattern like (0,1) (2,3) (4,5)) and at the right side of the array we have the index mapping as odd-even pattern, meaning if we are at any index and if it is following the even-odd pattern meaning target element would be on the right side only so we eliminate the left half otherwise we eliminate the right half and for each mid can check if it has no matching neighbors if this condition satisfies we got our target.
**/
function optimalSingleNonDuplicate(arr){
	if(arr.length === 1) return arr[0];
	if(arr[0] !== arr[1]) return arr[0];
	if(arr[arr.length - 1] !== arr[arr.length - 2]) return arr[arr.length - 1];

	let low = 1; let high = arr.length - 2;

	while(low <= high){
		const mid = Math.floor((low + high) / 2);
		if(arr[mid - 1] !== arr[mid] && arr[mid] !== arr[mid + 1]) return arr[mid];

		/** checking for even-odd pattern, if current index is at even index we check the next element if it's also the same to follow the (e-o pattern) and if the current index is at odd pattern we check the previous element if it's the same (e-o pattern) **/
		if((mid % 2 === 0 && arr[mid] === arr[mid + 1]) || (mid % 2 === 1 && arr[mid - 1] === arr[mid])){

			/** if pattern follows we will not the element in the left half so we move low to mid + 1 **/
			low = mid + 1;
		} else {
			
			/** if the e-o pattern is not being followed our target should be at the left half thats why the pattern matching is disrupted. **/
			high = mid - 1;
		}
	}

	return -1;
	/**
	 * TC: O(log n)
	 * SC: O(1)
	**/
}
console.log(optimalSingleNonDuplicate([1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6])); // 4