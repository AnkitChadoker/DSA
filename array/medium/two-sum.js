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


/*** BETTER APPROACH **/
/** FOR THE INDEX PROBLEM THIS IS THE OPTIMAL SOLUTION AS WELL **/
/*
	we can iterate through the entire array one by one and also at the same time we can use map to store the (target - element) in the map as the key and index as value and on each iteration we can check if the (arr[i]) exists in the map if it does exist thats our combination. its basic maths
	
	target - a = b

	and we can check if b exists in our map because,

	a + b = target itself, so that is our combo. 

*/
function betterTwoSum(arr, target){
	const map = new Map();

	for(let i = 0; i < arr.length; i++){

		if(map.has(arr[i])) return true;  /* return [map.get(arr[i]), i]; */
		
		const diff = target - arr[i];
		map.set(diff, i);
		/** store the diff of target - element so it matches next time thats our combination */

	}
	return false; /* return [-1, -1] */

	/*
		TC: O(n)
		SC: O(n), all the elements will go into the map at worst case
	*/
}
//console.log(betterTwoSum([1,2,3,4,5], 3)); // true, [3, 4]


/*** OPTIMAL APPROACH **/
/** FOR BOOLEAN PROBLEM ONLY */
/** 
 	we can use 2 pointer approach after sorting the array, since sorting will disturb the real indexing of the array thats why its not optimal solution for index probelm, becuase to know the original indexing of the array element we need to store it into the array or map that will use additional space thats why its not optimal for indexing problem.  

 	after sorting we can have 2 pointers one at begining and another at the last and we can get the addition of both the pointers to match the target but if its greater than the target then we need to unshift (j--) the last pointer because array is sorted and if the addition is greater than target meaning we might get the target sum left side only becuase right side it will only get bigger and bigger, similarly if the addition is smaller than the target we shift (i++) the start pointer to get the bigger element.
**/

function optimalTwoSum(arr, target){
	let start = 0;
	let end = arr.length - 1;

	arr.sort((a,b) => a - b) //O(n * logn)

	while(start < end){
		const sum = arr[end] + arr[start];
		if(sum === target) return true;
		else if(sum > target) end--;
		else start++;
	}
	return false

	/*
		TC: O(n* logn) + O(n)
		SC: O(1), so at the expence of slight higher time complexity compare to previous approach, we are getting constant space complexity.
	*/

}

console.log(optimalTwoSum([6,1,2,3,4,5], 5)); // true,