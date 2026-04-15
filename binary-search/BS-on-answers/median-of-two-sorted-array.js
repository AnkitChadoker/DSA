/**
 * Given two sorted arrays arr1 and arr2 of size m and n respectively, return the median of the two sorted arrays.
 *
 *
 *
 * The median is defined as the middle value of a sorted list of numbers. In case the length of the list is even, the median is the average of the two middle elements.
 *
 * Example 1
 * Input: arr1 = [2, 4, 6], arr2 = [1, 3, 5]
 * Output: 3.5
 * Explanation: The array after merging arr1 and arr2 will be [ 1, 2, 3, 4, 5, 6 ]. As the length of the merged list is even, the median is the average of the two middle elements. Here two medians are 3 and 4. So the median will be the average of 3 and 4, which is 3.5.
 *
 * 
 * Example 2
 * Input: arr1 = [2, 4, 6], arr2 = [1, 3]
 * Output: 3.0
 * Explanation: The array after merging arr1 and arr2 will be [ 1, 2, 3, 4, 6 ]. The median is simply 3.
 * 
**/

												/** BRUTE FORCE **/

function bruteMerge(arr1, arr2){
	let i = 0;
	let j = 0;
    const arr = [];

    while(i < arr1.length && j < arr2.length){
    	if(arr1[i] <= arr2[j]){
    		arr.push(arr1[i++]);
    	} else {
    		arr.push(arr2[j++]);
    	}
    }

    while(i < arr1.length){
    	arr.push(arr1[i++]);
    }

    while(j < arr2.length){
    	arr.push(arr2[j++]);
    }

    return arr;
}


function bruteMedian(arr1, arr2){
	const arr = merge(arr1, arr2);
	const mid = Math.floor(arr.length / 2);

	if(arr.length % 2 === 0){
		return ((arr[mid - 1] + arr[mid]) / 2);
	} else {
		return arr[mid];
	}

	/**
	 * TC: O(m + n)
	 * SC: O(m + n)
	**/
}

//console.log(median([2, 4, 6], [1, 3])); // 3




											/** BETTER APPROACH **/

function betterMedian(arr1, arr2){
	let i = 0;
	let j = 0;
	let count = 0;
	let midSum = 0;

	let medians = [];
	const totalLenght = arr1.length + arr2.length;
	const mid = Math.floor(totalLenght / 2);
	if(totalLenght % 2 === 0){
		medians = [mid - 1, mid];
	} else {
		medians = [mid];
	}

	while(i < arr1.length && j < arr2.length){
		if(arr1[i] <= arr2[j]){
			if(medians.includes(count)){
				midSum += arr1[i];
			}
			i++;
		} else {
			if(medians.includes(count)){
				midSum += arr2[j];
			}
			j++;
		}
		count++;
	}

	while(i < arr1.length){
		if(medians.includes(count)){
			midSum += arr1[i];
		}
		i++;
		count++;
	}

	while(j < arr2.length){
		if(medians.includes(count)){
			midSum += arr2[j];
		}
		j++;
		count++;
	}

	return totalLenght % 2 === 0 ? midSum / 2 : midSum;

	/**
	 * TC: O(m + n)
	 * SC: O(1)
	**/
}

//console.log(betterMedian([2, 3, 4, 5, 6], [1])); // 3.5



												/** OPTIMAL SOLUTION **/

function median(arr1, arr2){
	if(arr2.length < arr1.length) return median(arr2, arr1);

	let m = arr1.length;
	let n = arr2.length;

	let low = 0;
	let high = m;

	while(low <= high){
		const mid1 = Math.floor((low + high) / 2);
		const mid2 = Math.floor((m + n + 1) / 2) - mid1;

		let left1 = mid1 === 0 ? -Infinity : arr1[mid1 - 1];
		let left2 = mid2 === 0 ? -Infinity : arr2[mid2 - 1];

		let right1 = mid1 === m ? Infinity : arr1[mid1];
		let right2 = mid2 === n ? Infinity : arr2[mid2];

		if(left1 <= right2 && left2 <= right1){
			if((m + n) % 2 === 0){
				return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
			} else {
				return Math.max(left1, left2);
			}
		} else if(left1 > right2){
			high = mid1 - 1;
		} else {
			low = mid1 + 1;
		}
	}

	return undefined;

	/**
	 * TC: O(log(min(m, n)))
	 * SC: O(1)
	**/
}

//console.log(median([2, 4, 6], [1, 3])); // 3.5

