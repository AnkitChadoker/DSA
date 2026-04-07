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
 * we are just backing our statement (i), if k is less than arr[i], we can simply return it but if its not we would increment the k, by considering the present in between ele. as well and return the k at the end.
**/

function kthMissingNumber(arr, k){
	for(let i = 0; i < arr.length; i++){
		if(arr[i] <= k) k++;
		else break;
	}

	return k;

	/**
	 * TC: O(n)
	 * SC: O(1)
	**/
}

// console.log(kthMissingNumber([ 3, 5, 7, 10 ], 6)); // 9


												/** OPTIMAL APPROACH **/

/** since out brute is giving us the O(n) TC already and if we still need to optimize it, we can at max get to O(log n) TC, and we know we can only get this TC by binary search, but lets see if the constraints are ideal for binary search.
 * 
 * (i) do we have the sorted array ? YES
 * (ii) do we need to find something in that array ? YES
 * 			
 * 		but the biggest fallback is binary search is used to find an element present in the array but our task is to find something which is not present in the array (k^th missing element).
 *
 * so we can apply binary search but we will not be able to find the exact result by just binary search because element is not present in the array, so how can we implement BS to get our answer ?? lets see, lets take and example
 * 
 * 	[3, 5, 7, 10], k = 6
 * 
 * we know the output is going to be 9, and 9 will be in between 7 and 10, so if some how we can get to this pair of element we can find our result (how ? will see later).
 * 
 * we are given that we need to find the 6^th element, and we know at each position of array we can get how many elements are missing till that element, how ??
 *  at the 0^th index element 3 is there but ideally 1 should have been there and same for other elements as well, like below
 * 	   
 * 	   index  ->  [0, 1, 2, 3]	
 *  	  arr ->  [3, 5, 7, 10]
 *    missing ->  [2, 3, 4, 6]
 * 
 * so if at any position lets say on 0th index we want to know how many elements are missing we can simply do this
 * 			arr[i] - (i + 1)
 * 
 * i = 0, 3 - (0 + 1) => 2
 * i = 1, 5 - (1 + 1) => 3 etc.
 * 
 * so we can check for each mid if the missing number is smaller or greater on that mid position and based on the result we can eliminate the array.
 * 
 * and the pair of elements will get by the concept of opposite polarity where the high and low would cross each other those will be our elements between them we will find our missing number. (try dry run on given example)
 * 
 * we will get low = 3 and high = 2 (indices)
 * 
 * 									NOW, HOW TO GET THE MISSING ELEMENT ??
 * 
 * our high is at index 2, where missing count is 4 and we want the 6th missing number, so if till the high index we already have 4 missing count, and remaining 2 would be after that element only so we can just do 
 * 
 * 		arr[high] + (k - missing at high index);
 * 
 * 		7 + (6 - 4) => 9, which is what our output is.
 * 
 * 
 * BUT, we can not directly take arr[high], because for the same example if k = 2 out high would be pointing to the -1 index and that would throw us error, so solve this situation we can solve the above equation and we will get the answer.
 * 
 * 		arr[high] + (k - missing at high index)
 * 
 * lets try to convert it into formula, we know how to find the missing elements at any index (arr[i] - (i + 1)).
 * 		
 * 	   arr[high] + (k - (arr[high] - (high + 1)));
 *     
 *     arr[high] + (k - (arr[high] - high - 1));
 * 
 *     arr[high] + (k - arr[high] + high + 1);
 * 
 *     k + high + 1 or k + low (formula)
 * 
 * becuase low is also pointing to the high + 1;
 * 
 *   6 + 2 + 1 => 9, which was expected, so we can use this formula instead of arr[high]
**/


function optimalKthMissingNumber(arr, k){
	let low = 0;
	let high = arr.length - 1;
	while(low <= high){
		const mid = Math.floor((low + high) / 2);
		const missingCnt = arr[mid] - (mid + 1);
		if(missingCnt < k){
			low = mid + 1;
		} else {
			high = mid - 1;
		}
	}

	return k + low // k + high + 1;
}


console.log(optimalKthMissingNumber([ 3, 5, 7, 10 ], 6)); // 9