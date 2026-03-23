/** we are given an array of intervals where intervals[i] = [startᵢ, endᵢ], merge all overlapping intervals and return an array of non-overlapping intervals that cover all the intervals of the input array.
 * 
 * intervals = [[1,5], [3,6], [8,10], [15,18]]
 * output = [[1,6], [8,10], [15,18]]
 * explaination: Intervals [1,5] and [3,6] were overlapping, so they are merged into [1,6]
 * 
 * 
 * intervals = [[5,7], [1,3], [4,6], [8,10]]
 * output = [[1,3], [4,7], [8,10]]
 * explaination: Intervals [4,6] and [5,7] were overlapping, so they are merge into [4,7]
**/

											/** BRUTE FORCE **/

/** we can not directly link these disoriented intervals if we see example 2 there are no relation between the neighbouring intervals but if we see first example we can see some sort of link like if we comapre each interval to its next interval we see if those are overlapping intervals or not, but why is that inconsistancy in both example, becuase example one has sorted intervals by the starting point [startᵢ] and second example has disoriented intervals. meaning if we sort the inrevals upfront we can define some kind of relation or link between these intervals **/

/** after sorting the intervals we can see if the next intervals [startᵢ] is smaller than or equal the current intervals [endᵢ] then they are overlapping intervals like [4,6] and [5,7] here 5 was smaller than the 6 thats why they got merged, but for this to achieve we need to sort the intervals first based on the the [start]. **/


/** now after sorting we can select an interval at a time and go against each future intervals one by one and try merge it if the intervals are mergable we can merge them and modify our current interval range accordingly to merge future intervals as well like if we merge any future intervals like [4,6] got merged with [5,7] so current interval range would become. [4,7] and when we check against the next interval we will check based on this new range.
 * 
 * like [[5,7], [1,3], [4,6], [8,10]] after sorting would become
 * 
 * [[1,3], [4,6], [5,7], [8,10]]
 * 
 * now lets start merging them for that we need to take initial interval to check against future intervals lets take [1,3] and check against each future interval first [4,6] can they be merged ?? is 4 < 3, no so they can not be merged, now do we need to check for the further intervals ?? no becuase the intervals are sorted already at any point we got a point where no merging can be done we stop there and start the look up for next interval but before that we push the CURRENT INTERVAL into result 
 * 
 *   	result [[1,3]]
 * 
 * now lets start look up for [4,6] check against [5,7] can these 2 be merged ? is 5 < 6 yes it is so it can be merged and the CURRENT INTERVAL would become [4,7] after merging so we continue the look up next up [8,10] can these 2 be merge ?? is 8 < 7, no so it can not be merged just push the CURRENT INTERVAL into result and start look up for next interval
 * 
 * 		result [[1,3], [4,7]]
 * 
 * now the next look up would be for [8,10] and not for [5,7] becuase it got already merged in the previous step now there is no one to check against so we just push the interval as it is in the result.
 * 
 * 		result [[1,3], [4,7], [8,10]] // final output
 * 
**/
function mergeIntervals(intervals){
	intervals.sort((a,b) => a[0] - b[0]);
	const result = [];

	for(let i = 0; i < intervals.length; i++){
		const currentInterval = intervals[i];
		for(let j = i + 1; j < intervals.length; j++){
			if(intervals[j][0] <= currentInterval[1]){
				currentInterval[1] = Math.max(currentInterval[1], intervals[j][1]);
				i = j // till j we have merged so we need to start the look from that point onwards that's why we are assigning j to i
			} else {
				break;
			}
		}
		result.push(currentInterval);
	}

	return result;

	/**
	 * TC: O(nlong) + O(n^2)
	 * SC: O(n) // to store the intervals at worst case when no overlapping is possible all the intervals would be stored in the result array.
	**/
}

/** another code **/
function mergeOverplappingIntervals(intervals){
	intervals.sort((a,b) => a[0] - b[0]);
	const result = [];
	let i = 0;
	while(i < intervals.length){
		const currentInterval = intervals[i];
		let j = i + 1;
		while(j < intervals.length && intervals[j][0] <= currentInterval[1]){
			currentInterval[1] = Math.max(currentInterval[1], intervals[j][1]);
			j++;
		}
		i = j;
		result.push(currentInterval);
	}
	return result;
}

console.log(mergeIntervals([[5,7],[1,3],[4,6],[8,10]]));



												/** OPTIMAL APPROACH **/

/** 
 * we are checking for each interval for every future intervals thats why our brute is giving us O(n^2) TC, if we omit this O(n) look up for each interval we can improve the TC, simce we are already storing the intervals in the result array every time so instead of checking for merging for each future intervals we can just check against the last inserted interval into the result if the next interval is mergable or not if its mergable we merge and update the interval range into the result and if its not mergable we just insert the interval into the result array. 
 * 
 * becuase latest insterd interval is the CURRENT INTERVAL for every future intervals, because array is already sorted and they are arranged in the ascending order.
**/

function optimalMergeIntervals(intervals){
	intervals.sort((a,b) => a[0] - b[0]);
	const result = [];

	for(let i = 0; i < intervals.length; i++){
		if(result.length === 0) result.push(intervals[i]);
		else {
			const lastInterval = result[result.length - 1];
			if(intervals[i][0] <= lastInterval[1]){
				lastInterval[1] = Math.max(lastInterval[1], intervals[i][1]);
				result[result.length - 1] = lastInterval;
			} else {
				result.push(intervals[i]);
			}
		}
	}

	return result;

	/**
	 * TC: O(nlong) + O(n)
	 * SC: O(n)
	**/
}

//console.log(optimalMergeIntervals([[5,7],[1,3],[4,6],[8,10]]));