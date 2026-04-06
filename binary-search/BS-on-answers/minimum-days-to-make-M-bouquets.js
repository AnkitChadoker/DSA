/**
* Given n roses and an array nums where nums[i] denotes that the 'ith' rose will bloom on the nums[i]th day, only adjacent bloomed roses can be picked to make a bouquet. Exactly k adjacent bloomed roses are required to make a single bouquet. Find the minimum number of days required to make at least m bouquets, each containing k roses. Return -1 if it is not possible.
*
*
* Example 1
* Input: n = 8, nums = [7, 7, 7, 7, 13, 11, 12, 7], m = 2, k = 3
* Output: 12
* Explanation: On the 12th the first 4 flowers and the last 3 flowers would have already bloomed. So, we can easily make 2 bouquets, one with the first 3 and another with the last 3 flowers.
*
* Example 2
* Input: n = 5, nums = [1, 10, 3, 10, 2], m = 3, k = 2
* Output: -1
* Explanation: If we want to make 3 bouquets of 2 flowers each, we need at least 6 flowers. But we are given only 5 flowers, so, we cannot make the bouquets.
*/

				/** INTUITION **/

/**
 * 
 * we are given an array representing the day each flower would bloom, and we can only use any flower into making bouquet if it has already bloomed by the day, lets take example (i) for instance

arr = [7, 7, 7, 7, 13, 11, 12, 7]

one thing we can clearly see that, we cannot make a single bouquet on the day 1, 2, 3, 4, 5, 6 because no flowers would bloom in these day, so at min the bouquet can be made is on 7th day (min day of array), now we need to make 2 bouquets containing 3 flowers each that too we can only pick adjacent flowers (contagious), like we can only pick (1,2,3), (4,5,6) etc we cannot pick (1,3,8), (2,4,5) etc

so lets see on the 7th day how many bouquets we can make

bloomed:[T, T, T, T, F,  F,  F,  T]
		[7, 7, 7, 7, 13, 11, 12, 7]

so on day 7 we have 5 bloomed flowers and among them only have 4 adjacent flowers so we can only make 1 bouquet by 7th day

there will be no new flowers blooming on 8th, 9th and 10th day so lets directly check the 11th day

bloomed:[T, T, T, T, F,  T,  F,  T]
		[7, 7, 7, 7, 13, 11, 12, 7]

so we will be having 6 bloomed flowers by 11th day but we only have max 4 adjacent flowers which will only make one bouquet of 3 flowers and other flowers are of no use

lets see for 12th day

bloomed:[T, T, T, T, F,  T,  T,  T]
		[7, 7, 7, 7, 13, 11, 12, 7]

we have 7 bloomed flowers and this time we have the 2 sets of 3 adjacent flowers as well, so on the 12th day we will be able to make 2 bouquets of 3 flowers each (from first three and last three flowers.)

if we see for the 13th day as well, all the flowers would bloom on the 13th day so we will be having 8 flowers by which we can make 2 bouquets of 3 flowers each

and from 13th day onwards it is possible to make the 2 bouquets of 3 flowers each because on 14th day also we will be having all the bloomed flowers, so does on 15th, 16th… days

but since we need a specific range to identify the result and we already have the starting point (min of the array) and we can pick our end point as the max of array because till that day all the flowers would have been bloomed, so we will be able to find the output.

we were able to make the bouquets on the 13th day (max day) but we need to find the minimum number of days required to make m bouquets and we were able to make it on 12th day as well that’s why the output will be 12.
**/

/**
we can start picking a day from our identified range [7 to 13] and check will we be able to make m bouquets using k adjacent flowers
				→ helper function to find if its possible
**/

function countBouquets(day, arr, k, m) {
    let bouquets = 0;
    let adjacent = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= day) {
            adjacent++;
        } else {
            bouquets += Math.floor(adjacent / k);
            adjacent = 0;
        }
    }

    bouquets += Math.floor(adjacent / k);
    return bouquets >= m;
}

								/** BRUTE FORCE **/
/* we can start checking for each day of our identified range and check can we make the M bouquets on the that day. and as soon as we find the day we return the answer, because that will be our min day. */

function roseGarder(arr, k, m){
	/** check for the edge case, is it even possible to make M bouquests out of given flowers */
	if(arr.length * k < m) return -1;

	let min = Math.min(...arr);
	let max = Math.max(...arr);
	for(let i = min; i <= max; i++){
		if(countBouquets(i, arr, k, m)) return i;
	}

	return -1;

	/**
	 * TC: O(max - min + 1) * O(n)
	 * SC: O(1)
	**/
}

console.log(roseGarder([7, 7, 7, 7, 13, 11, 12, 7], 3, 2));