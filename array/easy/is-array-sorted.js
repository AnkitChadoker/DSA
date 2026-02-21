//** we need to return true if array is sorted other wise false **//
//** arr = [1,2,3,4,5,6]
//** output = true

//** arr = [1,2,3,4,6,5]
//** output = false

//** there is a very easy way to know if array is sorted or not
//** traverse through the array and check if previous element is smaller or equal at any point the condition false return false and if we traverse through entire array without returning false meaning its a sorted array

function isArraySorted(arr){
	for(let i = 1; i < arr.length; i++){
		if(arr[i] < arr[i-1]) {
			return false;
		}
	}
	return true;
	
	//** TC - O(n)
	//** SC - O(1)
}

console.log(isArraySorted([1,2,3,4,5,5]))