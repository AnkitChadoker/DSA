/**
 * Given an integer array nums. Return the number of reverse pairs in the array.
 * An index pair (i, j) is called a reverse pair if:
	(i) 0 <= i < j < nums.length
	(ii) nums[i] > 2 * nums[j]

	nums = [6, 4, 1, 2, 7]
	output = 3
	explaination: here are three reverse pairs in the array
				  (i)   [0, 2], 6 > 2 * 1
				  (ii)  [0, 3], 6 > 2 * 2
				  (iii) [1, 2], 4 > 2 * 1
**/

												
												/** BRUTE FORCE **/

/** we can simply check for each element one by one against its all future elements if the element is bigger than the twice of the future elements **/

function reversePair(arr){
	let count = 0;
	for(let i = 0; i < arr.length; i++){
		for(let j = i + 1; j < arr.length; j++){
			if(arr[i] > 2 * arr[j]){
				count++;
			}
		}
	}
	return count;

	/**
	 * TC: O(n^2) approx
	 * SC: O(1)
	**/
}

console.log(reversePair([6, 4, 1, 2, 7]));
