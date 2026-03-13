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
/**
 * since our brute is reaching till O(n^3) approximately we need to do it in O(n^2), because at least that much time will be needed to traverse over the matrix once.
 * since we know that we need to set the entire row and column if there is atleast one 0 is there, so instead of marking them all at the encounter time (which is the main reason why our brute is reaching till O(n^3)), we can keep track of the concerned rows and columns and then in the next iteration only we can check if is row or column was ever marked to have a 0 if yes then we can 0 the entire row and column 
 * 
 * columns=[0 1 0]
 * rows=[0	1 1 1       1 0 1   
 * 		 1	1 0 1  =>   0 0 0
 * 		 0] 1 1 1       1 0 1
 * 
**/
function betterSetZeros(matrix){ //[[1,1,1], [1,0,1], [1,1,1]]
	const n = matrix.length; // total rows
	const m = matrix[0].length; // total columns

	const rows = new Array(n).fill(0); //[0,0,0]
	const columns = new Array(m).fill(0); // [0,0,0]

	//** find all the 0 and mark the corresponding positions in the respective (rows, columns) array **/
	for(let i = 0; i < n; i++){
		for(let j = 0; j < m; j++){
			if(matrix[i][j] === 0){
				rows[i] = 1;
				columns[j] = 1;
			}
		}
	}

	// rows = [0,1,0]
	// columns = [0,1,0]

	/** check for the marked rows and columns and mark the respective row and column as 0 entirely. **/
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

//console.log(betterSetZeros([[0,1,2,0], [3,4,5,2], [1,0,1,5]]));



/** OPTIMAL SOLUTION **/
/** 
 * in our brute force we are using O(n + m) space which we can work on, and do inplace replace instead. the optimal siolution is also derived from the better solution itself but instead of using extra space for tracking the zeros of rows and columns we can use the 0th row and column of the matrix iteself.
 *          col0 = 1 // matrix[0][0]
 *          row
 *           _
 *	 column	 1 [1 1]         
 * 		     1 0 1 
 *	 		 1 1 1 
 * 		     -
 * 
 * but if see we are getting one overlapping candidate in both row and column markers matrix[0][0], so what we can do is we can keep it in the seprate variable called col0 = matrix[0][0] and we can start the column marker from one place next and let the row marker have the initial index.
 * 
 * now simply we can start tracking the 0's in the matrix and instead of marking them in separate arrays we will mark them in our column and row marker (0th column and row), but we need to handle the edge case of column 0 because we are maintainig that in the col0 variable.
 * 
 * and once we have tracked all the 0's not just start replacing them in the matrix but we can not replace the 0's in the our row and column marker just yet becuase they are the markers through which we are gonna replace the remaining 0's if we replace them they itself would be 0 and then will replace the entire matrix as zero.
 * 
 * once we mark the remianing matrix now we only left with 0th row and 0th column which we can mark based on the col0 value and matrix[0][0], because if matrix[0][0] is 0 then the entire row would be replaced with 0 becuase its the marker for the rows as we have declared in the first step itself, and col0 is the marker of the 0th column,
 * 
 * but we need to first strictly execute the row marker becuase if we execute the column marker (col0) it would replace the entire column as 0 (if col0 is 0) that way the matrix[0][0] would be 0 also and it would then replace the entire row as 0 which would be incorrect.   
**/

function optimalSetZeros(matrix){
	const n = matrix.length;
	const m = matrix[0].length;
	let col0 = matrix[0][0];

	/** track all 0's of matrix **/
	for(let i = 0; i < n; i++){
		for(let j = 0; j < m; j++){
			if(matrix[i][j] === 0){
				if(j === 0){ // handle edge case of 0th column
 					col0 = 0;
				} else {
					matrix[0][j] = 0;
				}
				matrix[i][0] = 0;
			}
		}
	}

	/** replace 0's of the matrix except marker row and column. **/
	for(let i = 1; i < n; i++){
		for(let j = 1; j < m; j++){
			if(matrix[i][0] === 0 || matrix[0][j] === 0){
				matrix[i][j] = 0
			}
		}
	}

	/** strictly first mark the marker row first **/
	if(matrix[0][0] === 0){
		for(let i = 0; i < n; i++){
			matrix[i][0] = 0;
		}
	}

	/** then the marker column **/
	if(col0 === 0){
		for(let i = 0; i < m; i++){
			matrix[0][i] = 0;
		}
	}

	return matrix;

	/** 
	 * TC: O(m*n) + O(m*n) // first iteration to track all the 0's + we are replacing the 0's in the entire matrix (in 3 steps) again which would be O(m*n)
	 * SC: O(1)
	**/
}

console.log(optimalSetZeros([[1,1,1], [1,0,1], [1,1,1]]));