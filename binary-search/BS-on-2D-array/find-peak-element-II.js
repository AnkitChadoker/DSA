/**
* Given a 0-indexed n x m matrix mat where no two adjacent cells are equal, find any peak element mat[i][j] and return the array [i, j].A peak element in a 2D grid is an element that is strictly greater than all of its adjacent neighbours to the left, right, top, and bottom.
*
*
*
* Assume that the entire matrix is surrounded by an outer perimeter with the value -1 in each cell.
*
* Note: As there can be many peak values, 1 is given as output if the returned index is a peak number, otherwise 0.
*
*
* Example 1
* Input: mat=[[10, 20, 15], [21, 30, 14], [7, 16, 32]]
* Output: [1, 1]
* Explanation: The value at index [1, 1] is 30, which is a peak element because all its neighbours are smaller or equal to it. Similarly, {2, 2} can also be picked as a peak.
*
* 
* Example 2
* Input: mat=[[10, 7], [11, 17]]
* Output : [1, 1]
* Explanation:The value at index [1, 1] is 17, which is the only peak element because all its neighbours are smaller or equal to it.
* 
**/

										
												/** BRUTE FORCE **/
/** 
 * Go on each ele one by one and check its adjacent neighbours to the left, right, top, and bottom, and if its greater than all of them its our peak 
**/ 

function peakElement(matrix){
	const m = matrix.length;
	const n = matrix[0].length;

	for(let row = 0; row < m; row++){
		for(let col = 0; col < n; col++){
			const ele = matrix[row][col];

			const top = row - 1 >= 0 ? ele > matrix[row - 1][col] : true;
			const bottom = row + 1 < m ? ele > matrix[row + 1][col] : true;
			const left = col - 1 >= 0 ? ele > matrix[row][col - 1] : true;
			const right = col + 1 < n ? ele > matrix[row][col + 1] : true;

			if(left && right && top && bottom) return [row, col];
		}
	}

	return [-1, -1];

	/**
	 * TC: O(m * n * 4) // for each element we are checking its 4 neighbours.
	 * SC: O(1)
	**/
}

//console.log(peakElement([[10, 20, 15], [21, 30, 14], [7, 16, 32]]));

											

											/** BETTER APPROACH **/
/**
 * We can just find the largest element of the matrix and that will surely be our peak becuase all the adjacent neighbours will be smaller than it.
**/

function betterPeakElement(matrix){
	let peak = [-1, -1];
	let largest = -1;

	let m = matrix.length
	let n = matrix[0].length;

	for(let row = 0; row < m; row++){
		for(let column = 0; column < n; column++){
			if(matrix[row][column] > largest){
				largest = matrix[row][column];
				peak = [row, column];
			}
		}
	}

	return peak;

	/**
	 * TC: O(m * n)
	 * SC: O(1)
	**/
}


// console.log(betterPeakElement([[10, 20, 15], [21, 30, 14], [7, 16, 32]])); // [2,2]

										

										/** OPTIMAL APPORACH **/

/**
 * we can use the similary approach as finding the element in 2D matrix - II problem, we can start from [0,0] and check for its 4 adjacent neighbours, and if its greater than all of them its our peak, otherwise who ever is greater element we will consider that as our next candidate and check if that is our peak and we keep on doing it until we find the peak.
**/

function optimalPeakElement(matrix){
	let m = matrix.length;
	let n = matrix[0].length;

	let row = 0;
	let column = 0;

	while(row < m && column < n){
		const candidate = matrix[row][column];

		const L = column - 1 < 0 ? true : candidate > matrix[row][column - 1];
		const R = column + 1 >= n ? true : candidate > matrix[row][column + 1];
		const T = row - 1 < 0 ? true : candidate > matrix[row - 1][column];
		const B = row + 1 >= m ? true : candidate > matrix[row + 1][column];

		if(L && R && T && B) return [row, column];
		else if (!L) column--;
		else if (!R) column++;
		else if (!T) row--;
		else if (!B) row++;
	}

	return [-1, -1];

	/**
	 * TC: O(m + n)
	 * SC: O(1)
	**/
}


//console.log(optimalPeakElement([[10, 20, 15], [21, 30, 14], [7, 16, 32]])); // [1, 1]

/** TC analysis 
 * 
 * 
 * 			[
 * 				[10, 20, 15], 
 * 
 * 				[21, 30, 14], 
 * 
 * 				[7,  16, 32]
 * 			]
 * 
 * 
 * Path Walkthrough (Visualized on Matrix):
 * 
 * (i)     [0,0] =  10  > L, < R --> column++
 * 
 * (ii)    [0,1] =  20  > L, > R, > T, < B --> row++
 * 
 * (iii)   [1,1] =  30  > L, > R, > T, > B --> peak found [1, 1]
**/


/** ALTERNATE OPTIMAL APPROACH **/

/** 
 * we can simply apply BS on the columns / rows and find the peak.
 * 
 * we have 3 rows and 3 columns, we apply the binary search on first row by taking low = 0, high = 2
 * 
 *					 mid = 0 + 2 / 2 = 1,
 * 
 * we got column 1 as our mid we can find the greatest element of that column by traversing thourgh the column linearly and find out at which row its present, since its the largest among the column so its clearly greter than the TOP and BOTTOM adjacent, we just need to check for LEFT and RIGHT adjacents if the candidate is greater than the LEFT and RIGHT as well its our peak otherwise which ever side is greater element we consider that side of the matrix and eliminate the other half entirely and repeat the same process again.
 * 
**/

function alternativeOptimalPeakElement(matrix){
	const m = matrix.length;
	const n = matrix[0].length;

	let low = 0; let high = n - 1;
	while(low <= high){
		const mid = Math.floor( (low + high) / 2 );
		const row = maxElementRow(matrix, m, n, mid);

		const L = row - 1 < 0 ? true : matrix[row - 1][mid] < matrix[row][mid];
		const R = row + 1 >= m ? true : matrix[row + 1][mid] < matrix[row][mid];

		if(L & R) return [row, mid]
		else if(!L) high = mid - 1;
		else low = mid + 1;
	}

	return [-1, -1];

	/**
	 * TC: O(m * logn) // logn => we are doing BS on the columns (n), m => find max ele for each mid
	 * SC: O(1)
	**/
}


function maxElementRow(matrix, m, n, column){
	row = -1;
	maxEle = -1;

	for(let i = 0; i < m; i++){
		if(matrix[i][column] > maxEle){
			maxEle = matrix[i][column];
			row = i;
		}
	}

	return row;
}


//console.log(alternativeOptimalPeakElement([[10, 20, 15], [21, 30, 14], [7, 16, 32]])); // [1, 1]

									

										/** WHEN TO USE WHICH **/

/** when we have the square matrix (m === n) we should go for optimal approach, and when there is variations in the matrix like the above approach would be useful when there lets say 3 rows and 1 million columns then the the alternative approach would be standard approach why ??
 * 
 * m = 2
 * n = 1000000
 * 
 *  (i) OPTIMAL APPROACH => O(m + n) => O(2 + 1000000) => 1000002
 *  (ii) ALTERNATIVE APPROACH => O(m * logn) => O(2 * 20) => 40
 * 
 * 
 * if there are more rows and less column we can use row based binary seach instead of column based.
 * 
 * 
 * lets see for sqaured matrix as well (m === n)
 * 
 * m = 1000
 * n = 1000
 * 
 * (i) OPTIMAL => O(m + n) => 2000
 * (ii) ALTERNATIVE => O(m * logn) => 1000 * 10 => 10,000
 *  
 * thats why for squred matrix optimal approach is best.
**/


