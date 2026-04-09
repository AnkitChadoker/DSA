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

/** INTUITION **/
/**
 * we are given an array of book pages and also given some conditions to allocate all the books among the m students.
 * (i) we need to allocate all the books among the m students.
 * (ii) each book is allocated to only one student, meaning we can not say from book1, we can allocate 6 pages to student A and remaining 6 to student B.
 * (iii) the book allocation should be contiguous, meaning we can not allocate [12, 67] to student A and [34, 90] to student B, it needs to be contiguous.
 * 
 * lets see our given example how many ways we can allocate this many books to m students.
 * 
 * arr = [12, 34, 67, 90], m = 2
 * 
 *          student A          student B
 * 
 * (i)    12     => [12]     34, 67, 90 => [191]
 * (ii)   12, 34 => [46]     67, 90     => [157]
 * (iii)  12, 34, 67 => [113]  90       => [90] 
 * 
 * there are no other way possible to allocate this n books among m students by following the previous written conditions.
 * 
 * we need the way such that the max allocation to a student should be minimal and out of the three ways (iii) way is giving us the allocation such that, because in (i) the maximum allocation was 191 and in (ii) it was 157 and compare to these 2, (iii) has given us minimal (113) possible allocation.
 * 
 * From the above allocation system we can see that any student can get 
 * at least min of the books, at least that must have to be assigned to any 
 * student, like it was 12 in our case.
 * 
 * and suppose the students number would be 1 (m=1), so all the books will be 
 * assigned to the single student only, so the max allocation can be the 
 * summation of all books.
 * so these way we have our range of allocation (search space) from 
 * min. of array to summation of array (12 to 203).
**/


									/** HELPER FUNCTION **/
/** function to check if using the certain limit can we allocate books to m students strictly **/

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

/** 
 * we can linearly check for each allocation limit one by one and as soon as we get a limit where allocation is possible we return it.
**/
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

/**
 * we have our search space which is sorted, starting onwards min. of array, and we need to find a possible max. integer which 
 * allows the allocations. we can do dry run of it so it can be understandable easily.
 * 
 *   arr = [12, 34, 67, 90]
 * limit = [12, 13, 14, 15, ......., 201, 202, 203]
 *          low                                high
 * 				
 * 					(i) mid = (203 + 12) / 2 = 107
 * 					
 * 					canBeAllocated(arr, 107, 2)
 * 					Student 1: 12 + 34 = 46
 * 					Student 2: 67
 * 					Student 3: 90
 * 
 * we need 3 students to allocate all books using 107 as a limit, we need to increase limit so we go right and eliminate left half.
 * 
 * 			low = 108, high = 203
 * 			(ii) mid = (108 + 203) / 2 = 155
 * 
 * check using 155:
 * 			Student 1: 12 + 34 + 67 = 113 < 155
 * 			Student 2: 90 < 155
 * yes we were able to allocate books to 2 students using limit as 155, for now we record the limit as one of our answer, and look for even smaller number, because we need the max possible min integer.
 * 
 * 			 low = 108, high = 154
 * 			 (iii) mid = (108 + 154) / 2 = 131
 *			 
 * 			 Student 1: 12 + 34 + 67 = 113 < 131
 * 			 Student 2: 90 < 131
 * again possible so we register 131 as our new answer and go even smaller.
 * 
 * 			low = 108, high = 130
 * 			(iv) mid = (108 + 130) / 2 = 119
 * 			Student 1: 12 + 34 + 67 = 113 <= 119
 * 			Student 2: 90 <= 119
 * new answer = 119, go even smaller.
 * 
 * 			low = 108, high = 118
 * 		    (v) mid = (108 + 118) / 2 = 113
 * 			Student 1: 12 + 34 + 67 = 113 <= 113
 * 			Student 2: 90 <= 113
 * new answer = 113, go even smaller.
 * 
 * 			low = 108, high = 112
 * 		   (vi) mid = (108 + 112) / 2 = 110
 * 			Student 1: 12 + 34 = 46 <= 110
 * 			Student 2: 67 <= 110
 * 			Student 3: 90 <= 110
 * not possible, go bigger.
 * 
 * 			low = 111, high = 112
 * 		    (vii) mid = (111 + 112) / 2 = 111
 * 			Student 1: 12 + 34 = 46 <= 111
 * 			Student 2: 67 <= 111
 * 			Student 3: 90 <= 111
 * not possible, go bigger.
 * 
 * 			low = 112, high = 112
 * 		    (viii) mid = (112 + 112) / 2 = 112
 * 			Student 1: 12 + 34 = 46 <= 112
 * 			Student 2: 67 <= 112
 * 			Student 3: 90 <= 112
 * not possible, go bigger.
 * 
 * 			low = 113, high = 112
 * high and low crossed each other, so our answer would be 113 and low is also pointing to that (opposite polarity).
**/

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

	/**
	 * TC: O((sum - min) * logn)
     * SC: O(1)
	**/
}


console.log(optimalBookAllocation([12, 34, 67, 90], 2)); // 113