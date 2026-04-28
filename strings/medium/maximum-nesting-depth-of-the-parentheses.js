/**
 * A string s is a valid parentheses string (VPS) if it meets the following conditions:
 *
 * It only contains digits 0-9, arithmetic operators +, -, *, /, and parentheses (, ).
 * The parentheses are balanced and correctly nested.
 *
 * 
 * Your task is to compute the maximum nesting depth of parentheses in s. The nesting depth is the highest number of parentheses that are open at the same time at any point in the string.
 *
 * Example 1
 * Input: s = "(1+(2*3)+((8)/4))+1"
 * Output: 3
 * Explanation: The deepest nested sub-expression is ((8)/4), which has 3 layers of parentheses.
 *
 * 
 * Example 2
 * Input: s = "(1)+((2))+(((3)))"
 * Output: 3
 * Explanation: The digit '3' is enclosed in 3 pairs of parentheses.
 * 
**/

/** INTUITION **/
/**
 * We can keep a track of current depth and max depth and for each "(" we can increase the current depth and check if its greater than existing max depth if yes we replace it, and for each ")" we decrease the current depth.
**/

function maxDepth(string){
	let max = 0;
	let currentDepth = 0;

	for(let char of string){
		if(char === "("){
			currentDepth += 1;
			max = Math.max(max, currentDepth);
		} else if(char === ")") {
			currentDepth -= 1;
		}
	}

	return max;

	/**
	 * TC: O(n)
	 * SC: O(1)
	**/
}

console.log(maxDepth("(1+(2*3)+((8)/4))+1")) // 3