/**
 * Given a sorted array of unique integers arr, your task is to return k^th missing positive number that is not present in arr. The array is guaranteed to be sorted increasing, and the missing numbers are those positive integers that do not appear in arr but would appear in a full sequence starting from 1.
 * 
 * arr = [ 3, 5, 7, 10 ], k = 6
 * output = 9
 * explanation = the missing numbers are {1, 2, 4, 6, 8, 9, 11,....} the 6^th missing number is 9.
**/

											/** BRUTE FORCE **/
/**
 * we are given an array which is strictly sorted and increasing and will only contain unique elements, now lets take an example.
 * 	arr = [ 4, 6, 8 ], k = 3
 * now what should have been the actual array if no ele. was missing
 * 	 
 *   missing (k) -> [1, 2, 3,    4,    5,    6]
 *   			    [1, 2, 3, 4, 5, 6, 7, 8, 9.....]
 * 
 * and for k=3 the answer would be 3 only, and if k=6, then the answer would not be directly 6 because in between we have some elements (4, 6, 8) which are not missing so we need to consider them as well, so 6^th missing ele would be 9.
 * 
 * STATEMENT (i): if we observe carefully for the k=3, the answer is k itself and why that happened because in the given actual array all the values were greater than $k$ itself meaning the k^th ele was not in between the array before the array meaning all the elements missing are before the first ele. of array. so if
 *			arr[i] > k
 * we can simply return the k.
 * 
 * but what if k^th ele. belongs in between the array like k=4 or 5 or 6. since we know at any moment arr[i] > k we can simply return the k, but for $arr[i] <= k we can increment the k, lets take k as 4.
 * 
 * 			arr = [ 4, 6, 8 ], k = 4
 * 
 * 		(i)  4 <= 4, yes increment k (k = 5)
 *      (ii) 6 <= 5, no, just return the k
 * 
 * and yes the 4th missing number is 5 itself. 
 * 
 * WHY WE ARE DOING THIS & WHY IT IS WORKING ?:
 * 
 * we are just backing our statement (i), if k is less than arr[i], we can simply return it but if its not we would increment the k, by considering the present in between ele. as well.
**/

function kthMissingNumber(arr, k){
	for(let i = 0; i < arr.length; i++){
		if(arr[i] <= k) k++;
		else return k;
	}

	/**
	 * TC: O(n)
	 * SC: O(1)
	**/
}

console.log(kthMissingNumber([ 3, 5, 7, 10 ], 6)); // 9