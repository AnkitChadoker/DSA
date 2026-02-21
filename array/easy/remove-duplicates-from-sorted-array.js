//** we need to remove duplicates from sorted array and return the length of the array containing only unique elements **//
//** arr = [1,1,2,2,2,3,3,3,4]
//** output = 4 // becuase [1,2,3,4]

//** arr = [1,2,3,4,5]
//** output = 5 // becuase no duplication


//** brute force **//
//** we can traverse through the entire array and create a separate set (because set bydefault ignores the duplicates) containing only unique elements

function removeDuplicateFromSortedArray(arr){
	
	// short form to create an unique array using Set
	/* const uniqueArr = [...new Set(arr)];
	return uniqueArr.length; */
	
	const uniqueSet = new Set();
	for(let i = 0; i< arr.length; i++){
		uniqueSet.add(arr[i]);
	}
	return uniqueSet.size;
	
	//** since set insert the elements in the sorted order always so it takes O(logn) time to add an element and we are traversing through the array of n element so the TC will be O(n) + O(logn).
	//** we are using an extra space to store the unique elements and in the worst case when there is no duplicate in the array the SC will be O(n) as well.
}

console.log(removeDeuplicateFromSortedArray([1,1,2,2,2,3,3,3,4]))
