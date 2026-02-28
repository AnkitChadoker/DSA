/** we are given an array and we nee dto find the element which appear only once and all the remaining elements would be appearing twice **/

/**
	arr = [1,2,4,1,2]
	output = 4
 */

/** BRUTE FORCE **/
/** we can check each element of the array against the same array how many times it is appearing. **/
function onceAppearedNumber(arr){

	for(let i = 0; i < arr.length; i++){
		let count = 0;
		for(let j = 0; j < arr.length; j++){
			if(arr[j] === arr[i]){
				count+=1
			}
		}
		if(count === 1) return arr[i]
	}

	/*
		TC: O(n * n), we are looking for each element of the array against the same array if it has appeared once or twice.
		SC: O(1)
	*/
}

console.log(onceAppearedNumber([1,4,4,1,2])); // 2