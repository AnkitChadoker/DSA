/**
 * Given a string s, return the longest palindromic substring in s.
 *
 * A palindromic substring is a contiguous sequence of characters within the string that reads the same forward and backward.
 *
 * Example 1
 * Input: s = "babad"
 * Output: "bab"
 * Explanation: Both "bab" and "aba" are valid palindromic substrings of length 3. Return either.
 *
 * 
 * Example 2
 * Input: s = "cbbd"
 * Output: "bb"
 * Explanation: The longest palindrome is "bb" of length 2.
 * 
**/



												
												/** BRUTE FORCE **/

/** 
 * we can generate each possible substring and check if its palindrom or not and if its polindrom we can challange the existing longest plaindromic substring.
**/

function longestPlaindromicSubstring(string){
	let answer = "";
	let longest = -1;

	for(let i = 0; i < string.length; i++){
		for(let j = i; j < string.length; j++){
			const substring = string.substring(i, j + 1);
			if(isPalindrom(substring)){
				if(substring.length > longest){
					longest = substring.length;
					answer = substring;
				}
			}
		}
	}

	return answer;

	/**
	 * TC: O(n^3)
	 * SC: O(1)
	**/
}

function isPalindrom(string){
	let L = 0; let R = string.length - 1;

	while(L < R) {
		if(string[L] !== string[R]) return false;
		L++; R--;
	}

	return true;
}

console.log(longestPlaindromicSubstring("cbbd"));