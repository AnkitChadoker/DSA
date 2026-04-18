/**
*Given a 2D array matrix where each row is sorted in ascending order from left to right and each column is sorted in ascending order from top to bottom, write an efficient algorithm to search for a specific integer target in the matrix.
*
* Example 1
* Input: matrix = [ [1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30] ], target = 5
* Output: True
* Explanation: The target 5 exists in the matrix in the index (1,1)
*
* 
* Example 2
* Input: matrix= [ [1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30] ], target = 20
* Output: False
* Explanation: The target 20 does not exist in the matrix.
**/


/** NOTE: the entire matrix is not sorted in this problem like the previous problem. **/


											
											/** BRUTE FORCE **/

/**
 * the brute force will be exactly similar to previous problem, just go through each ele. of matrix and check if its target or not.
**/

function searchElement(matrix, target){
	const m = matrix.length;
	const n = matrix[0].length;

	for(let row = 0; row < m; row++){
		for(let column = 0; column < n; column++){
			if(matrix[row][column] === target) return true;
		}
	}

	return false;

	/**
	 * TC: O(m*n)
	 * SC: O(1)
	**/
}

//console.log(searchElement([ [1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30] ],5)) // true




											/** BETTER SOLUTION **/

/**
 * the better solution will also be somewhat similar to previous problem, but since here the entire matrix is not sorted so we can not say that the target can only exists in this particular row, we need to check for every row until we find the target.like if target is 6, and we just say like previous problem solution, if row's last ele. is greater than or equal to 6 its ought be here. like first row has last ele as 15, but 6 was not in the row, and we would have returned false, but 6 do exist in 2nd row so our ans. would be wrong that's why we have to keep finding it until either the target is found or matrix is exhausted.
**/

function binarySearch(arr, target){
	let low = 0; let high = arr.length - 1;
	while(low <= high){
		const mid = Math.floor( (low + high) / 2);
		if(arr[mid] === target) return true;
		else if(arr[mid] > target) high = mid - 1;
		else low = mid + 1;
	}

	return false;
}

function betterSearchElement(matrix, target){
	const m = matrix.length;
	const n = matrix[0].length;

	for(let row = 0; row < m; row++){
		if(binarySearch(matrix[row], target)){
			return true;
		}
	}

	return false;

	/**
	 * TC: O(m * logn)
	 * SC: O(1)
	**/
}

//console.log(betterSearchElement([ [1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30] ],5)) // true





											/** OPTIMAL SOLUTION **/

/**
 * lets first draw the array into 2D Matrix.
 * 
 * 					[ 
 * 					  [1,  4,  7,  11, 15], 
 * 					  [2,  5,  8,  12, 19], 
 * 					  [3,  6,  9,  16, 22], 
 * 					  [10, 13, 14, 17, 24], 
 * 					  [18, 21, 23, 26, 30] 
 * 					]
 * 					
 * 					target = 13
 * 
 * like the previous problem here the entire matrix is not sorted, so we can not apply the similar approach here, here each row is sorted and each column is sorted as well.so let's just try to start with the (0,0) ele. if we stand there and need to know where our target can be and clearly we do not want to go on each ele. and check that's our brute force itself.
 * 
 * Since 13 is greater than 1 [(0,0)] we would find it afterward only but how can we know whether it will be on row or column because both are sorted and since we want to optimize the T.C from (O(m * log n)) we need to somehow implement binary search to reduce the T.C., but as we can see we are not able to apply traditional B.S. here because we do not know which way to go, if we start from [(0,0)].
 * 
 * now let's try to start from last ele as well [(4,4)]. again 13 is less than 30, but it can be on either side row/column because both are decreasingly sorted, so again we can not decide.
 * 
 * now let's try to stand at [(0,4)] or [(4,0)] if we observe carefully (considering [(0,4)] for explanation) from [(0,4)] the row is in decremental order and column is in incremental order.
 * 
 * (i) So if we want to search for 13 and we are standing at 15, it will surely be at decrementing path meaning we go one place less on row at 11 [(0,3)].
 * 
 * (ii) now 13 is greater than 11, so we need to go on incremental path so we go on one place ahead on column at 12 ([1,3]).
 * 
 * (iii) still 12 is less than 13, so we again go on incremental path. so we go at 16 ([(2,3)]).
 * 
 * (iv) now 16 is greater than 13, so we go on decremental path.
 * 
 * (v) now again 9 is lesser so go on incremental path. 14 ([(3,2)]).
 * 
 * (vi) now 14 is greater we go decremental path. 13 [(3,1)]. and we found the target.
 * 
 * 
 * it will be similar if we start from [(4,0)] as well, because these are the only 2 initial points where we can decide which path to choose, and by choosing this paths we are eliminating that particular row or column, and the elimination is one of the properties of B.S.
 * 
 * 
 * 
**/

function optimalSearchElement(matrix, target){
	const m = matrix.length;
	const n = matrix[0].length;

	let row = 0;
	let column = n - 1;

	while(row < m && column >= 0){
		const ele = matrix[row][column];
		if(ele === target) return true;
		else if(ele > target) column--;
		else row++;
	}

	return false;

	/**
	 * TC: O(m + n)
	 * SC: O(1)
	**/
}


console.log(optimalSearchElement([ [1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30] ],5)) // true

/** TC analysis **/

/**
 * Worst Case Complexity
 * 
 * let's say we want to find 18, and below is the path we would follow to find.
 * 
 * Path Walkthrough (Visualized on Matrix):
 * 
 * (i)     [0,4] = 15 --> (Target > 15), Row++
 * (ii)    [1,4] = 19 --> (Target < 19), Col--
 * (iii)   [1,3] = 12 --> (Target > 12), Row++
 * (iv)    [2,3] = 16 --> (Target > 16), Row++
 * (v)     [3,3] = 17 --> (Target > 17), Row++
 * (vi)    [4,3] = 26 --> (Target < 26), Col--
 * (vii)   [4,2] = 23 --> (Target < 23), Col--
 * (viii)  [4,1] = 21 --> (Target < 21), Col--
 * (ix)     [4,0] = 18 --> FOUND
 * 
 * so at worst we need to take 9 steps to find the ele and if the target would have not been in the matrix we would have done 1 more iteration and we would be out of loop so it takes nearly 10 iteration to find an ele. in (5 * 5) matrix, which is (5+5) --> [(m+n)].
**/
