/**
* Given a 2D array matrix that is row-wise sorted. The task is to find the median of the given matrix.
*
* Example 1
* Input: matrix=[ [1, 4, 9], [2, 5, 6], [3, 7, 8] ] 
* Output: 5
* Explanation: If we find the linear sorted array, the array becomes 1 2 3 4 5 6 7 8 9. So, median = 5
*
* 
* Example 2
* Input: matrix=[ [1, 3, 8], [2, 3, 4], [1, 2, 5] ] 
* Output: 3
* Explanation: If we find the linear sorted array, the array becomes 1 1 2 2 3 3 4 5 8. So, median = 3
**/


											/** BRUTE FORCE **/

/** median is the mid value of the sorted array **/
/** so we flatten the 2D matrix into 1D array and then sorted it and then returned the mid value of the sorted array **/

function findMedian(matrix){
	const m = matrix.length;
	const n = matrix[0].length;
	const arr = [];

	for(let row = 0; row < m; row++){
		for(let col = 0; col < n; col++){
			arr.push(matrix[row][col]);
		}
	}

	arr.sort((a, b) => a - b);

	return arr[Math.floor(arr.length / 2)];

	/**
	 * TC: O(m * n) + O((m*n) * log(m*n))
	 * SC: O(m * n)
	**/
}
console.log(findMedian([ [1, 3, 8], [2, 3, 4], [1, 2, 5] ])); //3



											/** OPTIMAL APPROACH **/

/** If we flatten the 2D matrix into 1D array and sort it below will be our matrix representation :
 * 	
 * matrix = matrix=[ [1, 3, 8], [2, 3, 4], [1, 2, 5] ]
 * 		
 * arr = [1, 1, 2, 2, 3, 4, 5, 8], mid = arr[floor(8/2)] => arr[4] => 3
 * 
 * mid is nothing but the first element which has more than (arr.length / 2) elements, less than or equal to it in the array, like here 3 has 5 elements which were less than or equal to it in the array, though 4, 5, and 8 also have more than (arr.length / 2) elements which are less than or eqaul to them, but mid is the first element of the array which satisfies this condition.
 * 
 * if we see previous elements than 3, 2 had only 4 elements which are less than or equal to 2, but we need more than (arr.length / 2) elements to be less than or eqaul to mid and 3 is that element.
 * 
 * but we can not flatten the matrix otherwise the TC will be almost equal to the brute force, so we need to find some other way to acheive it.
 * 
 * if we observe carefully and see our search space its between 1 and 8 which are nothing but the min and max element of our matrix, so we can find the min and max ele. of our matrix and apply BS on it to find such element which satisfies the above conditions among the range from 1 to 8. for each mid element we can find how many elements are less than or equal (upper bound) if we found such mid we keep on looking for smaller element which satisfies these conditions.
 * 
 * since we are taking the rage from min to max like in our case 
 * 
 * 			[1, 2, 3, 4, 5, 6 ,7, 8]
 * 
 * there might be a question what if we find such a mid which satisfies the above condition but does not exist in our matrix like 6, YES this can happen but remember we are looking for the min. ele which satisfies the above condition so ultimately we will find the element which is present in the matrix. (You can try taking any kind of matrix we will be finding the median from the matrix everytime.)
**/

function optimalFindMedian(matrix){
	const m = matrix.length;
	const n = matrix[0].length;
	const medianCheck = Math.floor( (m * n) / 2 );

	let low = matrix[0][0];
	let high = matrix[0][n - 1];
	for(let i = 1; i < m; i++){
		low = Math.min(low, matrix[i][0]);
		high = Math.max(high, matrix[i][n -1]);
	}

	while(low <= high){
		const mid = Math.floor( (low + high) / 2);
		const count = checkSmallerCount(matrix, m, n, mid);
		if(count > medianCheck){
			high = mid - 1;
		} else {
			low = mid + 1; 
		}
	}

	return low;

	/**
	 * O(log(max-min) * m * logn)
	 * SC: O(1)
	**/
}

function checkSmallerCount(matrix, rows, cols, ele){
	let count = 0;
	for(let i = 0; i < rows; i++){
		index = upperBound(matrix[i], ele);
		console.log(index);
		count += index;
	}
	return count;
}

function upperBound(arr, target){
	let low = 0;
	let high = arr.length - 1;
	let ans = arr.length;
	
	while(low <= high){
		const mid= Math.floor((low + high)/2);
		if(arr[mid] > target){
			ans = mid;
			high = mid - 1;
		} else {
			low = mid + 1;
		}
	}

	return ans;
}

//console.log(findMedian([ [1, 3, 8], [2, 3, 4], [1, 2, 5] ]));