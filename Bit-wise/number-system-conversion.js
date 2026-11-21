/** Decimal to Binary **/

function decimalToBinary(number){
	// to store binary string;
	let res = "";

	while(number && number !== 1){
		res += (number % 2).toString();
		number = Math.floor(number / 2);
	}

	res += number.toString();
	return res.split("").reverse().join("");
}

//console.log(decimalToBinary(6576));


function binaryToDecimal(string){
	let n = 0; let multipleOf2 = 1;
	const len = string.length - 1;

	// start from the end.
	for(let i = len; i >= 0; i--){

		// becuase binary 0 does not add any value to the number as all the multiple of 0 would be 0, so only talking 1.
		if(string[i] === '1'){
			n += multipleOf2;
		}

		// we were multipling 2 everytime in the formula if we observe carefully, like initially it was 2^0, 2^1, 2^2... like this so we were just multiplying 2 each time 
		multipleOf2 *= 2;
	}

	return n;
}

console.log(binaryToDecimal("1100110110000"));