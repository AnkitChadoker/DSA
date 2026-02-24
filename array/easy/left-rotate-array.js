//** left rotate array **//

//** by One **//
//** arr = [1,2,3,4,5,6] **//
//** output = [2,3,4,5,6,1] **//


//** take out the 0th index in temp variable as we need to to only rotate by one meaning only the first element of array will be rotated and other elements will be shifted one position before. **//

function leftRoateArrayByOne(arr){
	const temp = arr[0];
	for(let i = 1; i < arr.length; i++){
		arr[i-1] = arr[i];
	}
	arr[arr.length - 1] = temp;
	return arr;
	
	//** TC = O(n) **//
	//** SC = O(1) **// 
}

//console.log(leftRoateArrayByOne([1,2,3,4,5,6]));

//** left rotoate array by d palces **//
//** instead of only rotating it by only one place we need to rotate the array by give d places **//
//** lets try for 2 places for now **//

//** arr = [1,2,3,4,5,6] **/
//** output = [3,4,5,6,1,2] **//

//** so array got shifted by 2 places **//

function leftRotateArrayBy2Places(arr){
	const tempArr = [arr[0], arr[1]];
	
	for(let i = 2; i < arr.length; i++){
		arr[i-2] = arr[i];		
	}
	
	[arr[arr.length - 2], arr[arr.length - 1]] = tempArr;
	return arr;
}
//console.log(leftRotateArrayBy2Places([1,2,3,4,5,6]));


//** now suppose we need to rotate by the array length itself like by 6 so the array will be in its original condition itself. **//
/*  like below

1. [2,3,4,5,6,1]
2. [3,4,5,6,1,2]
3. [4,5,6,1,2,3]
4. [5,6,1,2,3,4]
5. [6,1,2,3,4,5]
6. [1,2,3,4,5,6] 

*/

/** 
now if we need to rotoate by 8 lets say 
meaning we need to just rotate by 2 places because the 6 rotoations will make the array as it is.
now lets say we need to rotate the array by 15 places which will again be 3 roations only because multiple of 6 will be the same as the original array
so the final rotation we can get by d % n (where d is the number given the time of rotaions, and n is the length of the array).
like, 
6 % 6 = 0
8 % 6 = 2
15 % 6 = 3

now what we were doing is we were keeping the 0 to (rotation -1) index array as tempArr to replace it later on.
and were shifting the array from rotation to name.
and then replacing the array from (length - rotation) to n.
lets do it using code
**/

/** Brute Force **/
//lets say d = 15
// arr = [1,2,3,4,5,6]
function leftRotateArrayByDPlaces (arr, d){	
	const arrLength = arr.length; // 6
	const rotations = d % arrLength; // 15 % 6 = 3
	const tempArr = [];
	
	// 0 to 2 (0,1,2)
	for(let i = 0; i < rotations; i++){
		tempArr.push(arr[i]);
	}
	
	//3 to 5 (3,4,5)
	for(let i = rotations; i < arrLength; i++){
		//arr[3-3], arr[4-3], arr[5-3]
		//arr[(0,1,2)]
		arr[i-rotations] = arr[i];
	}
	
	//0 to 2 
	for(let i = 0; i < tempArr.length; i++){
		// arr[(6-3) + i] (arr[3+i])
		// arr[(3,4,5)]
		arr[(arrLength - rotations) + i] = tempArr[i];
	}	
	
	return arr;
	
	/** 
		TC:
		 first loop: O(r) {where, r = number of rotations }
		 second loop: O(n-r) 
		 third loop: O(r) 
		 total = O(r + n - r + r) => O(r + n)
		 
		SC: 
		  tempArr of size r, so O(r)
	*/
}

console.log(leftRotateArrayByDPlaces([1,2,3,4,5,6], 15))
