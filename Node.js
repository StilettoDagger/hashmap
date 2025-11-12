export default class Node {
	constructor(key = null, value = null, next = null, prev = null) {
		this.key = key;
		this.value = value;
		this.next = next;
		this.prev = prev;
	}
}
