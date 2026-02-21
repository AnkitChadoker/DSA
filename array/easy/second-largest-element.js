// ** we need to find the second largest element in the array and return it **//
//** arr = [1,2,3,4,5,8,6];
//** output = 6

//** arr = [3,5,7,10,8,9,10];
//** output = 9 //not 10 again because its already the largest so if the largest element repeat itself we need to ignore that and if there is no second largest element for an array [3,3,3,3,3] so we can just return -1 (assuming there will be all positive number in the array);

//** brute force **//

//** sort the array **/
//** (arr.length - 1) would surely be the largest element **//
// ** for the second largest we need to check from (n-2) and check if its not the same number as largest and if its not then return the number **//
//** so we would need the 2 loops for that **//

function secondLargestNumber(arr){
	arr.sort((a, b) => a - b);
	const largest = arr[arr.length - 1];
	let j = arr.length - 2;	
	while(j >= 0) {
		if(arr[j] < largest) return arr[j];
		j--;
	}
	return -1;
	
	//** TC & SC **//
	//** since sorting uses O (n * logn)
	//** and we are running the loop to find the second largest as welll which in worst case could run to O(n) times if array has now second largest element
	//** O(n * logn) + O(n)
	//** SC would be O(1) because we are not using any extra space to solve the problem.
}

//console.log(secondLargestNumber([3,5,5,5,5,5]))

// Optimal solution **//
//** instead of sorting we can use two pointer approach like we can have 2 pointers largest and secondLargest.
//** we can start with having largest and secondLargest both as -1 (assuming only positive number is there in the array)
//** and we can than traverse through the array and for sure the largest will get updated because there ought to be the element greater than -1.
//** and as we find the greater element than largest we assign it to largest and we assign previous largest to secondLargest, why becuase we already found the new largest so the previous largest ought to be the second largest.
//** but since the array can be in any order we still need to check for another condition like the array element might not be greater than largest but is may be grreater than the second largest so we need to take care of that edge case as well.

//** arr = [3,5,5,5,4];
//** though we get out largest (5) in second iteration (where i = 1) at the time the secondLargest would be 3 but ideally at the end of the traversal  the second largest should be 4 that why we need to handle that edge case as well.

function optimalSecondLargestNumber(arr){
	let largest = -1; // we could have tkane the -Infinity as well, if the array contains the negative numbers as well.
	let secondLargest = -1;
	
	for(let i = 0; i < arr.length; i++){
		if(arr[i] > largest) {
			secondLargest = largest;
			largest = arr[i];
		}else if(arr[i] < largest && arr[i] > secondLargest) {
			secondLargest = arr[i];
		}
	}
	
	return secondLargest;
	
	//** clearly we are traversaling entire array of n elements so TC would be O(n)
	//** we did not use any other extra space so SC will be O(1)
}
//console.log(optimalSecondLargestNumber([3,5,5,5,5,5,5,4]))


function optimalSecondSmallest(arr){
	let smallest = Infinity;
	let secondSmallest = Infinity;
	
	for(let i = 0; i < arr.length; i++){
		if(arr[i] < smallest){
			secondSmallest = smallest;
			smallest = arr[i];
		} else if(arr[i] < secondSmallest && arr[i] > smallest) {
			secondSmallest = arr[i]
		}
	}
	return secondSmallest === Infinity ? -1 : secondSmallest;
}

console.log(optimalSecondSmallest([5,5,5,5,2,5,5,3,5]))