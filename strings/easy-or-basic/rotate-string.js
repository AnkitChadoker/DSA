/**
* Given two strings s and goal, return true if and only if s can become goal after some number of shifts on s.
* 
* A shift on s consists of moving the leftmost character of s to the rightmost position.
*
* For example, if s = "abcde", then it will be "bcdea" after one shift.
*
*
* Example 1:
* Input: s = "abcde", goal = "cdeab"
* Output: true
* Explanation :
*   After performing 2 shifts we can achieve the goal string from string s.
*   After first shift the string s is => bcdea
*   After second shift the string s is => cdeab.
*
* 
* Example 2:
* Input: s = "abcde", goal = "abced"
* Output: false
* Explanation : Any number of shift operations cannot convert string s to string goal.
**/


/** HINT: both string has to be of same length to be equal after some rotation **/


												/** BRUTE FORCE **/

/**
 * we can rotate 0 to n characters one by one and check if the roated string is equal to goal at any point, if its not eqaul at any point we can return false at the end. 
 * 
 * we can use substring() function to take sub strings and concate one after another to represent (make) the shift.
**/

function rotateString(s, goal){

	if(s.length !== goal.length) return false;
	const n = s.length;

	for(let i = 0; i < n; i++){

		// substring(including, excluding)
		// i = 0 => abcde + "" => abcde
		// i = 1 => bcde + a   => bcdea
		// i = 2 => cde + ab   => cdeab

		const rotated = s.substring(i, n) + s.substring(0, i);
		if(rotated === goal) return true;
	}

	return false;

	/**
	 * TC: O(n^2)
	 * SC: O(n)
	**/
}

//console.log(rotateString("abcde", "cdeab"));


										/** OPTIMAL APPROACH **/

/** 
 * we can simply concat the string to itself and check the goal exists in that concated string or not, becuase
 * 
 *   s = abcde
 * 	 goal = cdeab
 * 
 *  s + s => abcdeabcde
 * 
 * and we can see the concated string has the "cdeab" (3 to 8) in it.
 * 
 * because the roated string is nothing but the shifted version of the same string so if we concate the same string twice it will cover all the rotations in itself.
 * 
**/

function optimalRotateString(s, goal){
	if(s.length !== goal.length) return false;

	return (s + s).includes(goal) ? true : false;

	/**
	 * TC: O(n + n) => O(n) // to check through the concated string linearly
	 * SC: O(n + n) => O(n) // to store the concated string into memory
	**/
}

console.log(optimalRotateString("abcde", "cdeab"));

