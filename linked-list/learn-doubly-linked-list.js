// class to create node
class Node{
	constructor(data, next = null, prev = null){
		this.data = data;
		this.next = next;
		this.prev = prev;
	}
}

/** convert an array to doublly linked list **/
function convertArrayToDLL(arr){
	if(!arr.length) return null;
	let head = new Node(arr[0]);
	let mover = head;

	for(let i = 1; i < arr.length; i++){
		const temp = new Node(arr[i], null, mover);
		mover.next = temp;
		mover = temp;
	}

	return head;
}

/** print DLL **/
function printDLL(head){
	if(head === null) return null;
	let temp = head;
	while(temp){
		console.log(temp.data);
		temp = temp.next; 
	}
}

/** print forward and backword DLL **/
function printBothWays(head){
	if(head === null) return null;
	let temp = head;
	console.log('Forward:');
	while(temp){
		console.log(temp.data);
		if(!temp.next) break; 
		temp = temp.next;
	}


	console.log('Backword:');
	while(temp){
		console.log(temp.data);
		temp = temp.prev;
	}
}

/** find the tail of the DLL **/
function findTail(head){
	if(head === null) return null;
	let temp = head;
	while(temp.next){
		temp = temp.next;
	}
	return temp.data;
}


/** find an element in DLL **/
function findAEleInDLL(head, ele){
	if(head === null) return false;
	let temp = head;
	while(temp.next){
		if(temp.data === ele) return true;
		temp = temp.next;
	}

	return false;
}

/** remove tail of the DLL **/
function removeTail(head){
	if(head === null || head.next === null) return null;
	let tail = head;
	while(tail.next){
		tail = tail.next;
	}

	let newTail = tail.prev;
	newTail.next = null;
	tail.prev = null;

	return head;
}


/** remove head of the DLL **/
function removeHead(head){
	if(head === null || head.next === null) return null;
	let newHead = head.next;
	newHead.prev = null;
	head.next = null;

	return newHead;
}


/** Remove Kth element of th DLL ( 1 >= k <= n ) **/
function removeKthEle(head, k){
	if(head === null) return null;

	let count = 0;
	let temp = head;
	while(temp){
		count++;
		if(count === k) break;
		temp = temp.next;
	}

	if(count === 1) {
		return removeHead(head);
	}

	let before = temp.prev;
	let after = temp.next;

	temp.prev.next = after;
	if(temp.next){
		temp.next.prev = before;
	}

	temp.prev = null;
	temp.next = null;

	return head;

}

/** Remove the give node of the DLL **/
function removeNodeOfDLL(head, node){
	let before = node.prev;
	let after = node.next;

	/** DLL with only 1 element **/
	if(before === null && after === null){
		return null;
	}

	/** asked to remove the head **/
	if(!before) {
		return removeHead(node);
	}

	/** asked to remove the tail **/
	if(!after) {
		before.next = null;
		node.prev = null;
		return head;
	}

	before.next = after;
	after.prev = before;

	node.next = null;
	node.prev = null;

	return head;
}
	
						/** INSERT BEFORE **/

/** insert new head to the DLL (insert before head) **/
function insertNewHead(head, ele){
	const newHead = new Node(ele, null, null);
	if(head === null) return newHead;

	head.prev = newHead;
	newHead.next = head;
	return newHead;
}

/** insert before tail **/
function insertBeforeTail(head, ele){
	const newNode = new Node(ele);

	/** single ele DLL **/
	if(!head.next){
		newNode.next = head;
		head.prev = newNode;;
		return newNode;
	}

	let temp = head;
	while(temp.next){
		temp = temp.next;
	}

	let before = temp.prev;
	
	newNode.prev = before;
	newNode.next = temp;

	before.next = newNode;
	before = newNode;

	return head;
}

/** insert before Kth element ( 1 >= k <= n ) **/
function insertBeforeKthEle(head, k, ele){
	const newNode = new Node(ele);
	let count = 0;

	let temp = head;
	while(temp){
		count++;
		if(count === k) break;
		temp = temp.next;
	}

	let before = temp.prev;

	if(!before){
		return insertNewHead(head, ele);
	}

	
	newNode.prev = before;
	newNode.next = temp;

	before.next = newNode;
	temp.prev = newNode;
	return head;
}

/** insert before the node **/
function insertBeforeNode(head, node, ele){
	let before = node.prev;

	if(!before) {
		return insertNewHead(head, ele);
	}

	const newNode = new Node(ele, node, before);
	before.next = newNode;
	node.prev = newNode;

	return head;
}


						
						/** INSERT AFTER **/

/** insert new tail to the DLL (insert after tail) **/
function insertNewTail(head, ele){
	const newTail = new Node(ele, null, null);
	if(head === null) return newTail;

	let tail = head;
	while(tail.next){
		tail = tail.next;
	}

	tail.next = newTail;
	newTail.prev = tail;

	return head;
}

/** insert after head **/
function insertAfterHead(head, ele){
	const newNode = new Node(ele, null, head);
	
	if(!head.next){
		head.next = newNode;
		return head;	
	}

	newNode.next = head.next;
	head.next.prev = newNode;
	head.next = newNode;
	return head;
}

/** Insert after kth element (1 >= k <= n) **/
function insertAfterKthEle(head, k, ele){

	let count = 0;
	let temp = head;
	while(temp){
		count++;
		if(count === k) break;
		temp = temp.next;
	}

	const newNode = new Node(ele, null, temp);

	if(temp.next === null){
		temp.next = newNode;
		return head;
	}

	let after = temp.next;

	temp.next = newNode;
	newNode.next = after;
	after.prev = newNode;

	return head;
}

/** insert after the node **/
function insertAfterNode(head, node, ele){
	let after = node.next;
	const newNode = new Node(ele, null, node);

	if(after === null){
		node.next = newNode;
		return head;
	}

	node.next = newNode;
	newNode.next = after;
	after.prev = newNode;

	return head;
}

const arr = [7, 8, 9, 10];
let head = convertArrayToDLL(arr);
printDLL(head);

// head = removeTail(head);
// console.log('Tail removed from the DLL: ');
// printDLL(head);

// head = removeHead(head);
// console.log('Head removed from DLL: ');
// printDLL(head);

// console.log('Find element in DLL: ' + findAEleInDLL(head, 7));

// head = insertNewHead(head, 1);
// console.log('Inserted new Head: ');
// printDLL(head);

// head = insertNewTail(head, 1);
// console.log('Inserted new Tail: ');
// printDLL(head);

// head = insertAfterHead(head, 1);
// console.log('Inserted after Head: ');
// printDLL(head);

// head = insertBeforeTail(head, 1);
// console.log('Inserted before Tail: ');
// printDLL(head);

// head = removeKthEle(head, 1);
// console.log('Removed Kth element: ');
// printDLL(head);

// head = removeNodeOfDLL(head, head.next.next.next);
// console.log('Removed node from DLL: ');
// printDLL(head);

// head = insertBeforeKthEle(head, 4, 1);
// console.log('Removed node from DLL: ');
// printDLL(head);

// head = insertBeforeNode(head, head.next.next, 1);
// console.log('Removed node from DLL: ');
// printDLL(head);

// head = insertAfterKthEle(head, 4, 1);
// console.log('Inserted after Kth element: ');
// printDLL(head);

head = insertAfterNode(head, head.next.next.next, 1);
console.log('Inserted after node: ');
printDLL(head);
// console.log('tail of the DLL: ' + findTail(head));