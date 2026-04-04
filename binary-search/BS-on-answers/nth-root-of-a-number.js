/**
* Given two numbers N and M, find the Nth root of M. The Nth root of a number M is defined as a number X such that when X is raised to the power of N, it equals M. If the Nth root is not an integer, return -1.
*
* Example 1
* Input: N = 3, M = 27
* Output: 3
* Explanation: The cube root of 27 is equal to 3.
*
* Example 2
* Input: N = 4, M = 69
* Output:-1
* Explanation: the 4th root of 69 does not exist, so the answer is -1, the nearest integer which has 4th root below 69 is 2 because
* 
* 2 × 2 × 2 × 2 = 16 < 69
* and 
* 3 × 3 × 3 × 3 = 81 > 69
* 
* but we need to return the exact nth root and not the floor of possible root below m that’s why the answer is -1 and not 2
**/

/** INITUITION **/ 
/**
it is exactly like the the problem (find sqaure root of a number)
in that problem we were finding the square root (n = 2), but now n can be dynamically passed like (n = 3) meaning cube root, (n = 4) 4th root of m and so on.
so there would be only slight change instead of checking (i × i) we need to check for the nth power like if n = 3 so we need to check for the i is raised to power of 3 (i × i × i)
**/

/** helper function **/
function multiple(x, n){
	let res = 1;
	for(let i = 1; i <= n; i++){
		res *= x;
	}
	return res;
}

/** BRUTE FORCE **/

function nthRoot(n, m){
	for(let i = 1; i <= m; i++){
		if(multiple(i, n) === m) {
			return i
		}
	}

	return -1;

	/**
	 * TC: O(m * n)
	 * SC: O(1)
	**/
}

//console.log(nthRoot(4, 69)); // -1

/** OPTIMAL SOLUTION **/

function optimalNthRoot(n, m){
	let low = 1; let high = m;
	while(low <= high){
		const mid = Math.floor( (low + high) / 2);
		const nPower = multiple(mid, n);
		/** we need to check for exact root in this problem unlike square root problem **/
		if(nPower === m) return mid;
		else if(nPower < m) {
			low = mid + 1;
		} else {
			high = mid - 1;
		}
	}

	/** if no exact root found return -1, asked per the problem **/
	return -1;

	/**
	 * TC: O(n * logm) 
	 * SC: O(1)
	**/
}

console.log(optimalNthRoot(4, 81)); // -1