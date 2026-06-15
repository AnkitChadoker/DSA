// class to create node
export class Node {
	constructor(data, next = null){
		this.data = data;
		this.next = next;
	}
}



/** linked list problems always returns the head of the LL **/

/** convert array to linked list **/
export function convertArrayToLL(arr){
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
export function traverseLL(head){
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

/** remove nth node **/
function removeNthNode(head, n){
	if(!head) return null;
	if(n === 1) return head.next;
	let prev = head; let temp = head.next; let cnt = 1;

	while(temp){
		cnt++;
		if(cnt === n) break;
		prev = temp;
		temp = temp.next;
	}
	prev.next = temp.next;
	return head;
}

/** remove node from LL **/
function removeNode(head, node){
	if(!head) return null;
	if(head === node) return head.next;
	let prev = head; let temp = head.next;
	while(temp){
		if(temp === node) break;
		prev = temp;
		temp = temp.next;
	}

	prev.next = temp ? temp.next : null; 
	return head;
}

/** insert new node at nth position ( 1 >= n <= length ) **/
function insertNewNode(head, val, n){
	const newHead = new Node(-1, head);
	let cnt = 1;
	let prev = newHead; let temp = head;
	while(temp){
		if(cnt === n) break;
		prev = temp;
		temp = temp.next;
		cnt++;
	}
	const newNode = new Node(val, temp);
	prev.next = newNode;
	return newHead.next;

}

// const arr = [4, 6, 8, 9, 5, 11];
// const head = convertArrayToLL(arr);
// console.log("length of LL: " + lengthOfLL(head));
// console.log("Given elelement's existance: " + findElementInLL(head, 5))
// console.log("Tail of the LL: " + tailEleOfLL(head));

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

// let newHead = insertElAtTail(head, 6);
// traverseLL(newHead);
// console.log("length of new LL: " + lengthOfLL(newHead));
// console.log("Given elelement's existance in new LL: " + findElementInLL(newHead, 5))
// console.log("Tail of the new LL: " + tailEleOfLL(newHead));

// let newHead = removeNthNode(head, 2);
// traverseLL(newHead);
// console.log("length of new LL: " + lengthOfLL(newHead));

// let newHead = removeNode(head, head.next.next.next.next.next);
// traverseLL(newHead);
// console.log("length of new LL: " + lengthOfLL(newHead));

// let newHead = insertNewNode(head, 0, 8);
// traverseLL(newHead);
// console.log("length of new LL: " + lengthOfLL(newHead));
