/** we are given an (n*m) matrix containing elements, if there are 0 ele at any place then we need to set its entire row and column to 0.
 * matrix = [[1,1,1], [1,0,1], [1,1,1]]
 * output = [[1,0,1], [0,0,0], [1,0,1]]
 * 
 * 			1 1 1       1 0 1   
 * 			1 0 1  =>   0 0 0
 * 			1 1 1       1 0 1
 * 
 * 
 * explaination: since we had the element [1,1] as zero to entire row 1 and entire column 1 is set to 0, meaning if any row or column contains the 0 we need to set the entire row and column to 0
 * 
**/



/** BRUTE FORCE **/

/** 
 * we can iterate over the matrix ele. one by one and as we encounter any 0 element we can replace its correspond row and column elements wo are non-zero as infinity, why non-zero only becuase the 0's belongs to rows and columns and we might need to intersept those rows and column in future so need 0 there to precisely mark all the rows and columns.
 * 
 * 
 * and then again iterate over the matrix and where ever there is infinity we can mark that as 0 now and we will get our result.
 * 
 * 
 *  		1 1 1      1 ∞ 1   	  1 0 1   
 * 			1 0 1  =>  ∞ ∞ ∞  =>  0 0 0
 * 			1 1 1      1 ∞ 1   	  1 0 1
**/

function setZeros(matrix){
	const row = matrix.length; // total rows
	const column = matrix[0].length; // total columns

	for(let i = 0; i < row; i++){
		for(let j = 0; j < column; j++){
			if(matrix[i][j] === 0){
				setRowZero(i, column, matrix);
				setColumnZero(j, row, matrix);
			}
		}
	}

	for(let i = 0; i < row; i++){
		for(let j = 0; j < column; j++){
			if(matrix[i][j] === Infinity){
				matrix[i][j] = 0;
			}
		}
	}

	return matrix;

	/**
	 * TC: O((n*m) * (n + m)) + O(n * m) = ~O(n^3) Approx
	 * SC: O(1) 
	**/
}

function setRowZero(row, length, matrix){
	for(let i = 0; i < length; i++){
		if(matrix[row][i] !== 0){
			matrix[row][i] = Infinity;
		}
	}
}


function setColumnZero(column, length, matrix){
	for(let i = 0; i < length; i++){
		if(matrix[i][column] !== 0){
			matrix[i][column] = Infinity;
		}
	}
}

//console.log(setZeros([[0,1,2,0], [3,4,5,2], [1,3,1,5]]));



/** BETTER APPROACH **/

function betterSetZeros(matrix){
	const n = matrix.length;
	const m = matrix[0].length;
	const rows = new Array(n).fill(0);
	const columns = new Array(m).fill(0);

	for(let i = 0; i < n; i++){
		for(let j = 0; j < m; j++){
			if(matrix[i][j] === 0){
				rows[i] = 1;
				columns[j] = 1;
			}
		}
	}

	for(let i = 0; i < n; i++){
		for(let j = 0; j < m; j++){
			if(rows[i] === 1 || columns[j] === 1){
				matrix[i][j] = 0;
			}
		}
	}

	return matrix;

	/**
	 * TC: O(n) + O(m) + O(n * m) + O(n * m)
	 * SC: O(n) + O(m)
	**/
}

console.log(betterSetZeros([[0,1,2,0], [3,4,5,2], [1,0,1,5]]));