function findMissingAndRepeatingNumber(arr){
	const store = new Array(arr.length + 1).fill(0);
	let missing = undefined;
	let repeating = undefined;

	for(let i = 0; i < arr.length; i++){
		store[arr[i]] += 1;
	}

	for(let i = 1; i < store.length; i++){
		if(store[i] === 0) missing = i;
		if(store[i] === 2) repeating = i;
		if(missing && repeating) break;
	}

	return [repeating, missing];

	/***
	 * TC: O(n) + O(n)
	 * SC: O(n)
	**/
}

//console.log(findMissingAndRepeatingNumber([6, 5, 7, 1, 8, 6, 4, 3, 2]));

function optimalFindMissingAndRepeatingNumber(arr){
	let x = undefined;
	let y = undefined;

	let sumOfN = 0;
	let sqaureOfN = 0;
	let sumOfArr = 0;
	let sqaureOfArr = 0;

	for(let i = 0; i < arr.length; i++){
		sumOfArr += arr[i];
		sumOfN += i + 1;

		sqaureOfArr += arr[i] * arr[i];
		sqaureOfN += Math.pow(i + 1, 2);
	}		

	let val1 = sumOfN - sumOfArr; // X - Y
	let val2 = (sqaureOfN - sqaureOfArr) / val1; // (X^2 - Y^2) = (X + Y)(X - Y) , :: [(X^2 - Y^2) / (X - Y)] => X + Y

	x = (val1 + val2)/2; // A + B = (X + Y) + (X - Y) => A + B = 2X => X = (A + B / 2), where A = X + Y, B = X - Y
	y = val2 - x; // X + Y = val2 => Y = val2 - X 


	/** to check which is repeating and which is missing between both x and y **/
	let repeating = undefined;
	let missing = undefined;
	for(let i = 0; i < arr.length; i++){
		if(arr[i] === x) { 
			repeating = x;
			missing = y;
		 	break;
		} else if(arr[i] === y) {
			repeating = y;
			missing = x;
			break;
		}
	}

	return [repeating, missing];

	/**
	 * TC: O(n) + O(n)
	 * SC: O(1)
	**/
}


console.log(optimalFindMissingAndRepeatingNumber([1, 2, 3, 6, 7, 5, 7]));