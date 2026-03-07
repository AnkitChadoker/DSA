/**
 	Given an array arr of n integers, where arr[i] represents price of the stock on the ith day. Determine the maximum profit achievable by buying and selling the stock at most once. 
	The stock should be purchased before selling it, and both actions cannot occur on the same day.


	Example 1
	Input: arr = [10, 7, 5, 8, 11, 9]
	Output: 6 //[but at 5, sell at 11]

	Explanation: Buy on day 3 (price = 5) and sell on day 5 (price = 11), profit = 11 - 5 = 6.
**/

/** BRUTE FORCE **/
/** we can consider each day as a buying day and check for the future days at which day we can get the highest profit **/

function maximumProfit(arr){
	let maxProfit = 0;

	// consider each day as a buying day //
	for(let i = 0; i < arr.length; i++){

		/** check for all future days where profit can be maximized, becuase on the same day profit will always be 0 thats why we always check for future days only, and of course we should not be checking for the older days because in order to sell the stock we must buy it first that why we must check for the days after we bought the stock **/

		for(let j = i + 1; j < arr.length; j++){
			const profitOfTheDay = arr[j] - arr[i];
			maxProfit = Math.max(profitOfTheDay, maxProfit);
		}
	}

	return maxProfit;

	/**
	 * TC: ~ O(n^2)
	 * SC: O(1)
	**/
}

//console.log(maximumProfit([10, 7, 5, 8, 11, 9])) // 6


/** OPTIMAL SOLUTION **/

/** instead of considering each day as a buying day lets consider each day as a selling day and for profit to be maximized we must need to track down the day when the stock price was minimal and consider that day as a buying day and obviously the buying day will always be left side of the selling day, that way we can gain the maximum profit. since for the first day (0th index) we can not have any buying day so we consider the minStockPrice as the infinity before the first day and then as we keep on going in the loop we replace it with the each days price if its minimum than the standing minStockPrice, that way we can keep track of the minStockAmount with respect to the each future day. **/

function optimalMaximunProfit(arr){
	let minStockPrice = Infinity;
	let maxProfit = 0;

	for(let i = 0; i < arr.length; i++){
			
		const profitOnTheDay = arr[i] - minStockPrice;
		maxProfit = Math.max(profitOnTheDay, maxProfit);

		/** before going to next day challange the min. stock price with todays price **/
		minStockPrice = Math.min(minStockPrice, arr[i]);
	}

	return maxProfit;

	/**
	 * TC: O(n)
	 * SC: O(1)
	**/
}

console.log(optimalMaximunProfit([10, 7, 5, 8, 11, 9])) // 6