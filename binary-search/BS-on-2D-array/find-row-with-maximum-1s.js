/**
 * Given a non-empty grid matrix consisting of only 0s and 1s, where all the rows are sorted in ascending order, find the index of the row with the maximum number of ones.
 * If two rows have the same number of ones, consider the one with a smaller index. If no 1 exists in the matrix, return -1.
 *
 * Example 1
 * Input : mat = [ [1, 1, 1], [0, 0, 1], [0, 0, 0] ]
 * Output: 0
 * Explanation: The row with the maximum number of ones is 0 (0 - indexed).
 *
 * 
 * Example 2
 * Input: mat = [ [0, 0], [0, 0] ]
 * Output: -1 
 * Explanation: The matrix does not contain any 1. So, -1 is the answer.
 * 
**/

													/** BRUTE FORCE **/
/**
 * we can scan through entire matrix and for each row we can count how many 1's are there and at the end return the row index containing the max number of 1's.
**/

function rowWithMax1s(matrix){
	let row = -1;
	let standingCount = 0;
	let m = matrix.length;
	let n = matrix[0].length;

	for(let i = 0; i < m; i++){
		let count = 0;
		for(let j = 0; j < n; j++){
			if(matrix[i][j] === 1) count++;
		}
		if(count > standingCount){
			standingCount = count;
			row = i;
		}
	}

	return row;

	/**
	 * TC: O(m * n)
	 * SC: O(1)
	**/
}

//console.log(rowWithMax1s([ [1, 1, 1], [0, 0, 0], [0, 0, 0] ])); // 0

												
													/** OPTIMAL SOLUTION **/

/**
 * Since we know each row of the matrix only contains 0's and 1's that too in a sorted order so instead of scanning through each row linearly we can use binary search on each row assuming the row as inidvidual array and we have solved so many problems through which we can find the number of occurance of 1 in an array containing only 0 and 1, the simplest one is lower bound, we can find the lower bound of 1 in each row which will give as the index of first occurance of 1 and we can get the count from it.
 * 
 * but we need to handle an edge case becuase lower bound returns the length of the array if element not found.
**/

function optimalRowWithMax1s(matrix){
	let m = matrix.length;
	let n = matrix[0].length;
	let standingCount = 0;
	let row = -1;

	for(let i = 0; i < m; i++){
		const index = lowerBound(matrix[i], 1);
		const count = n - index;
		if(count > standingCount){
			standingCount = count;
			row = i;
		}
	}

	return row;

	/**
	 * TC: O(m * logn)
	 * SC: O(1)
	**/
}

function lowerBound(arr, ele){
	let ans = arr.length;
	let low = 0;
	let high = arr.length - 1;

	while(low <= high){
		const mid = Math.floor( (low + high) / 2);
		if(arr[mid] >= ele){
			ans = mid;
			high = mid - 1;
		} else {
			low = mid + 1;
		}
	}
	return ans;
}


console.log(optimalRowWithMax1s([ [0, 0, 0], [0, 0, 0] ])); // -1