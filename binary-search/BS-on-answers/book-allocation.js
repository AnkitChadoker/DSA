/**
 * Given an array nums of n integers, where nums[i] represents the number of pages in the i-th book, and an integer m representing the number of students, allocate all the books to the students so that each student gets at least one book, each book is allocated to only one student, and the allocation is contiguous.
 *
 *
 * Allocate the books to m students in such a way that the maximum number of pages assigned to a student is minimized. If the allocation of books is not possible, return -1.
 *
 *
 * Example 1
 * Input: nums = [12, 34, 67, 90], m=2
 * Output: 113
 * Explanation: The allocation of books will be 12, 34, 67 | 90. One student will get the first 3 books and the other will get the last one.
 *
 * 
 * Example 2
 * Input: nums = [25, 46, 28, 49, 24], m=4
 * Output: 71
 * Explanation: The allocation of books will be 25, 46 | 28 | 49 | 24.
 * 
**/

									/** HELPER FUNCTION **/

function canBeAllocated(arr, limit, m){
	/** start allocating the first student **/
	let students = 1;
	let allocatedPages = 0;

	for(let i = 0; i < arr.length; i++){
		/** check if we can still allocate this book to the current student **/
		if(allocatedPages + arr[i] <= limit){
			allocatedPages += arr[i];
		} else {
			/** otherwise allocate it to next student **/
			students += 1;
			allocatedPages = arr[i];
		}
	}

	return students === m;
}

										/** BRUTE FORCE **/
function bookAllocation(arr, m){
  if(arr.length < m) return -1;

  let min = Math.min(...arr);
  let max = arr.reduce( (pages, sum) => sum + pages, 0);

  for(let limit = min; limit <= max; limit++){
  	if(canBeAllocated(arr, limit, m)){
  		return limit;
  	}
  }

  return -1;

  /**
   * TC: O((sum - min) * n)
   * SC: O(1)
  **/
}

//console.log(bookAllocation([15, 17, 20], 2));


									/** OPTIMAL SOLUTION **/

function optimalBookAllocation(arr, m){
	if(arr.length < m) return -1;

	let min = Math.min(...arr);
	let max = arr.reduce( (page, sum) => sum + page, 0);

	while(min <= max){
		const mid = Math.floor((min + max) / 2);
		if(canBeAllocated(arr, mid, m)){
			max = mid - 1;
		} else {
			min = mid + 1;
		}
	}

	return min;
}


console.log(optimalBookAllocation([12, 34, 67, 90], 2)); // 113