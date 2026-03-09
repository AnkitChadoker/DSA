/**
 		Given an integer array nums of even length consisting of an equal number of positive and negative integers.Return the answer array in such a way that the given conditions are met:
		
		Every consecutive pair of integers have opposite signs.

		For all integers with the same sign, the order in which they were present in nums is preserved.

		The rearranged array begins with a positive integer.

	Example 1
	Input : nums = [2, 4, 5, -1, -3, -4]
	Output : [2, -1, 4, -3, 5, -4]

Explanation:
The positive number 2, 4, 5 maintain their relative positions and -1, -3, -4 maintain their relative positions


	Example 2
	Input : nums = [1, -1, -3, -4, 2, 3]
	Output : [1, -1, 2, -3, 3, -4]

Explanation:
The positive number 1, 2, 3 maintain their relative positions and -1, -3, -4 maintain their relative positions
**/

/** BRUTE FORCE **/
/** we can take two separate array for positive and negatives individually and in one iteration over the given array we can store the respective number in its respective array and since we are doing linear iteration over the array the order of the element will be preserved automatically **/

function rearrangeElementsBySign(arr){
	const positives = [];
	const negatives = [];

	for(let i = 0; i < arr.length; i++){
		if(arr[i] >= 0){
			//postives
			positives.push(arr[i]);
		} else {
			//negatives
			negatives.push(arr[i])
		}
	}

	/** since we know from the problem iteself that both the elements (positives & negatives) will be equal in size so there can be max arr.length/2 elements in the arrays both in positives and negatives array
		positive = [2, 4, 5]
		negatives = [-1, -3, -4]

		both are of size 3 which is n/2

		and since we need to return the array coantaining both the elements in alternative order and since we know the elements will start from positive number in the array (problem specifically says that).

		The array indexing we know that [0, 1, 2, 3, 4, 5]
		
		[0, 2, 4] will belong to postives (because the rearranged array begins with a positive integer, thats why we are putting postive number first, otherwise if we were stated that the rearrangement will begin from negative number then we will be filling this index using negative array instead of postive array.)
		[2*0, 2*1, 2*2] ::(2*i)

		[1, 3, 5] will belong to negatives
		[2*0+1, 2*1+1, 2*2+1] ::(2*i+1)
	**/
	for(let i = 0; i < arr.length/2; i++){
		//[0, 2, 4]
		arr[i*2] = positives[i];

		//[1, 3, 5]
		arr[i*2+1] = negatives[i];
	} 

	return arr;

	/** 
	 * TC: O(n) + O(n/2)
	 * SC: O(n) // positive + negative
	**/
}

//console.log(rearrangeElementsBySign([2, 4, 5, -1, -3, -4])); //[2, -1, 4, -3, 5, -4]



//** OPTIMAL APPROACH **//
/** though we need to shuffle the array that two the elements are unpredicatable so we need the extra space to store those new arrangements, but can we optimize the TC, lets see **/
/** we can linearly iterate over the given array and since we know that the array size will always be an even number becuase there will be always equal number of elements of both sign, and also we know that positves are being stored at even indexing (because problem stated that rearrangements will be started from positive number) and starting index will be 0 then 2 then 4 and negatives will be stored at odd index like 1, 3 and 4 we can clearly se the indexing is incrementing by 2 for both negative and positive so while iterating over the array we can check is number is postive we can store that number in even pointer and increment the pointer by 2 and same goes for negatives as well **/

function optimalRearrangeElementsBySign(arr){
	const rearranged = [];
	let  even = 0;
	let odd = 1;

	for(let i = 0; i < arr.length; i++){
		if(arr[i] < 0){
			//negative
			rearranged[odd] = arr[i];
			odd += 2;
		} else {
			//positive
			rearranged[even] = arr[i];
			even += 2;
		}
	}

	return rearranged;

	/**
	 * TC: O(n)
	 * SC: O(n)
	**/
}

console.log(optimalRearrangeElementsBySign([2, 4, 5, -1, -3, -4])); //[2, -1, 4, -3, 5, -4]