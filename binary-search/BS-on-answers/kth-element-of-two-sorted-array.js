/**
 * Given two sorted arrays a and b of size m and n respectively. Find the kth element of the final sorted array.
 *
 *
 * Example 1
 * Input: a = [2, 3, 6, 7, 9], b = [1, 4, 8, 10], k = 5
 * Output: 6
 * Explanation: The final sorted array would be [1, 2, 3, 4, 6, 7, 8, 9, 10]. The 5th element of this array is 6.
 *
 * 
 * Example 2
 * Input: a = [100, 112, 256, 349, 770], b = [72, 86, 113, 119, 265, 445, 892], k = 7
 * Output: 256
 * Explanation: Final sorted array is - [72, 86, 100, 112, 113, 119, 256, 265, 349, 445, 770, 892], 7th element of this array is 256.
 * 
**/

/** BRUTE FORCE **/

function kthElement(arr1, arr2, k){
	let i = 0;
	let j = 0;
	let count = 1

	while(i < arr1.length && j < arr2.length){
		let sortedEle = null;
		if(arr1[i] <= arr2[j]){
			sortedEle = arr1[i++];
		} else {
			sortedEle = arr2[j++];
		}
		if(count === k) return sortedEle;
		count++;
	}

	while(i < arr1.length){
		if(count === k) return arr1[i];
		i++; count++;
	}


	while(j < arr2.length){
		if(count === k) return arr2[j];
		j++; count++;
	}

	return -1;

	/**
	 * TC: O(k) // till on kth element only the while loop will run (if problem strictly says that the elements will exists, k <= the total lenght)
	 * SC: O(1)
	**/
}

//console.log(kthElement([100, 112, 256, 349, 770], [72, 86, 113, 119, 265, 445, 892], 7));


/** OPTIMAL SOLUTION **/

function optimalKthElement(arr1, arr2, k){
	if(arr2.length < arr1.length) return optimalKthElement(arr2, arr1, k);

	let m = arr1.length;
	let n = arr2.length;

	let low = Math.max(0, k - n); let high = Math.min(m, k);

	while(low <= high){
		const cut1 = Math.floor( (low + high) / 2);
		const cut2 = k - cut1;

		const L1 = cut1 === 0 ? -Infinity : arr1[cut1 - 1];
		const L2 = cut2 === 0 ? -Infinity : arr2[cut2 - 1];
		const R1 = cut1 === m ? Infinity : arr1[cut1];
		const R2 = cut2 === n ? Infinity : arr2[cut2];

		if(L1 <= R2 && L2 <= R1){
			return Math.max(L1, L2);
		} else if(L1 > R2) {
			high = cut1 - 1;
		} else {
			low = cut1 + 1;
		}
	}

	return -1;

	/**
	 * TC: O(log(min (m,n)))
	 * SC: O(1)
	**/
}


console.log(optimalKthElement([2, 3, 6, 7, 9], [1, 4, 8, 10], 1));