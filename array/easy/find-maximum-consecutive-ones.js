/** we are given an array containing only 0 and 1 we need to find the maximum consecutive one's lenght and return it **/
/* 
	arr = [1,1,0,0,1,1,1]
	output = 3
*/

/** there is direct appoach to find the solution we can iterate through the array using 2 variables max and count initially both will be 0 and as soon as we start iterating 1 we will increase the count varibale and on each increment we will check if its greater than tha max if its grater we replace the value of max until we hit the 0 in the array because on each 0 element our consecutiveness (count) will begin from 0 again **/

function findMaximumConsecutiveOnes(arr){
	let max = 0;
	let currentIterationCount = 0;

	for(let i = 0; i < arr.length; i++){
		if(arr[i] === 1){
			currentIterationCount += 1;
			/**  check if this consecutiveness is bigger than the previous. **/
			max = Math.max(max, currentIterationCount);
		} else {
			currentIterationCount = 0;
		}
	}

	return max;

	/*
		TC: O(n), linear iteration through array once.
		SC: O(1)
	*/
}

console.log(findMaximumConsecutiveOnes([1,1,1,1,0,0,1,1,1])); // 4