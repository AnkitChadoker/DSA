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
			
		while(arr[i] <= arr[pivot] && i <= j) i++; 
		while(arr[j] > arr[pivot] && i <= j) j--;
		
		if(i <= j){
			[arr[i], arr[j]] = [arr[j], arr[i]];
			i++;
			j--;
		}
	}
	[arr[pivot], arr[j]] = [arr[j], arr[pivot]];
	return j;
}

function partitionAsHigh(arr, low, high){
	let pivot = high;
	let j = high - 1;
	let i = low;
	
	while(i <= j){
		while(i <= j && arr[i] <= arr[pivot]) i++;
		while(j >= i && arr[j] > arr[pivot]) j--;
		if(i <= j){ [arr[i], arr[j]] = [arr[j], arr[i]]; i++; j--;}
	}
	[arr[pivot], arr[i]] = [arr[i], arr[pivot]];
	return i;
}

function quickSort(arr, low = 0, high = arr.length - 1){
	if(low < high){		
		let pIndex = partition(arr, low, high);
		
		//** randomizing the pivot would help us tackle the worst case time complexity from O(n^2) to O(n*logn), for sorted array, roteted sorted array or partial sorted arrays **/
		//let pIndex = randomPartition(arr, low, high);
		
		quickSort(arr, low, pIndex-1);
		quickSort(arr, pIndex+1, high);
	}
	return arr;
}
//console.log(quickSort([3,4,2,1,5]));


function quickSortIterative(arr){
	const stack = [];
	stack.push([0, arr.length - 1]);
	while(stack.length > 0){
		const [low, high] = stack.pop();
		if(low < high){
			let pIndex = partitionUsingSinglePointer(arr, low, high);
			stack.push([low, pIndex-1]);
			stack.push([pIndex + 1 , high]);
		}
	}
	return arr;
}

console.log(quickSortIterative([6,7,4,6,78,3,3,3,5,4,3,5,3,4]));

//** pivot as low **/
/* function partitionUsingSinglePointer(arr, low, high){
		const pivot = low;
		
		// i representing the smaller region here since when we select the low as pivot the array should be divided like this [pivot | smalller | greater] and we can not guarantee at the begining if there is any smaller element or not thats why we take i = low, meaning there is no element in the smaller part as of now.
		let i = low;
		
		for(let j = i + 1; j<= high; j++){
			if(arr[j] < arr[pivot]){
				// since i representing the lower part of the array (meaning the element lower than the pivot should be before pivot) thats why as soon as we encounter any smaller element than pivot we increment i and swap the smaller value with it (swap(i,j).
				i++;
				[arr[i], arr[j]] = [arr[j], arr[i]];
			}
		}
		
		// at the the end i will be pointing the correct postion of the pivot.
		[arr[i], arr[pivot]] = [arr[pivot], arr[i]];
		return i;
} */

//** pivot as high **/
function partitionUsingSinglePointer(arr, low, high){
	const pivot = high;
	
	// since i representing the lower part of an array and we are choosing pivot as high so we do not no if there is any smaller element then the pivot at all so we take i = low - 1 and as we scan from low to high and find the smaller element than pivot we increment the i.
	
	// i representing the smaller region here since when we select the high as pivot the array should be divided like this [smalller | greater | pivot] and we can not guarantee at the begining if there is any smaller element or not thats why we take i = low - 1, meaning there is no element in the smaller part as of now.
	let i = low - 1;
	for(let j = low; j<= high; j++){
		if(arr[j] < arr[pivot]){
			i++;
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
	}
	
	// since we already took i = low - 1 so at the time of swapping we must +1 otherwise it would throw undefined index becuase suppose 0th element is the correct position itself than i would be -1 becuase it did not increment at all so we need to do i+1 to make it under boundation.
	[arr[i+1], arr[pivot]] = [arr[pivot], arr[i+1]];
	return i+1;
}