export default class Node {
	constructor(value = null, next = null, prev = null) {
		this.value = value;
		this.next = next;
		this.prev = prev;
	}
}
