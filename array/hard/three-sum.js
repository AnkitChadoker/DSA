/** we are given an array of integers, and we need to return all the triplets suuch that
 * 1. i != j != k
 * 2. arr[i] + arr[j] + arr[k] = 0
 * 
 * The response array must not contain the duplicate triplets, like [-1,0,1], [0,1,-1] and [1,0,1] are the same triplets, so we need to return one of them if it matches the given constraints.
 * 
 * arr = [2, -2, 0, 3, -3, 5]
 * output = [[-2, 0, 2], [-3, -2, 5], [-3, 0, 3]]
 * 
 * explanation:
 * 		arr[1] + arr[2] + arr[0] = 0 // [-2, 0, 2]
 *      arr[4] + arr[2] + arr[5] = 0 // [-3, -2, 5]
 *      arr[4] + arr[1] + arr[2] = 0 // [-3, 0, 3]
**/


														/** BRUTE FORCE **/

/* we can keep the pointer as i = 0, j = 1 and k = 2 and start going through each posible triplates following the constraints and if it matches our requirements we can store it into the set. WHY SET ? becuase set automatically ignores the duplicates, but for triplates to be identificable for the duplication we need to sort them first becuase we have alredy descussed above like [-1,0,1], [0,1,-1] and [1,0,1] are the same triplets but how do we know if they are same triplets, if we sort them, all will give the same response [-1, 0, 1] that way we can identify if the triplate is duplicate or not **/

function threeSum(arr){
	const set = new Set();
	const result = [];

	for(let i = 0; i < arr.length; i++){
		for(let j = i + 1; j < arr.length; j++){
			for(let k = j + 1; k < arr.length; k++){
				const sum = arr[i] + arr[j] + arr[k];
				if(sum === 0){
					const temp = [arr[i], arr[j], arr[k]]; // array of 3 elements will almost be constant space
					temp.sort((a,b) => a - b); // sorting of array of 3 elements will again be the constant time
					const key = temp.join(",")
					if(!set.has(key)){
						set.add(key);
						result.push(temp);
					}
				}
			}
		}
	}
	return result;

	/**
	 * TC: O(n^3) + O(number of triplets) to loop over the set of triplets ([...set])
	 * SC: O(number of triplets)
	**/
}

//console.log(threeSum([2, -2, 0, 3, -3, 5])) //[[-2, 0, 2], [-3, -2, 5], [-3, 0, 3]]


													/** BETTER SOLUTION **/
/**
 * we are using 3 loops that why the TC is O(n^3) if we eliminate the inner most loop we can acheive the better TC of O(n^2) just like we did in two sum problem. keep the i as static pointer and keep on moving j from i+1 to n, since we know we need 4 data to satisfy our condition
 * 					
 * 					arr[i] + arr[j] + arr[k] = target (in our case target is 0)
 * 
 * so among the above we would have i and j and target as well we just need to find the k only to test our condition, using the above derivative we can also say that 
 * 					k = target - (arr[i] + arr[j])
 * 
 * we would be having all the right side of the data, we need to find the k only. and its common sence in order to find something we must have it stored somewhere, like j will be changing from time to time, what we can do it we can store the in between element of i and j in some data structure (set or map) and on each iteration of j we can check in the set if there is any element which satisfies the equation(ii), if there is any such element we got one of our triplet, then we do the same thing as above sort the triplet save the key into map and save the triplet into result for preventing the duplicacy.
 * 
 * WHY NOT KEEP ALL THE ELELEMNTS IN THE SET ALREADY WHY ONLY THE IN BETWEEN OF i AND j ??
 * 
 * because we need not to have same element in our triplet one of our constraints is ( i != j != k). 
**/

function betterThreeSum(arr){	
	/** set to store the unique keys to check for the duplication **/
	const resultSet = new Set();
	/** to store the result */
	const result = [];

	const target = 0;

	/** to iterate over the entire array taking each element as i **/
	for(let i = 0; i < arr.length; i++){

		/** to store the in between elements to help us track third element */
		const hashSet = new Set();

		/** start second loop in search of third element */
		for(let j = i + 1; j < arr.length; j++){
		
			const k = target - (arr[i] + arr[j]);
			/** if we have third element in the hash set */

			if(hashSet.has(k)){
				const temp = [arr[i], arr[j], k];
				temp.sort((a,b) => a - b);
				const key = temp.join(',');

				if(!resultSet.has(key)){
					result.push(temp);
					resultSet.add(key);
				} 

			}

			/** add the element in the hash set to use later to find the missing element */
			hashSet.set(arr[j], j);
			
		}
	}
	return result;

	/**
	 * TC: O(n^2)
	 * SC: O(number of triplets) + O(n) to store the in between elements of i and j, at each iteration of i it is being reinitialized so at max it can have n elements.
	**/
}

//console.log(betterThreeSum([2, -2, 0, 3, -3, 5])) //[[-2, 0, 2], [-3, -2, 5], [-3, 0, 3]]


												 /** OPTIMAL SOLUTION **/

/**
 * we are sorting each triplet before putting it into the result and checking it again and again the set if it exists or not, instead we can sort the given array upfront and can store the triplets directly into the result withour sorting them again and again.
 * 
 * Since we need to avoid duplicates as well so on each change of pointers like i, j and k we can check for the duplciate elements if its still the same as previous element we keep on incremeneting or decrementing the pointer until we found the not equal to previous element.
 * 
 * 
 * since we were using extra set to store the elements in between of i and j to find the k insttead now what we can do is we can fix the i pointer and use 2 pointer approach on j and k where j will be i + 1 and k will be the last element of array since the array is sorted if we get the sum === 0 we got our tripet, if its lesser we can move the j pointer becuase we will get the higher element to the right side and if sum is greater we can move k to the left.
 * 
 * This way we would be ignoring the extra space used by the set to store the elements in each iteration. 
**/
function optimalThreeSum(arr){
	arr.sort((a,b) => a - b);
	const result = [];
	for(let i = 0; i < arr.length; i++){
		if(i !== 0 && arr[i] === arr[i+1]) continue;
		let j = i + 1;
		let k = arr.length - 1;

		/** for each i this loop will run max n times (i+1 to length-1) **/
		while(j < k){
			const sum = arr[i] + arr[j] + arr[k];
			if(sum === 0) {
				const temp = [arr[i], arr[j], arr[k]];
				result.push(temp);

				k--;
				j++;

				while(j < k && arr[k] === arr[k+1]) k--;
				while(j < k && arr[j] === arr[j-1]) j++;
			} else if(sum > 0) {
				k--;
				while(j < k && arr[k] === arr[k+1]) k--;
			} else {
				j++;
				while(j < k && arr[j] === arr[j-1]) j++;
			}
		} 
	}

	return result;

	/**
	 * TC: O(n^2)
	 * SC: O(number of triplets) // result array
	**/
}
console.log(optimalThreeSum([2, -2, 0, 3, -3, 5])) //[[-3,-2,5],[-3,0,3],[-2,0,2]]