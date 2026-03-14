/** 			PASCALS TRIANGLE 

		                 1
		              1     1
		           1     2     1
		        1     3     3     1
		   	 1     4     6     4     1
	 	  1     5     10    10    5     1
 
* 
* (i)   In each row there are number of elements equivalent to the the row like in row 5 there are 5 elements.
* (ii)  Each rows starting and ending element is always 1.
* (iii) Each element is the sum of the two elements directly above it.
*
* 
* There can be 3 types of problem from pascal trinagle problem:
* a) we are given the row number and column number and we need to return the element present at that number in the pascal's triangle, like row = 5, column = 3 so output should be 6.
* 
* 
* b) we are given the row number and we need to return the list of elements of that row, like
* 	n = 6, output = [1,,5,10,10,5,1] 
* 
* c) we are given the row number and we need to return the pascal's tringle till that row, we do not need to print the pattern of pascal triangle instead we need to return the array containing the array of each row like below,
*   n = 5, output = [[1], [1,1], [1,2,1], [1,3,3,1], [1,5,10,10,5,1]]
* 
* 
* lets start one by one in the above order itself.
**/   


												


												/** PROBLEM (A) **/

/** BRUTE FORCE **/
/** we can generate the pascals triangle till that row and then return the required column element, we will see how to generate the pascal's triangle in the PROBLEM (C) **/



/** OPTIMAL SOLUTION **/
/** There is direct formula to know the element at any spcific position in the pascal's triangle using the combination formula of math nCr = n! / r! * (n-r)!
 * 
 * if we are given the row = 5 and column = 3, so we can derived the formula as below
 * 
 * (row - 1)C(col - 1)  = (row - 1)! / (col - 1)! * ((row - 1) - (col-1))!
 * 
 * 4C2 = 4! / 2! * (4-2)! = 4*3*2*1 / 2*1*2*1 = 6 which is our output.
 * 
 * we know how to generate a factorial of any number n using the loop so we can easily find all 3 factorial and get the element, but that will take O(n) + O(r) + O(n-r) TC, this is out brute approach to find the nCr using linear factorial.
 * 
 * lets see how can we improve this TC using some optimization using the expansion of the formula (nCr) iteself:
 * 	like for 6C3 we can expand it like
 * 
 * 				 6*5*4*3*2*1
 * 				-------------
 * 				3*2*1 * 3*2*1 
 * 
 * int the above formula the last part 3*2*1 will get cancelled each by the (n-r)! part, we can try another example as well to test this like 10C3
 * 				
 * 				10*9*8*7*6*5*4*3*2*1
 * 			---------------------------
 * 				3*2*1 * 7*6*5*4*3*2*1
 * 
 * in this also the 7*6*5*4*3*2*1 will get cancelled by the (n-r)! part, so here one thing we notice to expand the numerator til the r only like in bith example r was 3 so we need to only expand the n element till the r time only like 
 * 
 * 			6*5*4      6*5*4
 * 		   ------- =  -------
 * 			3*2*1      1*2*3
 * 
 * 				  OR
 * 			10*9*8     10*9*8
 * 		   -------- = --------
 * 			3*2*1      1*2*3
 * 
 * so we can generate the formula based on the above observation and let's try to implement it
 **/

function generateNCR(n, r){
	let answer = 1; 
	for(let i = 0; i < r; i++){
		answer = answer * (n-i);
		answer = answer / (i+1);
	}
	return answer;
}


function getElementOfPascalTrinagle(row, column){
	return generateNCR(row-1, column-1);
	/**
	 * TC: O(column) // O(r), which is much much much better than the O(n) + O(r) + O(n-r)
	 * SC: O(1)
	**/
}

//console.log(getElementOfPascalTrinagle(5,3)) //6

							




							/*** PROBLE (B) ***/
/** we will be given a row number and need to return the elements of that perticular row **/

/** BRUTE FORCE **/
/* we can generate the entire pascal's triangle till that row and return the entire row **/


/** BETTER APPROACH **/
/** we can use the above formula to generate each element of that row and return the row array at the end **/

function betterGetRow(n){
	const row = [];
	for(let col = 1; col <= n; col++){
		const ele = getElementOfPascalTrinagle(n, col);
		row.push(ele);
	}
	return row;

	/**
	 * TC: O(n * r)
	 * SC: O(n)
	**/ 
}
//console.log(betterGetRow(6)); // [1,5,10,10,5,1]


/** OPTIMAL APROACH **/
/** 
 * Instead of calling the get element funciton for each element of the row if we can find a way to not to call it wee can bring down the TC to O(n) 
 * lets take row 6 for example and try to get each element using the formula iteself
 * 
 * 5C0 =   5*4*3*2*1     = 1
 *       -------------
 *       1 * 5*4*3*2*1 
 * 
 * 
 * 5C1 =   5*4*3*2*1      1 * 5
 *        ------------ =      -
 *         1 * 4*3*2*1        1
 * 
 * 
 * 5C2 =   5*4*3*2*1     1 * 5 * 4
 *        ------------ =     -   -
 *         2*1*  3*2*1       1   2
 * 
 * 5C3 =   5*4*3*2*1     1 * 5 * 4 * 3
 *        ------------ =     -   -   -
 *         3*2*1 * 2*1       1   2   3
 * 
 * 
 * if we see the pattern we are just getting some part added to the ultimate answer each time like 5/1, 4/2 and 3/3 apart from that we are just carring the same answer forward and if we carefully observe this new part is nothing but derived from the row and column itself
 * 
 * (i) in the denominator the revised column value itself is being put like 1,2,3 etc.
 * (ii) and in the numerator we are just subtracting the revised column value from the actual row number (n - c).
 * 
 * now lets just using this two fact try to generate the entire row element in O(n) TC.
**/

function getRow(n){
	/** since we know that in pascal's tringle first and last element is always 1 that wehy we prefilled the first element as 1 and besides that if we did not do that we need to handle the case for col = 1 explicitly becuase 1-1 would be 0 and 0 in denominator would give us undefined **/

	const row = [1];
	let answer = 1;

	for(let col = 2; col <= n; col++){
		const revisedCol = col - 1;
		answer = answer * (n - revisedCol);
		answer = answer / revisedCol;
		row.push(answer);
	}
	return row;
}
console.log(getRow(6)); // [1,5,10,10,5,1]


