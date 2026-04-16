/**
 * You are given an m x n integer matrix matrix with the following two properties:
 *
 *	(i)  Each row is sorted in non-decreasing order.
 *	(ii) The first integer of each row is greater than the last integer of the previous row.
 *
 * Given an integer target, return true if target is in matrix or false otherwise.
 * 
 *  (i) Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
 *	    Output: true
 * 
 *  (ii) Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
 *	     Output: false
 * 
**/

								/** BRUTE FORCE **/
/**
 * we can scan through entire array and check each element if its equal to target and return true if we find the target otherwise return false at the end.
**/

function searchMatrix(matrix, target){
	let m = matrix.length;
	let n = matrix[0].length;

	for(let i = 0; i < m; i++){
		for(let j = 0; j < n; j++){
			if(matrix[i][j] === target) return true;
		}
	}

	return false;

	/**
	 * TC: O(m * n)
	 * SC: O(1)
	**/
}

//console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 30));


								/** BETTER SOLUTION **/

/**
 * again we know each row is sorted so if we check that is the last element of each row is greater than or equal to our target if yes we can apply binary search to that perticuler row only instead of going through each row, because each row is sorted this will be true for each element which is present in the matrix and the target which is not present we are any how returning false at the end as well.
 * 
**/

function betterSearchMatrix(matrix, target){
	const m = matrix.length;
	const n = matrix[0].length;

	for(i = 0; i < m; i++){
		if(matrix[i][n - 1] >= target){
			return findElement(matrix[i], target);
		}
	}

	return false;

	/**
	 * TC: O(m + logn) // We go through each of the `m` rows once, For any valid row where the target can exist, we apply binary search which takes O(log m). So overall time = O(n × log m).
	 * SC: O(1)
	**/
}

function findElement(arr, target){
	let low = 0;
	let high = arr.length - 1;

	while(low <= high){
		const mid = Math.floor( (low + high) / 2);
		
		if(arr[mid] === target) return true;
		else if(arr[mid] > target) high = mid - 1;
		else low = mid + 1;
	}

	return false;
}

//console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 32));


								
								/** OPTIMAL SOLUTION **/

/** if we observe carefully if we flatten this entire 2D matrix into 1D array its an sorted array itself. like,
 *  
 *    [ 
 *      [1,  3,  5,  7],
 *      [10, 11, 16, 20],
 *      [23, 30, 34, 60]
 *    ]
 * 
 *     		to
 * 
 *    [1, 3, 5, 7, 10, 11, 16, 20, 23, 30, 34, 60]
 * 
 * and we can simply apply binarry search on it check if the element is there or not.
 * 
 * 
 * But flattening the matrix is also a heavy operation which will take extra time and memory making the algo inefficiant, so we can't flatten the matrix for real but we need to simulate the flattening without converting it from 2D to 1D.
 * 
 * we can map the index of this eventual 1D array to the 2D matrix which we have.
 * 
 * suppose after applying binary search we got our mid (index) as 5 so at the 5th index we have 11, but how can we map this to our 2D matrix (because we need to know whether the mid element is greater, smallet or equal to the target for which we need to map it back to our real matrix.)
 * 
 * our, index = 5
 * now we have 4 columns here in our matrix, if we do follow things we will be able to find the element in the matrix itself
 * 
 * 		row = Math.floor( index / columns ) => floor(5/4) => 1
 *      column = index % column => 5 % 4 => 1
 * 
 * so if we do matrix[row][column] => matrix[1][1] = 11 
 * 
 * 
 * this way we can get the element on perticuler index and then move our binary search based on that.
**/

function optimalSearchMatrix(matrix, target){
	const m = matrix.length;
	const n = matrix[0].length;

	let low = 0;
	let high = m * n - 1; // because the last index would be 11 (3 * 4 - 1 => 11) in our simulated sorted array.

	while(low <= high){
		const mid = Math.floor( (low + high) / 2);

		/** get row and column for mapping it back to the real matrix **/
		const row = Math.floor( mid / n);
		const column = mid % n;

		if(matrix[row][column] === target) return true;
		else if(matrix[row][column] > target) high = mid - 1;
		else low = mid + 1;
	}

	return false;

	/**
	 * TC: O(log(m * n))
	 * SC: O(1)
	**/
}

console.log(optimalSearchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 11)); // true