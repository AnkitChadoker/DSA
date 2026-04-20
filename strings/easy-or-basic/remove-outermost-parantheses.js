/**
* A valid parentheses string is either empty "", "(" + A + ")", or A + B, where A and B are valid parentheses strings, and + represents string concatenation.
* 
* For example, "", "()", "(())()", and "(()(()))" are all valid parentheses strings.
* A valid parentheses string s is primitive if it is nonempty, and there does not exist a way to split it into s = A + B, with A and B nonempty valid parentheses strings.
*
* Given a valid parentheses string s, consider its primitive decomposition: s = P1 + P2 + ... + Pk, where Pi are primitive valid parentheses strings.
*
* Return s after removing the outermost parentheses of every primitive string in the primitive decomposition of s.
*
*
*
* Example 1:
* Input: s = "(()())(())"
* Output: "()()()"
* Explanation: 
* The input string is "(()())(())", with primitive decomposition "(()())" + "(())".
* After removing outer parentheses of each part, this is "()()" + "()" = "()()()".
* 
* Example 2:
* Input: s = "(()())(())(()(()))"
* Output: "()()()()(())"
* Explanation: 
* The input string is "(()())(())(()(()))", with primitive decomposition "(()())" + "(())" + "(()(()))".
* After removing outer parentheses of each part, this is "()()" + "()" + "()(())" = "()()()()(())".
*
* Example 3:
* Input: s = "()()"
* Output: ""
* Explanation: 
* The input string is "()()", with primitive decomposition "()" + "()".
* After removing outer parentheses of each part, this is "" + "" = "".
**/

					

													/** BRUTE FORCE **/

/** we can iterate through the string, and can use a array stack to store the parantheses, if its the open parantheses we check in the stack if we already have some elements in the array then only we add this current parantheses into our answer string, becuase we do not want the outer most parantheses so we need to ignore the first opening of any valid paranthesisation and if we encounter any closing parantheses (since its valid parentheses string meaning there will be no sudden open and closing parantheses) we pop out the last opening parantheses from the array and still stack has some data we append the current parantheses to the answer.  **/

function removeParantheses(string){
	const stack = [];
	let answer = '';

	for(str of string){
		if(str === '('){
			if(stack.length){
				answer += str;
			}
			stack.push(str);
		} else {
			stack.pop();
			if(stack.length){
				answer += str;
			}
		}
	}

	return answer;

	/**
	 * TC: O(n)
	 * SC: O(n)
	**/
}

//console.log(removeParantheses("(()())(())(()(()))"));


													/** OPTIMAL SOLUTION **/

/** Actually we do not need to maintain the entire array to keep track of parantheses, since the problem itself says that the string will always be a valid paranthesis so we can just keep the track using a counter method only. for every openinig parantheses we can increase the count and for each closing parantheses we can descrese the count. **/

function optimalRemoveParantheses(string){
	let count = 0;
	let answer = '';

	for(str of string){
		if(str === '('){
			if(count) answer += str;
			count++;
		} else {
			count--;
			if(count) answer += str;
		}
	}

	return answer;

	/**
	 * TC: O(n)
	 * SC: O(1)
	**/
}

console.log(optimalRemoveParantheses("()"));