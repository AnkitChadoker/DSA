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
		let pIndex = partition(arr, low, high);
		quickSort(arr, low, pIndex-1);
		quickSort(arr, pIndex+1, high);
	}
	return arr;
}
console.log(quickSort([1,2,3,4,5,6]));