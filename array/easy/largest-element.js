//** we need to find the largest element in the given array **//
//** arr = [1,5,4,8,9,2];
//** output = 9

//** brute force **//
function largestElement(arr){
	//** sort the array, if we sort the array we now the largest element would be on the last element in the array. **//
	//** but since we know array sorting takes O(n*logn) time so the time complexity of this algo. would be O(n*logn). **//
	
	arr.sort((a, b) => a - b);
	return arr[arr.length - 1];
}

//** optimal solution **/
function optimalLargestElement(arr){
	//** take first element as the largest **//
	let largest = arr[0];
	//** iterate through the array and compare against each element and if we find any bigger number than largestwe assign that number to the largest at the end we will have the largest number.
	
	for(let i = 1; i < arr.length; i++){
		if(arr[i] > largest){
			largest = arr[i]
		}
	}
	return largest;
	
	//** since we loop through the entire array so the TC will be O(n) where n is the length of the array, and we did not take any extra space so the SC will be O(1) though we used the array itself so algo. used the O(n) space to run but we did not take any extra space to run the algo. **//
}

console.log(optimalLargestElement([1,5,4,8,11,9,2]))