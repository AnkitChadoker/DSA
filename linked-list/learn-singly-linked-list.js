// class to create node
class Node {
	constructor(data, next = null){
		this.data = data;
		this.next = next;
	}
}



/** linked list problems always returns the head of the LL **/

/** convert array to linked list **/
function convertArrayToLL(arr){
	if(!arr.length) return null;

	// created the head of the linked list
	const head = new Node(arr[0]);

	// set the mover to the head of LL, to later update the next pointer of next element.
	let mover = head;

	for(let  i = 1; i < arr.length; i++){
		// start creating LL elements from array.
		const temp = new Node(arr[i]);

		// update the next pointer of mover to the currently created element of LL
		mover.next = temp;

		// move mover to the next element after updating pointer.
		mover = temp;
	}

	/** just to print the LL **/
	traverseLL(head);

	return head;
}

/** traverse through the linked list **/
function traverseLL(head){
	/** this head is noting but the pointer of the first element of LL **/
	let temp = head;

	while(temp !== null){
		console.log(temp.data);

		/** replace the temp with the next pointer **/
		temp = temp.next;
	}
}

/** find element in LL **/
function findElementInLL(head, el){
	let temp = head;
	while(temp !== null){
		if(temp.data === el) return true;
		temp = temp.next;
	}
	return false;
}

/** return the length of the LL **/ 
function lengthOfLL(head){
	let temp = head;
	let count = 0;
	while(temp !== null){
		count++;
		temp = temp.next;
	}

	return count;
}

/** return the tail element of the LL **/
function tailEleOfLL(head){
	if(head === null) return null;
	
	let temp = head;
	while(temp.next){
		temp = temp.next;
	}

	return temp.data;
}


/** remove the head of the LL **/
function removeHeadOfLL(head){
	// either list is empty or just has one element, so that element itself would be head and tail only.
	if(head === null || head.next === null) return null;
	return head.next;
}

/** remove tail of the LL **/
function removeTailOfLL(head){
	// either list is empty or just has one element, so that element itself would be head and tail only.
	if(head === null || head.next === null) return null;

	let temp = head;
	while(temp.next.next){
		temp = temp.next;
	}
	temp.next = null;
	return head;
}

/** insert new head **/
function insertNewHead(head, el){
	const newHead = new Node(el);
	if(head === null) return newHead;

	newHead.next = head;
	return newHead;
}

/** insert element at the tail **/
function insertElAtTail(head, el){
	const newTail = new Node(el);
	if(head === null) return newTail;
	let temp = head;

	while(temp.next){
		temp = temp.next;
	}

	temp.next = newTail;
	return head;
}

const arr = [];
const head = convertArrayToLL(arr);
console.log("length of LL: " + lengthOfLL(head));
console.log("Given elelement's existance: " + findElementInLL(head, 5))
console.log("Tail of the LL: " + tailEleOfLL(head));

// const newHead = removeHeadOfLL(head);
// traverseLL(newHead);
// console.log("length of new LL: " + lengthOfLL(newHead));
// console.log("Given elelement's existance in new LL: " + findElementInLL(newHead, 1))
// console.log("Tail of the new LL: " + tailEleOfLL(newHead));


// const newHead = removeTailOfLL(head);
// traverseLL(newHead);
// console.log("length of new LL: " + lengthOfLL(newHead));
// console.log("Given elelement's existance in new LL: " + findElementInLL(newHead, 5))
// console.log("Tail of the new LL: " + tailEleOfLL(newHead));

// let newHead = insertNewHead(head, 6);
// traverseLL(newHead);
// console.log("length of new LL: " + lengthOfLL(newHead));
// console.log("Given elelement's existance in new LL: " + findElementInLL(newHead, 5))
// console.log("Tail of the new LL: " + tailEleOfLL(newHead));



let newHead = insertElAtTail(head, 6);
traverseLL(newHead);
console.log("length of new LL: " + lengthOfLL(newHead));
console.log("Given elelement's existance in new LL: " + findElementInLL(newHead, 5))
console.log("Tail of the new LL: " + tailEleOfLL(newHead));
