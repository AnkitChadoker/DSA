/** 
we are given two arrays and need to return the new array containing union of these two array.
The union of two arrays is an array where all values are distinct and are present in either the first array, the second array, or both.
**/
function unionOfArrays(arr1, arr2){
	let i = 0;
	let j = 0;
	const set = new Set();
	while(i < arr1.length && j < arr2.length){
		if(arr1[i] < arr2[j]){
			set.add(arr1[i]);
			i++;
		} else {
			set.add(arr2[j]);
			j++;
		}
	}
	
	while(i < arr1.length){
		set.add(arr1[i]);
		i++;
	}
	
	while(j < arr2.length){
		set.add(arr2[j]);
		j++;
	}
	
	return [...set];
	
	/*
		m = n1 + n2
		TC: O(m * logm) // because set takes logn time to add an element into the set. and we are linearly scanning through both the arrays entirelly
		
		SC: O(m) // at worst case both the array elements are entirelly diffrent meaning no match elements are there so we need to store all the elements from both the arrays into the set.
	*/
}

console.log(unionOfArrays([1, 2, 3, 4, 5], [1, 2, 7])) // [1, 2, 3, 4, 5, 7]