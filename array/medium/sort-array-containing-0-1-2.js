/** we are given an array containing only 0, 1 and 2 and we need to sort the array **/
/** 
 * arr = [2,1,1,1,0,0,1,0,2];
 * output = [0,0,0,1,1,1,1,2,2];
**/

/** BRUTE FORCE **/

/** simple sort the array and we will get the answer **/
function bruteSortArrayContainingOnly012(arr){
	return arr.sort((a,b) => a-b); // O(n * long)
}

//console.log(bruteSortArrayContainingOnly012([2,1,1,1,0,0,1,0,2]));

/** BETTER APPROACH **/

/** we can iterate through the array once and count all the 0, 1 and 2 and then replace the elements in the array based on their counts in ascending order */
function betterSortArrayContainingOnly012(arr){
	let cnt0 = 0;
	let cnt1 = 0;
	let cnt2 = 0;

	for(let i = 0; i < arr.length; i++){
		if(arr[i] === 0) cnt0++;
		else if(arr[i] === 1) cnt1++;
		else cnt2++;
	}

	/** replacement **/
	for(let i = 0; i < cnt0; i++){
		arr[i] = 0
	}

	for(let i = cnt0; i < cnt0 + cnt1; i++){
		arr[i] = 1;
	}

	for(let i = cnt0 + cnt1; i < arr.length; i++){
		arr[i] = 2;
	}

	return arr;

	/*
		TC: O(n) iteration + (n) total replacement => O(2n)
		SC: O(1)
	*/
}

//console.log(betterSortArrayContainingOnly012([2,1,1,1,0,0,1,0,2]));


/** OPTIMAL APPROACH **/
/** DUTCH NATIONAL FLAG ALOGO. **/

/**
	According to the algo. we can devide the array into 4 parts

	 (i)   0 to low - 1, representing the 0's
	 (ii)  low to mid - 1, representing the 1's
	 (iii) mid to high, representing the unsorted part (entire array initially)
	 (iv)  high+1 to arr.length - 1, representing the 2's
	 

	 where low, mid will be 0 initially and high will be arr.length-1, and we will loop though the array until mid crosess the high and while iterating we will follow the below 3 rules

	 * if arr[mid] is equal to 0 so we know that it belongs to part (i) so we need to place it there somehow since we know that part will always be sorted as it is representing 0's only. so logically we can swap the arr[mid] with arr[low] and increament the low++ that way the 0's will still be in the defined range (0 to low-1). and since low must have been 1 becuase part(ii) represents the 1's only and also sorted and it's range is from low to mid-1, so while swaping we swapped the 0 with 1 and also moved the low++ so now low again represents the 1's array and now if we do mid++ as well the entire part(ii) (low to mid-1) will represant the 1's again.
	 
	 * if arr[mid] is equal to 1 we just need not to do anything other than mid++, and mid-1 will automatically be part of part(ii).
	 
	 * if arr[mid] is equal to 2 we can swap it with high and decrement the high, so automatically high+1 belongs to 2 and since mid to high {part(iii)} is unsorted it does not matter whatever was at high we can swap it with mid, and it will get proccessed in the next iteration.


	 this way all the array will get sorted, in O(n) TC with constant SC.
**/

function optimalSortArrayContainingOnly012(arr){
	let low = 0;
	let mid = 0;
	let high = arr.length - 1;

	while(mid <= high){
		if(arr[mid] === 0) { [arr[low], arr[mid]] = [arr[mid], arr[low]]; low++; mid++; }
		else if(arr[mid] === 1) { mid++ }
		else { [arr[high], arr[mid]] = [arr[mid], arr[high]]; high--; }
	}
	return arr;

	/*
		TC: O(n) single iteration
		SC: O(1)
	*/
}
console.log(optimalSortArrayContainingOnly012([2,1,1,1,0,0,1,0,2]));

