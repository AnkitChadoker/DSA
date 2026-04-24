/**
* Given two strings s and t, determine if they are isomorphic.
*
* Two strings s and t are isomorphic if the characters in s can be replaced to get t.
*
*  All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.
*
*
* Example 1:
* Input: s = "egg", t = "add"
* Output: true
* Explanation:
* The strings s and t can be made identical by:
* Mapping 'e' to 'a'.
* Mapping 'g' to 'd'.
*
* 
* Example 2:
* Input: s = "f11", t = "b23"
* Output: false
* Explanation: The strings s and t can not be made identical as '1' needs to be mapped to both '2' and '3'.
*
* 
* Example 3:
* Input: s = "paper", t = "title"
* Output: true
**/

											
											/** INTUITION **/

/**
 * first and formost thing if two strings are to be isomorphic they has be of same size, like egg and egg are isomorphic by default becase if we replace each word with its corresponsind word in the other string we would still get the same string "egg", so same strings will always be a isomorphic string
 * 
 * 		e g g
 * 		e g g
 * 
 * now similarly if we try to check for two different string like egg and add 
 * 		
 * 		e g g  => a d d
 * 		a d d
 * 
 * if we try to replace first string character by character using second string, like e gets replaced by the a and g will be replaced by d, so yes the "egg" will be completely replaced by "add".
 * 
 * now lets say instead of add we have aid.
 * 
 * 		e g g
 * 		a i d
 * 
 * now we start from the begining again e will be replaced by the a, g will be replaced by the i, and now we are trying to replace another g by the charater d, which is wrong, because the problem itself stated that "No two characters may map to the same character", so since g was already mapped to i previously it can not be mapped to another character in the future and if it happens that means the strings are not isomorphic. 
 * 
 *  Here we are just mapping the character of both strings like e -> a, g -> i etc.
 * 
 * 
 * But we need to handle the edge case as well, lets say we have the first string (s) as "aid" and second string (t) as "egg", then
 * 
 * 		a i d
 * 		e g g
 * 
 * now if we map each string one by one 
 * 
 * 		a -> e, i -> g, d -> g
 * 
 * though we have the duplicate mapping of g but we could not track it using one way mapping ( s to t), thats why we use maping both ways (t to s also).
 * 
 * 		e -> a, g -> i, g -> d
 * 	
 * now we will be able to identify if the mapping is being duplicated to mupltiple character like above.
**/

function isomorphicString(s, t){
	if(s.length !== t.length) return false;

	const sMap = new Map();
	const tMap = new Map();
	const n = s.length;

	for(let i = 0; i < n; i++){
		if( (sMap.has(s[i]) && sMap.get(s[i]) !== t[i]) || (tMap.has(t[i]) && tMap.get(t[i]) !== s[i]) ) return false;

		sMap.set(s[i], t[i]);
		tMap.set(t[i], s[i]);
	}

	return true;

	/**
	 * TC: O(n)
	 * SC: O(26) // since there is only english lower case letter which at max can be 26 and if problem says that all the character can be used in the string so it can at max be 256, which is still a constant number, thats why the space complexity is constant.
	**/
}

console.log(isomorphicString("paper", "title"));