/**
 * You are given a string s. Return the array of unique characters, sorted by highest to lowest occurring characters.
 * 
 * If two or more characters have same frequency then arrange them in alphabetic order.
 *
 * 
 * Example 1
 * Input : s = "tree"
 * Output : ['e', 'r', 't' ] 
 * Explanation :
 * The occurrences of each character are as shown below :
 * e --> 2
 * r --> 1
 * t --> 1.
 * The r and t have same occurrences , so we arrange them by alphabetic order.
 *
 * 
 * Example 2
 * Input : s = "raaaajj"
 * Output : ['a' , 'j', 'r' ]
 * Explanation :
 * The occurrences of each character are as shown below :
 * a --> 4
 * j --> 2
 * r --> 1
 * 
**/


/** INTUITION **/
/** 
 * we can first create a hashmap of characters containing the frequencies, once we have the complete hashing we can then sort the map based on the frequecies and if the frequecies matches then we can sort based on the character.
**/

function frequencySort(string){
	const freqMap = {};

	for (let char of string){
		freqMap[char] = freqMap[char] ? freqMap[char] + 1 : 1;
	}
	// freqMap => { r: 1, a: 4, j: 2 }

	const characters = Object.keys(freqMap);
	// characters => [ 'r', 'a', 'j' ]

	characters.sort( (a, b) => freqMap[a] !== freqMap[b] ? freqMap[b] - freqMap[a] : a.localeCompare(b));

	return characters;

	/**
	 * TC: O(n) + O(n * logn)
	 * SC: O(n)
	**/
}

// console.log(frequencySort("raaaajj")); //['a' , 'j', 'r' ]


/** variant 2 : instead of returning array like ['a' , 'j', 'r' ] return "aaaajjr" **/
function frequencySortII(string){
	const freqMap = {};

	for(let char of string){
		freqMap[char] = freqMap[char] ? freqMap[char] + 1 : 1;
	}

	const characters = Object.keys(freqMap);

	characters.sort( (a, b) => freqMap[a] !== freqMap[b] ? freqMap[b] - freqMap[a] : a.localeCompare(b) );

	let ans = "";

	for(let i = 0;  i < characters.length; i++){
		ans += characters[i].repeat(freqMap[characters[i]]);
	}

	return ans;


	/**
	 * TC: O(n) + O(n * logn)
	 * SC: O(n)
	**/
}

console.log(frequencySortII("tree")); // "eert" OR "eetr"