/** we are given an array and an element will be appearing for more than half the array size we need to return that element **/
/** arr = [1,2,1,4,5,1,1,7,1]
 * output = 1
 * because 1 is appearing 5 time which is more than the half of array size 9/2 = 4 (floor value) **/


/** BRUTE FORCE **/
/** we can check for each element against the same element and count its occurances if any element has occured more than the majority thats our guy */

function majorityElement(arr){
	let majority = Math.floor(arr.length/2);

	for(let i = 0; i < arr.length; i++){
		let count = 0;
		for(let j = 0; j < arr.length; j++){
			if(arr[i] === arr[j]){
				count++;
			}
		}
		if(count > majority) return arr[i];
	}
	return -1

	/*
		TC: O(n*n)
		SC: O(1)
	*/ 
}

//console.log(majorityElement([1,2,1,4,5,1,1,7,1]));


/** BETTER APPROACH **/
/** instead of double iteration we can iterate over the array once and store all the elements frequency in the map and then iterate over the map and find the majority element. **/

function betterMajorityElement(arr){
	const map = new Map();
	const majority = Math.floor(arr.length/2);

	for(let i = 0; i < arr.length; i++){
		if(map.has(arr[i])){
			map.set(arr[i], map.get(arr[i]) + 1);
		} else {
			map.set(arr[i], 1);
		}
	}

	for(const [ele, freq] of map){
		if(freq > majority) return ele;
	}

	return -1;

	/*
		TC: O(n) + O(n) (to return the response, if no majority element is there the map might have all the elements in it.)
		SC: O(n) //if no majority element is there the map might have all the elements in it at worst case
	*/ 
}
//console.log(betterMajorityElement([1,2,1,4,5,1,1,7,1]));


/** OPTIMAL APPRAOCH **/
/** Moore's voting algo. **/

function optimal(arr){
	let candidate = arr[0];
	let count = 1;

	for(let i = 1; i < arr.length; i++){
		if(count === 0){ candidate = arr[i] };

		if(arr[i] === candidate){
			count++;
		} else {
			count--;			
		}

		if(count === 0){
			candidate = -1;
		}
	}

	return candidate;

	/*
		TC: O(n)
		SC: O(1)
	*/
}

console.log(optimal([1,2,1,4,5,1,1,7]));