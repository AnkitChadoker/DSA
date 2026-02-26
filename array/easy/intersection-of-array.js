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
//console.log(intersectionOfArray([1,1,1,1,1,2,2,2,2,3], [1,1,1,1,3,3,3]));

/** BETTER APPROACH **/
function betterIntersectionOfArray(arr1, arr2){
	const intersectionMap = new Map();
	
	/*** put all the elements of first array into the map with frequecy of one only becuase there can be repeated elements as well in the same array so we need to stick to the frequecy 1 only, because at the end we are checking if any elemt has frequecy more than 1 those are our guys. **/
	
	for(let i =0; i < arr1.length; i++){
		if(!intersectionMap.has(arr1[i])){
			intersectionMap.set(arr1[i], 1);
		}
	}
	
	
	/*** we only care about the matched element from the map which was set from array 1 and we increse its frequecy if its already not more than 2, becausewe only care if the elementis appearing in both the array so we increase its frequecy till 2 only. **/
	
	for(let i =0; i < arr2.length; i++){
		if(intersectionMap.has(arr2[i]) && intersectionMap.get(arr2[i]) < 2){
			intersectionMap.set(arr2[i], intersectionMap.get(arr2[i]) + 1);
		}
	}
	
	const intersection = [];
	for(let [element, frequency] of intersectionMap){
		if(frequency > 1){ intersection.push(element)}
	}
	
	return intersection;
	
	/**
		TC: O(2(M + N)) // we are looping the arrays and then again the map as well of the same size (at worst).
		SC: O(min(M,N)) + O (M + N) // min becuase the minimum elements will be stored in the intersection array, and O(M+N) for the map (at worst).
		
		so, we brought down the TC in expense of some extra O(M+N) space compare to brute force approach.
	**/
}

console.log(betterIntersectionOfArray([1,1,1,1,1,2,2,2,2,3,5,6,8,8], [1,1,1,1,3,3,3,4,4,4,7,7,7,8]));


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

//console.log(optimalIntersection([1,1,1,1,1,2,2,2,2,3], [1,1,1,1,3,3,3]));

