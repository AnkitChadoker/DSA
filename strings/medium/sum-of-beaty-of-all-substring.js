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

//console.log(beautySum("aabcbaa"));


							 /** OPTIMAL SOLUTION **/

/**
 * Instead of generating each substring we can just keep the track of their character frequency and for each substring we can just find the beauty of it and add it to the final summision, that way we can neglact the inner most loop to find the beauty from above approach.
 * 
 * Since the problem states the string may only contain the lowercase characters only (leetcode). we can take a frequency array of size 26 (or 256 otherwise if not mentioned spacifically that there will be only lowercase or uppercase) and we can calculate the character code using ASCII calculatoin and update the frequency in the array and at the end just find the beauty of it.
**/


function optimalBeautySum(string){
	let totalBeauty = 0;
	for(let i = 0; i < string.length; i++){

		/* for every new string (new starting point) we need to have the fresh freq array **/
		const freq = new Array(26).fill(0);

		for(let j = i; j < string.length; j++){
			/** will generate each possible substring at each iteration, starting from ith index **/

			/** calculate the character index using ASCII calculation, 97 is taken becuase lowercase code starts from 97 (a), if the problem stats there will be only uppercase character we would take 65 (A) instead of 97, or else if all the characters are allowed to be in the string we would just remove this calculation and string.charCodeAt() will by default give as the index, becuase ASCII code starts from 0 itself. **/

			freq[string.charCodeAt(j) - 97]++;

			let maxFreq = -Infinity;
			let minFreq = Infinity;

			/* this will be a constant loop of 26 or 256 length at most. */
			for(let i = 0; i < freq.length; i++){
				if(freq[i] > 0){
					maxFreq = Math.max(maxFreq, freq[i]);
					minFreq = Math.min(minFreq, freq[i]);
				}
			}

			totalBeauty += maxFreq - minFreq;
		}	
	}

	return totalBeauty;
}

console.log(optimalBeautySum("xyx"));