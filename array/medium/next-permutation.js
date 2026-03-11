/** 
 * we are given and array of intergers and we need to return the next permutation of the given array.
 * For example, for arr = [1,2,3], the following are all the permutations of arr:
	[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1].	
 * The next permutation of an array of integers is the next lexicographically greater permutation of its integers.

	More formally, if all the permutations of the array are sorted in lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted order.

	If such arrangement is not possible (i.e., the array is the last permutation), then rearrange it to the lowest possible order (i.e., sorted in ascending order).
	
	for example if arr = [3,1,2] given then the next permutation will be [3,2,1]
	and if arr = [3,2,1] is given then the there is no next lexicographically greater permutation available so we fallback to first permutation and answer will be [1,2,3]
**/



/** BRUTE FORCE **/
/**
 * 	we can generate all possible permutaion of the given array in the sorted order using rercusrsion which we will cover later on.
 * than we can linearly iterate over the array of permutation since its stored in the soreted form, we can find the given array permutation.
 * then return the next index permutation, and in case no next permutation is found we can fallback to first permutation.
 * 
 * 
 * gernating all permutation of n size array takes O(n! * n) TC which is too huge. suppose we are given the array of size 5 this will take (5! * 5) => 120 * 5 => 600 and if array has 20 elements then (20! * 20) => 48,658,040,163,532,800,000 (10^19) which is humongous, our program can not take that much time thats why we jump to the optimal approach directly
 * 
 * 
 * though in future we will learn how to generate all the permutations using recursion. 
**/



/** OPTIMAL APPROACH **/
/**
  * we are finding the break point, till where the prefix can be matched.
  * we are then finding the smallest greater element than the break point element to swap with, so we can be as close as possible to the given array.
  * we are reversing the remaining part of the array again to make the number as close and small as possible to be lexicographically closest to the given array permutation.
**/
function nextPermutation(arr){
	let idx = -1;
	let length = arr.length;

	for(let i = length - 2; i >= 0; i--){
		if(arr[i] < arr[i+1]){
			idx = i;
			break;
		}
	}

	if(idx === -1){
		reverse(arr, 0, length - 1);
	}

	for(let i = length - 1; i > idx; i--){
		if(arr[i] > arr[idx]){
			[arr[i], arr[idx]] = [arr[idx], arr[i]];
			break;
		}
	}

	return reverse(arr, idx+1, length - 1);

	/**
	 * TC: O(n) + O(n) + O(n/2) // first loop to find break point index + second loop to find the smallest greater number than break point value + to reverse the (entire array at worst case or) remaining array.
	 * SC: O(1) // no extra space is being used
	**/
}

function reverse(arr, from, to){
	while(from < to){
		[arr[from], arr[to]] = [arr[to], arr[from]];
		from++;
		to--;
	}
	return arr;
}

console.log(nextPermutation([1,2,3])); // [1,3,2]