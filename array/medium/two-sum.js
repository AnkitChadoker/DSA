/** we are given an array and a target value we need to find the 2 aaray elements which on addition match the target **/
/** there can be two problem in this question 
 	* we just need to return true /  false based on the solution.
 	* we need to return the index of those elements.
	
		arr = [1,2,3,4,5], target = 9
		output = (i) true
		 		 (ii) [3,4]
**/  

/*** BRUTE FORCE **/
/* 
	we can iterate through the array one by one and check for each element against the remaining elements if the addition of those two meet the target 
*/

/* (i) Type one cproblem just return true / false */
function bruteTwoSum(arr, target){
	for(let i = 0; i < arr.length; i++){
		for(let j = 0; j < arr.length; j++){
			/** can not add the same element **/
			if(i === j) continue;
			if(arr[i] + arr[j] === target) return true;
		}
	}
	return false;

	/*
		TC: O(n^2)
		SC: O(1)
	*/
}

//console.log(bruteTwoSum([1,2,3,4,5], 9)); // true

/* (ii) Type two return the index of those elements also with slight optimization */
function bruteTwoSumIndex(arr, target){
	for(let i = 0; i < arr.length; i++){

		/** we can start the j loop from i+1, beacuse if the combination was there when i was lessor then we would have got the answer already and also since we can not also have both i and j as same so we can start from i+1, so we can save some extra iterations by this. **/

		for(let j = i+1; j < arr.length; j++){
			if(arr[i] + arr[j] === target) return [i, j];
		}
	}
	return [-1, -1];

	/*
		TC: O(n^2) approax, the TC will still be the same it will be definately slight less than O(n^2) but still we take the upper bound O(n^2).
		SC: O(1)
	*/
}

//console.log(bruteTwoSumIndex([1,2,3,4,5], 9)); // [3,4]