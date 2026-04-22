/**
* Given a string s, representing a large integer, the task is to return the largest-valued odd integer (as a string) that is a substring of the given string s.
*
*
*
* The number returned should not have leading zero's. But the given input string may have leading zero. (If no odd number is found, then return empty string.)
*
* Example 1
* Input : s = "5347"
* Output : "5347"
* Explanation :
* The odd numbers formed by given strings are --> 5, 3, 53, 347, 5347
* So the largest among all the possible odd numbers for given string is 5347.
*
*
* Example 2
* Input : s = "0214638"
* Output : "21463"
* Explanation :
* The different odd numbers that can be formed by the given string are --> 1, 3, 21, 63, 463, 1463, 21463.
* We cannot include 021463 as the number contains leading zero.
* So largest odd number in given string is 21463.
**/

											/** BRUTE FORCE **/

/** we can iterate over the string on by one and check for the odd numbers and we can append that into our final result and in case of 0 if our standing answer id empty we can safely ignore those zeros **/

function largestOddNumber(string){
	let result = "";
	let standing = "";

	for(number of string){
		if(!standing && number === "0") continue;
		if(+number % 2 === 1) {
			standing += number.toString();
			result = standing
		} else {
			standing += number.toString();
		}
	}

	return result;

	/**
	 * TC: O(n)
	 * SC: O(1)
	**/
}

//console.log(largestOddNumber("021463978"));


										/** BETTER CODE **/

/** start from the last and check for the last odd digit, mark the index of that digit as the end of our output, then again start checking from fromt for leading 0 and eliminate those zeros and at the end just return the sub string containing our result **/

function betterLargestOddNumber(string){

	let end = -1;
	let index = string.length - 1;

	while(index >= 0){

		while(+string[index] % 2 === 0) index--;

		end = index;

		index = 0;

		while(string[index] === '0') index++;

		return string.substring(index, end + 1);
	}
	
}

// console.log(betterLargestOddNumber("24689"));

								
								/** BEST CODE **/

function bestLargestOddNumber(string){
	let end = -1;
	let index = string.length - 1;

	while(index >= 0){
		if(+string[index] % 2 === 1){
			end = index;
			break;
		}
		index--;
	}

	index = 0;
	while(string[index] === '0'){
		index++;
	}

	return string.substring(index, end + 1);
}

return console.log(bestLargestOddNumber("2468"));