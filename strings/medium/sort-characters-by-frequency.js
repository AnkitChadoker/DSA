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
	 * TC: O(n) + O(k * logk)
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
	 * TC: O(n) + O(k * logk) + O(k)
	 * SC: O(n)
	**/
}

//console.log(frequencySortII("tree")); // "eert" OR "eetr"



function frequencySortIII(string){
	const map = new Map();

	for(let char of string){
		map.set(char, (map.get(char) || 0) + 1)
	}

	const freqArr = [...map];
	//[ [ 't', 1 ], [ 'r', 1 ], [ 'e', 2 ] ]

	freqArr.sort( (a, b) => {
		if(a[1] !== b[1]) { return b[1] - a[1] }
		else {
			// return a[0].localeCompare(b[0])

			/** for ASCII order like "A" (65) should come before "a" (97) **/
			if(a[0] < b[0]) return -1;
			else if(a[0] > b[0]) return 1;
			else return 0;
		}
	});

	const response = [];
	for(let [char, _] of freqArr){
		response.push(char);
	}
	return response;

	/**
	 * TC: O(n) + O(k * logk) + O(k)
	 * SC: O(n)
	**/
}
console.log(frequencySortIII("tree"));