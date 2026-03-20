/** 
 * we are given an array of intergers and we need to return the max product of a sub array.
 * 
 * (i)   arr = [4,5,3,7,1,2], output = 840 // [4,5,3,7,1,2]
 * (ii)  arr = [-5, 0, -2], output = 0 // [-5, 0], [0], [0, -2], [-5, 0, -2]
 * (iii) arr = [1, -2, 3, 4, -4, -3], output = 144 // [3, 4, -4, -3]
 * **/


											/** BRUTE FORCE **/

/** 
 * we can generate all sub arrays and take the product of each sub arrays and challange the max at each iteration of the sub array.
**/
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

											
											/** BETTER SOLUTION **/

/**
 * we can omit the third loop same way we did in many ohter sub array problems.
**/


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

//console.log(betterMaximumProductSubArray([-5, 0, -2,]));


											/** OPTIMAL SOLUTION **/
/**
 * we can use the same approach as Kadane's algo. of max sum of subarray. but we need to take care of the case that a single negative element can change out largest product to the least product like below
 * 
 * arr = [-5,4,3,1,2], total product = -120
 * 
 * we only had the single negative element and it cost out largest product to be smallest product.
 * 
 * So what we can do it we can iterate from both direction at a time like from left to right and right to left, and since we would be challanging the max product at each iteration this way we would get the max product.
 *
 * 			L to R.     		R to L   		Max
 *    
 * (i) 		-5*1 = -5, 			2*1 = 2, 		max = 2
 * (ii)		-5*4 = -20, 		2*1 = 2,		max = 2
 * (iii)    -20*3 = -60,     	2*3 = 6,   		max = 6
 * (iv)     -60*1 = -60,     	6*4 = 24   		max = 24  
 * (v).     -60*2 = -120,    	24*5 = -120 	max = 24 // output
**/

function optimalMaximumProductSubArray(arr){
	let max = -Infinity;

	let prodLtoR = 1;
	let prodRtoL = 1;

	for(let i = 0; i < arr.length; i++){
		prodLtoR *= arr[i];
		prodRtoL *= arr[arr.length-1-i];

		max = Math.max(max, prodLtoR, prodRtoL);

		if(prodLtoR === 0) prodLtoR = 1;
		if(prodRtoL === 0) prodRtoL = 1;
		
	}
	return max;
}

//console.log(optimalMaximumProductSubArray([-5, 0, -2, 4]));


/**
 * additional problem to return the subarray index which is giving us the largest product.
**/
function optimalMaximumProductSubArrayWithIdx(arr){
	let max = -Infinity;

	let subArrayBelongsTo;

	let prodLtoR = 1;
	let startL = -1;
	let endL = -1;
	let startAt = 0;

	let prodRtoL = 1;
	let startR = -1;
	let endR = -1;
	let endAt = arr.length - 1;

	for(let i = 0; i < arr.length; i++){
		if(prodLtoR === 0){
			prodLtoR = 1;
			startAt = i;
		}

		if(prodRtoL === 0){
			prodRtoL = 1;
			endAt = arr.length - 1 - i;
		}

		prodLtoR *= arr[i];
		prodRtoL *= arr[arr.length - 1 - i];

		if(prodLtoR > max && prodLtoR > prodRtoL){
			max = prodLtoR;
			startL = startAt;
			endL = i;
			subArrayBelongsTo = 'left';
		} 

		if(prodRtoL > max && prodRtoL > prodLtoR){
			max = prodRtoL;
			startR = arr.length - 1 - i;
			endR = endAt;
			subArrayBelongsTo = 'right';
		}
	}

	const subArray = [];
	if(subArrayBelongsTo === 'left'){
		for(let i = startL; i <= endL; i++){
			subArray.push(arr[i]);
		}
	} else {
		for(let i = startR; i <= endR; i++){
			subArray.push(arr[i]);
		}
	}
	// console.log(subArray);
	return max;
}


console.log(optimalMaximumProductSubArrayWithIdx([-5,4,3,1,2]));