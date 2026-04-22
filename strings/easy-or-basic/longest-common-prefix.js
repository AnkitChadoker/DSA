/**
* Write a function to find the longest common prefix string amongst an array of strings.
*
* If there is no common prefix, return an empty string "".
*
*
* Example 1
* Input : str = ["flowers" , "flow" , "fly", "flight" ]
* Output : "fl"
* Explanation :
* All strings given in array contains common prefix "fl".
*
* 
* Example 2
* Input : str = ["dog" , "cat" , "animal", "monkey" ]
* Output : ""
* Explanation :
* There is no common prefix among the given strings in array.
* 
**/

function longestCommonPrefix(arr){
	arr.sort();

	console.log(arr);

	let answer = '';
	const first = arr[0];
	const last = arr[arr.length - 1];

	for(let i = 0; i < Math.min(first.length, last.length); i++){
		if(first[i] !== last[i]){
			break;
		}
		answer += first[i];
	}

	return answer;

	/**
	 * TC: O(n * logn) + O(smallest string of array)
	 * SC: O(1)
	**/
}

console.log(longestCommonPrefix(["flowers" , "flow" , "fly", "flight" ]));