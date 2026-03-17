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

//console.log(fourSum([1, 1, 3, 4, -3], 5))

/** BETTER SOLUTION **/
/** again similar to three sum, in three sum we were keeping i as static pointer here we are keeping i and j both as static pointer and using k to fing the l. **/

function betterFourSum(arr, target){
	const uniqueSet = new Set();
	const result = [];

	for(let i = 0; i < arr.length; i++){
		for(let j = i + 1; j < arr.length; j++){			
			const hashSet = new Set();
			for(let k = j + 1; k < arr.length; k++){
				const l = target - (arr[i] + arr[j] + arr[k]);
				if(hashSet.has(l)){
					const temp = [arr[i], arr[j], arr[k], l];
					temp.sort((a,b) => a - b);
					const key = temp.join(',');
					if(!uniqueSet.has(key)){
						result.push(temp);
						uniqueSet.add(key);
					}
				}
				hashSet.add(arr[k])
			}

		}
	}
	return result;

	/**
	 * TC: O(n^3)
	 * SC: O(2* number of quadruplets) + O(n)
	**/ 
}


//console.log(betterFourSum([1,0,-1,0,-2,2], 0)); //[ [-1,0,0,1], [ -2,-1,1,2], [-2,0,0,2]]


/** OPTIMAL SOLUTION **/

function optimalFourSum(arr, target){
	arr.sort((a,b) => a - b);
	const result = [];

	for(let i = 0; i < arr.length; i++){
		if(i !== 0 && arr[i] === arr[i-1]) continue;
		for(let j = i + 1; j < arr.length; j++){			
			if(j !== i + 1 && arr[j] === arr[j-1]) continue;
			let k = j + 1;
			let l = arr.length - 1;

			while(k < l){
				const sum = arr[i] + arr[j] + arr[k] + arr[l];
				if(sum === target){
					result.push([arr[i], arr[j], arr[k], arr[l]]);
					l--;
					k++;
					while(k < l && arr[l] === arr[l+1]) l--;
					while(k < l && arr[k] === arr[k-1]) k++;
				} else if(sum < target){
					k++;
					while(k < l && arr[k] === arr[k-1]) k++;
				} else {
					l--;
					while(k < l && arr[l] === arr[l+1]) l--;
				}
			}
		}
	}
	return result;

	/**
	 * TC: O(n^3)
	 * SC: O(number of quadruplets)
	**/
}

console.log(optimalFourSum([1,0,-1,0,-2,2], 0));