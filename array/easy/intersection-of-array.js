/** 
we are given two arrays and need to return the new array containing intersection of these two array.
The intersection of two arrays is an array where all values are common and are present in both the arrays.

arr1 = [1,2,3,4,5,6]
arr2 = [1,5,6,7,8,9]
output = [1,5,6]

**/

function intersectionOfArray(arr1, arr2){
	const intersection = [];
	
	for(let i = 0; i < arr1.length; i++){
		for(let j = 0; j < arr2.length; j++){
			if(arr1[i] === arr2[j]){
				intersection.push(arr1[i]); break;
			}
		}
	}
	
	return intersection;
	
	/**
		TC: we are looping through both the arrays entirely though we are using the break statement on the match but there could be the posibility that no element are common in the arrays, thats the worst case posible so,
		O(m*n)
		
		SC: O(min(m,n)) // there can not be more elements in the intersection arary then the min. of these two array element, because we are checking for common elements and it should be present in both the arrays
	**/
}

console.log(intersectionOfArray([1,2,3,4,5,6], [7,8,9]));