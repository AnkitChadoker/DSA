function merge(arr, left, mid, right){
	let i = left;
	let j = mid + 1;
	const tempArr = [];
	
	while(i <= mid && j <= right){
		if(arr[i] < arr[j]){
			tempArr.push(arr[i]); i++;
		} else {
			tempArr.push(arr[j]); j++;
		}
	}

	while(i <= mid){
		tempArr.push(arr[i]); i++;	
	}

	while(j <= right){
		tempArr.push(arr[j]); j++;
	}
	
		
	for(let k = 0; k < tempArr.length; k++){
		arr[left + k] = tempArr[k];
	}
}


//** recursive **//
function mergeSort(arr, left = 0, right = arr.length - 1){
	if(left >= right) return arr;
	let mid = Math.floor((left + right)/2);
	mergeSort(arr, left, mid);
	mergeSort(arr, mid+1, right);
	merge(arr, left, mid, right);
	return arr;
}

//** Iterative **/
function mergeSortIterative(arr){
	const n = arr.length;
	for(let size = 1; size < n; size = 2*size){
		for(let i=0; i < n-1; i += 2*size){
			const mid = Math.min(i+size-1, n-1);
			const right = Math.min(i + 2*size-1, n-1);
			if(mid < right){
				merge(arr, i, mid, right);
			}
		}
	}
	return arr;
}

console.log(mergeSortIterative([3, 5, 4, 1, 2]));
