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

//console.log(removeDuplicateFromSortedArray([1,1,2,2,2,3,3,3,4]))

//** optimal approach **//

//** since the array is already sorted so we can confirm that is the next element is either gonna be the same element or bigger element, so we can take 2 pointer (i, j) if we encounter the same element we can move the (j) pointer to find the bigger element and replace the (i) pointer with the (j) pointer value
//** since we only need the length of unique array we do not care what ever be stored after that be it null, undefined until explicitly asked.
//** arr = [1,1,2,2,2,3,3,3,4] => [1,2,3,4,_,_,_,_,_]
//** once pointer j crossed the array length the pointer i will be the length of unique array.

//** suppose we put the pointer i at the 0th index becuase the 0th index will always be gonna included in the unique array and we put the j pointer to the 1st index and start the iteration like is j equal to i if yes we march forward (j++) again check is j equal to i this time its no so we swap the value of j with the i+1 (next) index and also do i++ to keep the track of array uniqueness till that index. we repeat the process until j crosses the array at that point what ever the value of i will be out answer (i+1, becuase i is representing the index and we want the length)

function optimalRemoveDuplicateFromSortedArray(arr){
	i = 0;
	for(let j = 1; j < arr.length; j++){
		if(arr[i] !== arr[j]){
			arr[i+1] = arr[j];
			i++;
		}
	}
	return i+1;
	
	//** since we are only going through the array once so TC O(n).
	//** no extra space is being used in-place removal of the duplicate array is being done so SC O(1)
}
console.log(optimalRemoveDuplicateFromSortedArray([1,2,3,4,5]))