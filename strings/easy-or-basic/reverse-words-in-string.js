/**
* Given an input string s, reverse the order of the words.
* A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.
*
*  Return a string of the words in reverse order concatenated by a single space.
*
* Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.
*
*
*
* Example 1:
* Input: s = "the sky is blue"
* Output: "blue is sky the"
*
*  Example 2:
* Input: s = "  hello world  "
* Output: "world hello"
* Explanation: Your reversed string should not contain leading or trailing spaces.
*
* Example 3:
* Input: s = "a good   example"
* Output: "example good a"
* Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.
**/

												/** BRUTE FORCE **/

/** we can simply iterate over the array and start putting the words into an array by safely negating extra spaces, and after the iteration is over we can just reverse the array and and than join the array using whitespace. **/

function reverseWordsInString(string){

	const strArr = [];
	let word = '';

	for(char of string){
		if(char === " "){
			if(word.length){
				strArr.push(word);
				word = '';
			}
		} else {
			word += char;
		}
	}

	if(word.length){
		strArr.push(word);
	}

	return strArr.reverse().join(' ');

	/** 
	 * TC: O(n) + O(number of words) + O(number of words) // to reverse and join the derived array.
	 * SC: O(number of words) 
	**/
}

//console.log(reverseWordsInString("the sky is blue"));


												
												/** OPTIMAL SOLUTION **/

/** 
 * Instead of iterating over the string and then storing each word into and array and then reverse it and join it, we can start from behind since we need reverse of the string so we can start from behind downwards, we can just pluck the word and put it into our result variable and to negate the spaces we can use another while loop to just eliminate the extra spaces.
**/

function optimalReverseWordsInString(string){
	let answer = '';
	let index = string.length - 1;
	
	while(index >= 0){
		/** eliminate the white spaces **/

		while(string[index] === " " && index >= 0){
			index--;
		}

		if(index < 0) break;

		/** mark the index as end point of substring after eliminating the extra spaces **/
		const end = index;

		/** start iterating between the valid word range **/
		while(string[index] !== " " && index >= 0){
			index--;
		}

		/** extract the word **/
		const word = string.substring(index + 1, end + 1);

		/** if we already have any word in the answer we need to add a single white space before each new word insertion **/
		if(answer.length > 0) answer += " ";

		/** append the new word into answer **/
		answer += word;
	}

	return answer;

	/**
	 * TC: O(n * // some constant substring but this will be very minimal so can be ignored.)
	 * SC: O(1)
	**/
}


console.log(optimalReverseWordsInString("the sky is  blue"));