/**
 * Given an integer array nums. Return the number of reverse pairs in the array.
 * An index pair (i, j) is called a reverse pair if:
	(i) 0 <= i < j < nums.length
	(ii) nums[i] > 2 * nums[j]

	nums = [6, 4, 1, 2, 7]
	output = 3
	explaination: here are three reverse pairs in the array
				  (i)   [0, 2], 6 > 2 * 1
				  (ii)  [0, 3], 6 > 2 * 2
				  (iii) [1, 2], 4 > 2 * 1
**/

												
												/** BRUTE FORCE **/

/** we can simply check for each element one by one against its all future elements if the element is bigger than the twice of the future elements **/

function reversePair(arr){
	let count = 0;
	for(let i = 0; i < arr.length; i++){
		for(let j = i + 1; j < arr.length; j++){
			if(arr[i] > 2 * arr[j]){
				count++;
			}
		}
	}
	return count;

	/**
	 * TC: O(n^2) approx
	 * SC: O(1)
	**/
}

//console.log(reversePair([6, 4, 1, 2, 7]));


											/** OPTIMAL SOLUTION **/

/** same as count inversion problem, we are gonna use the merge sort algo., but here is slight change instead of i > j we need to find the i > 2 * j, but in our merge sort algo. we have the condition where we check arr[i] > arr[j] and we can not directly change that condition to arr[i] > 2 * arr[j], becuase the entire merging is happening becuase of that condition, if we try to twick that the entire alog. would fall apart. **/

function optimalReversePair(arr){
	return mergeSort(arr);
}

console.log(optimalReversePair([5, 4, 4, 3, 3]));

function mergeSort(arr, left = 0, right = arr.length - 1){
	let count = 0;
	if(left >= right) return count;

	let mid = Math.floor((left + right)/2);

	count += mergeSort(arr, left, mid);
	count += mergeSort(arr, mid + 1, right);
	count += countReversePair(arr, left, mid, right);
	merge(arr, left, mid, right);

	return count;
}

/** we do the counting of the reverse pair here just before the merge happens, why the reason is already explained below. **/
function countReversePair(arr, left, mid, right){
	let i = left;
	let j = mid + 1;
	let count = 0;

	while(i <= mid && j <= right){
		if(arr[i] > 2 * arr[j]){
			count += (mid - i + 1);
			i++;
		} else {
			j++
		}
	}
	return count;
}


function merge(arr, left, mid, right){
	let i = left;
	let j = mid + 1;
	const temp = [];

	while(i <= mid && j <= right){
		if(arr[i] <= arr[j]){
			temp.push(arr[i++]);
		} else {
			// here i is greater than j
			
			/* we can not do this here, becuase lets say we have arrays (left to mid) [1,4,6] and [2,7] (mid + 1, right) to merge, now when i = 0 and j = 3, i is smaller so i pointer will move to 1 now arr[i] is 4 and arr[j] is 2 here j is smaller and we reach in this conditional block but 4 > 2 * 2, false, so below code would no execute and we move the j pointer to index 4, now we compare arr[i] and arr[j] which are 4 and 7, 4 is smaller so we move i, i is now at index 2 and j is at 4, we already have missed the pair [6 > 2 * 2], becuase j has crossed that index already, thats why we can not do this here. */

			//if(arr[i] > 2 * arr[j]) count += (mid - i + 1);

			/** we can do this before merging the sorted arrays **/

			temp.push(arr[j++]);
		}
	}

	while(i <= mid) temp.push(arr[i++]);
	while(j <= right) temp.push(arr[j++]);

	for(let i = 0; i < temp.length; i++){
		arr[left + i] = temp[i];
	}
}