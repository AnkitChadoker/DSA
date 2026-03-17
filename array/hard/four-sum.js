/**
 * Given an integer array nums and an integer target. Return all quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:
 *	
 *  a, b, c, d are all distinct valid indices of nums.
 *	nums[a] + nums[b] + nums[c] + nums[d] == target.
 * 
 * Input: nums = [1, -2, 3, 5, 7, 9], target = 7
 * Output: [[-2, 1, 3, 5]]
 * Explanation:
 *		nums[1] + nums[0] + nums[2] + nums[3] = 7
 * 
**/

/** BRUTE FORCE **/
/* same logic as three sum problem **/

function fourSum(arr, target){
	const uniqueSet = new Set();
	const result = [];

	for(let i = 0; i < arr.length; i++){
		for(let j = i + 1; j < arr.length; j++){
			for(let k = j + 1; k < arr.length; k++){
				for(let l = k + 1; l < arr.length; l++){
					if(arr[i] + arr[j] + arr[k] + arr[l] === target){
						const temp = [arr[i], arr[j], arr[k], arr[l]];
						temp.sort((a, b) => a - b);
						const key = temp.join(',');
						if(!uniqueSet.has(key)){
							result.push(temp);
							uniqueSet.add(key);
						}
					}
				}
			}
		}
	}
	return result;

	/**
	 * TC: O(n^4)
	 * SC: O(2 * number of quadruplets)
	**/ 
}

console.log(fourSum([1, 1, 3, 4, -3], 5))

/** BETTER SOLUTION **/