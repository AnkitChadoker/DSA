/**
* Given a positive integer n. Find and return its square root. If n is not a perfect square, then return the floor value of sqrt(n).
*
* Example 1
* Input: n = 36
* Output: 6
* Explanation: 6 is the square root of 36.
*
* Example 2
* Input: n = 28
* Output: 5
* Explanation: The square root of 28 is approximately 5.292. So, the floor value will be 5.
* 
**/ 

/** INITUITION **/
/** Since probelm itself says that n will be the positive number only ( n>0 ), so the min sqaure root of any number can be 1 so we can start checking for the sqaure root from 1 onwards and keep on checking it until we get the square bigger then the n, like suppose n = 36
 * 
 *  1 * 1 <= 36, so we can keep answer as 1 for now becuase its less than the n
 *  2 * 2 <= 36, so answer = 2
 *  3 * 3 <= 36, so answer will become 3
 *  4 * 4 <= 36, so answer = 4
 *  5 * 5 <= 36, so answer = 5
 *  6 * 6 <= 36, yes again, so answer = 6
 *  7 * 7 <= 36, no, so we break out and return the answer.
 * we can also do the same for the number which is not perfect square like 25 and we will get the biggest floor number whose sqaure is less than 28 is 5 (5 * 5 <= 28), so answer would be 5, because (6 * 6 will be greater than 28, so we return the answer as 5.)
 * 
 * but we know we can start the checking from 1 onwards but we still need to figure out till which number we need to look for at max (though we can use while loop for dynamic checking like (i*i <= n), but here we are building the foundation for the binary search so and for binary search we need the certain range thats why we are looking for the last number till which we can check for), and we can at max check till n itself becuase any sqaure root can be at max the number itself like square root of 1 is the number itself 1. so we can check up until the n itself.
 **/


/** BRUTE FORCE **/
/** we can linearly check for each number from 1 to n and as soon as i * i become greater than n we return the answer. **/

function sqrt(n){
	let ans = 1;
	for(let i = 0; i <= n; i++){
		if(i * i <= n){
			ans = i;
		} else {
			break;
		}
	}
	return ans;
}

console.log(sqrt(28)); //5