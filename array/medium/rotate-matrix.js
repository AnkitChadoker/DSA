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

console.log(rotateMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));