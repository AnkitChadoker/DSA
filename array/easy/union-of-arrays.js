/** 
we are given two arrays and need to return the new array containing union of these two array.
The union of two arrays is an array where all values are distinct and are present in either the first array, the second array, or both.
**/

//** BRUTE FORCE **//
function absoluteBruteUnionOfArrays(arr1, arr2){
	const resultArr = [];
	for(let i = 0; i< arr1.length; i++){
		if(resultArr.includes(arr1[i])) continue;// linear scanning will take O(n) as well
		else resultArr.push(arr1[i])
	}

	for(let i = 0; i< arr2.length; i++){
		if(resultArr.includes(arr2[i])) continue;
		else resultArr.push(arr2[i])
		
	}

	return resultArr.sort((a,b) => a-b);

	/*
		TC: O(n1^2) + O(n2^2) + O((n1+n2)*log(n1+n2))
		SC: O(n1 + n2)
	*/
}
//console.log(absoluteBruteUnionOfArrays([1, 2, 7], [1, 2, 3, 4, 5]))

//** BETTER APPROACH **//
function unionOfArrays(arr1, arr2){
	let i = 0;
	let j = 0;
	const set = new Set();
	
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
		In JS we do not have the ordered set in built so the set will store the elements in the order the were pushed into the set, so if problem ask us to return the sorted array we will have to sort the set array and return it that will take extra nlong time as well.
		
		m = n1 + n2
		TC: O(m) + O(m * logm) // we are linearly scanning through both the arrays entirely, extra m*logm time for sorting if the problem requires that.
		
		SC: O(m) // at worst case both the array elements are entirelly different meaning no match elements are there so we need to store all the elements from both the arrays into the set.
	*/
}

//console.log(unionOfArrays([1, 2, 7], [1, 2, 3, 4, 5])) // [1, 2, 3, 4, 5, 7]


//** OPTIMAL APPROACH **/
function optimalUnionOfArrays(arr1, arr2){
	const unionArr = [];
	let i = 0;
	let j = 0;
	
	//** loop through both the arrays using pointer and compare the adjacent elements if both are same check if the union arrays last element is not the same because arrays are gonna be sorted so the union array will also be filled with the element sorted, if its not the same element insert into the array and incement both pointers, if the both are not same check for the smaller one and same last element again and if last element is not the same insert smaller element and increment its pointer, repeat unless any one of them crosses the array.
	while(i < arr1.length && j < arr2.length){
		
		if(arr1[i] !== arr2[j]){
			if(arr1[i] < arr2[j] && unionArr[unionArr.length - 1] !== arr1[i]){
				unionArr.push(arr1[i]);
				i++;
			} else if(unionArr[unionArr.length - 1] !== arr2[j]) {
				unionArr.push(arr2[j]);
				j++;
			}
		} else {
			if(unionArr[unionArr.length - 1] !== arr1[i]) {
				unionArr.push(arr1[i]);
			}			
			i++;
			j++;
		}
		
	}
	
	// once any one pointer crosess the array check for remaining array elements and same condition check as well if the last element is not the same element insert it and pointer will be incremented regardless of condition because its the only array left so we need to check for all the remaining elements.
	while(i < arr1.length){
		if(unionArr[unionArr.length - 1] !== arr1[i]) {
			unionArr.push(arr1[i]);
		}
		i++;
	}
	
		
	while(j < arr2.length){
		if(unionArr[unionArr.length - 1] !== arr2[j]) {
			unionArr.push(arr2[j]);
		}
		j++;
	}
	
	return unionArr;
	
	/**
		m = arr1's size, n = arr2's size
		
		TC: O(m + n) // looping both the arrays.
		SC: O(m + n) // at worst case all elements might be diffrent so we need to store them all.
		
	**/
}

//console.log(optimalUnionOfArrays([1, 2, 3, 4, 5], [6, 7, 8])) // [1, 2, 3, 4, 5, 6, 7, 8]