/** we are given an (m*n) matrix and we need to return all the elements of the matrix in  spiral manner.
 * 
 * matrix = [[1,2,3], [4,5,6], [7,8,9]];
 * output = [1,2,3,6,9,8,7,4,5]
 * 
 * 
 *  1  2  3  4
 *  5  6  7  8   =>  1 2 3 4 8 12 16 15 14 13 9 5 6 7 11 10
 *  9  10 11 12
 *  13 14 15 16
 *
 * 
 * There are no separate solution like brute, better and optimal for this probelm there is only one possible solution of this probelm and lets discuss that. 
 * 
 * if we see we are first going left to right [1,2,3,4], then top to bottom [8,12,16], then right to left [15,14,13] and then bottom to top [9,5]. and then repeating the same process untill we get all the elements of the matrix. so its clear we are following the below cycle.
 * 
 *  cycle : right -> bottom -> left -> top
 * 
 * and alse its pretty clear that we need 4 pointer to set the boundation first
 * 
 * left = 0, right = n - 1
 * top = 0, bottom = m - 1
 *  
 * 
 * (i) we go from left to right which will print [1,2,3,4] and we are iterating over the 0th row which is nothing but the value of top that why we used top as out row pointer here.
 * 
 * (ii) now we need to go from top to bottom at the last column, so before iterating over that we can do top++, beacuse we need not to include 3 again (first element at the top), thats why we do top++ before step 2 and then complete the iteration keeping the right pointer as our column pointer this time and we get [8,12,16].
 * 
 * (iii) now we need to go from right to left but before that we must do right-- becuase right is again pointing to the last ele.  (16) which we have already included above, this time bottom will be our constant row pointer and now we get [15, 14, 13].
 * 
 * (iv) last step we need to go from bottom to top but before that we need to do bottom-- again the same reason. and this time our column pointer would be left, and we will get the ele. [9,5].
 * 
 * This way our outer most iteration is compeleted and now we need to go 1 layer deep and for that we need to first do left++ and then keep repeating this process until we touch every element of the matrix.
**/

function spiralMatrix(matrix){
	const m = matrix.length;
	const n = matrix[0].length;

	let left = 0; let right = n - 1;
	let top = 0; let bottom = m - 1

	const answer = [];

	while(left <= right && top <= bottom){
		for(let i = left; i <= right; i++){
			answer.push(matrix[top][i]);
		}
		top++;

		for(let i = top; i <= bottom; i++){
			answer.push(matrix[i][right]);
		}
		right--;

		/** EDGE CASE (i) **/
		/** need to check this condition again because we are doing the top++ and it could cross the bottom pointer, though we are doing the right-- as well but that condition is already there in the loop if they cross each other nothing will be done **/
		if(top <= bottom){
			for(let i = right; i >= left; i--){
				answer.push(matrix[bottom][i]);
			}
			bottom--;
		}

		/** EDGE CASE (ii) **/
		/** for the same reason we doing this check here again becuase we are doing right-- **/
		if(left <= right){
			for(let i = bottom; i >= top; i--){
				answer.push(matrix[i][left]);
			}
			left++;
		}
	}
	return answer;
}

console.log(spiralMatrix([[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,16]]));



