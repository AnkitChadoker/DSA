/** 
we are given two sorted arrays and need to return the new array containing intersection of these two array.
The intersection of two arrays is an array where all values are common and are present in both the arrays.

arr1 = [1,2,3,4,5,6]
arr2 = [1,5,6,7,8,9]
output = [1,5,6]

**/

/** BRUTE FORCE **/
function intersectionOfArray(arr1, arr2){
	const intersection = [];
	
	for(let i = 0; i < arr1.length; i++){
		for(let j = 0; j < arr2.length; j++){
			if(arr1[i] === arr2[j]){
				if(intersection[intersection.length - 1] !== arr1[i]){									
					intersection.push(arr1[i]); break;
				}
			}
		}
	}
	
	return intersection;
	
	/**
		TC: we are looping through both the arrays entirely though we are using the break statement on the match but there could be the posibility that no element are common in the arrays, thats the worst case posible so,
		O(m * n)
		
		SC: O(min(m,n)) // there can not be more elements in the intersection arary then the min. of these two arrays, because we are checking for common elements and it should be present in both the arrays
	**/
}

//console.log(intersectionOfArray([1,2,3,4,5,6], [7,8,9]));


/** OPTIMAL APPROACH **/
function optimalIntersection(arr1, arr2){
	const intersection = [];
	let i = 0;
	let j = 0;
	while(i < arr1.length && j < arr2.length){
		if(arr1[i] === arr2[j]){
			if(intersection[intersection.length - 1] !== arr1[i]){
				intersection.push(arr1[i]);
			}
			i++;
			j++
		} else {
			if(arr1[i] < arr2[j]){
				i++;
			} else {
				j++
			}
		}
	}
	
	return intersection;
	
	/**
		TC: O(max(n,m)) // at most we can loop the max. of any of these to array, which is linear TC.
		SC: O(min(n,m))
	**/
}

console.log(optimalIntersection([1,2,2,2,2,2,2,3,4,5,6], [1,5,5,5,5,5,6,7,8,9]));

