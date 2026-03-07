/**
 	Given an array nums of n integers.
	Return the length of the longest sequence of consecutive integers. The integers in this sequence can appear in any order.

	Example 1
	Input: nums = [100, 4, 200, 1, 3, 2]
	Output: 4

	Explanation:
	The longest sequence of consecutive elements in the array is [1, 2, 3, 4], which has a length of 4. This sequence can be formed regardless of the initial order of the elements in the array.
*/

/** BRUTE FORCE **/
/** 
 	we can start iterating over the array and for each element we can start looking for the consecutiveness like our first (0th) element is 100 so we start seeing the next element which is 101 in the array using linear scanning and if get the 101 in the array we look for the 102 and keep incrementing the length of current consecutiveness and the the end of this consecutive sequence we challange out standing longest. 
**/

function longestConsecutiveSequence(arr){
	let longest = 0;

	for(let i = 0; i < arr.length; i++){
		
		let length = 1; // because regardless of consecutive sequence even if there is one element the sequence length will be 1 always, arr[i] th element.
		let nextEle = arr[i] + 1;

		while(search(nextEle, arr)){
			length++;
			nextEle += 1;
		}

		longest = Math.max(length, longest);
	}

	return longest;

	/**
	 * TC: O(n * n) = ~ O(n^2) // linear iteration over main array and then for each array we are doing linear scanning in the array till me find the consecutiveness.
	 * SC: O(1) 
	**/
}

function search(needle, haystack){
	for(let i = 0; i < haystack.length; i++){
		if(haystack[i] === needle) return true;
	}
	return false;
}

//console.log(longestConsecutiveSequence([100, 4, 200, 1, 3, 2, 101, 102, 103, 104]));

/** BETTER APPROACH **/
/** If interviewer allow to modify the given array we can sort the array and then linearly can check for the consecutive sequences **/

function betterLongestConsecutiveSequence(arr){
	arr.sort((a,b) => a-b);

	let longest = 0;
	let currentSequence = 1; // because regardless of consecutive sequence even if there is one element the sequence length will be 1 always, arr[i] th element.

	for(let i = 0; i < arr.length; i++){
		if(arr[i+1] === arr[i] + 1){
			currentSequence++;
		} else if(arr[i+1] === arr[i]){
			/** for  understanding purpose kept this block otherwise we can directly check for elseif(arr[i+1] !== arr[i]) and then do currentSequence = 1 **/
			// do nothing
		} else {
			currentSequence = 1;
		}

		longest = Math.max(currentSequence, longest);
	}

	return longest;

	/** 
	 * TC: O(n* logn) + O(n) /// sorting + linear scanning
	 * SC: O(1)
	 * **/
}
//console.log(betterLongestConsecutiveSequence([100, 4, 200, 1, 3, 2, 101, 102, 1, 2, 2, 2, 4, 4, 4])); // 4 [1,2,3,4]


/*** OPTIMAL APPROACH **/
/** since we used sorting in the above approach which will currupt the given input, instead we can use set data structure, because there may be repeatative elements in the array so we can filter them out and also lookup for next element in the set will only take O(1) time in best and avg. case, in JS we do not have ordered set, we only have unordered set so by default JS engineds handles the collisions efficiently so we need not to worry about the worst case O(n), it can be negligible **/

function optimalLongestConsecutiveSequence(arr){
	const set = new Set();
	let longest = 0;

	for(let i = 0; i < arr.length; i++){
		set.add(arr[i]);
	}

	for(let value of set){
		if(!set.has(value - 1)){ // we can save us some extra iteration for the elements which are not the starting of the sequence	like for 101 we can check if 100 is there then the actual sequence should began from 100 and not from 101 so we can discard that perticuler iteration entirely.		
			let currentSequence = 1;
			let nextEle = value + 1
			while(set.has(nextEle)){ // this will be O(1) operations, and not the linear operation O(n)		
				currentSequence++;
				nextEle += 1;
			}
			longest = Math.max(longest, currentSequence);
		}
	}

	return longest;

	/**
	 * TC: O(n) + O(n) = O(2n) // linear scanning to set the values in the set DS + to find the sequences using set DS.
	 * SC: O(n) // set DS storage space
	 * **/
}

console.log(optimalLongestConsecutiveSequence([100, 4, 200, 1, 3, 2, 101, 102, 1, 2, 2, 2, 4, 4, 5, 4])); // 5 [1,2,3,4,5]