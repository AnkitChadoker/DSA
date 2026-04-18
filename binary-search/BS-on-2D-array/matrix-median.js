function findMedian(matrix){
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
	console.log(arr, target);
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

console.log(findMedian([ [1, 3, 8], [2, 3, 4], [1, 2, 5] ]));