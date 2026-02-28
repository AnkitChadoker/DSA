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
	  	TC: O(n) for iterating over array once to record the frequency of the elements, another O((n/2)+1) for preparing the response while iterating over map (O(n + (n/2)+1), because map will have n/2 + 1 elements at max because all the elements are repeating except for one.
	  	SC: O(n/2 + 1), because all the elements will be appearing twice except the one element so map will have (n/2+1) elements.
	**/
}

//console.log(betterOnceAppearedNumber([1,4,4,1,2])); // 2

/** OPTIMAL APPROACH **/
/** we can use XOR OPERATOR here again because problem itself stats that all the elements would be appearing twice which will cancel themself out except for the one which is appearing once. **/

function optimalOnceAppearedNumber(arr){
	let xor = 0;
	for(let i = 0; i < arr.length; i++){
		xor ^= arr[i];
	}

	return xor;

	/*
		TC: O(n)
		SC: O(1)
	*/
}
//console.log(optimalOnceAppearedNumber([1,2,4,1,2])); // 4


//** Complimantry solution, using array sum **/

function complemantryOnceAppearedNumber(arr){
	//** get all the unique elements from the array first. **/
	const set = new Set()
	let sumOfArr = 0;

	for(let i = 0; i< arr.length; i++){
		set.add(arr[i]);
		sumOfArr += arr[i];
	}

	let sumOfSet = 0;
	for(const value of set){
		sumOfSet += value;
	}

	return 2*sumOfSet - sumOfArr;

	/*
		TC: O(n + (n/2 +1))
		SC: O(n/2 +1)

		WHY THIS WORKED: since array would have all the element twice (multiple of 2) except for one element, so if we get all the unique elements from the array (using set, [1,2,4]) and if we sum and double it (2 * sum) and then minus the sum of the array elements ( all the elements will be double execpt for one, and when we minus it from the set sum we will get that single element) we will get the desired element 

		set = [1,2,4] => 2 * 7 = 14
		array = [1,4,4,2,2] => 13

		14 - 13 = 1 (output)
	*/
}

console.log(complemantryOnceAppearedNumber([1,4,4,2,2])); // 1





