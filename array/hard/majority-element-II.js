/** we are given an array of integers of size n and we need to return the elements who are appearing more than n/3 times **/
/** arr = [1,2,1,1,3,2]
 * output = [1]
 * explanation: n / 3 = 6/3 = 2, and here only 1 is the element which is appearing more than >2 time (3).
**/


												/** BRUTE FORCE **/
/** we can simply iterate over the array and check for each element linearly if the element is appearing more than n/3 times and and we can push the element into the result array. **/

/* NOTE: from the majority element I problem we knew that there can be only 1 posible element which can apprear more then half the size of array, similarly here there can at most only 2 elements are possible becuase lets say we have a array size 10 and 10/3 would be 3 (floor value) so there can only be 2 element at max which can appear more than 3 times (min 4 times), beacuse (4+4 = 8) and there would be not much room for any other element to appear more than 3 times.  */

function bruteMajorityElementII(arr){
	const majority = Math.floor(arr.length/3);
	const answer = [];

	for(let i = 0; i < arr.length; i++){
		let count = 0
		for(let j = 0; j < arr.length; j++){
			if(arr[i] === arr[j]){
				count++;
				if(count > majority && arr[i] !== answer[0]){
					answer.push(arr[i]);
				}
			}
		}
		if(answer.length === 2) break;
	}
	
	return answer;

	/**
	 * TC: O(n^2)
	 * SC: O(1) // the array of size 2 is almost constant space
	**/
} 

//console.log(bruteMajorityElementII([1,2,1,1,3,2,2])); // [1,2]


												


												/** BETTER APPROACH **/
/** instead of iterating twice over the same array we can store the frequncy of the elements in the map and then can return the elements whose frequncy are greater than majority **/

function betterMajorityElementII(arr){
	const majority = Math.floor(arr.length/3);
	const map = new Map();

	for(let i = 0; i < arr.length; i++){
		if(map.has(arr[i])){
			map.set(arr[i], map.get(arr[i]) + 1);
		} else {
			map.set(arr[i], 1)
		}
	}

	const answer = [];
	for(const [ele, freq] of map){
		if(freq > majority){
			answer.push(ele);
			if(answer.length === 2) break;
		}
	}

	return answer;

	/** 
	 * TC: O(n) + O(n) = O(2n)
	 * SC: O(n)
	**/
}

//console.log(betterMajorityElementII([1,2,1,1,3,2,2])); // [1,2]

/** we can save the extra looping over the map by just checking at the time of setting the value in the map if the element has frequency more than the majority we can directly add it into the result array. **/

function betterOptimalMajorityElementII(arr){
	const majority = Math.floor(arr.length/3);
	const answer = [];
	const map = new Map();

	for(let i = 0; i < arr.length; i++){
		if(map.has(arr[i])){
			const freq = map.get(arr[i]) + 1;
			if(freq > majority){
				answer.push(arr[i]);
				if(answer.length === 2) break;
			}
		 	map.set(arr[i], freq);
		} else {
			map.set(arr[i], 1);
		}
	}

	return answer;

	/**
	 * TC: O(n)
	 * SC: O(n)
	**/
}
console.log(betterOptimalMajorityElementII([1,2,1,1,3,2])); // [1,2]