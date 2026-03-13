/** 
 * we are given a (n*n) 2D matrix and we need to rotate it 90 degree. meaning
 * 
 * matrix = [[1,2,3], [4,5,6], [7,8,9]]
 * output = [[7,4,1], [8,5,2], [9,6,3]]
 * 
 * 
 *  	1 2 3     7 4 1
 * 		4 5 6 =>  8 5 2
 * 		7 8 9     9 6 3
 **/




/** BRUTE FORCE **/
/** 
 * if we observe carefully the first row is getting places at last column, 2nd row at second last column, thirs row at third last column etc. and we know there is only one way we can traverse throught the matrix is using matrix[i][j] indexing, so we need to find some relation between this i and j to place the elements as above arrangement, like if we observer in the above diagram
 * 
 * 		FIRST ROW			  	SECOND ROW				 		  THIRD ROW
 * [0][0] => [0][2]	(1)		  [1][0] => [0][1] (4)			   [2][0] => [0][0] (7)
 * [0][1] => [1][2]	(2)		  [1][1] => [1][1] (5)			   [2][1] => [1][0] (8)
 * [0][2] => [2][2]	(3)		  [1][2] => [2][1] (6)			   [2][2] => [2][0] (9)
 * 
 * 
 * (i) if we see the first thing is very clear we are just replicating j with i.
 * (ii) second index in the answer matrix is constant for the entire row like when row was 0 it was 2, for row 1 it was 1, for row 2 it was 0, and with that we also know that the max index 2 is nothing but n-1 (size of matrix, 3)
 * 
 * 
 * i = 0 => 2 (n-1) - i
 * i = 1 => 1 (n-1) - i
 * i = 2 => 0 (n-1) - i
 * 
 * 
 * meaninig [i][j] => [j][n-1-i]
 *
**/
function rotateMatrix(matrix){
	const n = matrix.length;

	/** create a matrix of same size prefilled with 0 to replicate the answer. **/
	const answer = Array.from({ length: n }, () => Array(n).fill(0));


	for(let i = 0; i < n; i++){
		for(let j = 0; j < n; j++){
			answer[j][n-1-i] = matrix[i][j];
		}
	}

	return answer;

	/**
	 * TC: O(n^2)
	 * SC: O(n^2)
	**/
}

//console.log(rotateMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));

/*** OPTIMAL APPROACH **/

/** 
 * 
 *  	1 2 3     7 4 1
 * 		4 5 6 =>  8 5 2
 * 		7 8 9     9 6 3
 * 
 * 
 * if we observe carefully we are just coping the first column and pasting it on the first row and just reversing it like copy [1,4,7] paste it on first row and reverse it [7,4,1]. and same for the othere columns as well.
 * 
 * THIS IS CALLED TRANSPOSING THE MATRIX: converting matrix column into rows
 * 
 * and once we transposed the entire matrix we can just reverse each row and we will get out result matrix
 * 		
 * 		Original  Transposed   Row Reversed (result)  
 *  
 *  	1 2 3      1 4 7       7 4 1
 * 		4 5 6  =>  2 5 8  =>   8 5 2
 * 		7 8 9      3 6 9       9 6 3
 * 
 * 
 * For transaposing the matrix here are some point we can notice
 * (i) the diagonals are unchanged [0,0], [1,1], [2,2]....[n-1, n-1], so we do not need to do anything for the diagonals where i === j
 * 
 * (ii) There is one more pattern visible if we see we are just swapping the [i][j] with [j][i], like [0][1] was 2 and [1][0] was 4 we just swap them similarly for [0][2] with [2][0] meaning we are just swaping [i][j] with [j][i] and for that we do not need to traverse the entire matrix as well if we just traverse the upper part of the matrix (above the diagonal) and do the swapping we would be able to swap the entire matrix.
**/

function optimalRotateMatrix(matrix){
	const n = matrix.length;

	/** transposing the matrix **/
	for(let i = 0; i < n-1; i++){
		for(let j = i+1; j < n; j++){
			[matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];  
		}
	}

	/** reverse each row **/
	for(let i = 0; i < n; i++){
		let start = 0;
		let end = n-1;
		while(start < end){
			[matrix[i][start], matrix[i][end]] = [matrix[i][end], matrix[i][start]]
			start++;
			end--;
		}
	}

	return matrix;

	/**
	 * TC: O(n^2/2) + O(n^2/2) = O(n^2)
	 * SC: O(1)
	**/
}

console.log(optimalRotateMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));