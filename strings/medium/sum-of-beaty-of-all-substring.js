/**
 * The beauty of a string is defined as the difference between the frequency of the most frequent character and the least frequent character (excluding characters that do not appear) in that string.
 *
 * Given a string s, return the sum of beauty values of all possible substrings of s.
 *
 * 
 * Example 1
 * Input: s = "xyx"
 * Output: 1
 * Explanation: The substrings with non-zero beauty are:
 * - "xyx" → frequencies: x:2, y:1 → beauty = 2 - 1 = 1
 * - "xy" → x:1, y:1 → beauty = 0
 * - "yx" → y:1, x:1 → beauty = 0
 * - "x" or "y" → beauty = 0
 * Total sum = 1 (from "xyx") = 1
 *
 * 
 * Example 2
 * Input: s = "aabcbaa"
 * Output: 17
 * Explanation: Various substrings such as "aabc", "bcba", etc., have non-zero beauty values. Summing all gives 17.
 * 
**/

								/** BRUTE FORCE **/

/**
 * genarate all posible substring and check for each substring.
**/

function beautySum(string){
	let sum = 0;
	for(let i = 0; i < string.length; i++){
		for(let j = i; j < string.length; j++){
			const substring = string.substring(i, j + 1);
			sum += countBeauty(substring);
		}
	}
	return sum;

	/**
	 * TC: O(n^3)
	 * SC: O(n)
	**/
}

function countBeauty(string){
	const map = {};

	for(let i = 0; i < string.length; i++){
		map[string[i]] = map[string[i]] ? map[string[i]] + 1 : 1;
	}

	const freq = Object.values(map);
	const max = Math.max(...freq);
	const min = Math.min(...freq);
	return max - min;
}

console.log(beautySum("aabcbaa"));