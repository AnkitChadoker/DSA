/*
	we need to right roate the array by given number of places, since we have already discussed about it in detail in left rotate problem, so we are gona jump to the solution right away
	arr = [1,2,3,4,5,6], k = 4
	output = [3,4,5,6,1,2]
	
*/

/** BRUTE FORCE */
function rightRotateArray(arr, k){
	const arrLen = arr.length;
	const r = k % arrLen;
	if(r === 0) return arr;
	
	/** create temp array to store rotated elements from right **/
	const tempArr = [];
	for(let i = arrLen - r; i < arrLen; i++){
		tempArr.push(arr[i]);
	}
	
	/** right shift remaining array elements by r places **/
	for(let i = 0; i < arrLen - r; i++){
		arr[r + i] = arr[i];
	}
	
	/** replace temp array elements back to the orignal array at the begining **/
	for(let i = 0; i < tempArr.length; i++){
		arr[i] = tempArr[i];
	}
	
	return arr;
	
	/*
		TC: O(r) + O(n-r) + O(r) => O(n + r);
		SC: O(r)
	*/
}

console.log(rightRotateArray([1,2,3,4,5,6], 4));

/** OPTIMAL APPROACH **/
function optimalRightRotateArray(arr, k){
	const arrLen = arr.length;
	const r = k % arrLen;
	if(r === 0) return arr;
	
	reverse(arr, arrLen - r, arrLen - 1);
	reverse(arr, 0, arrLen - r - 1);
	reverse(arr, 0, arrLen - 1);
	return arr;
	
	/*
		TC: O(r/2) + O(n-r/2) + O(n/2) => O(2n/2) => O(n)
		SC: O(1)
	*/
}

function reverse(arr, start, end){
	while(start < end){
		[arr[start], arr[end]] = [arr[end], arr[start]];
		start++;
		end--;
	}
}

console.log(optimalRightRotateArray([1,2,3,4,5,6], 4));