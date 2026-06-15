import { Node, convertArrayToLL, traverseLL } from './learning/learn-singly-linked-list.js';

function sortLLof012(head){
	if(!head || !head.next) return head;
	let temp = head;
	let head0 = null; let tail0 = null;
	let head1 = null; let tail1 = null;
	let head2 = null; let tail2 = null;

	while(temp){
		const next = temp.next;
		if(temp.data === 0){
			if(!head0){
				head0 = temp;
				tail0 = head0;
			} else {
				tail0.next = temp;
				tail0 = temp;
			}

			tail0.next = null;
		} else if(temp.data === 1){
			if(!head1){
				head1 = temp;
				tail1 = head1;
			} else {
				tail1.next = temp;
				tail1 = temp;
			}
			tail1.next = null;
		} else {
			if(!head2){
				head2 = temp;
				tail2 = head2;
			} else {
				tail2.next = temp;
				tail2 = temp;
			}
			tail2.next = null;
		}

		temp = next;
	}

	let newHead = null;
	if(head2){
		newHead = head2;
	}

	if(head1){
		tail1.next = head2;
		newHead = head1;
	}

	if(head0){
		tail0.next = head1;
		newHead = head0;
	}

	return newHead;
}

const head = convertArrayToLL([2,1,0,0,2,1,2,1,2,1,2,1,0,0,0]);
console.log('new sorted LL: ')
const newHead = sortLLof012(head);
traverseLL(newHead);