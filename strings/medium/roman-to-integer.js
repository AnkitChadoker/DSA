/**
* Roman numerals are represented by seven different symbols:
* 
* I = 1
* V = 5
* X = 10
* L = 50
* C = 100
* D = 500
* M = 1000
*
* 
* Roman numerals are typically written from largest to smallest, left to right. However, in specific cases, a smaller numeral placed before a larger one indicates subtraction.
*
*
*
* The following subtractive combinations are valid:
* 
* I before V (5) and X (10) → 4 and 9
* X before L (50) and C (100) → 40 and 90
* C before D (500) and M (1000) → 400 and 900
* Given a Roman numeral, convert it to an integer.
* 
* Example 1
* Input: s = "III"
* Output: 3
* Explanation: III = 1 + 1 + 1 = 3
*
* 
* Example 2
* Input: s = "XLII"
* Output: 42
* Explanation: XL = 40, II = 2 → 40 + 2 = 42
* 
**/

/** INTUITION **/
/**
 * Since we alreasy know the mapping of roman numerals we can use that and we are also given in the problem itself that there can be "subtractive combinations" as well in the roman nuemrals when the next symbol is greater than the current symbol meaning its subtractive combinations. so we can use this information to draw our algorithm.
**/

function romanToInt(string){
	const mapping = { "I" : 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000 };

	let ans = 0;
	for(let i = 0; i < string.length; i++){
		// check if i + 1 symbol exists and if its greater than current symbol
		if(string[i + 1] && mapping[string[i + 1]] > mapping[string[i]]){
			
			// if the condition satisfies we need to add the subtraction of the combinatio to the answer and since this is the combination of 2 symbol we need to do addtional i += 1 to move the pointer after 2 symbols.

			ans += mapping[string[i + 1]] - mapping[string[i]];
			i += 1
		} else {
			ans += mapping[string[i]]
		}
	}

	return ans;

	/**
	 * TC: O(n)
	 * SC: O(1) // constant mapping
	**/
}

// console.log(romanToInt("XLII")) // 42



/** another code **/

function romanToIntII(string){
	const mapping = { "I" : 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000 };

	let ans = 0;

	for(let i = 0; i < string.length - 1; i++){
		if(mapping[string[i + 1]] > mapping[string[i]]){
			// since we are just subtracting the diffrence of subtractive combinations from the answer so we can directly do it on the answer itself instead of adding the diffrence of subtraction and then doing i += 1.
			
			ans -= mapping[string[i]];
		} else {
			ans += mapping[string[i]];
		}
	}

	// ans since we looped till < length - 1 so we need to explicitely add the last symbol to the answer.

	return ans += mapping[string[string.length - 1]];

}


console.log(romanToIntII("XLII")) // 42