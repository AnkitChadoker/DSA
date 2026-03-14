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
}

console.log(getElementOfPascalTrinagle(5,3)) //6


