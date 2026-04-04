/**
* A monkey is given n piles of bananas, where the 'ith' pile has nums[i] bananas. An integer h represents the total time in hours to eat all the bananas.
*
*Each hour, the monkey chooses a non-empty pile of bananas and eats k bananas. If the pile contains fewer than k bananas, the monkey eats all the bananas in that pile and does not consume any more bananas in that hour.
*
*Determine the minimum number of bananas the monkey must eat per hour to finish all the bananas within h hours.
*
* Example 1
* Input: n = 4, nums = [7, 15, 6, 3], h = 8
* Output: 5
* Explanation: If Koko eats 5 bananas/hr, he will take 2, 3, 2, and 1 hour to eat the piles accordingly. So, he will take 8 hours to complete all the piles.  
*
* Example 2
* Input: n = 5, nums = [25, 12, 8, 14, 19], h = 5
* Output: 25
* Explanation: If Koko eats 25 bananas/hr, he will take 1, 1, 1, 1, and 1 hour to eat the piles accordingly. So, he will take 5 hours to complete all the piles.
* 
**/ 

                                                    /** INTUITION **/
/**
 * we are given the n piles and also stated that koko can finish at most 1 pile in an hour, so the minimum time will always be n hours as well
 *
 * now let’s go ahead using this statement only if the h and n are equal so to be able to finish each pile in an hour, koko has to eat at most bananas as possible — the biggest pile
 * 
 * like our example (ii), let’s say koko eats only 1 banana per hour, so it will take 25 hours to finish the first pile, 12 hours to finish second pile and so on, so total it will take 78 hours to finish all the piles
 *       [25, 12, 8, 14, 19]
 *
 * if bananas per hour = 100 → 1 hour each → total 5 hours
 *
 * and that’s what we wanted, but we need the min bananas/hour such that all the piles can be eaten in given time
 *
 * even 50 bananas/hour will also finish all the piles in 5 hours
 *
 * even 30 would also do so, and 29, 28, 27, and 25 would also do so, but if we go below 25 let’s say 20 bananas/hour:
 *
 *   [25, 12, 8, 14, 19]
 * → [2, 1, 1, 1, 1] = 6 hours
 *
 * so to finish in given hours, koko has to eat min 25 bananas/hour, which is nothing but the size of the max pile.
 *
 * since we applied the approach of time where it is equal to n (min hours), we can directly say if given h is anything more than n the bananas/hour would be in the range from 1 to max pile size
 *
 * let’s take example (i):
 *
 * [7, 15, 6, 3]
 *
 * 1 banana/hour → 7 + 15 + 6 + 3 = 31 hours
 * 15 bananas/hour → [7, 15, 6, 3]
 * → [1, 1, 1, 1] = 4 hours
 *
 * now we are way within the time limit, but we need to find the minimum bananas/hour, so we need to look for lower numbers
 *
 * let’s say 10 b/h
 *   [7, 15, 6, 3]
 *  →[1, 2, 1, 1] = 5 hours
 *
 * we can still go lower
 *
 * let’s say 8 b/h
 * →[1, 2, 1, 1] = 5 hours
 *
 * should check for lower
 *
 * let’s say 5 b/h
 * →[2, 3, 2, 1] = 8 hours
 *
 * now for 4 b/h
 *  → [2, 4, 2, 1] = 9 hours
 *  → time limit is exceeding
 * so the lowest number we get was 5, though other options were also feasible like 8, 10, 15 (>5), but we need the minimum number of b/h.
 *
 *  so this way we have a certain range to look for the answer from 1 to max pile size.
 **/


/** helper funtion to find the total time taken to finish all banana piles for certain rate. **/
function timeTaken(arr, rate){
    let time = 0;
    for(let i = 0; i < arr.length; i++){
        time += Math.ceil(arr[i] / rate);
    }
    return time;
}

                                              /** BRUTE FORCE **/

function minimumRateToEatBananas(nums, h) {
    const max = Math.max(...nums);
    for(let rate = 1; rate <= max; rate++){
        if(timeTaken(nums, rate) <= h){
            return rate;
        }
    }
    return -1;

    /**
     * TC: O(max. pile size + n)
     * SC: O(1)
    **/
}

// console.log(minimumRateToEatBananas([7, 15, 6, 3], 8));



                                            /** OPTIMAL APPROACH **/

/** we have a rage from 1 to max pile size from the array and the range will be sorted obviosly starting from 1, so we can go for the binary search, and we need to find the min. feasible integer at which rate the koko can finish all the piles, there would be many feasible and non-feasible options among the given range like for example(ii) and above 5 all the options were feasible but we need the min. interge that why we return the 5. we start the low (1) with non-feasible polarity  and high (15) with non feasible options but after low and high crosses each other they will represent the opposite polarity and low will be representing that answer so we can return the low directly withour using extra variable.
 * 
 * arr = [7, 15, 6, 3], h = 8
 * range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
 * 
 * (i) low = 1, high = 15, mid = 8, tt = 1 + 2 + 1 + 1 = 5 hours
 *          the total time taken is below the expected 8 hors at the rate of 8 bananas/hour, but since we need to find the min. possible number so we look for lesser number by eliminating the right half and go to the left half, keep the answer as 8 for now.
 * 
 * (ii) low = 1, high = 7, mid = 4, tt = 2 + 4 + 2 + 1 = 9 hours
 *          the total time taken is above the expected 8 hours at the rate of 4 bananas/hour so we increase the eating speed and go right side and eliminate the left half.
 * 
 * (iii) low = 5, high = 7, mid = 6, tt = 2 + 3 + 1 + 1 = 7 hours
 *         the total time taken is below the expected 8 hors at the rate of 6 bananas/hour, this is less than our previous answer so we replace the answer with 6 now, now again we go left in search of lesser number.
 * 
 * (iv) low = 5, high = 5, mid = 5, tt = 2 + 3 + 2 + 1 = 8 hours
 *         the total time taken is equal to the expected 8 hors at the rate of 5 bananas/hour, this is less than our previous answer so we replace the answer with 5 now, now again we go left in search of lesser number.
 * 
 * (vi) low = 5, high = 4, STOP
 *          high and low crossed each other and we can see low is also representing the 5 (opposite polarity), thats why we can ignore keeping the extra variable for carring the answer and just return the low.
 *  
**/

function optimalMinimumRateToEatBananas(arr, h){
    let low = 1; let high = Math.max(...arr); let answer = high;

    while(low <= high){
        const mid = Math.floor( (low + high) / 2);
        const tt = timeTaken(arr, mid);

        if(tt <= h) {
            answer = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return answer // low;

    /**
     * TC: O(max. pile size + logn)
     * SC: O(1)
    **/

}
console.log(optimalMinimumRateToEatBananas([25, 12, 8, 14, 19], 5)); // 25