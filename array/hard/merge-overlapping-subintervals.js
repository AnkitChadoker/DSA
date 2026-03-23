/** BRUTE FORCE **/
function mergeIntervals(intervals){
	intervals.sort((a,b) => a[0] - b[0]);
	const result = [];

	for(let i = 0; i < intervals.length; i++){
		const currentInterval = intervals[i];
		for(let j = i + 1; j < intervals.length; j++){
			if(intervals[j][0] <= currentInterval[1]){
				currentInterval[1] = Math.max(currentInterval[1], intervals[j][1]);
				i = j
			}
		}
		result.push(currentInterval);
	}

	return result;
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

console.log(mergeOverplappingIntervals([[5,7],[1,3],[4,6],[8,10]]));


function optimalMergeIntervals(intervals){
	intervals.sort((a,b) => a[0] - b[0]);
	const result = [];

	for(let i = 0; i < intervals.length; i++){
		if(result.length === 0) result.push(intervals[i]);
		else {
			const lastInterval = result[result.length - 1];
			if(intervals[i][0] <= lastInterval[1]){
				lastInterval[0] = Math.min(lastInterval[0], intervals[i][0]);
				lastInterval[1] = Math.max(lastInterval[1], intervals[i][1]);
				result[result.length - 1] = lastInterval;
			} else {
				result.push(intervals[i]);
			}
		}
	}

	return result;
}

//console.log(optimalMergeIntervals([[5,7],[1,3],[4,6],[8,10]]));