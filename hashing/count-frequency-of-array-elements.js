//** BRUTE APPROACH **//
function countFrequecny(arr){
	/** get the maximum elememt from the array, to create an hash array to keep the track of each elements frequency. **/
	let max = arr[0];
	for(let i = 1; i < arr.length; i++){
		if(arr[i] > max){
			max = arr[i];
		}
	}

	/**  create and array of the size of max element + 1, bcuase indexing starts from 0 so we need to cover the max element as well **/
	const hashArr = new Array(max+1).fill(0);

	/** update the array elements frequency in the hash array **/
	for(let i = 0; i < arr.length; i++){
		hashArr[arr[i]]++;
	}

	/** prepare the response from array to show in the expected key value pair. **/
	const res = [];
	for(let [key, value] of hashArr.entries()){
		if(value !== 0){
			res.push([key, value]);
		}
	}

	return res;

	
	/*
		TC: finding max O(n) + counting frequency O(n) => O(2n) {additional for response O(n)}
		SC: hasArray of max + 1 elements O(maxElement + 1), we are wasting the extra space here because lets say we have an array like [1,4, 90] though we need the frequency of 3 elements only but the array hash will take 91 blocks of memory space
	*/
}


//** OPTIMAL APPROACH **/
function optimalCountFrequecny(arr){
	const map = new Map();

	for(let i = 0; i < arr.length; i++){
		if(map.has(arr[i])){
			map.set(arr[i], map.get(arr[i]) + 1);
		} else {
			map.set(arr[i], 1);
		}
	}
	return [...map]

	/*
		TC: O(n), because apprently we are looping through the entire array once.
		SC: O(size of the map), depends on the elements of the array bu at worst case it would be O(n) if every element appears once only.
	*/

}

console.log(countFrequecny([1,9,1,2,3,4,5,3,2,2,2,3,1,4])) // [ [ 1, 3 ], [ 2, 4 ], [ 3, 3 ], [ 4, 2 ], [ 5, 1 ], [ 9, 1 ] ]