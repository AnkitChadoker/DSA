function randomPartition(arr, low, high) {
		//** suppose we have high = 4, low = 3 **/
		const randomIndex = Math.floor(Math.random() * (high - low + 1)) + low;
		//** Math.random() will give as any float value 0 <= value < 1
		// ** (high - low + 1) will give us the size of the elements (4-3+1) = 2 array of [1,2] from taken array
		//** Math.floor(Math.random() * 2) => will always give us the number between 0 (inclusive) to 2 (exlusive) because floor will round down the value so there will be only 2 values possible for 2 size aarray which is 0 and 1.
		//** but our array indexing is begining from 3 (low) so we shift the above calculation by low, thats why we added +low at the end to shift the indexing to the desired window (3 to 4). **//
		
		//** swapped the randomIndex with low since we are considering low as our pivot so to keep the logic unchanged we swapped it with low.**//
		[arr[low], arr[randomIndex]] = [arr[randomIndex], arr[low]];
		
		return partition(arr, low, high);
}

function partition(arr, low, high){
	const pivot = low;
	let i = low + 1;
	let j = high;
	
	while(i <= j){
			
		while(arr[i] <= arr[pivot] && i <= high) i++; 
		while(arr[j] > arr[pivot] && j >= low) j--;
		
		if(i <= j){
			[arr[i], arr[j]] = [arr[j], arr[i]];
			i++;
			j--;
		}
	}
	[arr[pivot], arr[j]] = [arr[j], arr[pivot]];
	return j;
}

function quickSort(arr, low = 0, high = arr.length - 1){
	if(low < high){		
		//let pIndex = partition(arr, low, high);
		
		//** randomizing the pivot would help us tackle the worst case time complexity from O(n^2) to O(n*logn), for sorted array, roteted sorted array or partial sorted arrays **/
		let pIndex = randomPartition(arr, low, high);
		
		quickSort(arr, low, pIndex-1);
		quickSort(arr, pIndex+1, high);
	}
	return arr;
}
console.log(quickSort([3,5,4,1,2]));