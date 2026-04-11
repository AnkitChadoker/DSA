/**
* You are given A painters and an array C of N integers where C[i] denotes the length of the ith board. Each painter takes B units of time to paint 1 unit of board. You must assign boards to painters such that:
*
* (i) Each painter paints only contiguous segments of boards.
* (ii) No board can be split between painters.
* (iii) The goal is to minimize the time to paint all boards.
*
*
*Return the minimum time required to paint all boards modulo 10000003.
*
*Example 1
*Input: A = 2, B = 5, C = [1, 10]
*Output: 50
*Explanation:
* Painter 1 paints board 0 (length = 1), time = 5
* Painter 2 paints board 1 (length = 10), time = 50
* Max time = 50
* Return 50 % 10000003 = 50
*
*
* Example 2
*Input: A = 10, B = 1, C = [1, 8, 11, 3]
*Output: 11
*Explanation:
* Assign each board to a different painter
* Max time = max(1, 8, 11, 3) = 11
* Return 11 % 10000003 = 11 
**/

/** INTUITION **/
/**
 *it is again the exact same problem as two previous problems, for now just ignore the additional info given like B units of time and the modulo one.
 * and now if we see the problem we have an array of n integers and A painters and we need to split these boards between A painters such that the time can be minimized.
 * 
 * lets take an example to understand it.
 * 
 * arr = [1, 10], A = 2
 * 
 * we are given two boards and 2 painters now we can simply assign 1 board to each painter.
 * 
 * 		P1      P2
 *	   [1]     [10]
 * 
 * max. time taken to complete the painting is 10
 * because P1 would finish its work in one unit time and P2 would finish it in 10 unit so total time taken is 10 we can not minimize it further.
 * 
 * lets take another example:
 * 
 * arr = [5, 10, 30, 20], A = 3
 * 
 * lets split these boards among 3 painters.
 * 
 * 	P1           P2        	 P3        Max Time
 * 
 * [5, 10]      [30]      	[20]         [30]
 * [5]        	[10, 30]    [20]          40
 * [5]          [10]     	[30, 20]      50
 * 
 * so the min. time taken is 30 (remember we are considering each painter finishes the 1 unit
 * of board in 1 unit time).
 * 
 * now again any painter has to take the biggest board so the answer can not be less than Math.max(), so our lower bound is Math.max(). and again if there is only one painter so he has to finish all the boards himself so upper bound would be sum(arr).
 *
 * now again that's the same problem as previous, check for each time limit can it be done under that time limit by A painters.
 */

									/** HELPER FUNCITON **/

function canPartitionBeDone(arr, limit){
	let partitions = 1;
	let partitionedBoards = 0;

	for(let i = 0; i < arr.length; i++){
		if(partitionedBoards + arr[i] <= limit){
			partitionedBoards += arr[i];
		} else {
			partitions += 1;
			partitionedBoards = arr[i];
		}
	}

	return partitions;
}

/**
 * Remember we considered that each painter takes 1 unit of time to paint each unit of board, but in our problem we are given that each painter takes B unit of time that's why we multiple the time with B and also asked to return the result in modulo 10000003 form.
*/




										/** BRUTE FORCE **/

function painterPartition(arr, A, B){
	let min = Math.max(...arr);
	let max = arr.reduce( (sum, i) => sum + i, 0);

	for(let i = min; i <= max; i++){
		if(canPartitionBeDone(arr, i) <= A){
			return (i * B) % 10000003;
		}
	}

	return -1;
}

//console.log(painterPartition([1, 10], 2, 5)) // 50




										/** OPTIMAL APPROACH **/

function optimalPainterPartition(arr, A, B){
	let min = Math.max(...arr);
	let max = arr.reduce( (sum, i) => sum + i, 0);

	while(min <= max){
		const mid = Math.floor((min + max) / 2);
		if(canPartitionBeDone(arr, mid) <= A){
			max = mid - 1;
		} else {
			min = mid + 1;
		}
	}

	return (min * B) % 10000003;
}	

console.log(optimalPainterPartition([1, 8, 11, 3], 10, 1)) // 11