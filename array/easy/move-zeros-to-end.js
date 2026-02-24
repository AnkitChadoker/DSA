//** we are given an array and need to move the zeros to the end of the array **//
//** arr = [1,2,0,0,4,3,5,0,7,8,0,9]
//** output = [1,2,4,3,5,7,8,9,0,0,0,0]


//** BRUTE FORCE **//
/**
	1.we can loop through the entire array and take out the non zero element and store it into new temp array.
	2.once we have all the non zero element we can replace it into main array and at tha last in the remainig places we can append the zeros	
*/
function moveZeroToEnd(arr){
	const tempArr = [];
	for(let i = 0; i < arr.length; i++){
		if(arr[i] !== 0) tempArr.push(arr[i]);
	}
	
	for(let i = 0; i < tempArr.length; i++){
		arr[i] = tempArr[i];
	}
	
	for(let i = tempArr.length; i < arr.length; i++){
		arr[i] = 0
	}
	return arr;	
	
	/*
		TC:
			firstLoop: O(n) to get all the non zero
			secondLoop: O(nz) to replace all non zero in main array (where nr is number of non zero elements)
			thirdLoop: O(n-nz) to append 0 at the end at all remaining positions
			total TC: O(n + nz + n - nz) => O(2n)
		SC:
			O(n) in worst case there could be no non zero element so all the non zero (all array elements) would be stored in the temp array.
	*/	
}

console.log(moveZeroToEnd([1,2,0,0,4,3,5,0,7,8,0,9])) //[1,2,4,3,5,7,8,9,0,0,0,0]