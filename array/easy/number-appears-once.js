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

//console.log(onceAppearedNumber([1,4,4,1,2])); // 2


/** BETTER APPROACH **/
/** instead of iterating for every element againt the same array we can use the map data structure to keep the count of frequency. and in the single sweep of array we will have the frequency of each element of the array **/

function betterOnceAppearedNumber(arr){
	const map = new Map();

	for(let i = 0; i < arr.length; i++){
		if(map.has(arr[i])){
			map.set(arr[i], map.get(arr[i]) + 1);
		} else {
			map.set(arr[i], 1);
		}
	}

	for(const [key, value] of map){
		if(value === 1) return key;
	}	

	/** 
	  	TC: O(n) for iterating over array once to record the frequency of the elements, another O(n) for preparing the response while iterating over map (O(n + n)).
	  	SC: O(n), map space.
	** /
}

console.log(betterOnceAppearedNumber([1,4,4,1,2])); // 2