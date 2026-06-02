/**
 * 
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 *
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
 *
 * Example 1 
 * Input : s = "anagram" , t = "nagaram"
 * Output : true
 * Explanation :
 *	We can rearrange the characters of string s to get string t as frequency of all characters from both strings is same.
 *
 * 
 * Example 2
 * Input : s = "dog" , t = "cat"
 * Output : false
 * Explanation :
 *  We cannot rearrange the characters of string s to get string t as frequency of all characters from both strings is not same.
 * 
**/


/** HINT: both string has to be of same length to be anagram **/

									
									/** SOLUTION I (RECOMMANDED) **/

/** for two trings to be an anagram the frequency of their character has be exact same, so we can simply maintain a frequency map of string s and then simply check for each character in the string t if the character does not exists in the frequency map or has the frequency 0 which means the character frequency does not match hence the strings can not be anagram of each other **/

function anagramI(s, t){
	if(s.length !== t.length) return false;
	const map = new Map();

	for(const char of s){
		map.set(char, (map.get(char) || 0) + 1);
	}

	for(const char of t){
		if(!map.has(char) || map.get(char) === 0) return false;
		map.set(char, map.get(char) - 1);
	}

	return true;

	/**
	 * TC: O(n)
	 * SC: O(256) at max considering no emojies etc included in the string.
	**/
}

console.log(anagramI("anagram", "nagaram"));


									
									/** SOLUTION 2 **/

/** 
 * we can use the ASCII values to solve this problem as well, because the standard ASCII chart maps the characters sequentially from 0 to 255, and we can take an array of size 255 with initially frequency as 0 and then repeat the above approach itself.
**/

function anagramII(s, t){
	if(s.length !== t.length) return false;
	const counter = new Array(256).fill(0);

	for(const char of s){
		counter[char.charCodeAt(0)] += 1;
	}

	for(const char of t){
		if(counter[char.charCodeAt(0)] === 0) return false;
		counter[char.charCodeAt(0)] -= 1;
	}

	return true;

	/**
	 * TC: O(n)
	 * SC: O(256) at max considering no emojies etc included in the string.
	**/
}

console.log(anagramII("anagram", "nagaram"));

/** if we are explicitely said that the problem may only contain the lowercase (or uppercase, not both) we can shrink down the array size to 26 characters only buth with some additional (subtracting ASCII code calculations) like we know the lowercase charaters starts from 97 to 122 in ASCII code, so we can use this information and calculate the index of our array element like
 * 
 * 	a = 97 - 97 = index 0
 *  b = 98 - 97 = index 1
 *  c = 99 - 97 = index 2
 *  .
 *  .
 *  .
 *  y = 121 - 97 = index 24
 *  z = 122 - 97 = index 25
 * 
 * so we can use the 26 size from 0 to 25 indexing (this is for lowercase only), but why we are subtracting 97 ?? becuase 97 represent the smallest lowercase charactere "a", if we are said the string only contains the uppercase characters only we would be using upperase "A" for subtraction (code 65).
 * 
 * ASSCI code of current character - ASCII code of smallest character (a or A)
**/

/** considering only lowercase allowed **/
function anagramIII (s, t){
	if(s.length !== t.length) return false;
	const counter = new Array(26).fill(0);

	for(const char of s){
		const index = char.charCodeAt(0) - 'a'.charCodeAt(0); // 'A'.charCodeAt(0) fro uppercase characters
		counter[index] += 1;
	}

	for(const char of t){
		const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
		if(counter[index] === 0) return false;
		counter[index] -= 1;
	}

	return true;

	/**
	 * TC: O(n)
	 * SC: O(26).
	**/
}

console.log(anagramIII("anagram", "nagaram"));