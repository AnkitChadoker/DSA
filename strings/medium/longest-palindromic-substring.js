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

//console.log(longestPlaindromicSubstring("cbbd"));


												

												/** OTPTIMAL APPROACH **/

/**
 * if we observe carefully for any string to be pallindromic  we can pick a mid element and expand around it both ways and as long as both the expantions are same we can say the string is pallindromic till that perticuler length (R - L + 1), so instead od checking for each substring one by one we can take an element from the string as mid and expand out search to see how long can we get a palindromic string by taking that perticuler element as out mid, and we can do this for all n characters to get the longest one.
 * 
 * 
 * like "babad"
 * 
 * if we take b (3rd, we would start from begining but for sach of understanding i am jumping directly to the 3rd character.) as our mid and expand both ways so we have a both sides so our current length would be 3 which is longest palindromic string for now, lets expand more and our left element is b and right element is d which is not similar so we break out of this perticular character check and our current palindromic string is (aba which is of length 3), now lets check for a (4th) expand both ways our left is b and right is d which is not similar so out for this character the palindromic length is 1 (a itself) similarly we check for d as well but its right expansion is out of bound so we wont get any palindromic string other then itself (b).
 * 
 * But the above intuition will only work when the palindrommic string is odd size like (bab, aba),
 * 
 * we need to check separately for the even length as well like above we were taking only one mid and then exapanding around it but for even length we can take two character as our initial like for "cbbd",
 * 
 * we can start taking left as "c" and right as "b" and then check if our right and left are equal whch is not here, so we take next elements b and b and here our right and left are equal than again we expand further to check for bigger palindromic string so our left would be c and right would be d which is not similar so our longest pallindromic string is "bb" for now then we check for the remaining characters as well similarly.
**/

function optiomalLongestPallindromicString(string){
	let ans = "";
	let maxLength = -1;

	for(let i = 0; i < string.length; i++){
		// for odd length
		let left = i;
		let right = i;

		while(left >= 0 && right < string.length && string[left] === string[right]){
			const substring = string.substring(left, right + 1);
			if(substring.length > maxLength){
				maxLength = substring.length;
				ans = substring;
			}
			left--; right++;
		}

		// for even length
		left = i;
		right = i + 1;

		while(left >= 0 && right < string.length && string[left] === string[right]){
			const substring = string.substring(left, right + 1);
			if(substring.length > maxLength){
				maxLength = substring.length;
				ans = substring;
			}
			left--; right++;
		}

	}

	return ans;

	/**
	 * TC: O(n) * ( O(n) + O(n) ) => O(n^2)
	 * SC: O(1)
	**/
}

console.log(optiomalLongestPallindromicString("cbbd"))
