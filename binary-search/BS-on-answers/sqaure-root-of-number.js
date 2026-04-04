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
	/**
	 * TC: O(n)
	 * SC: O(1)
	**/
}

//console.log(sqrt(28)); //5


/** OPTIMAL APROACH **/
/** since we now have a certain range from 1 to n that too sorted and and we need to find a number whose square is less than or equal to n, so we can apply the binary search here and take the low as 1 ang high as n and get the mid and if the mid's square is smaller than or eqaul to the n we register the number as answer and now we need to look for posible bigger answer (because we need to find the number such that the number should be the greatest number whose sqaure should be less than equal to n.) so we move the low to mid + 1 (eliminate left half, since we have registered mid as answer all the number before mid will definately have the smaller sqaure so no need to check for them we can safely eliminate them) and do the same process and if the mid's sqaure is greater than the n we move the high to mid - 1, becuase we will all the greater sqaure from mid onwards so we need to eliminate the  right half. **/


/**
 * If we pay attention carefully we do not even need to carry this extra answer variable and we can just return the high as our answer why ??
 * 
 * low is pointing to the answer candidate since begining meaning 1 could have also been the answer (becuase 1 * 1 <= any positive number) and high was pointing to the max posible number which we take as n, now we keep on shrinking the array by eliminating half the array at each iteration, like lets say for 28 :
 * 
 * (i) low = 1, high = 28, mid = 14
 * 			is 14 * 14 <= 28, no so we eliminate the right half because no way we are gonna get any number bigger than 14 which has sqaure less than or eqaul to 28.
 * 
 * (ii) low = 1, high = 13, mid = 7
 * 			is 7 * 7 <= 28, no so again eliminate right half.
 * 
 * (iii) low = 1, high = 6, mid = 3
 * 			is 3 * 3 <= 28, yes so we can for now register this mid as our answer (in separate variable to compare with high later on, so answer = 3), but we can still look for greater number as we have some elements left in the range so we go right by eliminating left this time.
 * 
 * (iv) low = 4, high = 6, mid = 5
 * 			is 5 * 5 <= 28, yes we got greater element so we replace answer with this mid (answer = 5), now we will look for even bigger number if possible so we go right again.
 * 
 * (v) low = 6, high = 6, mid = 6
 * 			is 6 * 6 <= 28, no so we go left this time, we did not register the answer becuase its greater than the n,
 * 
 * (vi) low = 6, high = 5
 * 			and now both the pointers crossed each other meaning we are out of the loop and high is pointing to the 5 which was our registered answer, so initially low was pointing to the answer and at the end high pointing to the answer this is called change of polarity, so we can return the high at the end as well becuase high will only represent the answer after crossing the low (polarity change) so we can safely return that. 
 * 
**/

function optimalSqrt(n){
	let low = 1;
	let high = n;
	let answer = 1;

	while(low <= high){
		const mid = Math.floor((low + high) / 2);
		if(mid * mid <= n){
			answer = mid;
			low = mid + 1;
		} else {
			high = mid - 1;
		}
	}
	return answer; // high
	/**
	 * TC: O(logn)
	 * SC: O(1)
	**/
}

console.log(optimalSqrt(51)); //7
