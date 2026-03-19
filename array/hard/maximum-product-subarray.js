
function maximumProductSubArray(arr){
	let max = -Infinity;

	for(let i = 0; i < arr.length; i++){
		for(let j = i; j < arr.length; j++){
			let product = 1;
			for(let k = i; k <= j; k++){
				product *= arr[k];
				max = Math.max(max, product);
			}
			if(product === 0) break;
		}
	}

	return max;
}

//console.log(maximumProductSubArray([-5, -4, 0, -2, -3]));


function betterMaximumProductSubArray(arr){
	let max = -Infinity;

	for(let i = 0; i < arr.length; i++){
		let product = 1;

		for(let j = i; j < arr.length; j++){
			product *= arr[j];
			max = Math.max(max, product);
			if(product === 0) break;
		}
	}

	return max;
}

console.log(betterMaximumProductSubArray([-5, 0, -2]));